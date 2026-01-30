import React from 'react'

import Layout from '../components/layout'
import Posts from '../components/posts'

const SingleTagIndex = ({ pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <Layout>
      <h1>Posts about {tagName}</h1>
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
