import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Carousel = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const clonedItems = [...items, ...items]; 
  const trackRef = useRef(null);
  const handleTransitionEnd = () => {
    if (currentIndex === items.length || currentIndex === -1) {
      setTransitionEnabled(false); 
      setCurrentIndex(currentIndex === items.length ? 0 : items.length - 1);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      setTimeout(() => setTransitionEnabled(true), 50);
    }
  }, [transitionEnabled]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <CarouselContainer>
      <CarouselTitle>{title}</CarouselTitle>
      <CarouselWrapper>
        <CarouselTrack
          ref={trackRef}
          style={{
            transform: `translateX(-${currentIndex * 220}px)`,
            transition: transitionEnabled ? 'transform 0.3s ease' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedItems.map((item, index) => (
            <Card key={index}>
              <CardImage src={`data:image/jpeg;base64,${item.foto}`} alt={item.nome} />
              <CardTitle>{item.npc_nome || item.inimigo_nome}</CardTitle>
              <CardSubtitle>{item.tipo || 'Inimigo'}</CardSubtitle>
            </Card>
          ))}
        </CarouselTrack>
        <PrevButton onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={24} />
        </PrevButton>
        <NextButton onClick={nextSlide} aria-label="Next">
          <ChevronRight size={24} />
        </NextButton>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default function NPCPage() {
  const [npcs, setNpcs] = useState([]);
  const [enemies, setEnemies] = useState([]);
  useEffect(() => {
    const fetchNPCs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/npcs`);
        setNpcs(response.data);
      } catch (error) {
        console.error('Erro ao buscar NPCs:', error);
      }
    };

    const fetchEnemies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/inimigos`);
        setEnemies(response.data);
      } catch (error) {
        console.error('Erro ao buscar inimigos:', error);
      }
    };

    fetchNPCs();
    fetchEnemies();
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <Title>NPCs and Enemies</Title>
        <Carousel title="Characters" items={npcs} />
        <Carousel title="Enemies" items={enemies} />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  background-color: #0f0d0a;
  min-height: 100vh;
  color: #b3a282;
  font-family: 'MedievalSharp', cursive;
  padding: 40px 20%;
    @media (max-width: 1200px) {
    padding: 40px 15%;
  }
  @media (max-width: 768px) {
    padding: 40px 10%;
  }
  @media (max-width: 480px) {
    padding: 40px 5%;
  }
`

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`

const CarouselContainer = styled.div`
  margin-bottom: 40px;
`

const CarouselTitle = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 20px;
`

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`

const Card = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`

const CardTitle = styled.h3`
  color: #d4c4a1;
  font-size: 18px;
  margin-bottom: 5px;
`

const CardSubtitle = styled.p`
  color: #b3a282;
  font-size: 14px;
`

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(44, 36, 22, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #d4c4a1;
  z-index: 1;

  &:hover {
    background: rgba(61, 52, 37, 0.8);
  }

  &:focus {
    outline: 2px solid #b3a282;
    outline-offset: 2px;
  }
`

const PrevButton = styled(CarouselButton)`
  left: 10px;
`

const NextButton = styled(CarouselButton)`
  right: 10px;
`
