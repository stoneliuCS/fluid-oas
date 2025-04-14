lexer grammar SalCommonTokens;

// TERMINALS

// match identifiers
ID : [a-zA-Z]+ ; 

// match integers
INT : [0-9]+ ; 

// match strings including double quotes inside strings
STRING:'"' (ESC|.)*?'"' ;
fragment
ESC : '\\"' | '\\\\' ; // 2-char sequences \" and \\

// Comment matching for both // and /**/
LINE_COMMENT : '//' .*? '\r'? '\n' -> skip ; // Match "//" stuff '\n'
COMMENT : '/*' .*? '*/' -> skip ; // Match "/*" stuff "*/"

// Match and discard all whitespace.
WS : [ \t\r\n]+ -> skip ; // match 1-or-more whitespace but discard
