import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header.jsx';
import BarbarianImg from '../assets/barbarian.png';
import ClericImg from '../assets/cleric.png';
import DruidImg from '../assets/druid.png';
import FighterImg from '../assets/fighter.png';
import RogueImg from '../assets/rogue.png';
import WizardImg from '../assets/wizard.png';
import PaladinImg from '../assets/paladin.png';

const classes = [
  {
    name: 'Barbarian',
    image: BarbarianImg,
    description: 'Fierce warriors fueled by primal rage, excelling in melee combat and taking down foes with brute strength.',
    abilities: [
      'Rage',
      'Reckless Attack',
      'Unarmored Defense',
      'Feral Instinct',
    ],
    details: 'Barbarians are relentless fighters, charging into battle with unbridled ferocity. Their Rage grants them increased damage output and resilience, making them perfect front-liners in any party.'
  },
  {
    name: 'Cleric',
    image: ClericImg,
    description: 'Divine spellcasters wielding the power of the gods to heal and protect their allies, while also smiting enemies.',
    abilities: [
      'Healing Word',
      'Turn Undead',
      'Bless',
      'Divine Strike',
    ],
    details: 'Clerics are conduits of divine power, using their connection to their deity to aid their allies in battle. They can heal the wounded, protect the weak, and banish the undead.'
  },
  {
    name: 'Druid',
    image: DruidImg,
    description: 'Guardians of nature, capable of shapeshifting into animals and wielding the powers of the natural world.',
    abilities: [
      'Wild Shape',
      'Entangle',
      'Moonbeam',
      'Call Lightning',
    ],
    details: 'Druids are attuned to the natural world, channeling its power to protect the land and its creatures. They can assume the forms of animals and cast spells to control the elements.'
  },
  {
    name: 'Fighter',
    image: FighterImg,
    description: 'Versatile combatants who excel with weapons, whether using ranged attacks or wielding swords and shields.',
    abilities: [
      'Action Surge',
      'Second Wind',
      'Fighting Style',
      'Indomitable',
    ],
    details: 'Fighters are highly skilled in combat, able to adapt to any situation. Whether charging into battle with sword and shield or shooting enemies from afar, they are the backbone of any adventuring party.'
  },
  {
    name: 'Rogue',
    image: RogueImg,
    description: 'Masters of stealth and trickery, Rogues can sneak past enemies or land critical hits from the shadows.',
    abilities: [
      'Sneak Attack',
      'Evasion',
      'Cunning Action',
      'Uncanny Dodge',
    ],
    details: 'Rogues are swift and elusive, specializing in ambushing enemies with powerful, precise strikes. Their ability to hide in plain sight and move with agility makes them formidable in both combat and infiltration.'
  },
  {
    name: 'Wizard',
    image: WizardImg,
    description: 'Arcane spellcasters, capable of learning and casting powerful spells from their vast repertoire of magic.',
    abilities: [
      'Fireball',
      'Mage Armor',
      'Counterspell',
      'Teleport',
    ],
    details: 'Wizards are scholars of the arcane, studying the magical arts to harness powerful spells. While physically fragile, their mastery of magic allows them to dominate the battlefield from afar.'
  },
  {
    name: 'Paladin',
    image: PaladinImg,
    description: 'Holy warriors who channel divine power to protect the weak and vanquish evil with a combination of martial skill and magic.',
    abilities: [
      'Divine Smite',
      'Lay on Hands',
      'Aura of Courage',
      'Holy Shield',
    ],
    details: 'Paladins are paragons of virtue, blending martial prowess with divine magic. Their oaths give them strength, and their presence on the battlefield inspires their allies.'
  },
];


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
);

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <>
      <Header />
      <PageContainer>
      <Title>Classes of Baldur's Gate 3</Title>
      <ClassesGrid>
        {classes.map((classInfo, index) => (
          <ClassCard key={index} onClick={() => setSelectedClass(classInfo)}>
            <ClassImage src={classInfo.image} alt={classInfo.name} />
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
    </>
  );
};

const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
  padding: 40px 20%;
`;

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`;

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

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
`;

const ClassImage = styled.img`
  display: block;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 auto 20px;
`;

const ClassName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

const ClassDescription = styled.p`
  color: #b3a282;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const AbilitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

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
`;

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
`;

const ModalContent = styled.div`
  background: #1a1610;
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  color: #d4c4a1;
  font-size: 28px;
  margin-bottom: 20px;
`;

const ModalDescription = styled.p`
  color: #b3a282;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ModalAbilitiesTitle = styled.h3`
  color: #d4c4a1;
  font-size: 20px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #d4c4a1;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;