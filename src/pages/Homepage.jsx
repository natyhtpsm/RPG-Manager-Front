import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom, #2c2416 0%, #1a1610 100%);
  padding: 10px 0;
  border-bottom: 2px solid #3d3425;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const NavLink = styled(Link)`
  color: #b3a282;
  text-decoration: none;
  padding: 10px 20px;
  font-family: 'MedievalSharp', cursive;
  font-size: 18px;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #d4c4a1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #6d5d3f;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80%;
  }
`

const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
`

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`

const Section = styled.section`
  background: rgba(44, 36, 22, 0.6);
  border: 1px solid #3d3425;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
`

const SectionTitle = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 15px;
  border-bottom: 1px solid #3d3425;
  padding-bottom: 10px;
`

export default function RPGManager() {
  return (
    <PageContainer>
      <HeaderContainer>
        <Nav>
          <NavLink href="/inventory">Inventory</NavLink>
          <NavLink href="/characteristics">Characteristics</NavLink>
          <NavLink href="/reactions">Reactions</NavLink>
          <NavLink href="/proficiencies">Proficiencies</NavLink>
          <NavLink href="/statistics">Statistics</NavLink>
        </Nav>
      </HeaderContainer>
      <Content>
        <Title>Welcome to Your RPG Adventure</Title>
        <Section>
          <SectionTitle>Character Overview</SectionTitle>
          <p>Here you can view and manage your character's details, inventory, and progress.</p>
        </Section>
        <Section>
          <SectionTitle>Recent Activities</SectionTitle>
          <p>Your latest quests, battles, and achievements will be displayed here.</p>
        </Section>
      </Content>
    </PageContainer>
  )
}