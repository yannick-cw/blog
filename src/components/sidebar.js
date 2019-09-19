import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  FaHome,
  FaUserSecret,
  FaLinkedin,
  FaGithub,
  FaHashtag
} from 'react-icons/fa'
import me from './me.jpg'

const Sidebar = styled.div`
  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 20%;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 20%;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    width: 10%;
    justify-content: flex-start;
    align-items: center;

    &::before {
      content: '';
      margin: 10px;
    }
  }

  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: #193549;
  color: #dcdcdc;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const StyledHref = styled.a`
  text-decoration: none;
  color: inherit;
`

const MenuWrapper = styled.div`
  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    div {
      margin: 0;
    }
    span {
      display: none;
    }
  }

  display: flex;
  flex-direction: row;
  div {
    margin: 10px;
  }
`

const SiteTitle = styled.h1`
  display: flex;
  color: #dcdcdc;

  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    font-size: 16px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

const NameBoard = styled.h5`
  display: flex;
  color: #dcdcdc;

  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    font-size: 12px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

const Portrait = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover; 

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 120px;
    height: 120px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
 `

export default ({ title, authorName }) => (
  <Sidebar>
    <StyledLink to="/">
      <SiteTitle>{title}</SiteTitle>
    </StyledLink>
    <Portrait src={me} alt="me" />
    <NameBoard>{authorName}</NameBoard>
    <MenuWrapper>
      <div>
        <p>
          <StyledLink to="/">
            <FaHome /> <span>Home</span>
          </StyledLink>
        </p>
        <p>
          <StyledLink to="/about">
            <FaUserSecret /> <span>About</span>
          </StyledLink>
        </p>
        <p>
          <StyledLink to="/tags">
            <FaHashtag /> <span>Tags</span>
          </StyledLink>
        </p>
      </div>
      <div>
        <p>
          <StyledHref
            href="https://www.linkedin.com/in/yannick-gladow-685680119/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin /> <span>Linkedin</span>
          </StyledHref>
        </p>
        <p>
          <StyledHref
            href="https://github.com/yannick-cw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> <span>Github</span>
          </StyledHref>
        </p>
      </div>
    </MenuWrapper>
  </Sidebar>
)
