import React, { useState } from 'react'
import styled from 'styled-components'
import { User, Lock, Camera } from 'lucide-react'

export default function PlayerProfilePage() {
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg?height=150&width=150')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Password change submitted')
  }

  return (
    <PageContainer>
      <Title>Player Profile</Title>
      <ProfileContainer>
        <ProfilePictureContainer>
          <ProfilePicture src={profilePicture} alt="Player Avatar" />
          <PictureUploadLabel htmlFor="picture-upload">
            <Camera size={20} color="#d4c4a1" />
          </PictureUploadLabel>
          <PictureUploadInput
            id="picture-upload"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </ProfilePictureContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
          </InputGroup>
          <Button type="submit">Update Profile</Button>
        </Form>
      </ProfileContainer>
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

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 30px;
`

const ProfilePictureContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
`

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #6d5d3f;
`

const PictureUploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #6d5d3f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8a7b5c;
  }
`

const PictureUploadInput = styled.input`
  display: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  position: relative;
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

const Button = styled.button`
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