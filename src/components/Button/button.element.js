import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const Wrapper = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 12px 20px;
    border-radius: ${borderRadius.medium};
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    background-color: ${colors.white};
    border: 1px solid ${colors.lightGrey};
    user-select: none;
    transition: all ${transitions.medium};
    color: ${colors.black};
    box-shadow: ${shadows.small};
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: ${shadows.medium};
        border-color: ${colors.primary};
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &.disabled {
        pointer-events: none;
        opacity: 0.5;
        background-color: ${colors.lightGrey};
        color: ${colors.mediumGrey};
        box-shadow: none;
    }
`;

export const Icon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: ${props => props.iconOnly ? '0' : spacing.xs};
    font-size: 1.1em;
`;

export const GradientOne = styled(Wrapper)`
    background: linear-gradient(45deg, ${colors.secondary}, ${colors.primary});
    color: ${colors.white};
    border: none;
    font-weight: 500;
    
    &:hover {
        background: linear-gradient(45deg, ${colors.secondaryLight}, ${colors.primaryLight});
        color: ${colors.primary};
    }
`;

export const GradientTwo = styled(Wrapper)`
    background: linear-gradient(45deg, #FF6E7F, ${colors.primary});
    color: ${colors.white};
    border: none;
    font-weight: 500;
    
    &:hover {
        background: linear-gradient(45deg, #FF8E9F, ${colors.primaryLight});
        color: ${colors.white};
    }
`;

export const Submit = styled(Wrapper)`
    background-color: ${colors.primary};
    color: ${colors.white};
    font-weight: 500;
    border: none;
    box-shadow: ${shadows.small};

    &:hover {
        background-color: ${colors.primaryDark};
        color: ${colors.white};
    }
`;

export const SubmitTwo = styled(Wrapper)`
    background-color: ${colors.secondary};
    color: ${colors.white};
    font-weight: 500;
    border: none;
    box-shadow: ${shadows.small};

    &:hover {
        background-color: ${colors.secondaryLight};
        color: ${colors.primaryDark};
    }
`;

export const SubmitThree = styled(Wrapper)`
    background-color: ${colors.accent};
    color: ${colors.white};
    border: none;
    font-weight: 500;
    width: 80px;
    height: 40px;
    padding: ${spacing.xs} ${spacing.md};
    
    &:hover {
        background-color: #FF8F00;
        color: ${colors.white};
    }
`;

export const Rounded = styled(Wrapper)`
    border-radius: ${borderRadius.pill};
    box-shadow: ${shadows.small};
    background-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
        background-color: ${colors.primaryDark};
        color: ${colors.white};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${colors.lightGrey};
        color: ${colors.mediumGrey};
    }
`;

export const Circle = styled(Wrapper)`
    border-radius: 50%;
    box-shadow: ${shadows.small};
    width: 40px;
    height: 40px;
    min-width: unset;
    padding: 0;
    background-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
        background-color: ${colors.primaryDark};
        color: ${colors.white};
    }
`;

export const Primary = styled(Wrapper)`
    color: ${colors.white};
    background-color: ${colors.primary};
    border: none;

    &:hover {
        background-color: ${colors.primaryDark};
        color: ${colors.white};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${colors.lightGrey};
        color: ${colors.mediumGrey};
        
        &:hover {
            background-color: ${colors.lightGrey};
            transform: none;
            box-shadow: ${shadows.small};
        }
    }
`;

export const Outline = styled(Wrapper)`
    color: ${colors.primary};
    background-color: transparent;
    border: 2px solid ${colors.primary};
    position: relative;
    z-index: 1;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 100%;
        bottom: 0;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        z-index: -1;
        transition: right ${transitions.medium};
    }

    &:hover {
        color: ${colors.white};
        
        &::before {
            right: 0;
        }
    }
`;

export const Text = styled(Wrapper)`
    color: ${colors.primary};
    background-color: transparent;
    border: none;
    box-shadow: none;
    font-weight: 500;
    padding: ${spacing.xs} ${spacing.sm};

    &:hover {
        text-decoration: underline;
    }
`;

export const Nav = styled(Wrapper)`
    font-weight: 600;
    font-size: 1.6rem;
    color: ${colors.primary};
    padding: 9px 15px;
    border-radius: ${borderRadius.pill};
    transition: all ${transitions.medium};
    box-shadow: none;
    border: 2px solid transparent;

    &:hover {
        background: ${colors.primaryLight};
        color: ${colors.primaryDark};
        border-color: ${colors.secondary};
    }
`;

// Button size variants
export const Small = styled(Wrapper)`
    min-width: 88px;
    padding: 4px 16px;
`;

export const Large = styled(Wrapper)`
    padding: 14px 100px;
    min-width: 140px;
`;

export const Medium = styled(Wrapper)`
    padding: 9px 40px;
    min-width: 110px;
`;

export const Long = styled(Wrapper)`
    min-width: 740px;
    padding: 10px 30px;
`;
