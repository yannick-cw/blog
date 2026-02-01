import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TagLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 500;
  color: #b38f00;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: #fffbeb;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fef3c7;
    color: #92740a;
  }
`

const PostTags = ({ tags }) => {
  if (!tags) return null
  
  return (
    <TagsContainer>
      {tags.map((tag) => (
        <TagLink key={tag} to={`/tags/${tag}`}>
          {tag}
        </TagLink>
      ))}
    </TagsContainer>
  )
}

export default PostTags
