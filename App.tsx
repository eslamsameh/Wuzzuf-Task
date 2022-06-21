import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'theme';

import AppRoutes from 'views/routes';
import { Header } from 'views/components';
import { Provider } from 'react-redux';
import { state } from 'models';

const App = () => (
  <>
    <Provider store={state}>
      <Suspense fallback={<div>Loading</div>}>
        <BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </>
);

export default App;
