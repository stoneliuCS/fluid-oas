// Generated from ./SalGrammar.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import SalGrammarListener from "./SalGrammarListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class SalGrammarParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly ID = 8;
	public static readonly INT = 9;
	public static readonly NEWLINE = 10;
	public static readonly WS = 11;
	public static readonly DECLARE = 12;
	public static readonly SCHEMA = 13;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_stats = 1;
	public static readonly RULE_stat = 2;
	public static readonly RULE_schema = 3;
	public static readonly RULE_block = 4;
	public static readonly RULE_expr = 5;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'{'", "'}'", 
                                                            "'('", "')'", 
                                                            "'['", "']'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'DECLARE'", 
                                                            "'SCHEMA'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "ID", "INT", 
                                                             "NEWLINE", 
                                                             "WS", "DECLARE", 
                                                             "SCHEMA" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "stats", "stat", "schema", "block", "expr",
	];
	public get grammarFileName(): string { return "SalGrammar.g4"; }
	public get literalNames(): (string | null)[] { return SalGrammarParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return SalGrammarParser.symbolicNames; }
	public get ruleNames(): string[] { return SalGrammarParser.ruleNames; }
	public get serializedATN(): number[] { return SalGrammarParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, SalGrammarParser._ATN, SalGrammarParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let localctx: ProgContext = new ProgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, SalGrammarParser.RULE_prog);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 12;
			this.stats();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stats(): StatsContext {
		let localctx: StatsContext = new StatsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, SalGrammarParser.RULE_stats);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 17;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6916) !== 0)) {
				{
				{
				this.state = 14;
				this.stat();
				}
				}
				this.state = 19;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 20;
			this.match(SalGrammarParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let localctx: StatContext = new StatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, SalGrammarParser.RULE_stat);
		try {
			this.state = 25;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 22;
				this.schema();
				}
				break;
			case 8:
			case 9:
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 23;
				this.expr(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 24;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public schema(): SchemaContext {
		let localctx: SchemaContext = new SchemaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, SalGrammarParser.RULE_schema);
		try {
			this.state = 37;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 27;
				this.match(SalGrammarParser.DECLARE);
				this.state = 28;
				this.match(SalGrammarParser.SCHEMA);
				this.state = 29;
				this.match(SalGrammarParser.T__1);
				this.state = 30;
				this.expr(0);
				this.state = 31;
				this.match(SalGrammarParser.T__2);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 33;
				this.match(SalGrammarParser.DECLARE);
				this.state = 34;
				this.match(SalGrammarParser.SCHEMA);
				this.state = 35;
				this.match(SalGrammarParser.T__1);
				this.state = 36;
				this.match(SalGrammarParser.T__2);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, SalGrammarParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 39;
			this.match(SalGrammarParser.T__1);
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6916) !== 0)) {
				{
				{
				this.state = 40;
				this.stat();
				}
				}
				this.state = 45;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 46;
			this.match(SalGrammarParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExprContext = new ExprContext(this, this._ctx, _parentState);
		let _prevctx: ExprContext = localctx;
		let _startState: number = 10;
		this.enterRecursionRule(localctx, 10, SalGrammarParser.RULE_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 56;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
				{
				this.state = 49;
				this.match(SalGrammarParser.ID);
				this.state = 50;
				this.match(SalGrammarParser.T__3);
				this.state = 51;
				this.expr(0);
				this.state = 52;
				this.match(SalGrammarParser.T__4);
				}
				break;
			case 9:
				{
				this.state = 54;
				this.match(SalGrammarParser.INT);
				}
				break;
			case 11:
				{
				this.state = 55;
				this.match(SalGrammarParser.WS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 65;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new ExprContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, SalGrammarParser.RULE_expr);
					this.state = 58;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 59;
					this.match(SalGrammarParser.T__5);
					this.state = 60;
					this.expr(0);
					this.state = 61;
					this.match(SalGrammarParser.T__6);
					}
					}
				}
				this.state = 67;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 5:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,13,69,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,1,0,1,0,1,1,5,1,16,8,1,10,1,12,1,
	19,9,1,1,1,1,1,1,2,1,2,1,2,3,2,26,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,3,3,38,8,3,1,4,1,4,5,4,42,8,4,10,4,12,4,45,9,4,1,4,1,4,1,5,1,5,1,
	5,1,5,1,5,1,5,1,5,1,5,3,5,57,8,5,1,5,1,5,1,5,1,5,1,5,5,5,64,8,5,10,5,12,
	5,67,9,5,1,5,0,1,10,6,0,2,4,6,8,10,0,0,70,0,12,1,0,0,0,2,17,1,0,0,0,4,25,
	1,0,0,0,6,37,1,0,0,0,8,39,1,0,0,0,10,56,1,0,0,0,12,13,3,2,1,0,13,1,1,0,
	0,0,14,16,3,4,2,0,15,14,1,0,0,0,16,19,1,0,0,0,17,15,1,0,0,0,17,18,1,0,0,
	0,18,20,1,0,0,0,19,17,1,0,0,0,20,21,5,1,0,0,21,3,1,0,0,0,22,26,3,6,3,0,
	23,26,3,10,5,0,24,26,3,8,4,0,25,22,1,0,0,0,25,23,1,0,0,0,25,24,1,0,0,0,
	26,5,1,0,0,0,27,28,5,12,0,0,28,29,5,13,0,0,29,30,5,2,0,0,30,31,3,10,5,0,
	31,32,5,3,0,0,32,38,1,0,0,0,33,34,5,12,0,0,34,35,5,13,0,0,35,36,5,2,0,0,
	36,38,5,3,0,0,37,27,1,0,0,0,37,33,1,0,0,0,38,7,1,0,0,0,39,43,5,2,0,0,40,
	42,3,4,2,0,41,40,1,0,0,0,42,45,1,0,0,0,43,41,1,0,0,0,43,44,1,0,0,0,44,46,
	1,0,0,0,45,43,1,0,0,0,46,47,5,3,0,0,47,9,1,0,0,0,48,49,6,5,-1,0,49,50,5,
	8,0,0,50,51,5,4,0,0,51,52,3,10,5,0,52,53,5,5,0,0,53,57,1,0,0,0,54,57,5,
	9,0,0,55,57,5,11,0,0,56,48,1,0,0,0,56,54,1,0,0,0,56,55,1,0,0,0,57,65,1,
	0,0,0,58,59,10,3,0,0,59,60,5,6,0,0,60,61,3,10,5,0,61,62,5,7,0,0,62,64,1,
	0,0,0,63,58,1,0,0,0,64,67,1,0,0,0,65,63,1,0,0,0,65,66,1,0,0,0,66,11,1,0,
	0,0,67,65,1,0,0,0,6,17,25,37,43,56,65];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SalGrammarParser.__ATN) {
			SalGrammarParser.__ATN = new ATNDeserializer().deserialize(SalGrammarParser._serializedATN);
		}

		return SalGrammarParser.__ATN;
	}


	static DecisionsToDFA = SalGrammarParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stats(): StatsContext {
		return this.getTypedRuleContext(StatsContext, 0) as StatsContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_prog;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterProg) {
	 		listener.enterProg(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitProg) {
	 		listener.exitProg(this);
		}
	}
}


export class StatsContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_stats;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterStats) {
	 		listener.enterStats(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitStats) {
	 		listener.exitStats(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public schema(): SchemaContext {
		return this.getTypedRuleContext(SchemaContext, 0) as SchemaContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_stat;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterStat) {
	 		listener.enterStat(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitStat) {
	 		listener.exitStat(this);
		}
	}
}


export class SchemaContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECLARE(): TerminalNode {
		return this.getToken(SalGrammarParser.DECLARE, 0);
	}
	public SCHEMA(): TerminalNode {
		return this.getToken(SalGrammarParser.SCHEMA, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_schema;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterSchema) {
	 		listener.enterSchema(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitSchema) {
	 		listener.exitSchema(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_block;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterBlock) {
	 		listener.enterBlock(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitBlock) {
	 		listener.exitBlock(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(SalGrammarParser.ID, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public INT(): TerminalNode {
		return this.getToken(SalGrammarParser.INT, 0);
	}
	public WS(): TerminalNode {
		return this.getToken(SalGrammarParser.WS, 0);
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_expr;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterExpr) {
	 		listener.enterExpr(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitExpr) {
	 		listener.exitExpr(this);
		}
	}
}
