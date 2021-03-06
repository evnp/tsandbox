[TS]andbox
---
A TypeScript code sandbox with Jest, ESLint, Prettier.

Perfect for coding puzzles and interview problems. Test boilerplate is auto-generated upon problem creation, enabling an incredibly tight dev feedback loop through Jest. To get started:

```sh
git clone git@github.com:evnp/tsandbox.git && cd tsandbox && npm install
npm start nameofyourproblem    # eg. "anagrams"
```

Note: only Vim is supported currently -- please open a [pull request](https://github.com/evnp/tsandbox/pulls) if you'd like to integrate other text editors!

In action:

![demo](https://raw.githubusercontent.com/evnp/tsandbox/main/tsandbox.gif)

Full usage:

```sh
npm t              # run tests for all problems
npm t str          # run tests for all problems that match "str"
npm run lint       # lint all problems via eslint + prettier
npm run format     # autofix all problems via eslint + prettier
npm run check      # typecheck all problems via typescript
npm run precommit  # run all pre-commit checks (format + typecheck)
npm run githook    # install pre-commit git hook to run above automatically
npm run build      # build all problems into ./build directory
npm start str      # open problem matching "str" in vim, with tests
                   # running automatically in a lefthand pane
                   # if problem does not yet exist, it will be created
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
alias nb="npm run build"
```

Then,

```sh
ns anagrams          # -> edit the anagrams problem with adjacent test run
ns ana<TAB><ENTER>   # -> edit the anagrams problem with adjacent test run
# etc. for other commands
```

Tab completion works because this longer form of input works as expected:

```sh
ns anagrams.spec.ts  # -> edit the anagrams problem with adjacent test run
```

