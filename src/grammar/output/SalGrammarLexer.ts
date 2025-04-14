// Generated from ./SalGrammar.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class SalGrammarLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly ID = 4;
	public static readonly INT = 5;
	public static readonly NEWLINE = 6;
	public static readonly WS = 7;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: string[] = [ null, "';'", "'{'", "'}'" ];
	public static readonly symbolicNames: string[] = [ null, null, null, null, 
                                                    "ID", "INT", "NEWLINE", 
                                                    "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "ID", "INT", "NEWLINE", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, SalGrammarLexer._ATN, SalGrammarLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "SalGrammar.g4"; }

	public get literalNames(): (string | null)[] { return SalGrammarLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return SalGrammarLexer.symbolicNames; }
	public get ruleNames(): string[] { return SalGrammarLexer.ruleNames; }

	public get serializedATN(): number[] { return SalGrammarLexer._serializedATN; }

	public get channelNames(): string[] { return SalGrammarLexer.channelNames; }

	public get modeNames(): string[] { return SalGrammarLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,7,43,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,1,0,1,1,1,1,1,2,1,
	2,1,3,4,3,23,8,3,11,3,12,3,24,1,4,4,4,28,8,4,11,4,12,4,29,1,5,3,5,33,8,
	5,1,5,1,5,1,6,4,6,38,8,6,11,6,12,6,39,1,6,1,6,0,0,7,1,1,3,2,5,3,7,4,9,5,
	11,6,13,7,1,0,3,2,0,65,90,97,122,1,0,48,57,2,0,9,9,32,32,46,0,1,1,0,0,0,
	0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,
	0,1,15,1,0,0,0,3,17,1,0,0,0,5,19,1,0,0,0,7,22,1,0,0,0,9,27,1,0,0,0,11,32,
	1,0,0,0,13,37,1,0,0,0,15,16,5,59,0,0,16,2,1,0,0,0,17,18,5,123,0,0,18,4,
	1,0,0,0,19,20,5,125,0,0,20,6,1,0,0,0,21,23,7,0,0,0,22,21,1,0,0,0,23,24,
	1,0,0,0,24,22,1,0,0,0,24,25,1,0,0,0,25,8,1,0,0,0,26,28,7,1,0,0,27,26,1,
	0,0,0,28,29,1,0,0,0,29,27,1,0,0,0,29,30,1,0,0,0,30,10,1,0,0,0,31,33,5,13,
	0,0,32,31,1,0,0,0,32,33,1,0,0,0,33,34,1,0,0,0,34,35,5,10,0,0,35,12,1,0,
	0,0,36,38,7,2,0,0,37,36,1,0,0,0,38,39,1,0,0,0,39,37,1,0,0,0,39,40,1,0,0,
	0,40,41,1,0,0,0,41,42,6,6,0,0,42,14,1,0,0,0,5,0,24,29,32,39,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SalGrammarLexer.__ATN) {
			SalGrammarLexer.__ATN = new ATNDeserializer().deserialize(SalGrammarLexer._serializedATN);
		}

		return SalGrammarLexer.__ATN;
	}


	static DecisionsToDFA = SalGrammarLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}