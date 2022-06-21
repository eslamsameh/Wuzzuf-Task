import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    {routes.map(
      ({ component: Component, url }: Route, index) =>
        Component && <Route key={index} path={url} element={<Component />} />
    )}
    <Route path="/" element={<Navigate to={routes[0].url} />} />
  </Routes>
);

export default AppRoutes;

export declare type Route = {
  url: string;
  name: string;
  component: any;
  displayedInHeader: boolean;
};

export const routes: Route[] = [
  {
    name: 'Home',
    url: '/jobs',
    component: undefined,
    displayedInHeader: true,
  },
  {
    name: 'Home',
    url: '/jobs/*',
    component: React.lazy(() => import('pages').then(({ Jobs }) => ({ default: Jobs }))),
    displayedInHeader: false,
  },
  {
    name: 'Search',
    url: '/jobs/search',
    component: undefined,
    displayedInHeader: true,
  },
  {
    name: 'Skill',
    url: '/skill/:id',
    component: React.lazy(() => import('pages').then(({ Skills }) => ({ default: Skills }))),
    displayedInHeader: false,
  },

  {
    name: 'History',
    url: '/history',
    component: React.lazy(() => import('pages').then(({ History }) => ({ default: History }))),
    displayedInHeader: true,
  },
];
