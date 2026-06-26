"use client";

import { useEffect } from "react";
import { useEasterEggs } from "./easter-egg-provider";

const ART = `
  _ _
 | (_)
 | |_  __ _ _ __ ___    _ __   __ _ _ __   ___
 | | |/ _\` | '_ \` _ \\  | '_ \\ / _\` | '_ \\ / __|
 | | | (_| | | | | | | | | | | (_| | | | | (__
 |_|_|\\__,_|_| |_| |_| |_| |_|\\__,_|_| |_|\\___|

 hi. if you're hiring undergrads, ping liamnance06@gmail.com.
`;

let didLog = false;

export function ConsoleGreeting() {
  const { unlock } = useEasterEggs();

  useEffect(() => {
    if (didLog) return;
    didLog = true;
    /* eslint-disable no-console */
    console.log(`%c${ART}`, "color:#E07856;font-family:monospace;");
    console.log(
      "%cYou opened the inspector. That's one of the secrets.",
      "color:#B85A3D;font-style:italic;",
    );
    /* eslint-enable no-console */

    // Detect devtools via the well-known "window size" trick is unreliable.
    // Use a simpler heuristic: if window.outerWidth - innerWidth or outerHeight - innerHeight > 200, devtools is likely open.
    const detect = () => {
      const dw = window.outerWidth - window.innerWidth;
      const dh = window.outerHeight - window.innerHeight;
      if (dw > 200 || dh > 200) {
        unlock("devtools");
      }
    };
    detect();
    const id = setInterval(detect, 2000);
    return () => clearInterval(id);
  }, [unlock]);

  return null;
}
