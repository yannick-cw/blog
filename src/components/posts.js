import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import PostTags from '../components/postTags'

const PostsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`

const PostCard = styled.article`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`

const PostTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  transition: color 0.2s ease;
`

export const PostDate = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover ${PostTitle} {
    color: #0097ac;
  }
`

const PostExcerpt = styled.p`
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
`

const Posts = ({ data }) => {
  return (
    <PostsContainer>
      {data.map(({ node }) => {
        return (
          <PostCard key={node.id}>
            <PostMeta>
              <PostDate>{node.frontmatter.date}</PostDate>
              <PostTags tags={node.frontmatter.tags} />
            </PostMeta>
            <PostLink to={node.fields.slug}>
              <PostTitle>{node.frontmatter.title}</PostTitle>
              <PostExcerpt>{node.excerpt}</PostExcerpt>
            </PostLink>
          </PostCard>
        )
      })}
    </PostsContainer>
  )
}

export default Posts
