import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  FaHome,
  FaUserSecret,
  FaLinkedin,
  FaGithub,
  FaHashtag,
  FaBars,
  FaTimes
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
    display: none;
  }
`

const MobileHeader = styled.header`
  display: none;
  
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    background: linear-gradient(90deg, #1d4a5a 0%, #193549 100%);
    color: #dcdcdc;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 56px;
  }
`

const MobileTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #dcdcdc;
  text-decoration: none;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #dcdcdc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 767px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #193549 0%, #0f202d 100%);
    z-index: 999;
    padding: 1.5rem;
    overflow-y: auto;
  }
`

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const MobilePortrait = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
`

const MobileNameBoard = styled.span`
  color: #a0a0a0;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`

const MobileMenuItem = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1.25rem;
  }
`

const MobileDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.75rem 0;
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
`

const Divider = styled.div`
  width: 60%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 1rem 0;
`

const Sidebar = ({ title, authorName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader>
        <MobileTitle to="/">{title}</MobileTitle>
        <MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </MobileHeader>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuContent>
          <MobilePortrait src={me} alt="me" />
          <MobileNameBoard>{authorName}</MobileNameBoard>
        </MobileMenuContent>
        
        <MobileNav>
          <StyledLink to="/" onClick={closeMobileMenu}>
            <MobileMenuItem>
              <FaHome /> Home
            </MobileMenuItem>
          </StyledLink>
          <StyledLink to="/about" onClick={closeMobileMenu}>
            <MobileMenuItem>
              <FaUserSecret /> About
            </MobileMenuItem>
          </StyledLink>
          <StyledLink to="/tags" onClick={closeMobileMenu}>
            <MobileMenuItem>
              <FaHashtag /> Tags
            </MobileMenuItem>
          </StyledLink>
          
          <MobileDivider />
          
          <StyledHref
            href="https://www.linkedin.com/in/yannick-gladow-685680119/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <MobileMenuItem>
              <FaLinkedin /> LinkedIn
            </MobileMenuItem>
          </StyledHref>
          <StyledHref
            href="https://github.com/yannick-cw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MobileMenuItem>
              <FaGithub /> GitHub
            </MobileMenuItem>
          </StyledHref>
        </MobileNav>
      </MobileMenu>

      {/* Desktop Sidebar */}
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
    </>
  )
}

export default Sidebar
