// Generated from /Users/stoneliu/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


import { ProgContext } from "./SalGrammarParser";
import { SalContext } from "./SalGrammarParser";
import { CodeContext } from "./SalGrammarParser";
import { SchemaContext } from "./SalGrammarParser";
import { RouteContext } from "./SalGrammarParser";
import { TypeContext } from "./SalGrammarParser";
import { Schema_definitionContext } from "./SalGrammarParser";
import { PairContext } from "./SalGrammarParser";
import { Schema_typeContext } from "./SalGrammarParser";


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
	 * Visit a parse tree produced by `SalGrammarParser.route`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRoute?: (ctx: RouteContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.schema_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchema_definition?: (ctx: Schema_definitionContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.pair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPair?: (ctx: PairContext) => Result;
	/**
	 * Visit a parse tree produced by `SalGrammarParser.schema_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchema_type?: (ctx: Schema_typeContext) => Result;
}

