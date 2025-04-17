// Generated from /Users/stoneliu/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `SalGrammarParser`.
 */
export default class SalGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SalGrammarParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.sal`.
	 * @param ctx the parse tree
	 */
	enterSal?: (ctx: SalContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.sal`.
	 * @param ctx the parse tree
	 */
	exitSal?: (ctx: SalContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.code`.
	 * @param ctx the parse tree
	 */
	enterCode?: (ctx: CodeContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.code`.
	 * @param ctx the parse tree
	 */
	exitCode?: (ctx: CodeContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.schema`.
	 * @param ctx the parse tree
	 */
	enterSchema?: (ctx: SchemaContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.schema`.
	 * @param ctx the parse tree
	 */
	exitSchema?: (ctx: SchemaContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.route`.
	 * @param ctx the parse tree
	 */
	enterRoute?: (ctx: RouteContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.route`.
	 * @param ctx the parse tree
	 */
	exitRoute?: (ctx: RouteContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.schema_definition`.
	 * @param ctx the parse tree
	 */
	enterSchema_definition?: (ctx: Schema_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.schema_definition`.
	 * @param ctx the parse tree
	 */
	exitSchema_definition?: (ctx: Schema_definitionContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.pair`.
	 * @param ctx the parse tree
	 */
	enterPair?: (ctx: PairContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.pair`.
	 * @param ctx the parse tree
	 */
	exitPair?: (ctx: PairContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.schema_type`.
	 * @param ctx the parse tree
	 */
	enterSchema_type?: (ctx: Schema_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.schema_type`.
	 * @param ctx the parse tree
	 */
	exitSchema_type?: (ctx: Schema_typeContext) => void;
}

