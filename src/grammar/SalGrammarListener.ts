// Generated from /Users/stoneliu/Desktop/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0

import {ParseTreeListener} from "antlr4";


import { ProgContext } from "./SalGrammarParser";
import { StatsContext } from "./SalGrammarParser";
import { StatContext } from "./SalGrammarParser";
import { SchemaContext } from "./SalGrammarParser";
import { BlockContext } from "./SalGrammarParser";
import { ExprContext } from "./SalGrammarParser";


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
	 * Enter a parse tree produced by `SalGrammarParser.stats`.
	 * @param ctx the parse tree
	 */
	enterStats?: (ctx: StatsContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.stats`.
	 * @param ctx the parse tree
	 */
	exitStats?: (ctx: StatsContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.stat`.
	 * @param ctx the parse tree
	 */
	enterStat?: (ctx: StatContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.stat`.
	 * @param ctx the parse tree
	 */
	exitStat?: (ctx: StatContext) => void;
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
	 * Enter a parse tree produced by `SalGrammarParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;
	/**
	 * Enter a parse tree produced by `SalGrammarParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `SalGrammarParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
}

