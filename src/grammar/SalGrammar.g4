grammar SalGrammar;
import SalCommonTokens;

// Begin parsing here.
prog: sal ;

sal : (code)* ; // Match on multiple schema

code : schema ;

schema: DECLARE SCHEMA ID object ';' ;

object: '{' pair (',' pair)* '}' // Match a sequence inside brackets like pair, pair, pair, ...
      | '{' '}'
      ;

pair: STRING ':' type ; // A Pair inside the object is a key value mapping.

type : NUMBER_TYPE
     | STRING_TYPE
     | BOOL_TYPE
     | object // recursive type
     ;
