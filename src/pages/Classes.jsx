import React, { useState } from 'react'
import styled from 'styled-components'
import { Sword, Wand, Crosshair, Shield, Heart } from 'lucide-react'

const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
  padding: 40px 20px;
`

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`

const ClassCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`

const ClassIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #2c2416;
  border-radius: 50%;
  margin: 0 auto 20px;
`

const ClassName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`

const ClassDescription = styled.p`
  color: #b3a282;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`

const AbilitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const AbilityItem = styled.li`
  color: #b3a282;
  font-size: 14px;
  margin-bottom: 5px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #6d5d3f;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #1a1610;
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalTitle = styled.h2`
  color: #d4c4a1;
  font-size: 28px;
  margin-bottom: 20px;
`

const ModalDescription = styled.p`
  color: #b3a282;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.6;
`

const ModalAbilitiesTitle = styled.h3`
  color: #d4c4a1;
  font-size: 20px;
  margin-bottom: 10px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #d4c4a1;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`

const classes = [
  {
    name: 'Warrior',
    icon: <Sword size={32} color="#d4c4a1" />,
    description: 'Masters of martial combat, capable of both dealing and withstanding heavy damage.',
    abilities: [
      'Sword Mastery',
      'Shield Wall',
      'Berserker Rage',
      'Intimidating Shout',
    ],
    details: 'Warriors are the backbone of any adventuring party, excelling in close-quarters combat. They can wield a variety of weapons and wear heavy armor, making them formidable tanks on the battlefield. Their strength and endurance allow them to outlast enemies in prolonged fights.'
  },
  {
    name: 'Mage',
    icon: <Wand size={32} color="#d4c4a1" />,
    description: 'Wielders of arcane magic, capable of unleashing devastating spells from a distance.',
    abilities: [
      'Fireball',
      'Arcane Barrier',
      'Teleport',
      'Time Warp',
    ],
    details: 'Mages are the masters of arcane arts, manipulating the very fabric of reality to cast powerful spells. While physically frail, their magical abilities can turn the tide of battle in an instant. Mages require careful positioning and mana management to be effective.'
  },
  {
    name: 'Ranger',
    icon: <Crosshair size={32} color="#d4c4a1" />,
    description: 'Skilled marksmen and trackers, equally adept in wilderness survival and ranged combat.',
    abilities: [
      'Precise Shot',
      'Animal Companion',
      'Camouflage',
      'Multi-Shot',
    ],
    details: 'Rangers are the eyes and ears of the party, excelling in both exploration and ranged combat. Their connection with nature allows them to navigate difficult terrain and track elusive prey. In combat, rangers can rain down arrows on enemies from a safe distance.'
  },
  {
    name: 'Paladin',
    icon: <Shield size={32} color="#d4c4a1" />,
    description: 'Holy warriors who combine martial prowess with divine magic to protect and heal allies.',
    abilities: [
      'Divine Smite',
      'Lay on Hands',
      'Aura of Protection',
      'Holy Shield',
    ],
    details: 'Paladins are righteous warriors imbued with divine power. They combine the martial skills of a warrior with the healing and protective abilities of a cleric. Paladins excel at supporting their allies while also being formidable opponents in close combat.'
  },
  {
    name: 'Cleric',
    icon: <Heart size={32} color="#d4c4a1" />,
    description: 'Divine spellcasters who can heal wounds, buff allies, and smite enemies with holy power.',
    abilities: [
      'Divine Heal',
      'Bless',
      'Turn Undead',
      'Holy Nova',
    ],
    details: 'Clerics are the spiritual backbone of any adventuring party. Their connection to divine powers allows them to heal wounds, protect allies, and smite enemies with holy magic. While not as physically strong as warriors, clerics can hold their own in combat while providing crucial support to the team.'
  },
]

const ClassModal = ({ classInfo, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={e => e.stopPropagation()}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalTitle>{classInfo.name}</ModalTitle>
      <ModalDescription>{classInfo.details}</ModalDescription>
      <ModalAbilitiesTitle>Key Abilities:</ModalAbilitiesTitle>
      <AbilitiesList>
        {classInfo.abilities.map((ability, index) => (
          <AbilityItem key={index}>{ability}</AbilityItem>
        ))}
      </AbilitiesList>
    </ModalContent>
  </ModalOverlay>
)

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <PageContainer>
      <Title>Classes of the Realm</Title>
      <ClassesGrid>
        {classes.map((classInfo, index) => (
          <ClassCard key={index} onClick={() => setSelectedClass(classInfo)}>
            <ClassIcon>{classInfo.icon}</ClassIcon>
            <ClassName>{classInfo.name}</ClassName>
            <ClassDescription>{classInfo.description}</ClassDescription>
            <AbilitiesList>
              {classInfo.abilities.map((ability, abilityIndex) => (
                <AbilityItem key={abilityIndex}>{ability}</AbilityItem>
              ))}
            </AbilitiesList>
          </ClassCard>
        ))}
      </ClassesGrid>
      {selectedClass && (
        <ClassModal classInfo={selectedClass} onClose={() => setSelectedClass(null)} />
      )}
    </PageContainer>
  )
}