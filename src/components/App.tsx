import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GridTable } from './GridTable';
import { defaultTheme } from '../theme/theme';
import { GlobalStyle } from '../theme/globalStyle';

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <GridTable />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
