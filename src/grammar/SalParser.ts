import { type ParseTree, CharStream, CommonTokenStream } from "antlr4";
import SalGrammarLexer from "./output/SalGrammarLexer.ts";
import SalGrammarParser from "./output/SalGrammarParser";
/**
 * Converts SAL source code into a ParseTree
 */
export function SalParser(code: string): ParseTree {
  const charStream = new CharStream(code);
  const lexer = new SalGrammarLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new SalGrammarParser(tokenStream);
  return parser.prog();
}
