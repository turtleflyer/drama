/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem');

function removeSectionsPartFromPath(oldPath) {
  return oldPath.replace('/sections', '');
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const path = removeSectionsPartFromPath(createFilePath({ node, getNode, basePath: 'pages' }));
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
