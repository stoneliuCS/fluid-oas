// Generated from /Users/stoneliu/Desktop/Playground/sal/src/grammar/SalGrammar.g4 by ANTLR 4.12.0
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
	public static readonly ID = 2;
	public static readonly INT = 3;
	public static readonly STRING = 4;
	public static readonly LINE_COMMENT = 5;
	public static readonly COMMENT = 6;
	public static readonly WS = 7;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: string[] = [ null, "';'" ];
	public static readonly symbolicNames: string[] = [ null, null, "ID", "INT", 
                                                    "STRING", "LINE_COMMENT", 
                                                    "COMMENT", "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "ID", "INT", "STRING", "ESC", "LINE_COMMENT", "COMMENT", "WS",
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

	public static readonly _serializedATN: number[] = [4,0,7,82,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,1,0,1,1,4,
	1,21,8,1,11,1,12,1,22,1,2,4,2,26,8,2,11,2,12,2,27,1,3,1,3,1,3,5,3,33,8,
	3,10,3,12,3,36,9,3,1,3,1,3,1,4,1,4,1,4,1,4,3,4,44,8,4,1,5,1,5,1,5,1,5,5,
	5,50,8,5,10,5,12,5,53,9,5,1,5,3,5,56,8,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,
	6,5,6,66,8,6,10,6,12,6,69,9,6,1,6,1,6,1,6,1,6,1,6,1,7,4,7,77,8,7,11,7,12,
	7,78,1,7,1,7,3,34,51,67,0,8,1,1,3,2,5,3,7,4,9,0,11,5,13,6,15,7,1,0,3,2,
	0,65,90,97,122,1,0,48,57,3,0,9,10,13,13,32,32,89,0,1,1,0,0,0,0,3,1,0,0,
	0,0,5,1,0,0,0,0,7,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,17,1,
	0,0,0,3,20,1,0,0,0,5,25,1,0,0,0,7,29,1,0,0,0,9,43,1,0,0,0,11,45,1,0,0,0,
	13,61,1,0,0,0,15,76,1,0,0,0,17,18,5,59,0,0,18,2,1,0,0,0,19,21,7,0,0,0,20,
	19,1,0,0,0,21,22,1,0,0,0,22,20,1,0,0,0,22,23,1,0,0,0,23,4,1,0,0,0,24,26,
	7,1,0,0,25,24,1,0,0,0,26,27,1,0,0,0,27,25,1,0,0,0,27,28,1,0,0,0,28,6,1,
	0,0,0,29,34,5,34,0,0,30,33,3,9,4,0,31,33,9,0,0,0,32,30,1,0,0,0,32,31,1,
	0,0,0,33,36,1,0,0,0,34,35,1,0,0,0,34,32,1,0,0,0,35,37,1,0,0,0,36,34,1,0,
	0,0,37,38,5,34,0,0,38,8,1,0,0,0,39,40,5,92,0,0,40,44,5,34,0,0,41,42,5,92,
	0,0,42,44,5,92,0,0,43,39,1,0,0,0,43,41,1,0,0,0,44,10,1,0,0,0,45,46,5,47,
	0,0,46,47,5,47,0,0,47,51,1,0,0,0,48,50,9,0,0,0,49,48,1,0,0,0,50,53,1,0,
	0,0,51,52,1,0,0,0,51,49,1,0,0,0,52,55,1,0,0,0,53,51,1,0,0,0,54,56,5,13,
	0,0,55,54,1,0,0,0,55,56,1,0,0,0,56,57,1,0,0,0,57,58,5,10,0,0,58,59,1,0,
	0,0,59,60,6,5,0,0,60,12,1,0,0,0,61,62,5,47,0,0,62,63,5,42,0,0,63,67,1,0,
	0,0,64,66,9,0,0,0,65,64,1,0,0,0,66,69,1,0,0,0,67,68,1,0,0,0,67,65,1,0,0,
	0,68,70,1,0,0,0,69,67,1,0,0,0,70,71,5,42,0,0,71,72,5,47,0,0,72,73,1,0,0,
	0,73,74,6,6,0,0,74,14,1,0,0,0,75,77,7,2,0,0,76,75,1,0,0,0,77,78,1,0,0,0,
	78,76,1,0,0,0,78,79,1,0,0,0,79,80,1,0,0,0,80,81,6,7,0,0,81,16,1,0,0,0,10,
	0,22,27,32,34,43,51,55,67,78,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SalGrammarLexer.__ATN) {
			SalGrammarLexer.__ATN = new ATNDeserializer().deserialize(SalGrammarLexer._serializedATN);
		}

		return SalGrammarLexer.__ATN;
	}


	static DecisionsToDFA = SalGrammarLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}