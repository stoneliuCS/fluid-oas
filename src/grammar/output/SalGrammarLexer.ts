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

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: string[] = [ null, "';'", "'{'", "'}'", 
                                                   "'('", "')'", "'['", 
                                                   "']'", null, null, null, 
                                                   null, "'DECLARE'", "'SCHEMA'" ];
	public static readonly symbolicNames: string[] = [ null, null, null, null, 
                                                    null, null, null, null, 
                                                    "ID", "INT", "NEWLINE", 
                                                    "WS", "DECLARE", "SCHEMA" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "ID", "INT", "NEWLINE", 
		"WS", "DECLARE", "SCHEMA",
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

	public static readonly _serializedATN: number[] = [4,0,13,78,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,
	9,2,10,7,10,2,11,7,11,2,12,7,12,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,
	1,5,1,5,1,6,1,6,1,7,4,7,43,8,7,11,7,12,7,44,1,8,4,8,48,8,8,11,8,12,8,49,
	1,9,3,9,53,8,9,1,9,1,9,1,10,4,10,58,8,10,11,10,12,10,59,1,10,1,10,1,11,
	1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,0,
	0,13,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,1,
	0,3,2,0,65,90,97,122,1,0,48,57,2,0,9,9,32,32,81,0,1,1,0,0,0,0,3,1,0,0,0,
	0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,
	0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,1,
	27,1,0,0,0,3,29,1,0,0,0,5,31,1,0,0,0,7,33,1,0,0,0,9,35,1,0,0,0,11,37,1,
	0,0,0,13,39,1,0,0,0,15,42,1,0,0,0,17,47,1,0,0,0,19,52,1,0,0,0,21,57,1,0,
	0,0,23,63,1,0,0,0,25,71,1,0,0,0,27,28,5,59,0,0,28,2,1,0,0,0,29,30,5,123,
	0,0,30,4,1,0,0,0,31,32,5,125,0,0,32,6,1,0,0,0,33,34,5,40,0,0,34,8,1,0,0,
	0,35,36,5,41,0,0,36,10,1,0,0,0,37,38,5,91,0,0,38,12,1,0,0,0,39,40,5,93,
	0,0,40,14,1,0,0,0,41,43,7,0,0,0,42,41,1,0,0,0,43,44,1,0,0,0,44,42,1,0,0,
	0,44,45,1,0,0,0,45,16,1,0,0,0,46,48,7,1,0,0,47,46,1,0,0,0,48,49,1,0,0,0,
	49,47,1,0,0,0,49,50,1,0,0,0,50,18,1,0,0,0,51,53,5,13,0,0,52,51,1,0,0,0,
	52,53,1,0,0,0,53,54,1,0,0,0,54,55,5,10,0,0,55,20,1,0,0,0,56,58,7,2,0,0,
	57,56,1,0,0,0,58,59,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,61,1,0,0,0,61,
	62,6,10,0,0,62,22,1,0,0,0,63,64,5,68,0,0,64,65,5,69,0,0,65,66,5,67,0,0,
	66,67,5,76,0,0,67,68,5,65,0,0,68,69,5,82,0,0,69,70,5,69,0,0,70,24,1,0,0,
	0,71,72,5,83,0,0,72,73,5,67,0,0,73,74,5,72,0,0,74,75,5,69,0,0,75,76,5,77,
	0,0,76,77,5,65,0,0,77,26,1,0,0,0,5,0,44,49,52,59,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SalGrammarLexer.__ATN) {
			SalGrammarLexer.__ATN = new ATNDeserializer().deserialize(SalGrammarLexer._serializedATN);
		}

		return SalGrammarLexer.__ATN;
	}


	static DecisionsToDFA = SalGrammarLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}