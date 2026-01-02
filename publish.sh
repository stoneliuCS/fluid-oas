#!/bin/bash
bun run build-docs
cd packages/fluid-oas
npm run build 
npm version patch 
npm publish --access public 
