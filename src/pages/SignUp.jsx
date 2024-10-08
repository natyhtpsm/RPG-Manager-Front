import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../functions/context';
import { User, Lock, Image as ImageIcon } from 'lucide-react';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); 
  const { setUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();  
    formData.append('nome', username);
    formData.append('senha', password);
    formData.append('foto', profileImage); 

    try {
      const res = await axios.post(`${url}/sign-up`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newUser = {
        token: res.data.token,
        username: res.data.username,
        foto: res.data.foto,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/signin");

    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro ao realizar cadastro. Verifique suas informações.');
    }
  };

  return (
    <PageContainer>
      <SignUpCard>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSignUp}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
            />
            <InputIcon>
              <User size={20} />
            </InputIcon>
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
          </InputGroup>
          <InputGroup>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload} 
              required
              aria-label="Profile Image"
            />
            <InputIcon>
              <ImageIcon size={20} />
            </InputIcon>
          </InputGroup>
          <Button type="submit">Create Account</Button>
        </Form>
        <ForgotPassword href="/signin">Already have an account? Sign In</ForgotPassword>
      </SignUpCard>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: #0f0d0a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'MedievalSharp', cursive;
`;

const SignUpCard = styled.div`
  background: rgba(44, 36, 22, 0.9);
  border: 2px solid #3d3425;
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #d4c4a1;
  font-size: 28px;
  text-align: center;
  margin-bottom: 24px;
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

const ForgotPassword = styled.a`
  color: #b3a282;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin-top: 16px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;
