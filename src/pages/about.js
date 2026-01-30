import React from 'react'

import Layout from '../components/layout'

const AboutPage = () => (
  <Layout>
    <h1>About me</h1>
    <p>I code mostly scala, typescript and haskell. On this blog I put all things I learned or find interesting.</p>
  </Layout>
)

export default AboutPage

export const Head = () => (
  <>
    <title>About - Dev Log</title>
    <meta name="description" content="About Yannick Gladow" />
  </>
)
