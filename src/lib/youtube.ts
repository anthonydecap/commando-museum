/** Extracts the video id from youtu.be, youtube.com/watch and /embed URLs. */
export function youTubeId(url: string | null | undefined) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match?.[1] ?? null;
}
