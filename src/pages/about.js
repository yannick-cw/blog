import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`

const Title = styled.h1`
  margin: 0 0 1.5rem 0;
  color: #111827;
`

const Text = styled.p`
  color: #4b5563;
  font-size: 1.0625rem;
  line-height: 1.75;
  margin: 0;
`

const AboutPage = () => (
  <Layout>
    <Container>
      <Card>
        <Title>About me</Title>
        <Text>
          Staff engineer working on distributed systems, mostly in Scala and TypeScript.
          I build AI tools that keep humans in control. On this blog I share what I learn
          and how I work.
        </Text>
      </Card>
    </Container>
  </Layout>
)

export default AboutPage

export const Head = () => (
  <>
    <title>About - Dev Log</title>
    <meta name="description" content="About Yannick Gladow" />
  </>
)
