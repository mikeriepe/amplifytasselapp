import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/stylesheets/index.css';
import App from './app/App';
import reportWebVitals from './reactBoilerplate/reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import theme from './app/util/Theme';
import {ThemeProvider} from '@mui/material/styles';
import {AuthProvider} from './app/util/AuthContext';
import {AnimationProvider} from './app/util/AnimationContext';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
