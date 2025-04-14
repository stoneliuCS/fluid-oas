grammar SalGrammar;
import SalCommonTokens;

// Begin parsing here.
prog: stats ;

// Match zero or more ';' terminated statements.
stats: (stat ';')* ; 

// A Statement can be one of schema or block
stat: schema 
    | expr
    | block
    ;

schema: DECLARE SCHEMA '{' expr '}'
      | DECLARE SCHEMA '{' '}'
      ;

block: '{' stat* '}';

expr: ID '(' expr ')'
    | expr '[' expr ']'
    | INT
    | WS
    ;
