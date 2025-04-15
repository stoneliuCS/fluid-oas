import { toSalParseTree } from "./lexer/SalParser";
import { SalVisitor } from "./lexer/SalVisitor";

async function main() {
  const file = Bun.file("./grammar/sample.txt");
  const contents = await file.text();
  const tree = toSalParseTree(contents);
  const visitor = new SalVisitor();
  tree.accept(visitor);
}

await main();
