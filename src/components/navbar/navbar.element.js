import styled from 'styled-components';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const Nav = styled.nav`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  box-shadow: ${shadows.medium};
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1002;
  transition: all ${transitions.medium};
  margin-bottom: 0;
  padding-bottom: 0;
  
  &.scrolled {
    height: 70px;
    box-shadow: ${shadows.large};
  }
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  
  ${Container}
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${colors.primary};
    transition: color ${transitions.fast};
    
    &:hover {
      color: ${colors.primaryDark};
    }
  }
`;

export const NavLogo = styled.div`
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 240px;
  height: 60px;
  transition: all ${transitions.medium};    .logo-image {
        width: 240px;
        height: 60px;
        object-fit: contain;
    }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  gap: ${spacing.md};
  position: relative;
  z-index: 5000;
  margin: 0;
  padding: 0;
  
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - 80px);
    position: absolute;
    top: 80px;
    left: ${({click}) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background-color: ${colors.white};
    box-shadow: ${shadows.large};
    padding: ${spacing.lg} 0;
  }
  .Button-container {
    background-color: ${colors.white};
    position: absolute;
    top: 110%;
    right: 0;
    width: 260px;
    display: none; /* Hide by default */
    flex-direction: column;
    gap: ${spacing.sm};
    padding: ${spacing.md};
    border-radius: ${borderRadius.medium};
    box-shadow: ${shadows.large};
    z-index: 9999;
    border: 1px solid ${colors.lightGrey};
    &::after{
      content: '';
      position: absolute;
      top: -8px;
      right: 20px;
      width: 16px;
      height: 16px;
      background-color: ${colors.white};
      transform: rotate(45deg);
      border-left: 1px solid ${colors.lightGrey};
      border-top: 1px solid ${colors.lightGrey};
    }
  }

  .profile_image:hover + .Button-container,
  .Button-container:hover {
    display: flex;
  }

  .user-email{
    font-size: 1.1rem;
    font-weight: 600;
    color: ${colors.black};
    margin-right: ${spacing.sm};
    z-index: 9999;
  }

  .profile_image {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001;
    border: 2px solid ${colors.primary};
    transition: all ${transitions.fast};
    
    &:hover {
      border-color: ${colors.primaryDark};
      transform: scale(1.05);
    }
  }

.profile-buttons {
  width: 100%;
  padding: ${spacing.md} ${spacing.lg};
  border: none;
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: ${borderRadius.small};
  cursor: pointer;
  transition: all ${transitions.fast};
  color: ${colors.black};

  svg {
    margin-right: ${spacing.sm};
    font-size: 1rem;
  }

  &:hover {
    background-color: ${colors.primaryLight};
    color: ${colors.primary};
  }
}

.profile-options button {
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: ${borderRadius.medium};
  transition: all ${transitions.medium};
  font-weight: 500;
  box-shadow: ${shadows.small};
}

.profile-options button:hover {
  background-color: ${colors.primaryDark};
  box-shadow: ${shadows.medium};
  transform: translateY(-2px);
}
`;

export const NavItem = styled.li`
  font-size: 15px;
  display: flex;
  align-items: center;
  position: relative;
  padding: ${spacing.sm} ${spacing.md};
  transition: all ${transitions.medium};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${colors.primary};
    transition: width ${transitions.medium};
  }

  &:hover::after, &.active::after {
    width: 70%;
  }
  
  &:hover {
    color: ${colors.primary};
  }
  
  &.active {
    color: ${colors.primary};
    font-weight: 500;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    padding: ${spacing.md};
    border-bottom: 1px solid ${colors.lightGrey};
    
    &::after {
      display: none;
    }
    
    &:hover, &.active {
      background-color: ${colors.primaryLight};
    }
  }
`;

export const NavItemBtn = styled.li`
  display: flex;
  align-items: center;
  margin-left: ${spacing.md};
  
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: ${spacing.md};
    margin-left: 0;
    border-top: 1px solid ${colors.lightGrey};
  }
`;

