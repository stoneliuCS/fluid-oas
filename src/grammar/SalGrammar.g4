grammar SalGrammar;
import SalCommonTokens;

// Begin parsing here.
prog: sal ;

sal : (code)* ; // Match on multiple schema

// The sal code is one of:
// a schema declaration
// a route declaration
// a type declaration
// whitespace
code : schema
     | route
     | type
     | WS
     ;

schema: DECLARE SCHEMA ID schema_definition ';' ;

route: DECLARE ROUTE ID STRING ';' ;

type: DECLARE TYPE ID ';' ;

schema_definition: '{' pair (',' pair)* '}' // Match a sequence inside brackets like pair, pair, pair, ...
                 | '{' '}'
                 ;

pair: STRING ':' schema_type ; // A Pair inside the object is a key value mapping.

schema_type : NUMBER_TYPE
            | STRING_TYPE
            | BOOL_TYPE
            | schema_definition // recursive type
            ;
