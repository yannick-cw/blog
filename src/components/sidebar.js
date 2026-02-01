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
import me from './me.png'

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  min-width: 280px;
  background: linear-gradient(180deg, #1d4a5a 0%, #193549 100%);
  color: #dcdcdc;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 1024px) {
    width: 220px;
    min-width: 220px;
  }

  @media (max-width: 767px) {
    width: 70px;
    min-width: 70px;
    padding: 1rem 0.5rem;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #0097ac;
  }
`

const StyledHref = styled.a`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;

  &:hover {
    color: #0097ac;
  }
`

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 767px) {
    padding: 0;
    align-items: center;
  }
`

const MenuItem = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    padding: 0.75rem;
    justify-content: center;
    
    span {
      display: none;
    }
  }
`

const SiteTitle = styled.h2`
  color: #dcdcdc;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  text-align: center;
  letter-spacing: -0.02em;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`

const NameBoard = styled.h5`
  color: #a0a0a0;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.75rem 0 2rem 0;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`

const Portrait = styled.img`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 767px) {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
  }
`

const Divider = styled.div`
  width: 60%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 1rem 0;

  @media (max-width: 767px) {
    display: none;
  }
`

const Sidebar = ({ title, authorName }) => (
  <SidebarContainer>
    <StyledLink to="/">
      <SiteTitle>{title}</SiteTitle>
    </StyledLink>
    <Portrait src={me} alt="me" />
    <NameBoard>{authorName}</NameBoard>
    
    <Divider />
    
    <MenuWrapper>
      <StyledLink to="/">
        <MenuItem>
          <FaHome /> <span>Home</span>
        </MenuItem>
      </StyledLink>
      <StyledLink to="/about">
        <MenuItem>
          <FaUserSecret /> <span>About</span>
        </MenuItem>
      </StyledLink>
      <StyledLink to="/tags">
        <MenuItem>
          <FaHashtag /> <span>Tags</span>
        </MenuItem>
      </StyledLink>
      
      <Divider />
      
      <StyledHref
        href="https://www.linkedin.com/in/yannick-gladow-685680119/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MenuItem>
          <FaLinkedin /> <span>LinkedIn</span>
        </MenuItem>
      </StyledHref>
      <StyledHref
        href="https://github.com/yannick-cw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MenuItem>
          <FaGithub /> <span>GitHub</span>
        </MenuItem>
      </StyledHref>
    </MenuWrapper>
  </SidebarContainer>
)

export default Sidebar
