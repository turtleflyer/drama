/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem');
const { removeSectionsPartFromPath, extractBeforeFirstSlash } = require('./pathModification');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const originalPath = createFilePath({ node, getNode, basePath: 'pages' });
    let path = '';
    if (node.frontmatter.parentTitle) {
      path = extractBeforeFirstSlash(removeSectionsPartFromPath(originalPath));
    } else if (node.frontmatter.title) {
      path = removeSectionsPartFromPath(originalPath);
    }
    createNodeField({
      node,
      name: 'sectionPath',
      value: path,
    });
  }
};

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  const newPath = removeSectionsPartFromPath(page.path);
  deletePage(page);
  createPage({
    ...page,
    path: newPath,
    context: {
      slug: newPath,
    },
  });
};
