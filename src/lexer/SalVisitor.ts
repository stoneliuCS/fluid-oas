import type {
  ErrorNode,
  ParseTree,
  ParseTreeVisitor,
  RuleNode,
  TerminalNode,
} from "antlr4";

export class SalVisitor implements ParseTreeVisitor<Number> {
  visit(tree: ParseTree): Number {
    return 0;
  }
  visitChildren(node: RuleNode): Number {
    return 0;
  }
  visitTerminal(node: TerminalNode): Number {
    return 0;
  }
  visitErrorNode(node: ErrorNode): Number {
    return 0;
  }
}
