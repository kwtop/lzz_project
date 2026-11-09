import fs from "node:fs";
import path from "node:path";

export function schemaSql(root) {
  return fs.readdirSync(path.join(root, "migrations"))
    .filter(file => /^\d+.*\.sql$/.test(file)).sort()
    .map(file => fs.readFileSync(path.join(root, "migrations", file), "utf8"))
    .join("\n");
}
