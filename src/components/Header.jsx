import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../functions/context.jsx';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));  
    }
  }, [user, setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');  
    localStorage.removeItem('idUser');
    navigate('/signin'); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/lore">Lore</NavLink>
          <NavLink href="/classes">Classes</NavLink>
          <NavLink href="/quests">Missions</NavLink>
          <NavLink href="/skills">Skills</NavLink>
          <NavLink href="/npcs">NPCs</NavLink>
        </NavLinks>
        <UserMenu onClick={toggleDropdown}>
          {user ? (
            <UserAvatar>
              <img
                src={user.foto ? `data:image/jpeg;base64,${user.foto}` : "/placeholder-user.jpg"}
                alt="User Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </UserAvatar>
          ) : (
            <UserIcon>
              <User size={24} />
            </UserIcon>
          )}
          <ChevronDown size={16} style={{ color: '#b3a282', marginLeft: '5px' }} />
          <DropdownMenu isOpen={isDropdownOpen}>
            {user ? ( 
              <>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Characters</DropdownItem>
                <DropdownItem>Inventory</DropdownItem>
                <DropdownItem>Quests</DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </DropdownItem>
              </>
            ) : (
              <DropdownItem onClick={() => navigate('/signin')}>Login</DropdownItem>
            )}
          </DropdownMenu>
        </UserMenu>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom, #2c2416 0%, #1a1610 100%);
  padding: 10px 0;
  border-bottom: 2px solid #3d3425;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled.a`
  color: #b3a282;
  text-decoration: none;
  padding: 10px 20px;
  font-family: 'MedievalSharp', cursive;
  font-size: 18px;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #d4c4a1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #6d5d3f;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80%;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserIcon = styled.div`
  color: #b3a282;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #d4c4a1;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #b3a282;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #2c2416;
  border: 1px solid #3d3425;
  border-radius: 5px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 10;
`;

const DropdownItem = styled.div`
  color: #b3a282;
  padding: 10px 20px;
  font-family: 'MedievalSharp', cursive;
  font-size: 16px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #3d3425;
  }
`;
