/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

const Page = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { inject },
      html,
      fields: { sectionPath },
    },
  } = data;

  const pieces = useMemo(
    () => inject && inject.map(pieceKey => require(`../pieces/${pieceKey}.js`)),
    [inject],
  );

  const markdownContainer = useRef(null);

  useEffect(() => {
    if (inject) {
      pieces.forEach((PieceComponent, i) => {
        const piecePlaceholder = markdownContainer.current.querySelector(`#${inject[i]}`);
        ReactDOM.render(<PieceComponent />, piecePlaceholder);
      });
    }
  }, [inject, pieces]);

  return (
    <>
      <Layout active={sectionPath}>
        <article dangerouslySetInnerHTML={{ __html: html }} ref={markdownContainer} />
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { sectionPath: { eq: $slug } }) {
      html
      frontmatter {
        inject
      }
      fields {
        sectionPath
      }
    }
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        inject: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
      html: PropTypes.string.isRequired,
      fields: PropTypes.shape({
        sectionPath: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Page;
