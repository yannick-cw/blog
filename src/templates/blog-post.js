import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { PostDate } from '../components/posts'
import PostTags from '../components/postTags'
import { PostWrapper } from '../components/postwrapper'

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
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

export default BlogPost

export const Head = ({ data }) => {
  const post = data.markdownRemark
  return (
    <>
      <title>{post.frontmatter.title}</title>
      <meta name="description" content={post.frontmatter.description} />
    </>
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
        description
      }
    }
  }
`