export const NavLinks = styled.p`
  color: ${colors.black};
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: color ${transitions.fast};
  
  svg {
    margin-right: ${spacing.xs};
  }

  &:hover {
    color: ${colors.primary};
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    
    svg {
      margin-right: ${spacing.sm};
      font-size: 1.2rem;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: ${spacing.sm} ${spacing.md};
  font-weight: 500;
  transition: all ${transitions.medium};
  color: ${colors.white};
  background-color: ${colors.primary};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.small};
  
  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
    color: ${colors.white};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const NavBtnLink2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: ${spacing.md} ${spacing.lg};
  font-weight: 600;
  transition: all ${transitions.medium};
  background-color: ${colors.white};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: ${borderRadius.medium};
  margin-left: ${spacing.sm};
  font-size: 1.1rem;
  
  &:hover {
    background-color: ${colors.primaryLight};
    transform: translateY(-2px);
    box-shadow: ${shadows.small};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const GroupButtonLink = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  @media screen and (max-width: 960px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: ${spacing.md};
  }
`

export const NavLinks2 = styled(Link)`
    color: ${colors.white};
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    font-size: 1.35rem;
    font-weight: 500;
    z-index: 1002;
    position: relative;
    transition: all ${transitions.medium};
    
    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 3px;
        background: ${colors.white};
        transition: width ${transitions.medium};
        border-radius: ${borderRadius.full};
    }

    &.active {
        color: ${colors.white};
        
        &::after {
            width: 60%;
        }
    }

    &:hover {
        color: ${colors.white};
        
        &::after {
            width: 60%;
        }
    }

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 1rem;
        width: 100%;
        display: table;

        &:hover {
            color: ${colors.white};
            transition: all 0.3s ease;
        }
    }
`;


export const NavbarContainer2 = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;

  ${Container}
`;

export const Nav2 = styled.nav`
  background: linear-gradient(135deg, ${colors.secondary}, ${colors.primary});
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  position: fixed;
  width: 100%;
  top: 90px;
  left: 0;
  z-index: 1000;
  box-shadow: ${shadows.medium};
`;

export const NavItem2 = styled.li`

  font-size: 16px;
  display: inline-block;
  position: relative;
  margin: 0 25px;
  z-index: 1001;
  

  .active {
    background-color: #00A6A9;
    color: white;
    transition: all 0.3s ease;
  }

  .button {
    display: inline-block;
    margin: 4px 2px;
    background-color: #fff;
   padding-left: 32px;
    padding-right: 32px; 
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .button:hover {
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    background-color: #00A6A9;
    color: white;
  }
  .search-container {
    position: relative;
    display: inline-block;
    margin: 4px 2px;
    height: 48px;
    width: 48px;
    vertical-align: bottom;
  }

  .mglass {
    display: inline-block;
    pointer-events: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
  }
  .searchbutton {
    position: absolute;
    font-size: 26px;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .search:focus + .searchbutton {
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    background-color: #00A6A9;
    color: white;
  }

  .search {
    position: absolute;
    left: 49px; /* Button width-1px (Not 50px/100% because that will sometimes show a 1px line between the search box and button) */
    background-color: #00A6A9;
    outline: none;
    border: none;
    padding: 0;
    width: 0;
    height: 100%;
    z-index: 10;
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    color: white
  }

  .search::placeholder {
    color: white; /* Change placeholder text color to white */
    opacity: 1; /* Ensures the color shows fully */
  }
  .search:focus {
    width: 240px; /* Bar width+1px */
    padding: 0 16px 0 0;
  }

  .expandright {
    left: auto;
    right: 39px; /* Button width-1px */
  }

  .expandright:focus {
    padding: 0 0 0 16px;
  }
  
  //&::after {
  //  content: '';
  //  width: 0;
  //  height: 2px;
  //  background: #fff;
  //  display: block;
  //  margin: auto;
  //  transition: width 0.5s;
  //}
  //
  //&:hover::after{
  //  width: 100%;
  //}

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;
