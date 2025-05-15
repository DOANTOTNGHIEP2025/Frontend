import styled from 'styled-components';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.primary});
  background-size: 300% 300%;
  animation: gradientShift 15s ease infinite;
  padding: ${spacing.xxl} 0 ${spacing.xl} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  box-shadow: 0 -5px 15px rgba(0, 211, 214, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${colors.secondary}, ${colors.primary}, ${colors.secondary});
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const FooterContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 0 ${spacing.xl};

  @media screen and (max-width: 820px) {
    padding: 0 ${spacing.lg};
    padding-top: ${spacing.xl};
  }
  
  @media screen and (max-width: 576px) {
    padding: 0 ${spacing.md};
    padding-top: ${spacing.lg};
  }
`;

export const FooterContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FooterContentItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${spacing.xl};
  text-align: left;
  width: 230px;
  box-sizing: border-box;
  color: ${colors.white};
  @media screen and (max-width: 768px) {
    margin: 0 0 ${spacing.lg} 0;
    width: calc(50% - ${spacing.md});
  }
  
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const FooterContentTitle = styled.h3`
  margin-bottom: ${spacing.md};
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  padding-bottom: ${spacing.xs};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, ${colors.secondary}, rgba(255, 255, 255, 0.5));
    border-radius: ${borderRadius.full};
  }
`;

export const FooterContent = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${spacing.sm};
  font-size: 0.9rem;
  transition: color ${transitions.fast};
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    margin-right: ${spacing.xs};
    font-size: 1rem;
  }

  &:hover {
    color: ${colors.white};
  }
`;

export const SocialMedia = styled.section`
  max-width: 1200px;
  width: 100%;
  padding: 0 ${spacing.xl};
  margin-top: ${spacing.lg};
  
  @media screen and (max-width: 820px) {
    padding: 0 ${spacing.lg};
  }
  
  @media screen and (max-width: 576px) {
    padding: 0 ${spacing.md};
  }
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: ${spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: ${spacing.lg};
  }
`;

export const MedicalLogoContainer = styled.div`
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 180px;
  transition: transform ${transitions.medium};
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .logo {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;


export const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${spacing.md};
`;

export const SocialIconContent = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 22px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all ${transitions.medium};
  
  &:hover {
    color: ${colors.white};
    background-color: ${colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: ${shadows.medium};
  }
`;

export const FooterContentWraperLower = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-top: ${spacing.lg};
  width: 100%;
  padding-top: ${spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`
