import styled from 'styled-components'

export const PostWrapper = styled.div`
  margin: auto;
  padding: 30px;
  max-width: 720px;
  font-size: 14px;

  @media (max-width: 414px) {
    padding: 70px 16px 0;
  }

  h1 {
    margin: 0.25em 0;
  }

  .datetime {
    color: #8e8e8e;
  }
 }
`
