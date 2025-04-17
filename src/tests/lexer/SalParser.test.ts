import { expect, test } from "bun:test";
import { toSalParseTree } from "../../lexer/SalParser";
import { SalVisitor } from "../../lexer/SalVisitor";

test("Empty sal source code should make an empty parse tree.", () => {
  // Arrange
  const emptySalCode = "";

  // Act
  const actualTree = toSalParseTree(emptySalCode);
  const actualTreeText = actualTree.getText();

  // Assert
  expect(actualTreeText).toBe("");
});

test("Sample schema definition", () => {
  // Arrange
  const salSchemaDeclaration = `
    DECLARE SCHEMA User {
      "username" : string,
      "firstName" : string,
      "lastName" : string,
      "cool?" : bool
    };
`;
  const visitor = new SalVisitor();
  // Act
  const actualTree = toSalParseTree(salSchemaDeclaration);
  const result = actualTree.accept(visitor);
  console.log(result)
});
