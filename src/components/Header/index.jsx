import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  padding: 1rem;
  border-bottom: 2px solid var(--text-color);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Moon Dominion Scrim</h1>
      <Nav>
        <StyledLink to="/offensive">Ofensivo</StyledLink>
        <StyledLink to="/defensive">Defensivo</StyledLink>
        <StyledLink to="/healing">Cura</StyledLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;