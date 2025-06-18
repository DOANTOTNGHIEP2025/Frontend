import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, transitions, typography } from '../../globalStyles';

export const RLayout = styled.div`
    width: 100%;
    display: flex;
    overflow: visible;
    flex-direction: column;
    margin: 0;
    background-color: ${colors.background};
`

export const RHeader = styled.div`
    height: 200px;
    position: relative;
`

export const Deco = styled.div`
    position: absolute;
    top: -200px;
    width: 100%;
    height: 400px;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    border-radius: ${borderRadius.extraLarge};
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: ${shadows.medium};

    p {
        color: ${colors.white};
        font-size: ${typography.xl};
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    img {
        width: 120px;
        height: 120px;
        margin-top: 200px;
        cursor: pointer;
        transition: ${transitions.medium};
        
        &:hover {
            transform: scale(1.05);
        }
    }
`
export const RSpace = styled.div`
    flex: 1;
    display: flex;
`

export const RBody = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: ${spacing.xl} ${spacing.md};
`

export const RContent = styled.div`
    display: flex;
    width: 100%;
    gap: ${spacing.xl};
    background-color: ${colors.white};
    border-radius: ${borderRadius.large};
    box-shadow: ${shadows.medium};
    padding: ${spacing.xl};
    
    @media (max-width: 1024px) {
       flex-direction: column;
       align-items: center;
    }
`

export const RButton = styled.div`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    
    button {
        background: ${colors.primary};
        color: ${colors.white};
        font-size: ${typography.md};
        font-weight: 600;
        width: 30%;
        min-width: 200px;
        height: 48px;
        border: none;
        cursor: pointer;
        border-radius: ${borderRadius.full};
        box-shadow: ${shadows.small};
        transition: ${transitions.medium};
        
        &:hover {
           background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.secondaryLight});
           box-shadow: ${shadows.medium};
           transform: translateY(-2px);
        }
        
        &:active {
           transform: translateY(0);
        }
    }
`

export const RLink = styled.div`
    margin-bottom: ${spacing.xl};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${typography.md};

    p {
        color: #0C507C;
        text-align: center;
        font-size: ${typography.md};
        margin-right: ${spacing.xs};
    }

    h5 {
        color: #0C507C;
        text-align: center;
        font-size: ${typography.md};
        font-weight: 500;
        transition: ${transitions.fast};
        font-size: 1.5rem;
        
        &:hover {
            color: ${colors.primary};
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

export const RBodyL = styled.div`
    width: 48%;
    padding: ${spacing.md};

    input {
        width: 100%;
        height: 48px;
        border: 1px solid ${colors.lightGrey};
        border-radius: ${borderRadius.medium};
        margin-top: ${spacing.sm};
        padding: 0 ${spacing.md};
        font-size: ${typography.sm};
        transition: ${transitions.fast};
        background-color: ${colors.white};
        
        &:focus {
            border-color: ${colors.primary};
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 166, 169, 0.1);
        }
        
        &:hover {
            border-color: ${colors.primary};
        }
    }

    @media (max-width: 1024px) {
       padding-bottom: 0;
       width: 80%;
    }

    @media (max-width: 740px) {
       padding-bottom: 0;
       width: 100%;
    }
`

export const RBodyLItem = styled.div`
    margin: ${spacing.md} ${spacing.md} 0;
    font-size: ${typography.md};
    font-weight: 500;
    color: ${colors.primary};
`

export const RBodyLItem2 = styled.div`
    display: flex;
    width: calc(100% - ${spacing.lg});
    align-items: center;
    background-color: ${colors.white};
    border-radius: ${borderRadius.medium};
    border: 1px solid ${colors.lightGrey};
    margin: ${spacing.sm} ${spacing.md} ${spacing.md};
    position: relative;
    transition: ${transitions.fast};
    
    &:focus-within {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(0, 166, 169, 0.1);
    }
    
    &:hover {
        border-color: ${colors.primary};
    }
    
    input {
        display: block;
        width: 100%; 
        margin: 0;
        padding: ${spacing.sm} ${spacing.xl} ${spacing.sm} ${spacing.md};
        border-radius: ${borderRadius.medium};
        border: none;
        font-size: ${typography.sm};
        
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
    
    input[type="password"]::-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: black !important;
    }
    
    .eye-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: ${spacing.sm};
        font-size: ${typography.md};
        cursor: pointer;
        color: ${colors.darkGrey};
        transition: ${transitions.fast};
        
        &:hover {
           color: ${colors.primary};
        }
    }
`

export const RBodyR = styled.div`
    width: 48%;
    padding: ${spacing.md};

    input, select {
        width: 100%;
        height: 48px;
        border: 1px solid ${colors.lightGrey};
        border-radius: ${borderRadius.medium};
        margin-top: ${spacing.sm};
        padding: 0 ${spacing.md};
        font-size: ${typography.sm};
        transition: ${transitions.fast};
        background-color: ${colors.white};
        
        &:focus {
            border-color: ${colors.primary};
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 166, 169, 0.1);
        }
        
        &:hover {
            border-color: ${colors.primary};
        }
    }

    select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
        background-position: right ${spacing.sm} center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5em;
    }

    @media (max-width: 1024px) {
       padding-top: 0;
       width: 80%;
    }

    @media (max-width: 740px) {
       padding-top: 0;
       width: 100%;
    }
`

export const RBodyRItem = styled.div`
    margin: ${spacing.md};
    font-size: ${typography.md};
    font-weight: 500;
    color: ${colors.primary};

    @media (max-width: 1024px) {
       margin-top: 0;
    }
`

