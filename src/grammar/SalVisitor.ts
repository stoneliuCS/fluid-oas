import type {
  ErrorNode,
  ParseTree,
  ParseTreeVisitor,
  RuleNode,
  TerminalNode,
} from "antlr4";

export class SalVisitor implements ParseTreeVisitor<Number> {
  visit(tree: ParseTree): Number {
    throw new Error("Method not implemented.");
  }
  visitChildren(node: RuleNode): Number {
    throw new Error("Method not implemented.");
  }
  visitTerminal(node: TerminalNode): Number {
    throw new Error("Method not implemented.");
  }
  visitErrorNode(node: ErrorNode): Number {
    throw new Error("Method not implemented.");
  }
}
