import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown } from 'lucide-react'

const characters = [
  { id: 1, name: 'Eldrin' },
  { id: 2, name: 'Thorne' },
  { id: 3, name: 'Lyra' },
  { id: 4, name: 'Brynn' },
]

const inventoryItems = [
  { id: 1, name: 'Health Potion', description: 'Restores 50 HP', image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Steel Sword', description: '+10 Attack', image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Leather Armor', description: '+5 Defense', image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Magic Scroll', description: 'Casts Fireball', image: '/placeholder.svg?height=100&width=100' },
  { id: 5, name: 'Gold Coins', description: '100 pieces', image: '/placeholder.svg?height=100&width=100' },
  { id: 6, name: 'Elven Bow', description: '+8 Ranged Attack', image: '/placeholder.svg?height=100&width=100' },
]

export default function CharacterInventoryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <PageContainer>
      <Title>Character Inventory</Title>
      <CharacterSelect>
        <SelectButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {selectedCharacter.name}
          <ChevronDown size={20} />
        </SelectButton>
        {isDropdownOpen && (
          <DropdownList>
            {characters.map((character) => (
              <DropdownItem
                key={character.id}
                onClick={() => {
                  setSelectedCharacter(character)
                  setIsDropdownOpen(false)
                }}
              >
                {character.name}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </CharacterSelect>
      <InventoryGrid>
        {inventoryItems.map((item) => (
          <ItemCard key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemCard>
        ))}
      </InventoryGrid>
    </PageContainer>
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

const CharacterSelect = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto 30px;
`

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 4px;
  color: #d4c4a1;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(44, 36, 22, 0.9);
  border: 2px solid #3d3425;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`

const DropdownItem = styled.li`
  padding: 10px;
  color: #d4c4a1;
  cursor: pointer;

  &:hover {
    background: rgba(61, 52, 37, 0.8);
  }
`

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const ItemCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
`

const ItemName = styled.h3`
  color: #d4c4a1;
  font-size: 18px;
  margin-bottom: 5px;
  text-align: center;
`

const ItemDescription = styled.p`
  color: #b3a282;
  font-size: 14px;
  text-align: center;
`
