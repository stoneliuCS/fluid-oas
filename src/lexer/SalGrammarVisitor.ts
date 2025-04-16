// Generated from /Users/stoneliu/Desktop/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


import { ProgContext } from "./SalGrammarParser";
import { SalContext } from "./SalGrammarParser";
import { CodeContext } from "./SalGrammarParser";
import { SchemaContext } from "./SalGrammarParser";
import { ObjectContext } from "./SalGrammarParser";
import { PairContext } from "./SalGrammarParser";
import { TypeContext } from "./SalGrammarParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SalGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class SalGrammarVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SalGrammarParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.sal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSal?: (ctx: SalContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.code`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCode?: (ctx: CodeContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.schema`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchema?: (ctx: SchemaContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject?: (ctx: ObjectContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.pair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPair?: (ctx: PairContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;
}

