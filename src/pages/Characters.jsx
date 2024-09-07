import React from 'react'
import styled from 'styled-components'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

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

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const CharacterCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #6d5d3f;
  margin-bottom: 15px;
`

const CharacterName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 5px;
`

const CharacterInfo = styled.p`
  color: #b3a282;
  font-size: 16px;
  text-align: center;
`

const CreateButton = styled(Link)`
  background: linear-gradient(to bottom, #6d5d3f 0%, #4a3f2b 100%);
  color: #d4c4a1;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  margin: 30px auto 0;

  &:hover {
    background: linear-gradient(to bottom, #7d6d4f 0%, #5a4f3b 100%);
  }

  &:focus {
    outline: 2px solid #b3a282;
    outline-offset: 2px;
  }
`

const characters = [
  { id: 1, name: 'Eldrin', class: 'Wizard', level: 5, image: '/placeholder.svg?height=150&width=150' },
  { id: 2, name: 'Thorne', class: 'Warrior', level: 7, image: '/placeholder.svg?height=150&width=150' },
  { id: 3, name: 'Lyra', class: 'Rogue', level: 6, image: '/placeholder.svg?height=150&width=150' },
  { id: 4, name: 'Brynn', class: 'Cleric', level: 4, image: '/placeholder.svg?height=150&width=150' },
]

export default function PlayerCharactersPage() {
  return (
    <>
        <Header />
        <PageContainer>
        <Title>Your Characters</Title>
        <CharactersGrid>
            {characters.map((character) => (
            <CharacterCard key={character.id}>
                <CharacterImage src={character.image} alt={character.name} />
                <CharacterName>{character.name}</CharacterName>
                <CharacterInfo>
                {character.class} - Level {character.level}
                </CharacterInfo>
            </CharacterCard>
            ))}
        </CharactersGrid>
        <CreateButton to="/create">
            <Plus size={24} style={{ marginRight: '10px' }} />
            Create New Character
        </CreateButton>
        </PageContainer>
    </>
  )
}