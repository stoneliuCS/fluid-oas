grammar SalGrammar;
import SalCommonTokens;

stats: (stat ';')* ; // Match zero or more ';' terminated statements.
stat: block ;
block: '{' stat* '}';
