import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import axios from 'axios';
import AuthContext from '../functions/context.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

export default function CharacterInventoryPage() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [allInventoryItems, setAllInventoryItems] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;

        if (!token) {
          return;
        }

        const response = await axios.get(`${apiUrl}/personagens`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.length > 0) {
          setCharacters(response.data);
          setSelectedCharacter(response.data[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;

        if (!token) {
          return;
        }

        const response = await axios.get(`${apiUrl}/items`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAllInventoryItems(response.data); 
      } catch (error) {
        console.error('Erro ao buscar inventário:', error);
      }
    };

    fetchInventoryItems();
  }, []);

  const inventoryItems = allInventoryItems.filter(
    (item) => item.personagem === (selectedCharacter ? selectedCharacter.nome : "")
  );

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Character Inventory</Title>
        {characters.length > 0 ? (
          <>
            <CharacterSelect>
              <SelectButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {selectedCharacter ? selectedCharacter.nome : 'Selecionar Personagem'}
                <ChevronDown size={20} />
              </SelectButton>
              {isDropdownOpen && (
                <DropdownList>
                  {characters.map((character) => (
                    <DropdownItem
                      key={character.id}
                      onClick={() => {
                        setSelectedCharacter(character);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {character.nome}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </CharacterSelect>

            <InventoryGrid>
              {inventoryItems.length > 0 ? (
                inventoryItems.map((item, index) => (
                  <ItemCard key={index}>
                    <ItemName>{item.item}</ItemName>
                    <ItemDescription>Quantidade: {item.quantidade}</ItemDescription>
                  </ItemCard>
                ))
              ) : (
                <EmptyInventory>Empty inventory</EmptyInventory>
              )}
            </InventoryGrid>
          </>
        ) : (
          <>
            <EmptyInventory>You did not create any character</EmptyInventory>
          </>
        )}
      </PageContainer>
    </>
  );
}

const EmptyInventory = styled.p`
  font-size: 24px;
  color: #b3a282;
  text-align: center;
`;
const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`;

const CharacterSelect = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto 30px;
`;

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
`;

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
`;

const DropdownItem = styled.li`
  padding: 10px;
  color: #d4c4a1;
  cursor: pointer;

  &:hover {
    background: rgba(61, 52, 37, 0.8);
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ItemCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemName = styled.h3`
  color: #d4c4a1;
  font-size: 18px;
  margin-bottom: 5px;
  text-align: center;
`;

const ItemDescription = styled.p`
  color: #b3a282;
  font-size: 14px;
  text-align: center;
`;
