[TS]andbox
---
A TypeScript code sandbox with Jest, ESLint, Prettier.

```sh
npm t              // run tests for all problems
npm t str          // run tests for all problems that match "str"
npm run lint       // lint all problems via eslint + prettier
npm run format     // autofix all problems via eslint + prettier
npm run check      // typecheck all problems via typescript
npm run precommit  // run all pre-commit checks (format + typecheck)
npm run build      // build all problems into ./build directory
npm run start str  // open problem matching "str" in vim, with tests
                   // running automatically in a lefthand pane
                   // if problem does not yet exist, it will be created
```

For convenience, you may be interested in adding these aliases to your .bashrc/.zshrc (or wherever you maintain shell aliases):

```sh
alias ns="npm start"
alias ni="npm install"
alias nu="npm uninstall"
alias nt="npm test"
alias nl="npm run lint"
alias nf="npm run format"
alias nc="npm run lint"
alias np="npm run precommit"
alias ng="npm run githook"
alias nb="npm run build"
```

Then,

```
ns anagrams          // -> edit the anagrams problem with adjacent test run
ns ana<TAB><ENTER>   // -> edit the anagrams problem with adjacent test run
// etc. for other commands
```

Tab completion works because this longer form of input works as expected:

```sh
ns anagrams.spec.ts  // -> edit the anagrams problem with adjacent test run
```

