import { SalParser } from "./lexer/SalParser";
import { SalVisitor } from "./lexer/SalVisitor";

async function main() {
  for await (const chunk of Bun.stdin.stream()) {
    const chunkText = Buffer.from(chunk).toString();
    const file = Bun.file(chunkText.trimEnd());
    const contents = await file.text();
    const tree = SalParser(contents);
    const visitor = new SalVisitor();
    visitor.visit(tree)
  }
}

await main();
