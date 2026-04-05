'use client';
import './globals.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Bebas_Neue, Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const primary = '#0d1b2a';
const secondary = '#e63946';
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    background: {
      // default: '#000',
      paper: primary,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2.5rem',
          lineHeight: '1.1',
          margin: '3rem 0',
          fontWeight: 'normal',
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        h2: {
          fontSize: '2rem',
          lineHeight: '1.1',
          margin: '3rem 0',
          fontWeight: 'normal',
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        h3: {
          fontSize: '1.17rem',
          lineHeight: '1.2',
          fontWeight: 'normal',
        },
        h4: {
          fontSize: '1rem',
          lineHeight: '1.3',
          fontWeight: 'normal',
        },
      },
    },
  },
});

export const bodyClass = '';
export const htmlClass = roboto.variable + ' ' + bebasNeue.variable;

export const MuiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AppRouterCacheProvider>
);

export default theme;
