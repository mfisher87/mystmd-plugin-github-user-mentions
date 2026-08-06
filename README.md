# MySTMD plugin: GitHub User Mentions

This plugin adds syntax for mentioning GitHub users in MyST documents.


## The problem

The typical syntax for mentioning GitHub users in issues or pull requests (`@username`)
conflicts with the MyST syntax for citations (`@citationId`).


## How we solve it

We accept multiple syntaxes for GitHub user mentions:

* Citation with prefix: `@gh:username`
* Role: ``{gh}`username```
