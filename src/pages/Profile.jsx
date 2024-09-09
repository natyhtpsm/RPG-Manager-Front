import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { User, Lock, Camera } from 'lucide-react';
import { Header } from '../components/Header.jsx';
import AuthContext from '../functions/context.jsx';
import axios from 'axios';
import Alert from '../components/Alert';

const apiUrl = import.meta.env.VITE_API_URL;

export default function PlayerProfilePage() {
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg?height=150&width=150');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');  // Adiciona o campo para senha atual
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [alert, setAlert] = useState(null); 
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.nome);
      if (parsedUser.foto) {
        setProfilePicture(`data:image/jpeg;base64,${parsedUser.foto}`);
      }
    }
  }, [setUser]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmNewPassword) {
      setAlert({ message: 'Passwords do not match!', type: 'error', duration: 3000 });
      return;
    }
  
    try {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;
  
      if (!token) {
        setAlert({ message: 'User not authenticated', type: 'error', duration: 3000 });
        return;
      }
  
      // Requisição para mudar senha
      const response = await axios.put(`${apiUrl}/changepassword`, {
        currentPassword,  // Enviando senha atual
        newPassword,      // Enviando nova senha
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setAlert({ message: 'Password updated successfully!', type: 'success', duration: 3000 });
      setCurrentPassword('');  // Limpa campo de senha atual
      setNewPassword('');      // Limpa campo de nova senha
      setConfirmNewPassword('');  // Limpa campo de confirmação
  
    } catch (error) {
      if (error.response && error.response.data.message === "Incorrect current password") {
        setAlert({ message: 'Incorrect current password!', type: 'error', duration: 3000 });
      } else {
        setAlert({ message: 'Error updating password', type: 'error', duration: 3000 });
      }
      console.error('Password change failed:', error);
    }
  };
  

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Profile</Title>
        {alert && <Alert message={alert.message} type={alert.type} duration={alert.duration} />}
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
          <PlayerName>{name}</PlayerName>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="password"
                placeholder="Current Password"  // Campo para senha atual
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
            </InputGroup>
            <Button type="submit">Update</Button>
          </Form>
        </ProfileContainer>
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

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(44, 36, 22, 0.8);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 30px;
`;

const ProfilePictureContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #6d5d3f;
`;

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
`;

const PictureUploadInput = styled.input`
  display: none;
`;

const PlayerName = styled.h2`
  color: #d4c4a1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

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
`;

const InputIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a7b5c;
`;

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
`;
