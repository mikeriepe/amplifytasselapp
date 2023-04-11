import {createTheme} from '@mui/material/styles';
import red from '@mui/material/colors/red';
import yellow from '@mui/material/colors/yellow';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';

const theme = createTheme({
  typography: {
    'fontFamily': `"Montserrat", "Roboto", sans-serif`,
    'fontWeightLight': 400,
    'fontWeightRegular': 500,
    'fontWeightMedium': 500,
  },
  palette: {
    mode: 'light',
    primary: {
      bright: '#F1FAFF',
      light: '#DCF2FF',
      main: '#00C2FF',
      dark: '#13A5DC',
    },
    secondary: {
      bright: yellow[100],
      light: '#FFE03E',
      main: '#FFBF22',
      dark: yellow[800],
      contrastText: grey[50],
    },
    tertiary: {
      bright: '#F0F0F5',
      light: '#C0C4CB',
      main: '#8B95A5',
      dark: '#3C4047',
    },
    error: {
      light: red[400],
      main: red[500],
      dark: red[600],
      contrastText: grey[50],
    },
    success: {
      light: green[400],
      main: green[500],
      dark: green[600],
      contrastText: grey[50],
    },
    info: {
      main: '#00C2FF',
    },
    text: {
      primary: '#7E8694',
      secondary: '#7E8694',
      disabled: '#A4A9AF',
    },
  },
});

export default theme;
