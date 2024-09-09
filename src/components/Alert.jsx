import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 8px;
  font-family: 'MedievalSharp', cursive;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  background-color: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'rgba(76, 175, 80, 0.9)';
      case 'error':
        return 'rgba(244, 67, 54, 0.9)';
      default:
        return 'rgba(33, 150, 243, 0.9)';
    }
  }};
  color: #fff;
  border: 2px solid ${({ type }) => {
    switch (type) {
      case 'success':
        return '#2e7d32';
      case 'error':
        return '#c62828';
      default:
        return '#1565c0';
    }
  }};
`

const Alert = ({ message, duration = 3000, type = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <AlertContainer isVisible={isVisible} type={type} role="alert" aria-live="assertive">
      {message}
    </AlertContainer>
  )
}

export default Alert
