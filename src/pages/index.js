import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Posts from '../components/posts'

const IndexPage = ({ data }) => (
  <Layout>
    <Posts data={data.allMarkdownRemark.edges} />
  </Layout>
)

export default IndexPage

export const Head = () => (
  <>
    <title>Dev Log</title>
    <meta name="description" content="The journey through Tech of Yannick Gladow" />
    <meta
      name="google-site-verification"
      content="JJjnqZx-YFZ0UMU8y3BJWTfxGlG_rmUUrpvws0o0n7g"
    />
  </>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
            description
          }
          excerpt
        }
      }
    }
  }
`
