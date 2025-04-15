import type { ErrorNode, ParseTree, RuleNode, TerminalNode } from "antlr4";
import SalGrammarVisitor from "../grammar/SalGrammarVisitor";
import {
  ProgContext,
} from "../grammar/SalGrammarParser";

export class SalVisitor implements SalGrammarVisitor<number> {
  visitProg: (ctx: ProgContext) => number = (ctx: ProgContext) => {
    if (!ctx) {
      console.log("Ending visit...");
      return 0;
    } else {
      console.log(ctx.start.text);
      console.log(ctx.getChild(0).getText())
      return 1;
    }
  };
  // visitSal?: ((ctx: SalContext) => number) | undefined;
  // visitCode?: ((ctx: CodeContext) => number) | undefined;
  // visitSchema?: ((ctx: SchemaContext) => number) | undefined;
  // visitObject?: ((ctx: ObjectContext) => number) | undefined;
  // visitPair?: ((ctx: PairContext) => number) | undefined;
  // visitType?: ((ctx: TypeContext) => number) | undefined;
  visit(tree: ParseTree): number {
    if (!tree) {
      console.log("Tree is null")
      return 1;
    }
    console.log(tree.getText())
    return 0;
  }
  visitChildren(node: RuleNode): number {
    throw new Error("Method not implemented.");
  }
  visitTerminal(node: TerminalNode): number {
    throw new Error("Method not implemented.");
  }
  visitErrorNode(node: ErrorNode): number {
    throw new Error("Method not implemented.");
  }
}
