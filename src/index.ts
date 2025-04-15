import { SalParser } from "./lexer/SalParser";
import { SalVisitor } from "./lexer/SalVisitor";

async function main() {
  const file = Bun.file("./grammar/sample.txt");
  const contents = await file.text();
  const tree = SalParser(contents);
  const visitor = new SalVisitor();
  visitor.visit(tree);
}

await main();
