import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { PostDate } from '../components/posts'
import PostTags from '../components/postTags'
import { PostWrapper } from '../components/postwrapper'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <PostWrapper>
        <PostDate className="datetime">{post.frontmatter.date}</PostDate>
        <PostTags tags={post.frontmatter.tags} />
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
      </PostWrapper>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
      }
    }
  }
`
