import styled from 'styled-components'

export const PostWrapper = styled.article`
  align-self: center;
  max-width: 760px;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  @media (max-width: 767px) {
    padding: 1.5rem;
    border-radius: 12px;
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #0097ac;
    margin: 0.5rem 0 1.5rem 0;
    line-height: 1.2;

    @media (max-width: 767px) {
      font-size: 1.75rem;
    }
  }

  h2 {
    margin-top: 2.5rem;
  }

  h3 {
    margin-top: 2rem;
  }

  .datetime {
    color: #6b7280;
    font-size: 0.9375rem;
    font-weight: 500;
  }

  /* Better image styling in posts */
  p img,
  .gatsby-resp-image-wrapper {
    border-radius: 8px;
    margin: 1.5rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* GIF styling */
  img[src$=".gif"] {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Code block improvements */
  pre {
    margin: 1.5rem -1.5rem;
    border-radius: 0;

    @media (min-width: 768px) {
      margin: 1.5rem -2rem;
      border-radius: 8px;
    }
  }

  /* Strong emphasis */
  strong {
    color: #1f2937;
    font-weight: 600;
  }

  /* Footnotes */
  .footnotes {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
    font-size: 0.875rem;
    color: #6b7280;
  }
`
