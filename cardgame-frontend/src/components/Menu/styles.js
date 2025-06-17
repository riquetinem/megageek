import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  height: 60px; /* Altura fixa para a navbar */
`;

export const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 2rem;
    height: 0.25rem;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavLinksContainer = styled.div.attrs({
  className: ({ $isOpen }) => $isOpen ? 'open' : 'closed'
})`
  position: fixed;
  top: 60px; /* Abaixo da navbar */
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #2c3e50;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 5;
  padding: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (min-width: 768px) {
    transform: none;
    position: static;
    width: auto;
    height: auto;
    background: transparent;
    box-shadow: none;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 768px) {
    margin: 0 8px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
`;

export const LogoutButton = styled.button`
  color: #fff;
  background: #e74c3c;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  margin-top: 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: #c0392b;
  }

  @media (min-width: 768px) {
    width: auto;
    margin: 0 8px;
    padding: 8px 12px;
  }
`;