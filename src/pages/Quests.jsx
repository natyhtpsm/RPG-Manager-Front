import React from 'react'
import styled from 'styled-components'
import { Scroll, Target, Award, User } from 'lucide-react'
import { Header } from '../components/Header'

const missions = [
  {
    id: 1,
    name: "The Lost Artifact",
    goal: "Retrieve the ancient amulet",
    description: "Deep in the Whispering Woods lies an ancient amulet of immense power. Brave the forest's dangers and return the artifact to the Elders.",
    reward: "500 gold coins",
    character: "Eldrin"
  },
  {
    id: 2,
    name: "Dragon's Lair",
    goal: "Slay the dragon terrorizing the village",
    description: "A fearsome dragon has made its lair in the nearby mountains, threatening the peaceful village of Oakvale. End this menace and bring peace to the realm.",
    reward: "1000 gold coins and a magical sword",
    character: "Thorne"
  },
  {
    id: 3,
    name: "The Cursed Crypt",
    goal: "Break the curse and free the trapped souls",
    description: "An ancient crypt has been sealed for centuries, trapping restless souls within. Enter the crypt, solve its puzzles, and break the curse to free the spirits.",
    reward: "750 gold coins and a spellbook",
    character: "Lyra"
  },
  {
    id: 4,
    name: "Diplomatic Mission",
    goal: "Negotiate peace between warring factions",
    description: "Two powerful factions are on the brink of war. Travel to their capitals, understand their grievances, and broker a peace treaty to prevent bloodshed.",
    reward: "600 gold coins and increased reputation",
    character: "Brynn"
  }
]

export default function MissionsPage() {
  return (
    <>
        <Header />
        <PageContainer>
        <Title>Active Missions</Title>
            <MissionsGrid>
                {missions.map((mission) => (
                <MissionCard key={mission.id}>
                    <MissionName>{mission.name}</MissionName>
                    <MissionInfo>
                    <IconWrapper>
                        <Target size={16} />
                    </IconWrapper>
                    {mission.goal}
                    </MissionInfo>
                    <MissionInfo>
                    <IconWrapper>
                        <User size={16} />
                    </IconWrapper>
                    {mission.character}
                    </MissionInfo>
                    <MissionDescription>{mission.description}</MissionDescription>
                    <MissionReward>
                    <IconWrapper>
                        <Award size={16} />
                    </IconWrapper>
                    {mission.reward}
                    </MissionReward>
                </MissionCard>
                ))}
            </MissionsGrid>
        </PageContainer>        
    </>

  );
};


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

const MissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const MissionCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const MissionName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 10px;
`

const MissionInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #b3a282;
`

const IconWrapper = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`

const MissionDescription = styled.p`
  color: #b3a282;
  font-size: 16px;
  margin-bottom: 15px;
  flex-grow: 1;
`

const MissionReward = styled.div`
  background: rgba(61, 52, 37, 0.6);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffd700;
`