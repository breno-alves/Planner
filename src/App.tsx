import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './core/utils/constants';
import GlobalStyle from './core/config/globalStyles';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <ThemeProvider theme={DEFAULT_THEME}>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  </>
);

export default App;
