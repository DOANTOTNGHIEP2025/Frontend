import styled from 'styled-components';
import {Container} from "../../globalStyles";
import { colors, shadows, borderRadius, spacing, transitions, typography } from '../../globalStyles';

export const BodyPic = styled.div`
    width: 100%; 
    height: 60vh;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 120px;
        background: linear-gradient(to top, ${colors.background}, rgba(232, 245, 245, 0.5), transparent);
        z-index: 1;
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: linear-gradient(to bottom, rgba(12, 80, 124, 0.4), transparent);
        z-index: 1;
    }
    
    .pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform ${transitions.slow};
        filter: saturate(1.1);
        
        &:hover {
            transform: scale(1.05);
        }
    }
`;

export const Info = styled.div`
    width: 100%;
    background: linear-gradient(135deg, ${colors.background}, ${colors.white}, ${colors.background});
    background-size: 200% 200%;
    animation: gradientMove 10s ease infinite;
    min-height: 450px;
    display: flex;
    padding: ${spacing.xxl} 0;
    justify-content: center;
    align-items: center;
    overflow: visible;
    position: relative;
    
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        height: 10px;
        background: ${colors.background};
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    }
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  width: 90%;
  max-width: 1400px;
`;

export const InfoSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    flex-wrap: wrap;
    gap: ${spacing.xl};
`;

export const InfoItem = styled.div`
  z-index: 2 !important;
  color: ${colors.black};
  width: 300px;
  height: 140px;
  background: ${colors.white};
  border-radius: 0 0 ${borderRadius.medium} ${borderRadius.medium};
  box-shadow: ${shadows.small};
  position: absolute;
  top: 180px;
  left: 0px;
  transition: all ${transitions.medium};
  padding: ${spacing.md};
  
  p {
    color: ${colors.darkGrey};
    font-size: ${typography.sm};
    margin: ${spacing.xs} 0;
    line-height: 1.5;
  }

  .title {
    margin-top: ${spacing.xs};
    color: ${colors.black};
    font-size: ${typography.md};
    font-weight: 600;
    margin-bottom: ${spacing.xs};
  }
`;


export const InfoPic = styled.div`
  position: absolute;
  z-index: 3 !important;
  width: 300px;
  height: 200px;
  border-radius: ${borderRadius.medium} ${borderRadius.medium} 0 0;
  background: ${colors.primary};
  overflow: hidden;
  box-shadow: ${shadows.small};
  
  .pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${transitions.medium};
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const InfoWrapper = styled.div`
  width: 300px;
  overflow: visible;
  background: transparent;
  border-radius: ${borderRadius.medium};
  position: relative;
  margin-bottom: 160px;
  cursor: pointer;
  transition: all ${transitions.medium}; 
  
  &:hover {
    transform: translateY(-10px);
    
    ${InfoPic} {
      box-shadow: ${shadows.medium};
    }
    
    ${InfoItem} {
      box-shadow: ${shadows.medium};
    }
  }
`;

export const News = styled.div`
  padding: ${spacing.xl} 0 ${spacing.xxl};
  overflow: visible;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.white};
`;

export const NewsHeader = styled.div`
  color: ${colors.primary};
  font-size: ${typography.xl};
  font-weight: 600;
  position: relative;
  padding-bottom: ${spacing.md};
  margin-bottom: ${spacing.lg};
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    border-radius: ${borderRadius.full};
    background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
  }
  
  .lower-header {
    color: ${colors.darkGrey};
    font-size: ${typography.md};
    margin-top: ${spacing.sm};
    font-weight: 400;
  }
`;

export const NewsHeaderWrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin-bottom: ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewsSection = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: ${spacing.xl};
    width: 80%;
    max-width: 1200px;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
`;

export const NewItem1 = styled.div`
  color: ${colors.black};
  width: 49%;
  margin-top: ${spacing.md};
  height: 550px;
  background: ${colors.white};
  cursor: pointer;
  border-radius: ${borderRadius.medium};
  border: 1px solid ${colors.lightGrey};
  transition: all ${transitions.medium};
  box-shadow: ${shadows.small};
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.large};
  }
  
  p {
    color: ${colors.darkGrey};
    font-size: ${typography.sm};
  }
  
  .title {
    color: ${colors.black};
    font-size: ${typography.md};
    font-weight: 600;
    margin: ${spacing.md} ${spacing.md} ${spacing.xs};
  }
  
  .content1 {
    font-weight: 400;
    font-size: ${typography.sm};
    color: ${colors.darkGrey};
    margin: ${spacing.sm} ${spacing.md};
    line-height: 1.6;
    height: 3.2rem;
    overflow: hidden;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const NewPicItem1 = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.2));
    z-index: 1;
    pointer-events: none;
  }
  
  .pic {
    width: 100%;
    height: 100%;
    transition: all ${transitions.medium};
    object-fit: cover;
    
    &:hover {
       transform: scale(1.05);
    }
  }
`;

export const NewItem2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin: ${spacing.md} 0;
  justify-content: space-between;
  gap: ${spacing.md};
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const NewPicAndContent = styled.div`
  display: flex;
  background: ${colors.white};
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  box-shadow: ${shadows.small};
  transition: all ${transitions.medium};
  border: 1px solid ${colors.lightGrey};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.medium};
  }
`;

export const NewPicItem2 = styled.div`
    width: 200px;
    height: 120px;
    overflow: hidden;
    flex-shrink: 0;
    
    .pic2 {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all ${transitions.medium};
        
        &:hover {
            transform: scale(1.05);
        }
    }
`;

export const NewsTitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.md};
  flex: 1;
 
  .title {
    color: ${colors.secondary};
    font-size: ${typography.md};
    font-weight: 600;
    margin-bottom: ${spacing.xs};
    transition: ${transitions.fast};
    
    &:hover {
      color: ${colors.primary};
    }
  }
  
  .content {
    font-weight: 400;
    font-size: ${typography.sm};
    color: ${colors.darkGrey};
    line-height: 1.6;
    height: 4.8rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow-wrap: break-word;
  }
`;

export const NewsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${spacing.xl} 0;
`;

export const NewButton = styled.button`
  color: ${colors.white};
  background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
  width: 180px;
  height: 50px;
  font-size: ${typography.md};
  font-weight: 500;
  border-radius: ${borderRadius.full};
  border: none;
  cursor: pointer;
  transition: all ${transitions.medium};
  box-shadow: ${shadows.small};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.8s;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.medium};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

