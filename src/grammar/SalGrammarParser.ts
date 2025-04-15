// Generated from /Users/stoneliu/Desktop/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0
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
	public static readonly SCHEMA = 6;
	public static readonly DECLARE = 7;
	public static readonly NUMBER_TYPE = 8;
	public static readonly STRING_TYPE = 9;
	public static readonly BOOL_TYPE = 10;
	public static readonly ID = 11;
	public static readonly INT = 12;
	public static readonly STRING = 13;
	public static readonly LINE_COMMENT = 14;
	public static readonly COMMENT = 15;
	public static readonly WS = 16;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_sal = 1;
	public static readonly RULE_code = 2;
	public static readonly RULE_schema = 3;
	public static readonly RULE_object = 4;
	public static readonly RULE_pair = 5;
	public static readonly RULE_type = 6;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'{'", "','", 
                                                            "'}'", "':'", 
                                                            "'SCHEMA'", 
                                                            "'DECLARE'", 
                                                            "'number'", 
                                                            "'string'", 
                                                            "'bool'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "SCHEMA", "DECLARE", 
                                                             "NUMBER_TYPE", 
                                                             "STRING_TYPE", 
                                                             "BOOL_TYPE", 
                                                             "ID", "INT", 
                                                             "STRING", "LINE_COMMENT", 
                                                             "COMMENT", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "sal", "code", "schema", "object", "pair", "type",
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
			this.state = 14;
			this.sal();
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
	public sal(): SalContext {
		let localctx: SalContext = new SalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, SalGrammarParser.RULE_sal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 16;
				this.code();
				}
				}
				this.state = 21;
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
	public code(): CodeContext {
		let localctx: CodeContext = new CodeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, SalGrammarParser.RULE_code);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 22;
			this.schema();
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
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 24;
			this.match(SalGrammarParser.DECLARE);
			this.state = 25;
			this.match(SalGrammarParser.SCHEMA);
			this.state = 26;
			this.match(SalGrammarParser.ID);
			this.state = 27;
			this.object();
			this.state = 28;
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
	public object(): ObjectContext {
		let localctx: ObjectContext = new ObjectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, SalGrammarParser.RULE_object);
		let _la: number;
		try {
			this.state = 43;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 30;
				this.match(SalGrammarParser.T__1);
				this.state = 31;
				this.pair();
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===3) {
					{
					{
					this.state = 32;
					this.match(SalGrammarParser.T__2);
					this.state = 33;
					this.pair();
					}
					}
					this.state = 38;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 39;
				this.match(SalGrammarParser.T__3);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 41;
				this.match(SalGrammarParser.T__1);
				this.state = 42;
				this.match(SalGrammarParser.T__3);
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
	public pair(): PairContext {
		let localctx: PairContext = new PairContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, SalGrammarParser.RULE_pair);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 45;
			this.match(SalGrammarParser.STRING);
			this.state = 46;
			this.match(SalGrammarParser.T__4);
			this.state = 47;
			this.type_();
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
	public type_(): TypeContext {
		let localctx: TypeContext = new TypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, SalGrammarParser.RULE_type);
		try {
			this.state = 53;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 49;
				this.match(SalGrammarParser.NUMBER_TYPE);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 50;
				this.match(SalGrammarParser.STRING_TYPE);
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 51;
				this.match(SalGrammarParser.BOOL_TYPE);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 52;
				this.object();
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

	public static readonly _serializedATN: number[] = [4,1,16,56,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,1,0,1,1,5,1,18,8,1,10,
	1,12,1,21,9,1,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,5,4,35,8,
	4,10,4,12,4,38,9,4,1,4,1,4,1,4,1,4,3,4,44,8,4,1,5,1,5,1,5,1,5,1,6,1,6,1,
	6,1,6,3,6,54,8,6,1,6,0,0,7,0,2,4,6,8,10,12,0,0,54,0,14,1,0,0,0,2,19,1,0,
	0,0,4,22,1,0,0,0,6,24,1,0,0,0,8,43,1,0,0,0,10,45,1,0,0,0,12,53,1,0,0,0,
	14,15,3,2,1,0,15,1,1,0,0,0,16,18,3,4,2,0,17,16,1,0,0,0,18,21,1,0,0,0,19,
	17,1,0,0,0,19,20,1,0,0,0,20,3,1,0,0,0,21,19,1,0,0,0,22,23,3,6,3,0,23,5,
	1,0,0,0,24,25,5,7,0,0,25,26,5,6,0,0,26,27,5,11,0,0,27,28,3,8,4,0,28,29,
	5,1,0,0,29,7,1,0,0,0,30,31,5,2,0,0,31,36,3,10,5,0,32,33,5,3,0,0,33,35,3,
	10,5,0,34,32,1,0,0,0,35,38,1,0,0,0,36,34,1,0,0,0,36,37,1,0,0,0,37,39,1,
	0,0,0,38,36,1,0,0,0,39,40,5,4,0,0,40,44,1,0,0,0,41,42,5,2,0,0,42,44,5,4,
	0,0,43,30,1,0,0,0,43,41,1,0,0,0,44,9,1,0,0,0,45,46,5,13,0,0,46,47,5,5,0,
	0,47,48,3,12,6,0,48,11,1,0,0,0,49,54,5,8,0,0,50,54,5,9,0,0,51,54,5,10,0,
	0,52,54,3,8,4,0,53,49,1,0,0,0,53,50,1,0,0,0,53,51,1,0,0,0,53,52,1,0,0,0,
	54,13,1,0,0,0,4,19,36,43,53];

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
	public sal(): SalContext {
		return this.getTypedRuleContext(SalContext, 0) as SalContext;
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


export class SalContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public code_list(): CodeContext[] {
		return this.getTypedRuleContexts(CodeContext) as CodeContext[];
	}
	public code(i: number): CodeContext {
		return this.getTypedRuleContext(CodeContext, i) as CodeContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_sal;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterSal) {
	 		listener.enterSal(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitSal) {
	 		listener.exitSal(this);
		}
	}
}


export class CodeContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public schema(): SchemaContext {
		return this.getTypedRuleContext(SchemaContext, 0) as SchemaContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_code;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterCode) {
	 		listener.enterCode(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitCode) {
	 		listener.exitCode(this);
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
	public ID(): TerminalNode {
		return this.getToken(SalGrammarParser.ID, 0);
	}
	public object(): ObjectContext {
		return this.getTypedRuleContext(ObjectContext, 0) as ObjectContext;
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


export class ObjectContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pair_list(): PairContext[] {
		return this.getTypedRuleContexts(PairContext) as PairContext[];
	}
	public pair(i: number): PairContext {
		return this.getTypedRuleContext(PairContext, i) as PairContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_object;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterObject) {
	 		listener.enterObject(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitObject) {
	 		listener.exitObject(this);
		}
	}
}


export class PairContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(SalGrammarParser.STRING, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_pair;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterPair) {
	 		listener.enterPair(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitPair) {
	 		listener.exitPair(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMBER_TYPE(): TerminalNode {
		return this.getToken(SalGrammarParser.NUMBER_TYPE, 0);
	}
	public STRING_TYPE(): TerminalNode {
		return this.getToken(SalGrammarParser.STRING_TYPE, 0);
	}
	public BOOL_TYPE(): TerminalNode {
		return this.getToken(SalGrammarParser.BOOL_TYPE, 0);
	}
	public object(): ObjectContext {
		return this.getTypedRuleContext(ObjectContext, 0) as ObjectContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_type;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterType) {
	 		listener.enterType(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitType) {
	 		listener.exitType(this);
		}
	}
}
