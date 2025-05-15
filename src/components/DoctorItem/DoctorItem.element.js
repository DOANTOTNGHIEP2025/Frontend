import styled from "styled-components";
import { colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const RelatedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${colors.black};
    margin: 0;
`

export const RelateDisplay = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${spacing.lg};
    
    @media (min-width: 640px) {
        padding: ${spacing.md} 0;
    }
`

export const RelatedCard = styled.div`
    border-radius: ${borderRadius.large};
    cursor: pointer;
    transition: all ${transitions.medium};
    height: 100%;
    width: 250px;
    position: relative;
    background-color: ${colors.white};
    box-shadow: ${shadows.small};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.lightGrey};
    
    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: ${shadows.large};
        border-color: ${colors.secondary};
        
        &::before {
            display: block;
            animation: 3s spin linear infinite;
        }
        
        .img-custom {
            transform: scale(1.05);
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: conic-gradient(from var(--angle), ${colors.primary}, ${colors.secondary}, ${colors.primary});
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        z-index: -1;
        padding: 3px;
        border-radius: ${borderRadius.large}; 
        display: none;
        filter: blur(1.5rem);
        opacity: 0.5;
    }
    
    @keyframes spin {
       from {
         --angle: 0deg;
       }
       to {
         --angle: 360deg;
       }
    }
  
    .info-custom {
        padding: ${spacing.md};
        background: linear-gradient(to bottom, ${colors.white}, ${colors.background});
        border-bottom-left-radius: ${borderRadius.large};
        border-bottom-right-radius: ${borderRadius.large};
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};
        border-top: 2px solid ${colors.secondary};
    }

    .name-doc {
        color: ${colors.primary}; 
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: ${spacing.xs};
        transition: color ${transitions.fast};
        
        &:hover {
            color: ${colors.secondary};
        }
    }
        
    .speciality-doc {
        color: ${colors.darkGrey};
        font-size: 1.6rem;
        font-weight: 500;
        position: relative;
        padding-left: ${spacing.md};
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background-color: ${colors.secondary};
            border-radius: 50%;
        }
    }
        
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 340px;
    position: relative;
    overflow: hidden;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(to top, rgba(12, 80, 124, 0.5), transparent);
        z-index: 1;
    }    .img-custom {
        border-top-left-radius: ${borderRadius.large};
        border-top-right-radius: ${borderRadius.large};
        background-color: ${colors.primaryLight};
        object-fit: cover;
        object-position: top center; /* Focus on the top part of the image (face) */
        height: 340px;
        width: 100%;
        transition: transform ${transitions.medium};
    }
`
