export default async function getStringHash(string: string) {
  const sourceBytes = new TextEncoder().encode(string);
  const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
  const resultBytes = [...new Uint8Array(digest)];
  return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}
