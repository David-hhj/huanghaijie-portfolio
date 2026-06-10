/** Quick check before initializing Three.js — avoids uncaught renderer errors. */
export function isWebGLAvailable(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ??
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}
