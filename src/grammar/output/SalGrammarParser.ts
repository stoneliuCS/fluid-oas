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
	public static readonly ID = 4;
	public static readonly INT = 5;
	public static readonly NEWLINE = 6;
	public static readonly WS = 7;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_stats = 1;
	public static readonly RULE_stat = 2;
	public static readonly RULE_block = 3;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'{'", "'}'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             "ID", "INT", 
                                                             "NEWLINE", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "stats", "stat", "block",
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
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 9;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 8;
				this.stat();
				}
				}
				this.state = 11;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===2);
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
			this.state = 18;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 13;
				this.stat();
				this.state = 14;
				this.match(SalGrammarParser.T__0);
				}
				}
				this.state = 20;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
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
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let localctx: StatContext = new StatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, SalGrammarParser.RULE_stat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 21;
			this.block();
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
		this.enterRule(localctx, 6, SalGrammarParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 23;
			this.match(SalGrammarParser.T__1);
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 24;
				this.stat();
				}
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 30;
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

	public static readonly _serializedATN: number[] = [4,1,7,33,2,0,7,0,2,1,
	7,1,2,2,7,2,2,3,7,3,1,0,4,0,10,8,0,11,0,12,0,11,1,1,1,1,1,1,5,1,17,8,1,
	10,1,12,1,20,9,1,1,2,1,2,1,3,1,3,5,3,26,8,3,10,3,12,3,29,9,3,1,3,1,3,1,
	3,0,0,4,0,2,4,6,0,0,31,0,9,1,0,0,0,2,18,1,0,0,0,4,21,1,0,0,0,6,23,1,0,0,
	0,8,10,3,4,2,0,9,8,1,0,0,0,10,11,1,0,0,0,11,9,1,0,0,0,11,12,1,0,0,0,12,
	1,1,0,0,0,13,14,3,4,2,0,14,15,5,1,0,0,15,17,1,0,0,0,16,13,1,0,0,0,17,20,
	1,0,0,0,18,16,1,0,0,0,18,19,1,0,0,0,19,3,1,0,0,0,20,18,1,0,0,0,21,22,3,
	6,3,0,22,5,1,0,0,0,23,27,5,2,0,0,24,26,3,4,2,0,25,24,1,0,0,0,26,29,1,0,
	0,0,27,25,1,0,0,0,27,28,1,0,0,0,28,30,1,0,0,0,29,27,1,0,0,0,30,31,5,3,0,
	0,31,7,1,0,0,0,3,11,18,27];

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
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
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
