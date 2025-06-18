import styled, { createGlobalStyle, css } from 'styled-components';

// Modern color palette with more blue/teal
export const colors = {
  primary: '#0C507C',        // Deeper blue - primary brand color
  primaryLight: '#D0E3FF',   // Light blue for backgrounds
  primaryDark: '#083b5c',    // Dark blue for hover states
  secondary: '#00D3D6',      // Brighter teal - secondary brand color
  secondaryLight: '#B7F4F0', // Light teal
  accent: '#FF6D00',         // Orange accent for CTAs
  success: '#00C853',        // Green for success states
  error: '#F44336',          // Red for error states
  warning: '#FFB300',        // Amber for warnings
  black: '#212121',          // Near black for text
  darkGrey: '#616161',       // Dark grey for secondary text
  mediumGrey: '#9E9E9E',     // Medium grey for disabled states
  lightGrey: '#E0E0E0',      // Light grey for borders
  white: '#FFFFFF',          // White
  background: '#E8F5F5',     // Light teal background
  cardBackground: '#FFFFFF', // Card background
  gradient1: '#0C507C',      // Gradient color 1
  gradient2: '#00D3D6',      // Gradient color 2
};

// Shadows
export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
  large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.15)',
};

// Border radius
export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
  xl: '16px',
  pill: '9999px',
};

// Spacing
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// Transitions
export const transitions = {
  fast: '0.15s ease',
  medium: '0.3s ease',
  slow: '0.5s ease',
};

// Typography
export const typography = {
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  heading: css`
    font-weight: 600;
    line-height: 1.2;
    color: ${colors.black};
  `,
  body: css`
    font-weight: 400;
    line-height: 1.5;
    color: ${colors.black};
  `,
  small: css`
    font-size: 1.2 rem;
    line-height: 1.5;
    color: ${colors.darkGrey};
  `,
};

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${typography.fontFamily};
  }
    body {
    background: linear-gradient(to bottom, ${colors.background}, ${colors.white});
    color: ${colors.black};
    line-height: 1.5;
    font-size: 16px;
  }
  
  a {
    text-decoration: none;
    color: ${colors.primary};
    transition: color ${transitions.fast};
    
    &:hover {
      color: ${colors.primaryDark};
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    ${typography.heading}
    margin-bottom: ${spacing.md};
  }
  
  p {
    margin-bottom: ${spacing.md};
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${spacing.xl};
  padding-left: ${spacing.xl};

  @media screen and (max-width: 991px) {
    padding-right: ${spacing.lg};
    padding-left: ${spacing.lg};
  }
  
  @media screen and (max-width: 576px) {
    padding-right: ${spacing.md};
    padding-left: ${spacing.md};
  }
`;

export const Button = styled.button`
  border-radius: ${props => props.pill ? borderRadius.pill : borderRadius.medium};
  background: ${props => props.variant === 'outlined' 
    ? 'transparent' 
    : props.variant === 'secondary' 
      ? colors.secondary 
      : props.variant === 'accent' 
        ? colors.accent 
        : colors.primary};
  color: ${props => props.variant === 'outlined' ? colors.primary : colors.white};
  border: ${props => props.variant === 'outlined' ? `1px solid ${colors.primary}` : 'none'};
  white-space: nowrap;
  padding: ${props => props.size === 'large' 
    ? '12px 24px' 
    : props.size === 'small' 
      ? '6px 16px' 
      : '10px 20px'};
  font-size: ${props => props.size === 'large' ? '1.125rem' : props.size === 'small' ? '0.875rem' : '1rem'};
  font-weight: 500;
  cursor: pointer;
  transition: all ${transitions.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.elevation ? shadows.small : 'none'};
  
  &:hover, &:focus {
    background: ${props => props.variant === 'outlined' 
      ? colors.primaryLight 
      : props.variant === 'secondary' 
        ? colors.secondaryLight 
        : props.variant === 'accent' 
          ? '#FF8F00' 
          : colors.primaryDark};
    color: ${props => props.variant === 'outlined' ? colors.primaryDark : colors.white};
    transform: translateY(-1px);
    box-shadow: ${shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: ${shadows.small};
  }
  
  &:disabled {
    background: ${colors.lightGrey};
    color: ${colors.mediumGrey};
    cursor: not-allowed;
    box-shadow: none;
  }
  
  svg {
    margin-right: ${props => props.iconOnly ? '0' : spacing.xs};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

// Card component for consistent styling of card-like elements
export const Card = styled.div`
  background: ${colors.cardBackground};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.small};
  padding: ${spacing.lg};
  margin-bottom: ${spacing.lg};
  transition: box-shadow ${transitions.medium};
  
  &:hover {
    box-shadow: ${shadows.medium};
  }
`;

// Grid system for layouts
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || spacing.md};
  
  @media (max-width: 991px) {
    grid-template-columns: repeat(${props => props.tabletColumns || 6}, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 4}, 1fr);
  }
`;

// GridItem for grid layouts
export const GridItem = styled.div`
  grid-column: span ${props => props.span || 1};
  
  @media (max-width: 991px) {
    grid-column: span ${props => props.tabletSpan || props.span || 1};
  }
  
  @media (max-width: 576px) {
    grid-column: span ${props => props.mobileSpan || props.tabletSpan || props.span || 1};
  }
`;

// Flexbox container for flexible layouts
export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap || '0'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
  }
`;

// Text styling components
export const Heading = styled.h2`
  ${typography.heading}
  font-size: ${props => {
    switch (props.level) {
      case 1: return '2.5rem';
      case 2: return '2rem';
      case 3: return '1.5rem';
      case 4: return '1.25rem';
      case 5: return '1.125rem';
      case 6: return '1rem';
      default: return '1.5rem';
    }
  }};
  margin-bottom: ${props => props.marginBottom || spacing.md};
  color: ${props => props.color || colors.black};
  text-align: ${props => props.textAlign || 'left'};
`;

export const Text = styled.p`
  ${typography.body}
  font-size: ${props => props.size || '1.4rem'};
  color: ${props => props.color || colors.black};
  margin-bottom: ${props => props.marginBottom || spacing.md};
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.bold ? '600' : props.weight || '400'};
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: ${borderRadius.pill};
  background-color: ${props => {
    switch (props.variant) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'warning': return colors.warning;
      case 'info': return colors.primary;
      default: return colors.secondary;
    }
  }};  color: ${colors.white};
  font-size: 1.4rem;
  font-weight: 500;
`;

export default GlobalStyle;
