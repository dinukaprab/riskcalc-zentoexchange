export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  return Math.min(Math.max(value, min), max);
}
