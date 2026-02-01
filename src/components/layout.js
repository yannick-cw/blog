import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import './layout.css'
import 'prismjs/themes/prism.css'

import Sidebar from './sidebar'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 3rem 2rem;
  background-color: #f9fafb;

  @media (max-width: 767px) {
    padding: 1rem;
    padding-top: 72px; /* Account for fixed mobile header */
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          authorName
          siteDescription
        }
      }
    }
  `)

  const { title, authorName } = data.site.siteMetadata

  return (
    <Container>
      <Sidebar title={title} authorName={authorName} />
      <Content>{children}</Content>
    </Container>
  )
}

export default Layout
