import { CharStream, CommonTokenStream } from "antlr4";
import SalGrammarLexer from "../grammar/SalGrammarLexer.ts";
import SalGrammarParser, { ProgContext } from "../grammar/SalGrammarParser";

/**
 * Converts SAL source code into a ParseTree with the inital start rule.
 *
 * The resulting ParseTree data structure will accept a visitor to visit each
 * node inside the parse tree.
 */
export function toSalParseTree(code: string): ProgContext {
  const charStream = new CharStream(code);
  const lexer = new SalGrammarLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new SalGrammarParser(tokenStream);
  return parser.prog();
}

/*
 * Interprets and Transpiles the file into a SalParseTree
 */
export async function interpretFile(filePath : string) {
  const salFile = Bun.file(filePath);
  if (!await salFile.exists()) {
    throw new Error(`The given file path: ${filePath} was not found, could not be interpreted.`)
  }
  const salFileContents = await salFile.text()
  const tree = toSalParseTree(salFileContents);
  return tree;
}
