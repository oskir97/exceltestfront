import React from 'react';

export const LazyContainer = React.lazy(() => import('../../containers/Main/Main'));
export const LazyImportExcel = React.lazy(() => import('../../components/ImportExcel/ImportExcel'));
export const LazyOrders = React.lazy(() => import('../../components/Orders/Orders'));

export const PATH_OF_ROUTES = {
  HOME: '/',
  IMPORTEXCEL:'importexcel',
  ORDERS: 'orders',
};