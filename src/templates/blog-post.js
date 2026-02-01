import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { PostDate } from '../components/posts'
import PostTags from '../components/postTags'
import { PostWrapper } from '../components/postwrapper'

const PostHeader = styled.header`
  margin-bottom: 2rem;
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
`

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <PostWrapper>
        <PostHeader>
          <PostMeta>
            <PostDate>{post.frontmatter.date}</PostDate>
            <PostTags tags={post.frontmatter.tags} />
          </PostMeta>
          <h1>{post.frontmatter.title}</h1>
        </PostHeader>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
