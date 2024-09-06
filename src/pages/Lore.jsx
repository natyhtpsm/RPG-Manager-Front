import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

const cities = [
  {
    name: 'Eldoria',
    image: '/placeholder.svg?height=150&width=250',
    description: 'The shining capital of the realm, known for its towering spires and magical academies.'
  },
  {
    name: 'Shadowhaven',
    image: '/placeholder.svg?height=150&width=250',
    description: 'A mysterious port city shrouded in mist, home to skilled rogues and merchants.'
  },
  {
    name: 'Ironhold',
    image: '/placeholder.svg?height=150&width=250',
    description: 'A dwarven stronghold carved into the mountains, famed for its master craftsmen.'
  },
  {
    name: 'Sylvandale',
    image: '/placeholder.svg?height=150&width=250',
    description: 'An elven city nestled in the heart of the ancient forest, in harmony with nature.'
  },
  {
    name: 'Stormhaven',
    image: '/placeholder.svg?height=150&width=250',
    description: 'A coastal fortress city, home to the realm\'s navy and weather mages.'
  }
]

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  return (
    <CarouselWrapper>
      <CarouselTrack style={{ transform: `translateX(-${currentIndex * 270}px)` }}>
        {items.map((city, index) => (
          <CityCard key={index}>
            <CityImage src={city.image} alt={city.name} />
            <CityName>{city.name}</CityName>
            <CityDescription>{city.description}</CityDescription>
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
  )
}

export default function LorePage() {
  return (
    <PageContainer>
      <Title>Realm of Mythoria: Lore and Legends</Title>
      
      <MapContainer>
        <Map src="/placeholder.svg?height=400&width=800" alt="Map of Mythoria" />
      </MapContainer>
      
      <CarouselContainer>
        <CarouselTitle>Cities of Mythoria</CarouselTitle>
        <Carousel items={cities} />
      </CarouselContainer>
      
      <LoreSection>
        <LoreTitle>The Chronicles of Mythoria</LoreTitle>
        <LoreContent>
          <p>
            In the realm of Mythoria, where magic flows like rivers and ancient prophecies shape the fate of nations, 
            a delicate balance has long existed between the forces of light and shadow. For millennia, the five great 
            cities have stood as bastions of civilization, each with its own unique character and role in the grand 
            tapestry of the realm.
          </p>
          <p>
            Eldoria, the shining jewel of Mythoria, has long been the seat of power for the High Council of Mages. 
            Its gleaming spires reach towards the heavens, housing countless libraries of arcane knowledge and 
            academies where aspiring spellcasters hone their craft. The city pulses with magical energy, and it is 
            said that even the streets themselves are imbued with enchantments of protection and prosperity.
          </p>
          <p>
            To the west, shrouded in perpetual mist, lies the enigmatic port city of Shadowhaven. Here, in narrow 
            alleys and hidden coves, the Guild of Shadows conducts its clandestine affairs. The city is a haven for 
            those seeking to disappear or to uncover secrets, and its markets are renowned for rare and often 
            dangerous artifacts from across the realm and beyond.
          </p>
          <p>
            But now, as an ancient evil stirs in the depths of the Abyssal Chasm, the realm faces its greatest 
            challenge in a thousand years. Heroes must rise, alliances must be forged, and the true mettle of 
            Mythoria will be tested in the crucible of destiny.
          </p>
        </LoreContent>
      </LoreSection>
    </PageContainer>
  )
}