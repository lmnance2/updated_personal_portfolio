import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

export type Entry = {
  id: string;
  name?: string;
  message: string;
  createdAt: number;
};

const DATA_DIR = join(process.cwd(), ".data");
const ENTRIES_FILE = join(DATA_DIR, "guestbook.json");
const RL_FILE = join(DATA_DIR, "guestbook-rl.json");
const MAX_ENTRIES = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

async function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    // @ts-expect-error optional peer dep
    const mod = await import("@vercel/kv");
    return mod.kv as {
      lrange(k: string, s: number, e: number): Promise<unknown[]>;
      lpush(k: string, ...v: unknown[]): Promise<number>;
      ltrim(k: string, s: number, e: number): Promise<string>;
      del(k: string): Promise<number>;
      get(k: string): Promise<unknown>;
      set(k: string, v: unknown, opts?: { ex?: number }): Promise<string>;
      ttl(k: string): Promise<number>;
    };
  } catch {
    return null;
  }
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(path, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(path: string, data: unknown) {
  await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}

const file = {
  async getEntries(): Promise<Entry[]> {
    await ensureDataDir();
    return readJson<Entry[]>(ENTRIES_FILE, []);
  },

  async addEntry(data: { name?: string; message: string }): Promise<Entry> {
    await ensureDataDir();
    const entries = await file.getEntries();
    const entry: Entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      message: data.message,
      name: data.name,
      createdAt: Date.now(),
    };
    await writeJson(ENTRIES_FILE, [entry, ...entries].slice(0, MAX_ENTRIES));
    return entry;
  },

  async deleteEntry(id: string): Promise<void> {
    await ensureDataDir();
    const entries = await file.getEntries();
    await writeJson(ENTRIES_FILE, entries.filter((e) => e.id !== id));
  },

  async checkRateLimit(ip: string): Promise<{ allowed: boolean; nextAt?: number }> {
    await ensureDataDir();
    const rl = await readJson<Record<string, number>>(RL_FILE, {});
    const now = Date.now();
    const lastAt = rl[ip];
    if (lastAt && now - lastAt < DAY_MS) {
      return { allowed: false, nextAt: lastAt + DAY_MS };
    }
    const cleaned: Record<string, number> = {};
    for (const [k, v] of Object.entries(rl)) {
      if (now - v < DAY_MS) cleaned[k] = v;
    }
    cleaned[ip] = now;
    await writeJson(RL_FILE, cleaned);
    return { allowed: true };
  },
};

async function makeKv() {
  const kv = await getKv();
  if (!kv) return null;

  const LIST_KEY = "gb:entries";
  const RL_PREFIX = "gb:rl:";
  const DAY_S = 60 * 60 * 24;

  return {
    async getEntries(): Promise<Entry[]> {
      const raw = (await kv.lrange(LIST_KEY, 0, 99)) as (string | Entry)[];
      return raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as Entry) : r));
    },

    async addEntry(data: { name?: string; message: string }): Promise<Entry> {
      const entry: Entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        message: data.message,
        name: data.name,
        createdAt: Date.now(),
      };
      await kv.lpush(LIST_KEY, JSON.stringify(entry));
      await kv.ltrim(LIST_KEY, 0, 499);
      return entry;
    },

    async deleteEntry(id: string): Promise<void> {
      const raw = (await kv.lrange(LIST_KEY, 0, 499)) as string[];
      const remaining: string[] = [];
      for (const r of raw) {
        try {
          if ((JSON.parse(r) as { id: string }).id !== id) remaining.push(r);
        } catch {
          remaining.push(r);
        }
      }
      await kv.del(LIST_KEY);
      for (let i = remaining.length - 1; i >= 0; i--) {
        await kv.lpush(LIST_KEY, remaining[i]);
      }
    },

    async checkRateLimit(ip: string): Promise<{ allowed: boolean; nextAt?: number }> {
      const key = `${RL_PREFIX}${ip}`;
      const exists = await kv.get(key);
      if (exists) {
        const ttl = await kv.ttl(key);
        return { allowed: false, nextAt: Date.now() + ttl * 1000 };
      }
      await kv.set(key, 1, { ex: DAY_S });
      return { allowed: true };
    },
  };
}

type Store = typeof file;
let _store: Store | null = null;
let _storeType: "file" | "kv" = "file";

async function getStore(): Promise<{ store: Store; type: "file" | "kv" }> {
  if (_store) return { store: _store, type: _storeType };
  const kv = await makeKv();
  if (kv) {
    _store = kv;
    _storeType = "kv";
  } else {
    _store = file;
    _storeType = "file";
  }
  return { store: _store, type: _storeType };
}

export async function getEntries(): Promise<Entry[]> {
  const { store } = await getStore();
  return store.getEntries();
}

export async function addEntry(data: { name?: string; message: string }): Promise<Entry> {
  const { store } = await getStore();
  return store.addEntry(data);
}

export async function deleteEntry(id: string): Promise<void> {
  const { store } = await getStore();
  return store.deleteEntry(id);
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; nextAt?: number }> {
  const { store } = await getStore();
  return store.checkRateLimit(ip);
}

export async function getStoreInfo(): Promise<{ type: "file" | "kv"; entryCount: number }> {
  const { store, type } = await getStore();
  const entries = await store.getEntries();
  return { type, entryCount: entries.length };
}
