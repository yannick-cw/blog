import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const AllTagsIndex = ({ pageContext }) => {
  return (
    <Layout>
      <h3>List of Tags</h3>
      <ul>
        {pageContext.tags.map(tag => {
          const path = `/tags/${tag}`

          return (
            <li key={tag}>
              <Link to={path}>{tag}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default AllTagsIndex

export const Head = () => (
  <>
    <title>All Tags - Dev Log</title>
  </>
)
