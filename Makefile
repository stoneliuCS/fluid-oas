# Run all tests.
test:
	bun test

# Generate lexing and parsing boilerplate from the ANTLR grammar.
generate:
	antlr4 -Dlanguage=TypeScript -visitor -Werror $(CURDIR)/src/grammar/SalGrammar.g4 -o $(CURDIR)/src/lexer
