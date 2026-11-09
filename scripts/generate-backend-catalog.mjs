import fs from "node:fs";
const catalog = JSON.parse(
  fs.readFileSync(new URL("../src/data/catalog.json", import.meta.url), "utf8"),
);
fs.writeFileSync(
  new URL("../server/catalog.generated.json", import.meta.url),
  JSON.stringify(
    catalog.products.map((product) => ({
      id: product.slug,
      name: product.name,
    })),
    null,
    2,
  ) + "\n",
);
console.log("Backend product options generated: " + catalog.products.length);
