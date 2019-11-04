import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
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

const Query = graphql`
  query {
    site {
      siteMetadata {
        title
        authorName
        siteDescription
      }
    }
  }
`

export default ({ children }) => (
  <StaticQuery
    query={Query}
    render={data => {
      const { title, siteDescription, authorName } = data.site.siteMetadata
      return (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={siteDescription} />
            <title>{title}</title>
            <html lang="en" />
            <meta
              name="google-site-verification"
              content="JJjnqZx-YFZ0UMU8y3BJWTfxGlG_rmUUrpvws0o0n7g"
            />
          </Helmet>
          <Container>
            <Sidebar title={title} authorName={authorName} />
            <Content>{children}</Content>
          </Container>
        </>
      )
    }}
  />
)
