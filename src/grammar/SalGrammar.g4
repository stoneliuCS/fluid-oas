grammar SalGrammar;
import SalCommonTokens;

// Begin parsing here.
prog: stats ;

stats: (stat ';')* ; // Match zero or more ';' terminated statements.

stat: block 
    | expr
    ;

block: '{' stat* '}';

expr: ID '(' expr ')'
    | expr '[' expr ']'
    | INT
    ;
