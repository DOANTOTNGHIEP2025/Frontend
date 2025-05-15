import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, transitions, typography } from '../../globalStyles';

export const PageTitleContainer = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    margin-bottom: ${spacing.lg};
    position: relative;
    box-shadow: ${shadows.medium};
    
    &::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 10px;
        background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
        border-radius: 50%;
        filter: blur(5px);
    }
    
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
    padding-bottom: ${spacing.xs};
    font-weight: 700;
    font-size: 2.2rem;
    color: ${colors.white};
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        height: 4px;
        background: ${colors.white};
        width: 80px;
        transform: translateX(-50%);
        border-radius: ${borderRadius.full};
        opacity: 0.7;
    }
`;
