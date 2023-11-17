import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LazyContainer, LazyImportExcel, LazyOrders, PATH_OF_ROUTES } from './routes';
import NotFound from '../../components/NotFound/NotFound';

export const appRoutes = () => [
    {
        path: PATH_OF_ROUTES.HOME,
        element: <LazyContainer />,
        children: [
            {
                index: true,
                element: <Navigate replace to={PATH_OF_ROUTES.IMPORTEXCEL} />,
            },
            {
                path: PATH_OF_ROUTES.IMPORTEXCEL,
                element: <LazyImportExcel />,
            },
            {
                path: PATH_OF_ROUTES.ORDERS,
                element: <LazyOrders />,
            },
            { path: '*', element: <NotFound /> }
        ]
    }
];

export const ExcelTestRouter = () => createBrowserRouter(appRoutes(), { basename:'/' });