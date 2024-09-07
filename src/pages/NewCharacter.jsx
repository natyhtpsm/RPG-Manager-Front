import React, { useState } from 'react'
import styled from 'styled-components'
import { User, Camera, ChevronDown } from 'lucide-react'

export default function CreateCharacterPage() {
  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Character created:', { name, characterClass, image })
  }

  return (
    <PageContainer>
      <Title>Create New Character</Title>
      <Form onSubmit={handleSubmit}>
        <ImageUploadLabel htmlFor="character-image">
          {image ? (
            <ImagePreview src={image} alt="Character Preview" />
          ) : (
            <Camera size={40} color="#8a7b5c" />
          )}
        </ImageUploadLabel>
        <ImageUploadInput
          id="character-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <InputGroup>
          <Input
            type="text"
            placeholder="Character Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputIcon>
            <User size={20} />
          </InputIcon>
        </InputGroup>
        <SelectWrapper>
          <Select
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Cleric">Cleric</option>
            <option value="Ranger">Ranger</option>
          </Select>
        </SelectWrapper>
        <Button type="submit">Create Character</Button>
      </Form>
    </PageContainer>
  )
}

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

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 30px;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  background-color: rgba(179, 162, 130, 0.1);
  border: 1px solid #3d3425;
  border-radius: 4px;
  color: #d4c4a1;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #6d5d3f;
  }

  &::placeholder {
    color: #8a7b5c;
  }
`

const InputIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a7b5c;
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  background-color: rgba(179, 162, 130, 0.1);
  border: 1px solid #3d3425;
  border-radius: 4px;
  color: #d4c4a1;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  appearance: none;

  &:focus {
    border-color: #6d5d3f;
  }
`

const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #8a7b5c;
    pointer-events: none;
  }
`

const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border: 2px dashed #6d5d3f;
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #8a7b5c;
  }
`

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

const ImageUploadInput = styled.input`
  display: none;
`

const Button = styled.button`
  width: 100%;
  background: linear-gradient(to bottom, #6d5d3f 0%, #4a3f2b 100%);
  color: #d4c4a1;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to bottom, #7d6d4f 0%, #5a4f3b 100%);
  }

  &:focus {
    outline: 2px solid #b3a282;
    outline-offset: 2px;
  }
`