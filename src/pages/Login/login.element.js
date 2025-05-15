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
    color: ${colors.primary};
    margin-bottom: ${spacing.lg};
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
`
export const LoginItemList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
`

export const LoginItem = styled.div`
    font-size: 0.9rem;
    color: ${colors.darkGrey};
    width: 100%;
    
    label {
        display: block;
        margin-bottom: ${spacing.xs};
        font-weight: 500;
    }
    
    input {
        display: block;
        width: 100%; 
        padding: 12px 16px; 
        border: 1px solid ${colors.lightGrey};
        border-radius: ${borderRadius.medium};
        font-size: 1rem;
        transition: all ${transitions.fast};
        background-color: ${colors.white};
        
        &::placeholder {
            color: ${colors.mediumGrey};
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
        padding: 12px 16px; 
        padding-right: 40px;
        border-radius: ${borderRadius.medium};
        border: none;
        font-size: 1rem;
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
        font-size: 1.2rem;
        cursor: pointer;
        color: ${colors.mediumGrey};
        transition: color ${transitions.fast};
        
        &:hover {
           color: ${colors.primary};
        }
    }
`

export const LoginItem2 = styled.div`
    font-size: 0.9rem;
    color: ${colors.darkGrey};
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
            accent-color: ${colors.primary};
        }
    }
`

export const LoginLink2 = styled.p`
    color: ${colors.primary};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: color ${transitions.fast};

    &:hover {
       color: ${colors.primaryDark};
       text-decoration: underline;
    }
`

export const LoginButton = styled.button`
    width: 100%;
    padding: ${spacing.md};
    font-weight: 600;
    color: white;
    background-color: ${colors.primary};
    font-size: 1rem;
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
        color: ${colors.mediumGrey};
        cursor: not-allowed;
        box-shadow: none;
    }
`

export const LoginLink = styled.div`
    margin-top: ${spacing.md};
    text-align: center;
    
    p {
        color: ${colors.darkGrey};
        font-size: 0.9rem;
        cursor: pointer;
        
        a {
            color: ${colors.primary};
            font-weight: 500;
            margin-left: ${spacing.xs};
            transition: all ${transitions.fast};
            
            &:hover {
                color: ${colors.primaryDark};
                text-decoration: underline;
            }
        }
    }
    
`

export const LoginDeco = styled.div`
    flex: 2;
    position: relative;
    height: 100%; 
    overflow: hidden;
    display: none; /* Hide on mobile */
    
    @media (min-width: 992px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(26, 115, 232, 0.1) 0%, rgba(0, 193, 185, 0.15) 100%);
        z-index: 1;
    }
`

export const Deco2 = styled.div`
    position: absolute;
    width: 120%;
    height: 120%;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    opacity: 0.8;
    animation: morphing 15s ease-in-out infinite;
    transform-origin: center;
    
    @keyframes morphing {
        0% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }
        25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
        }
        50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
        }
        75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
        }
        100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
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
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: ${spacing.lg};
        text-align: center;
    }
    
    p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
        text-align: center;
        max-width: 80%;
        line-height: 1.6;
    }
`
// `

export const LoginDeco2 = styled.div`
    flex: 2;
    position: relative;
    height: 100%; 
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    //.code-icon i.icon {
    //    color: white; /* Icon color */
    //    font-size: 20px; /* Adjust the size of the icon */
    //}
    //
    ///* Optionally, add some hover effect for the icon */
    //.code-icon:hover {
    //    background-color: #388E3C;
    //}
    
`

export const Deco4 = styled.div`
    position: absolute;
    top: -200px; 
    right: -400px;
    width: 850px; 
    height: 500px; 
    background-color: #3BA5A9; 
    border-radius: 50%; 
`
