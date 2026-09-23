function braceBody(src: string, open: number): string {
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
  return src.slice(open + 1, end);
}

function fieldsFromObjectBody(body: string): string[] {
  const fields: string[] = [];
  for (const line of body.split("\n")) {
    const key = line.match(/^\s*(?:public|private|protected|readonly|declare|\s)*(\w+)(\??)\s*[!:]/);
    if (!key?.[1] || key[2] === "?") continue;
    if (line.includes("{")) continue;
    if (key[1] === "constructor" || key[1] === "get" || key[1] === "set") continue;
    fields.push(key[1]);
  }
  return fields;
}

export function parseExportedInterfaceFields(src: string): string[] {
  const start = src.search(/export interface \w+\s*\{/);
  if (start === -1) return [];
  const open = src.indexOf("{", start);
  if (open === -1) return [];
  return fieldsFromObjectBody(braceBody(src, open));
}

export function parseNamedInterfaceFields(
  src: string,
  name: string,
): string[] {
  const re = new RegExp(
    `(?:export\\s+)?interface\\s+${name}\\s*(?:extends\\s+[^{]+)?\\{`,
  );
  const m = re.exec(src);
  if (!m) return [];
  const open = src.indexOf("{", m.index);
  if (open === -1) return [];
  return fieldsFromObjectBody(braceBody(src, open));
}

/** Required fields from a class: property decls + constructor parameter properties. */
export function parseClassRequiredFields(
  src: string,
  className: string,
): string[] {
  const re = new RegExp(
    `(?:export\\s+)?class\\s+${className}\\b[^{]*\\{`,
  );
  const m = re.exec(src);
  if (!m) return [];
  const open = src.indexOf("{", m.index);
  if (open === -1) return [];
  const body = braceBody(src, open);
  const fields = new Set(fieldsFromObjectBody(body));

  const ctor = body.match(/constructor\s*\(([^)]*)\)/);
  if (ctor?.[1]) {
    for (const param of ctor[1].split(",")) {
      const p = param.match(
        /(?:public|private|protected)\s+(?:readonly\s+)?(\w+)(\?)?/,
      );
      if (p?.[1] && p[2] !== "?") fields.add(p[1]);
    }
  }
  return [...fields];
}

export function parseContractId(src: string): string | undefined {
  const named = src.match(
    /export const CONTRACT\s*=\s*["']([^"']+)["']/,
  );
  if (named?.[1]) return named[1];
  const topic = src.match(/["']([a-z0-9_.]+:[a-z0-9_.]+|[a-z0-9]+\.[a-z0-9.]+)["']/i);
  return topic?.[1];
}
