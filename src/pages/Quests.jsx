import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Scroll, Target, Award, User } from 'lucide-react';
import { Header } from '../components/Header';
import axios from 'axios';
import AuthContext from '../functions/context.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

export default function MissionsPage() {
  const [missions, setMissions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;

        if (!token) return;

        const response = await axios.get(`${apiUrl}/questsandrewards`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMissions(response.data); // Preenche o estado com as missões do backend
      } catch (error) {
        console.error('Erro ao buscar missões:', error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Active Missions</Title>
        <MissionsGrid>
          {missions.length > 0 ? (
            missions.map((mission, index) => (
              <MissionCard key={index}>
                <MissionName>{mission.missao}</MissionName>
                <MissionInfo>
                  <IconWrapper>
                    <Target size={16} />
                  </IconWrapper>
                  {mission.objetivo}
                </MissionInfo>
                <MissionInfo>
                  <IconWrapper>
                    <User size={16} />
                  </IconWrapper>
                  {mission.personagem}
                </MissionInfo>
                <MissionReward>
                  <IconWrapper>
                    <Award size={16} />
                  </IconWrapper>
                  {mission.item} (Quantidade: {mission.quantidade})
                </MissionReward>
              </MissionCard>
            ))
          ) : (
            <p>Nenhuma missão ativa.</p>
          )}
        </MissionsGrid>
      </PageContainer>
    </>
  );
}

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

const MissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

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
`;

const MissionName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 10px;
`;

const MissionInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #b3a282;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const MissionReward = styled.div`
  background: rgba(61, 52, 37, 0.6);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffd700;
`;
