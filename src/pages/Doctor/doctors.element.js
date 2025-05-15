import styled from "styled-components";
import {Container} from "../../globalStyles";
import { colors, shadows, borderRadius, spacing, transitions, typography } from '../../globalStyles';

export const DoctorsLayout = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.xl};
    margin: ${spacing.xl} auto;
    max-width: 1200px;
    padding: 0 ${spacing.md};
    
    @media (min-width: 640px) {
        flex-direction: row;
    }
`

export const DoctorsLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
    font-size: ${typography.sm};
    padding: ${spacing.md};
    color: ${colors.darkGrey};
    background: ${colors.white};
    border-radius: ${borderRadius.medium};
    box-shadow: ${shadows.small};
    height: fit-content;
    border: 1px solid ${colors.lightGrey};

    ${({showFilter}) => (showFilter ? 'display: flex;' : 'display: none;')};

    .speciality-button {
        width: 220px;
        padding: ${spacing.sm} ${spacing.md};
        border: 1px solid ${colors.lightGrey};
        border-radius: ${borderRadius.small};
        transition: all ${transitions.fast};
        cursor: pointer;
        color: inherit;
        background: ${colors.white};
        font-size: ${typography.sm};
        text-align: left;
        position: relative;
        
        &:hover {
            border-color: ${colors.primary};
            color: ${colors.primary};
        }
    }

    .speciality-button.selected {
        background: linear-gradient(to right, ${colors.primaryLight}, ${colors.secondaryLight});
        color: ${colors.black};
        font-weight: 500;
        border-color: ${colors.primary};
    }

    @media (min-width: 640px) {
        display: flex;
    }
`
export const ImageContainer = styled.div` 
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 70px;
        background: linear-gradient(to top, rgba(12, 80, 124, 0.6), transparent);
        z-index: 1;
    }

    .image-background {
        border-radius: ${borderRadius.large} ${borderRadius.large} 0 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform ${transitions.medium};
    }
`

export const DoctorsRight = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${spacing.lg};
    row-gap: ${spacing.xl};
    perspective: 1000px;
    
    @keyframes spin {
        from {
            --angle: 0deg;
        }
        to {
            --angle: 360deg;
        }
    }
    
    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }
    
    .card {
        border-radius: ${borderRadius.large}; 
        cursor: pointer;
        transition: all ${transitions.medium}; 
        position: relative;
        background-color: ${colors.white};
        border: 1px solid ${colors.lightGrey};
        box-shadow: ${shadows.small};
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        transform-origin: center bottom;
        
        @property --angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
        }
        
        &:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0, 211, 214, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
            border-color: ${colors.secondary};
            
            &::before {
                display: block;
                animation: 3s spin linear infinite;
            }
            
            .image-background {
                transform: scale(1.05);
            }
            
            .content {
                background: linear-gradient(to bottom, ${colors.white}, ${colors.primaryLight}20);
            }
        }
        
        &:focus, &:active {
            outline: none;
            box-shadow: 0 0 0 3px ${colors.secondary}33, 0 15px 30px rgba(0, 211, 214, 0.15);
            border-color: ${colors.secondary};
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
    }
      .content {
        padding: ${spacing.md};
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};
        flex: 1;
        background: linear-gradient(to bottom, ${colors.white}, ${colors.background});
        border-top: 2px solid ${colors.secondary};
        position: relative;
        transition: all ${transitions.medium};
        
        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, ${colors.secondary}, ${colors.primary});
            transition: width ${transitions.medium};
            opacity: 0;
        }
        
        &:hover {
            &::before {
                width: 100%;
                opacity: 1;
            }
        }
    }.status {
        display: flex;
        align-items: center;
        font-size: ${typography.sm};
        margin: ${spacing.xs} 0;
        gap: ${spacing.sm};
        color: ${colors.darkGrey};
        position: relative;
        padding-left: ${spacing.sm};
        transition: all ${transitions.fast};
        
        &:hover {
            transform: translateX(${spacing.xs});
            color: ${colors.secondary};
        }
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background-color: ${colors.secondary};
            border-radius: 50%;
        }
    }

    .speciality-icon {
        font-size: ${typography.sm};
        color: ${colors.secondary};
        margin-right: ${spacing.xs};
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
    }
    
    .location-icon {
        font-size: ${typography.sm};
        color: ${colors.secondary};
        margin-right: ${spacing.xs};
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
    }
    
    h3 {
        font-size: ${typography.md};
        font-weight: 600;
        color: ${colors.black};
        margin: ${spacing.xs} 0;
        transition: ${transitions.fast};
        
        &:hover {
            color: ${colors.primary};
        }
    }
    
    p {
        font-size: ${typography.sm};
        color: ${colors.darkGrey};
        line-height: 1.6;
    }
        margin-right: 2px;
        color: #4B5563; 
    }

    .dot {
        width: 0.5rem;
        height: 0.5rem;
        background-color: #48BB78;
        border-radius: 50%;
    }    .name-style {
        color: ${colors.primary};         
        font-size: 1.8rem;    
        font-weight: 600;       
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin-bottom: ${spacing.xs};
        transition: color ${transitions.fast};
        position: relative;
        
        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
            transition: width ${transitions.medium};
        }
        
        &:hover {
            color: ${colors.secondary};
            
            &::after {
                width: 50%;
            }
        }
    }
    
    .speciality-style {
        color: ${colors.darkGrey};        
        font-size: 1.4rem;  
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        text-align: left;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-weight: 500;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: ${spacing.md};
    }
`
