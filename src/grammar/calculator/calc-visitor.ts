import type {
  ErrorNode,
  ParseTree,
  ParseTreeVisitor,
  RuleNode,
  TerminalNode,
} from "antlr4";

export class CalculatorVisitor implements ParseTreeVisitor<Number> {
  private memory: Map<String, Number> = new Map<String, Number>();
  visit(tree: ParseTree): Number {
    console.log(tree.getText());
    return 1;
  }
  visitChildren(node: RuleNode): Number {
    console.log(node.getText());
    return 1;
  }
  visitTerminal(node: TerminalNode): Number {
    console.log(node.getText());
    return 1;
  }
  visitErrorNode(node: ErrorNode): Number {
    console.log(node.getText());
    return 1;
  }
}
