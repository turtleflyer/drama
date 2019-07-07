/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { removeSectionsPartFromPath, extractBeforeFirstSlash } = require('./pathModification');

exports.onCreateNode = ({
  node,
  node: {
    internal: { type: internalType },
  },
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  if (internalType === 'MarkdownRemark') {
    const originalPath = createFilePath({ node, getNode, basePath: 'pages' });
    let sectionPath = '';
    if (/\/parent\/$/.test(originalPath)) {
      sectionPath = extractBeforeFirstSlash(removeSectionsPartFromPath(originalPath));
    } else {
      sectionPath = removeSectionsPartFromPath(originalPath);
    }
    createNodeField({
      node,
      name: 'sectionPath',
      value: sectionPath,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              noContent
            }
            fields {
              sectionPath
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMarkdownRemark.edges.forEach(
      ({
        node: {
          frontmatter: { noContent },
          fields: { sectionPath },
        },
      }) => {
        if (!noContent) {
          createPage({
            path: sectionPath,
            component: path.resolve('./src/templates/page.js'),
            context: {
              slug: sectionPath,
            },
          });
        }
      },
    );
  });
};
