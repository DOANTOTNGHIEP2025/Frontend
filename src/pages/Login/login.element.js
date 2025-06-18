import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const LoginLayout = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    margin: 0; 
    width: 100vw;  
    height: 100vh;
    background-color: ${colors.background};
    background-image: linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.background} 100%);
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    padding: ${spacing.xl};
`

export const LoginItemAndHeader = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 35%;
    align-items: center;
    background-color: ${colors.white};
    padding: ${spacing.xl};
    border-radius: ${borderRadius.large};
    box-shadow: ${shadows.large};
    transition: all ${transitions.medium};

    @media (max-width: 1024px){
        width: 50%;
    }

    @media (max-width: 740px){
        width: 90%;
        padding: ${spacing.lg};
    }
`

export const LoginLogo = styled.div`
    width: 100px;
    height: 100px;
    cursor: pointer;
    margin-bottom: ${spacing.md};
    transform: scale(1);
    transition: transform ${transitions.medium};
    background-color: #0C507C;
    &:hover {
        transform: scale(1.05);
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

export const LoginHeader = styled.h1`
    color: black;
    margin-bottom: ${spacing.lg};
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
`
export const LoginItemList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
`

export const LoginItem = styled.div`
    font-size: 1.4rem;
    color: black;
    width: 100%;
    
    label,p {
        display: block;
        margin-bottom: ${spacing.xs};
        font-weight: 500;
        font-size: 1.4rem; // Tăng cỡ chữ cho label
    }
    
    input {
        display: block;
        width: 100%; 
        padding: 14px 18px; 
        border: 1px solid ${colors.lightGrey};
        border-radius: ${borderRadius.medium};
        font-size: 1.4rem;
        transition: all ${transitions.fast};
        background-color: ${colors.white};
        
        &::placeholder {
            color: black;
        }
        
        &:focus {
           outline: none;
           border-color: ${colors.primary};
           box-shadow: 0 0 0 3px ${colors.primaryLight};
        }
    }
`

export const LoginItem3 = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: ${colors.white};
    border-radius: ${borderRadius.medium};
    border: 1px solid ${colors.lightGrey};
    position: relative;
    transition: all ${transitions.fast};
    
    &:focus-within {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px ${colors.primaryLight};
    }
    
    input {
        display: block;
        width: 100%; 
        padding: 14px 18px; 
        padding-right: 40px;
        border-radius: ${borderRadius.medium};
        border: none;
        font-size: 1.4rem;
        background-color: transparent;
        
        &:focus {
           outline: none;
        }
    }
    
    .eye-icon {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        font-size: 1.4rem;
        cursor: pointer;
        color: ${colors.mediumGrey};
        transition: color ${transitions.fast};
        
        &:hover {
           color: black;
        }
    }
`

export const LoginItem2 = styled.div`
    font-size: 1.4rem;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: ${spacing.xs} 0 ${spacing.md};
    
    .remember-me {
        display: flex;
        align-items: center;
        
        input[type="checkbox"] {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            accent-color: black;
        }
    }
`

export const LoginLink2 = styled.p`
    color: black;
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: black;

    &:hover {
       color: ${colors.primaryDark};
       text-decoration: underline;
    }
`

export const LoginButton = styled.button`
    width: 100%;
    padding: ${spacing.md};
    font-weight: 500;
    color: white;
    background-color: ${colors.primary};
    font-size: 1.4rem;
    border: none;
    border-radius: ${borderRadius.medium};
    cursor: pointer;
    transition: all ${transitions.medium};
    box-shadow: ${shadows.small};
    margin: ${spacing.md} 0;
    
    &:hover {
        background-color: ${colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: ${shadows.medium};
    }
    
    &:active {
        transform: translateY(0);
    }
      &:disabled {
        background-color: ${colors.lightGrey};
        color: black;
        cursor: not-allowed;
        box-shadow: none;
    }
`

export const LoginLink = styled.div`
    margin-top: ${spacing.md};
    text-align: center;
    
    p {
        color: black;
        font-size: 1.4rem;
        cursor: pointer;
        
        a {
            color: black;
            font-weight: 500;
            margin-left: ${spacing.xs};
            transition: all ${transitions.fast};
            
            &:hover {
                color: black;
                text-decoration: underline;
            }
        }
    }
    
`


export const Deco3 = styled.div`
    position: absolute;
    z-index: 2;
    width: 80%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: ${borderRadius.xl};
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: ${shadows.large};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${spacing.xl};
    
    h2 {
        color: white;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: ${spacing.lg};
        text-align: center;
    }
    
    p {
        color: black;
        font-size: 1.4rem;
        text-align: center;
        max-width: 80%;
        line-height: 1.6;
    }
`
