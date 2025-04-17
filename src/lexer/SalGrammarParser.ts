// Generated from /Users/stoneliu/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0
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
import SalGrammarVisitor from "./SalGrammarVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class SalGrammarParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly DECLARE = 6;
	public static readonly SCHEMA = 7;
	public static readonly ROUTE = 8;
	public static readonly TYPE = 9;
	public static readonly NUMBER_TYPE = 10;
	public static readonly STRING_TYPE = 11;
	public static readonly BOOL_TYPE = 12;
	public static readonly ID = 13;
	public static readonly INT = 14;
	public static readonly STRING = 15;
	public static readonly LINE_COMMENT = 16;
	public static readonly COMMENT = 17;
	public static readonly WS = 18;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_sal = 1;
	public static readonly RULE_code = 2;
	public static readonly RULE_schema = 3;
	public static readonly RULE_route = 4;
	public static readonly RULE_type = 5;
	public static readonly RULE_schema_definition = 6;
	public static readonly RULE_pair = 7;
	public static readonly RULE_schema_type = 8;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'{'", "','", 
                                                            "'}'", "':'", 
                                                            "'DECLARE'", 
                                                            "'SCHEMA'", 
                                                            "'ROUTE'", "'TYPE'", 
                                                            "'number'", 
                                                            "'string'", 
                                                            "'bool'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "DECLARE", 
                                                             "SCHEMA", "ROUTE", 
                                                             "TYPE", "NUMBER_TYPE", 
                                                             "STRING_TYPE", 
                                                             "BOOL_TYPE", 
                                                             "ID", "INT", 
                                                             "STRING", "LINE_COMMENT", 
                                                             "COMMENT", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "sal", "code", "schema", "route", "type", "schema_definition", 
		"pair", "schema_type",
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
			this.state = 18;
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
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===6 || _la===18) {
				{
				{
				this.state = 20;
				this.code();
				}
				}
				this.state = 25;
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
			this.state = 30;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 26;
				this.schema();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 27;
				this.route();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 28;
				this.type_();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 29;
				this.match(SalGrammarParser.WS);
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
	public schema(): SchemaContext {
		let localctx: SchemaContext = new SchemaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, SalGrammarParser.RULE_schema);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 32;
			this.match(SalGrammarParser.DECLARE);
			this.state = 33;
			this.match(SalGrammarParser.SCHEMA);
			this.state = 34;
			this.match(SalGrammarParser.ID);
			this.state = 35;
			this.schema_definition();
			this.state = 36;
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
	public route(): RouteContext {
		let localctx: RouteContext = new RouteContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, SalGrammarParser.RULE_route);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 38;
			this.match(SalGrammarParser.DECLARE);
			this.state = 39;
			this.match(SalGrammarParser.ROUTE);
			this.state = 40;
			this.match(SalGrammarParser.ID);
			this.state = 41;
			this.match(SalGrammarParser.STRING);
			this.state = 42;
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
	public type_(): TypeContext {
		let localctx: TypeContext = new TypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, SalGrammarParser.RULE_type);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 44;
			this.match(SalGrammarParser.DECLARE);
			this.state = 45;
			this.match(SalGrammarParser.TYPE);
			this.state = 46;
			this.match(SalGrammarParser.ID);
			this.state = 47;
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
	public schema_definition(): Schema_definitionContext {
		let localctx: Schema_definitionContext = new Schema_definitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, SalGrammarParser.RULE_schema_definition);
		let _la: number;
		try {
			this.state = 62;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 49;
				this.match(SalGrammarParser.T__1);
				this.state = 50;
				this.pair();
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===3) {
					{
					{
					this.state = 51;
					this.match(SalGrammarParser.T__2);
					this.state = 52;
					this.pair();
					}
					}
					this.state = 57;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 58;
				this.match(SalGrammarParser.T__3);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 60;
				this.match(SalGrammarParser.T__1);
				this.state = 61;
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
		this.enterRule(localctx, 14, SalGrammarParser.RULE_pair);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 64;
			this.match(SalGrammarParser.STRING);
			this.state = 65;
			this.match(SalGrammarParser.T__4);
			this.state = 66;
			this.schema_type();
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
	public schema_type(): Schema_typeContext {
		let localctx: Schema_typeContext = new Schema_typeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, SalGrammarParser.RULE_schema_type);
		try {
			this.state = 72;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 68;
				this.match(SalGrammarParser.NUMBER_TYPE);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 69;
				this.match(SalGrammarParser.STRING_TYPE);
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 70;
				this.match(SalGrammarParser.BOOL_TYPE);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 71;
				this.schema_definition();
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

	public static readonly _serializedATN: number[] = [4,1,18,75,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,1,0,1,0,1,
	1,5,1,22,8,1,10,1,12,1,25,9,1,1,2,1,2,1,2,1,2,3,2,31,8,2,1,3,1,3,1,3,1,
	3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,5,
	6,54,8,6,10,6,12,6,57,9,6,1,6,1,6,1,6,1,6,3,6,63,8,6,1,7,1,7,1,7,1,7,1,
	8,1,8,1,8,1,8,3,8,73,8,8,1,8,0,0,9,0,2,4,6,8,10,12,14,16,0,0,74,0,18,1,
	0,0,0,2,23,1,0,0,0,4,30,1,0,0,0,6,32,1,0,0,0,8,38,1,0,0,0,10,44,1,0,0,0,
	12,62,1,0,0,0,14,64,1,0,0,0,16,72,1,0,0,0,18,19,3,2,1,0,19,1,1,0,0,0,20,
	22,3,4,2,0,21,20,1,0,0,0,22,25,1,0,0,0,23,21,1,0,0,0,23,24,1,0,0,0,24,3,
	1,0,0,0,25,23,1,0,0,0,26,31,3,6,3,0,27,31,3,8,4,0,28,31,3,10,5,0,29,31,
	5,18,0,0,30,26,1,0,0,0,30,27,1,0,0,0,30,28,1,0,0,0,30,29,1,0,0,0,31,5,1,
	0,0,0,32,33,5,6,0,0,33,34,5,7,0,0,34,35,5,13,0,0,35,36,3,12,6,0,36,37,5,
	1,0,0,37,7,1,0,0,0,38,39,5,6,0,0,39,40,5,8,0,0,40,41,5,13,0,0,41,42,5,15,
	0,0,42,43,5,1,0,0,43,9,1,0,0,0,44,45,5,6,0,0,45,46,5,9,0,0,46,47,5,13,0,
	0,47,48,5,1,0,0,48,11,1,0,0,0,49,50,5,2,0,0,50,55,3,14,7,0,51,52,5,3,0,
	0,52,54,3,14,7,0,53,51,1,0,0,0,54,57,1,0,0,0,55,53,1,0,0,0,55,56,1,0,0,
	0,56,58,1,0,0,0,57,55,1,0,0,0,58,59,5,4,0,0,59,63,1,0,0,0,60,61,5,2,0,0,
	61,63,5,4,0,0,62,49,1,0,0,0,62,60,1,0,0,0,63,13,1,0,0,0,64,65,5,15,0,0,
	65,66,5,5,0,0,66,67,3,16,8,0,67,15,1,0,0,0,68,73,5,10,0,0,69,73,5,11,0,
	0,70,73,5,12,0,0,71,73,3,12,6,0,72,68,1,0,0,0,72,69,1,0,0,0,72,70,1,0,0,
	0,72,71,1,0,0,0,73,17,1,0,0,0,5,23,30,55,62,72];

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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitSal) {
			return visitor.visitSal(this);
		} else {
			return visitor.visitChildren(this);
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
	public route(): RouteContext {
		return this.getTypedRuleContext(RouteContext, 0) as RouteContext;
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public WS(): TerminalNode {
		return this.getToken(SalGrammarParser.WS, 0);
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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitCode) {
			return visitor.visitCode(this);
		} else {
			return visitor.visitChildren(this);
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
	public schema_definition(): Schema_definitionContext {
		return this.getTypedRuleContext(Schema_definitionContext, 0) as Schema_definitionContext;
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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitSchema) {
			return visitor.visitSchema(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RouteContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECLARE(): TerminalNode {
		return this.getToken(SalGrammarParser.DECLARE, 0);
	}
	public ROUTE(): TerminalNode {
		return this.getToken(SalGrammarParser.ROUTE, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(SalGrammarParser.ID, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(SalGrammarParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_route;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterRoute) {
	 		listener.enterRoute(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitRoute) {
	 		listener.exitRoute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitRoute) {
			return visitor.visitRoute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parser?: SalGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECLARE(): TerminalNode {
		return this.getToken(SalGrammarParser.DECLARE, 0);
	}
	public TYPE(): TerminalNode {
		return this.getToken(SalGrammarParser.TYPE, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(SalGrammarParser.ID, 0);
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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitType) {
			return visitor.visitType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Schema_definitionContext extends ParserRuleContext {
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
    	return SalGrammarParser.RULE_schema_definition;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterSchema_definition) {
	 		listener.enterSchema_definition(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitSchema_definition) {
	 		listener.exitSchema_definition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitSchema_definition) {
			return visitor.visitSchema_definition(this);
		} else {
			return visitor.visitChildren(this);
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
	public schema_type(): Schema_typeContext {
		return this.getTypedRuleContext(Schema_typeContext, 0) as Schema_typeContext;
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
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitPair) {
			return visitor.visitPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Schema_typeContext extends ParserRuleContext {
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
	public schema_definition(): Schema_definitionContext {
		return this.getTypedRuleContext(Schema_definitionContext, 0) as Schema_definitionContext;
	}
    public get ruleIndex(): number {
    	return SalGrammarParser.RULE_schema_type;
	}
	public enterRule(listener: SalGrammarListener): void {
	    if(listener.enterSchema_type) {
	 		listener.enterSchema_type(this);
		}
	}
	public exitRule(listener: SalGrammarListener): void {
	    if(listener.exitSchema_type) {
	 		listener.exitSchema_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SalGrammarVisitor<Result>): Result {
		if (visitor.visitSchema_type) {
			return visitor.visitSchema_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
