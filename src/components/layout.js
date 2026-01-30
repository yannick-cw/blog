import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import './layout.css'
import 'prismjs/themes/prism.css'

import Sidebar from './sidebar'

const Container = styled.div`
  display: flex;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  color: #7e7e7e;
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
