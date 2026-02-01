import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Posts from '../components/posts'

const Header = styled.div`
  max-width: 800px;
  margin: 0 auto 1.5rem auto;
  width: 100%;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #0097ac;
  }

  &::before {
    content: '←';
  }
`

const Title = styled.h1`
  margin: 0;
  color: #0097ac;
  font-size: 1.75rem;

  span {
    color: #b38f00;
  }
`

const SingleTagIndex = ({ pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <Layout>
      <Header>
        <BackLink to="/tags">All tags</BackLink>
        <Title>
          Posts tagged <span>#{tagName}</span>
        </Title>
      </Header>
      <Posts data={posts} />
    </Layout>
  )
}

export default SingleTagIndex

export const Head = ({ pageContext }) => (
  <>
    <title>{pageContext.tagName} - Dev Log</title>
  </>
)
