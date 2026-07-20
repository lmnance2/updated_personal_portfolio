/**
 * Local toxicity detection using Xenova/toxic-bert (ONNX port of unitary/toxic-bert)
 * via @xenova/transformers. Pipeline is cached across requests.
 *
 * First cold call downloads ~110 MB of model weights to the on-disk cache
 * (~/.cache/huggingface by default), then subsequent calls stay in-memory.
 */

type ToxicLabel =
  | "toxic"
  | "severe_toxic"
  | "obscene"
  | "threat"
  | "insult"
  | "identity_hate";

type LabelScore = { label: string; score: number };

type Classifier = (
  text: string,
  options?: { topk?: number },
) => Promise<LabelScore[] | LabelScore[][]>;

let cached: Classifier | null = null;
let loading: Promise<Classifier | null> | null = null;

async function loadPipeline(): Promise<Classifier | null> {
  if (cached) return cached;
  if (loading) return loading;

  loading = (async () => {
    try {
      const mod = await import("@xenova/transformers");
      const { pipeline, env } = mod as unknown as {
        pipeline: (
          task: string,
          model: string,
          opts?: Record<string, unknown>,
        ) => Promise<Classifier>;
        env: {
          allowLocalModels: boolean;
          allowRemoteModels: boolean;
          cacheDir: string;
          useFSCache: boolean;
        };
      };
      env.allowRemoteModels = true;
      env.allowLocalModels = true;
      env.useFSCache = true;
      const path = await import("node:path");
      env.cacheDir = path.join(process.cwd(), ".cache", "xenova");
      const clf = await pipeline("text-classification", "Xenova/toxic-bert", {
        quantized: true,
      });
      cached = clf;
      return clf;
    } catch (err) {
      console.error("[toxicity] failed to load pipeline:", err);
      return null;
    } finally {
      loading = null;
    }
  })();

  return loading;
}

const THRESHOLDS: Record<ToxicLabel, number> = {
  toxic: 0.85,
  severe_toxic: 0.5,
  obscene: 0.85,
  threat: 0.5,
  insult: 0.85,
  identity_hate: 0.5,
};

export type ToxicityResult =
  | { ok: true }
  | { ok: false; label: string; score: number }
  | { ok: true; skipped: "unavailable" };

export async function checkToxicity(text: string): Promise<ToxicityResult> {
  const clf = await loadPipeline();
  if (!clf) return { ok: true, skipped: "unavailable" };

  let raw: LabelScore[] | LabelScore[][];
  try {
    raw = await clf(text, { topk: 6 });
  } catch (err) {
    console.error("[toxicity] inference error:", err);
    return { ok: true, skipped: "unavailable" };
  }

  const scores: LabelScore[] = Array.isArray(raw[0])
    ? (raw as LabelScore[][])[0]
    : (raw as LabelScore[]);

  for (const { label, score } of scores) {
    const key = label as ToxicLabel;
    const threshold = THRESHOLDS[key];
    if (threshold !== undefined && score >= threshold) {
      return { ok: false, label, score };
    }
  }
  return { ok: true };
}

export function warmToxicityPipeline(): void {
  void loadPipeline();
}
