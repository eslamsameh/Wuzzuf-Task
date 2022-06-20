import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'theme';

import AppRoutes from 'routes';
import { Header } from 'components';

const App = () => (
  <Suspense fallback={<div>Loading</div>}>
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
