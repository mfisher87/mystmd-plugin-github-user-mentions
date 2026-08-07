/**
 * MyST plugin for GitHub user mentions.
 *
 * Provides two equivalent ways to link a GitHub profile:
 *   1. Prefixed citation:  @gh:username
 *   2. Role: {gh}`username`
 *
 * Renders as a link to `https://github.com/<username>` with the text
 * "@username" and CSS class "github-mention".
 */

const PREFIX = 'gh:';

// Use of the GitHub logo is permissible for linking to GitHub:
// https://brand.github.com/foundations/logo#legal
const ICON_SVG = (
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 24">'
  + '<path fill="#1f2328" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'
  + '</svg>'
);
const ICON_STR = "data:image/svg+xml;base64," + Buffer.from(ICON_SVG).toString("base64");

const mentionLinkNode = (username) => ({
  type: 'link',
  url: `https://github.com/${username}`,
  class: 'github-mention',
  children: [
    { type: "image", url: ICON_STR, alt: "GitHub", width: "1.15em", class: "github-mention-icon" },
    { type: 'text', value: `@${username}` }
  ],
});

const githubMentionsTransform = {
  name: 'github-mentions',
  doc: 'Rewrite @gh:username citations as links to GitHub profiles.',
  stage: 'document',  // before citation resolution
  plugin: (_opts, utils) => (tree) => {
    utils.selectAll('cite', tree).forEach((node) => {
      const label = node.label ?? node.identifier ?? '';
      if (!label.startsWith(PREFIX)) return;
      const username = label.slice(PREFIX.length).trim();
      if (!username) return;
      const link = mentionLinkNode(username);
      Object.keys(node).forEach((k) => delete node[k]);
      Object.assign(node, link);
    });
  },
};

const githubMentionRole = {
  name: 'gh',
  doc: 'Link to a GitHub user profile, e.g. {gh}`username`.',
  body: { type: String, required: true },
  run: (data) => {
    const username = data.body.trim().replace(/^@/, '');
    return [mentionLinkNode(username)];
  },
};

const plugin = {
  name: 'GitHub Mentions',
  license: 'MIT',
  roles: [githubMentionRole],
  transforms: [githubMentionsTransform],
};

export default plugin;
