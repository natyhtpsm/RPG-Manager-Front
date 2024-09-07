import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '../components/Header.jsx';
import MapPic from '../assets/map.png'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; 

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const clonedItems = [...items, ...items]; // Clonando os itens para permitir loop infinito
  const trackRef = useRef(null);

  const handleTransitionEnd = () => {
    if (currentIndex === items.length || currentIndex === -1) {
      setTransitionEnabled(false); // Desabilitamos a transição para mudar rapidamente
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
    <CarouselWrapper>
      <CarouselTrack
        ref={trackRef}
        style={{
          transform: `translateX(-${currentIndex * 270}px)`,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {clonedItems.map((region, index) => (
          <CityCard key={index}>
            <CityImage src={`data:image/${region.fileType};base64,${region.foto}`} alt={region.nome} />
            <CityName>{region.nome}</CityName>
          </CityCard>
        ))}
      </CarouselTrack>
      <PrevButton onClick={prevSlide} aria-label="Previous city">
        <ChevronLeft size={24} />
      </PrevButton>
      <NextButton onClick={nextSlide} aria-label="Next city">
        <ChevronRight size={24} />
      </NextButton>
    </CarouselWrapper>
  );
};

export default function LorePage() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/regions`);
        setRegions(response.data);
      } catch (error) {
        console.error('Erro ao buscar regiões:', error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <>
        <Header />
        <PageContainer>
        <Title>BG3 - Lore</Title>
        <MapContainer>
            <Map src={MapPic} alt="Map of bg3" />
        </MapContainer>
        
        <CarouselContainer>
            <CarouselTitle>Regions of Faerûn</CarouselTitle>
            <Carousel items={regions} />
        </CarouselContainer>
        
        <LoreSection>
            <LoreTitle>The Chronicles of Faerûn</LoreTitle>
            <LoreContent>
            <p>
              The land of Faerûn is in turmoil.
            </p>
            <p>

            </p>
              Refugees cross the wilds, fleeing the hell torn stronghold of Elturel. A vicious cult marches across the Sword Coast, uniting every race of monsters and men under the banner of a cryptic god they call the Absolute. Chaos strikes at Faerûn's foundations, and none may escape its talons.

              Not even you.

              The grotesque nautiloid ship appears out of nowhere, blotting out the sun. Its writhing tentacles snatch you from where you stand. The mind flayers have come, imprisoning you on their ship, infecting you with their horrid parasite. You will become one of them.

            <p>

              By fate or fortune, you survive when the nautiloid crashes in the Sword Coast outlands. You set out for civilization, desperate for a cure for the parasite festering in your brain, only to take center stage in a conspiracy that runs as deep as the Nine Hells.

              New enemies await.

            </p>
            <p>
              As for old foes... the shadows stir.
              And all roads lead to the legendary city of Baldur's Gate.
            </p>
            </LoreContent>
        </LoreSection>
        </PageContainer>
    </>

  )
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

const MapContainer = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Map = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
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

const CityCard = styled.div`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  min-width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const CityImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`

const CityName = styled.h3`
  color: #d4c4a1;
  font-size: 18px;
  margin-bottom: 5px;
`

const CityDescription = styled.p`
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

const LoreSection = styled.section`
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const LoreTitle = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  margin-bottom: 20px;
`

const LoreContent = styled.div`
  color: #b3a282;
  font-size: 16px;
  line-height: 1.6;

  p {
    margin-bottom: 15px;
  }
`
