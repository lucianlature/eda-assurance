export function parseExportedInterfaceFields(src: string): string[] {
  const start = src.search(/export interface \w+\s*\{/);
  if (start === -1) return [];
  const open = src.indexOf("{", start);
  if (open === -1) return [];
  let depth = 0;
  let end = open;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const fields: string[] = [];
  for (const line of src.slice(open + 1, end).split("\n")) {
    const key = line.match(/^\s*(\w+)(\??)\s*:/);
    if (!key?.[1] || key[2] === "?") continue;
    if (line.includes("{")) continue;
    fields.push(key[1]);
  }
  return fields;
}

export function parseContractId(src: string): string | undefined {
  const named = src.match(
    /export const CONTRACT\s*=\s*["']([^"']+)["']/,
  );
  if (named?.[1]) return named[1];
  const topic = src.match(/["']([a-z0-9_.]+:[a-z0-9_.]+|[a-z0-9]+\.[a-z0-9.]+)["']/i);
  return topic?.[1];
}
