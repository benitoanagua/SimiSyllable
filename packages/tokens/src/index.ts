import './tokens.css';
import './themes.css';

export const handheldTokens = {
  prefix: 'hh',
  spacing: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
  radii: ['sm', 'md', 'lg', 'xl', 'pill'],
  controlSizes: ['sm', 'md', 'lg'],
  themes: ['light', 'dark'],
} as const;
