import React from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'

export default function RPGManager() {
  return (
    <PageContainer>
      <Header />
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