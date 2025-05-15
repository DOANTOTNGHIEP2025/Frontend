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
        height: 50px;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        z-index: 1;
    }

    .image-background {
        border-radius: ${borderRadius.medium} ${borderRadius.medium} 0 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform ${transitions.medium};
        
        &:hover {
            transform: scale(1.05);
        }
    }
`

export const DoctorsRight = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${spacing.lg};
    row-gap: ${spacing.xl};
    
    .card {
        border-radius: ${borderRadius.medium}; 
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
        
        &:hover {
            transform: translateY(-8px);
            box-shadow: ${shadows.large};
            border-color: ${colors.primary};
        }
    }
    }    .content {
        padding: ${spacing.md};
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};
        flex: 1;
    }

    .status {
        display: flex;
        align-items: center;
        font-size: ${typography.sm};
        margin: ${spacing.xs} 0;
        gap: ${spacing.sm};
        color: ${colors.darkGrey};
    }

    .speciality-icon {
        font-size: ${typography.sm};
        color: ${colors.secondary};
        margin-right: ${spacing.xs};
    }
    
    .location-icon {
        font-size: ${typography.sm};
        color: ${colors.secondary};
        margin-right: ${spacing.xs};
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
    }
    .name-style {
        color: #1F2937;         
        font-size: 1.8rem;    
        font-weight: 500;       
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .speciality-style {
        color: #4B5563;        
        font-size: 1.4rem;  
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        text-align: left;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }





`
