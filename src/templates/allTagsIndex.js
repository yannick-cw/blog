import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`

const Title = styled.h1`
  margin: 0 0 1.5rem 0;
  color: #111827;
`

const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const TagLink = styled(Link)`
  display: inline-block;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #b38f00;
  text-decoration: none;
  background-color: #fffbeb;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffbf00;
    color: #1f2937;
    transform: translateY(-1px);
  }
`

const AllTagsIndex = ({ pageContext }) => {
  return (
    <Layout>
      <Container>
        <Card>
          <Title>All Tags</Title>
          <TagsGrid>
            {pageContext.tags.map(tag => {
              const path = `/tags/${tag}`
              return (
                <TagLink key={tag} to={path}>
                  #{tag}
                </TagLink>
              )
            })}
          </TagsGrid>
        </Card>
      </Container>
    </Layout>
  )
}

export default AllTagsIndex

export const Head = () => (
  <>
    <title>All Tags - Dev Log</title>
  </>
)
