import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import PostTags from '../components/postTags'

const PostTitle = styled.h3`
  margin-bottom: 0.25rem;
`

export const PostDate = styled.span`
  color: #8e8e8e;
  font-size: 14px;
  margin-right: 10px;
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Posts = ({ data }) => {
  return (
    <>
      {data.map(({ node }) => {
        return (
          <div key={node.id}>
            <PostDate>{node.frontmatter.date}</PostDate>{' '}
            <PostTags tags={node.frontmatter.tags} />
            <PostLink to={node.fields.slug}>
              <PostTitle>{node.frontmatter.title} </PostTitle>
            </PostLink>
            <p>{node.excerpt}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default Posts
