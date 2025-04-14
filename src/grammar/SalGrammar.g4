grammar SalGrammar;
import SalCommonTokens;

// Begin parsing here.
prog: stats ;

// Match zero or more ';' terminated statements.
stats: (stat ';')* ; 

stat: ID;
