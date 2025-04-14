import type {
  ErrorNode,
  ParseTree,
  ParseTreeVisitor,
  RuleNode,
  TerminalNode,
} from "antlr4";

export class SalVisitor implements ParseTreeVisitor<Number> {
  visit(tree: ParseTree): Number {
    console.log(tree.getText());
    return 0;
  }
  visitChildren(node: RuleNode): Number {
    console.log(node.getText());
    return 0;
  }
  visitTerminal(node: TerminalNode): Number {
    console.log(node.getText());
    return 0;
  }
  visitErrorNode(node: ErrorNode): Number {
    console.log(node.getText());
    return 0;
  }
}
