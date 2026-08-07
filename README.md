# MySTMD plugin: GitHub User Mentions

This plugin adds syntax for mentioning GitHub users in MyST documents.


## The problem

The typical syntax for mentioning GitHub users in issues or pull requests (`@username`)
conflicts with the MyST syntax for citations (`@citationId`).


## How we solve it

We accept multiple syntaxes for GitHub user mentions:

* Citation with prefix: `@gh:username`
* Role: `` {gh}`username` ``


## Usage

### Install the plugin

Include the following config in your `myst.yml`:

```yaml
project:
  # ...
  plugins:
    - "https://raw.githubusercontent.com/mfisher87/mystmd-plugin-github-user-mentions/refs/heads/main/src/index.mjs"
```


### Configure the style

> [!NOTE]
>
> This is a workaround for what I believe are MyST limitations which make it impossible
> (?) to style the GitHub logo icon based on the currently active theme without custom
> styling in the site that consumes the plugin.
>
> See: https://github.com/jupyter-book/mystmd/issues/2700

Ensure your project has a stylesheet configured:

```yaml
site:
  # ...
  options:
    style: "path/to/my-stylesheet.css"

```

And include this rule in your stylesheet:

```css
/* Workaround for not being able to do this in the plugin itself */
.dark .github-mention-icon {
  filter: invert(1);
}
```

