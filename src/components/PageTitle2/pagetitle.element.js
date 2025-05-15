import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, transitions } from '../../globalStyles';

export const PageTitleContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    box-shadow: ${shadows.medium};
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
        pointer-events: none;
    }
`;

export const PageTitleContent = styled.h1`
    position: relative;
    display: inline-block;
    padding-bottom: 5px;
    font-weight: 600;
    font-size: 2.2rem;
    color: ${colors.white};
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        background: ${colors.white};
        width: calc(100% + 30%);
        margin-left: -15%;
        border-radius: ${borderRadius.full};
        opacity: 0.7;
    }
`;
