// Ensure that the lexer is generated properly by running make
import calculatorLexer from "./output/calculatorLexer.ts";
import { CharStream, CommonTokenStream } from "antlr4";
import calculatorParser from "./output/calculatorParser.ts";

async function main() {
  const reader = Bun.stdin.stream();
  for await (const chunk of reader) {
    const chunkText = Buffer.from(chunk).toString();
    const stream = new CharStream(chunkText);
    const lexer = new calculatorLexer(stream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new calculatorParser(tokens)
    const parseTree = parser.prog();
    console.log(parseTree)
  }
}

await main()
