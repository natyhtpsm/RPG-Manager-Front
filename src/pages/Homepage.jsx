import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp, Dices, Shield, Sword, Heart } from 'lucide-react'
import { Header } from '../components/Header'

const RulesSection = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Section>
      <SectionTitle>
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>
          {icon}
          {title}
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </ToggleButton>
      </SectionTitle>
      <SectionContent isOpen={isOpen}>
        {children}
      </SectionContent>
    </Section>
  )
}

export default function RulesPage() {
  return (
    <>
    <Header />
    <PageContainer>
      <Title>Game Rules</Title>

      <RulesSection title="Dice Rolls" icon={<Dices size={24} />}>
        <SubSection>
          <SubSectionTitle>Types of Rolls</SubSectionTitle>
          <List>
            <ListItem>Initiative: Determines turn order in combat</ListItem>
            <ListItem>Attack roll: Determines if an attack hits</ListItem>
            <ListItem>Damage roll: Determines damage dealt by a successful attack</ListItem>
            <ListItem>Saving throw: Attempt to avoid various threats</ListItem>
            <ListItem>Ability check: Used for general tasks requiring a roll</ListItem>
          </List>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Modifiers</SubSectionTitle>
          <List>
            <ListItem>Advantage: Roll twice, take the higher result</ListItem>
            <ListItem>Disadvantage: Roll twice, take the lower result</ListItem>
            <ListItem>Ability score modifier: Added based on ability scores</ListItem>
            <ListItem>Proficiency bonus: Added for proficient skills and attacks</ListItem>
          </List>
        </SubSection>
      </RulesSection>

      <RulesSection title="Combat" icon={<Sword size={24} />}>
        <SubSection>
          <SubSectionTitle>Attack Rolls</SubSectionTitle>
          <p>To hit a target, roll a d20 and add modifiers. If the total equals or exceeds the target's Armor Class (AC), the attack hits.</p>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Critical Hits</SubSectionTitle>
          <p>A natural 20 on an attack roll is a critical hit, dealing extra damage.</p>
        </SubSection>
      </RulesSection>

      <RulesSection title="Armor Class (AC)" icon={<Shield size={24} />}>
        <SubSection>
          <SubSectionTitle>Calculating AC</SubSectionTitle>
          <p>AC = Base armor + Dexterity modifier + Shield bonus + Other bonuses</p>
        </SubSection>
        <Table>
          <thead>
            <tr>
              <TableHeader>Armor Type</TableHeader>
              <TableHeader>Base AC</TableHeader>
              <TableHeader>Max Dex Bonus</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Light Armor</TableCell>
              <TableCell>11-12</TableCell>
              <TableCell>Unlimited</TableCell>
            </tr>
            <tr>
              <TableCell>Medium Armor</TableCell>
              <TableCell>13-15</TableCell>
              <TableCell>+2</TableCell>
            </tr>
            <tr>
              <TableCell>Heavy Armor</TableCell>
              <TableCell>14-18</TableCell>
              <TableCell>None</TableCell>
            </tr>
          </tbody>
        </Table>
      </RulesSection>

      <RulesSection title="Saving Throws" icon={<Heart size={24} />}>
        <SubSection>
          <SubSectionTitle>When to Use</SubSectionTitle>
          <p>Saving throws are used to resist spells, traps, poisons, and other harmful effects.</p>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Types of Saving Throws</SubSectionTitle>
          <List>
            <ListItem>Strength: Resist physical force</ListItem>
            <ListItem>Dexterity: Dodge area effects</ListItem>
            <ListItem>Constitution: Endure physical effects</ListItem>
            <ListItem>Intelligence: Overcome mental effects</ListItem>
            <ListItem>Wisdom: Resist mental influence</ListItem>
            <ListItem>Charisma: Withstand effects on your personality</ListItem>
          </List>
        </SubSection>
      </RulesSection>
    </PageContainer>    
    </>

  );
};

const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
  padding: 40px 20%;
`

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`

const Section = styled.section`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }
`

const SectionContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`

const SubSection = styled.div`
  margin-bottom: 15px;
`

const SubSectionTitle = styled.h3`
  color: #d4c4a1;
  font-size: 20px;
  margin-bottom: 10px;
`

const List = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`

const ListItem = styled.li`
  margin-bottom: 5px;
  position: relative;

  &:before {
    content: '•';
    color: #6d5d3f;
    position: absolute;
    left: -15px;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`

const TableHeader = styled.th`
  background-color: rgba(61, 52, 37, 0.6);
  color: #d4c4a1;
  padding: 10px;
  text-align: left;
  border: 1px solid #3d3425;
`

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #3d3425;
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #d4c4a1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`
