import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from '../auth/index';
import { CalendarApp } from '../calendar/index';
import { ClientApp } from '../clients';
import { ErrorPage } from './ErrorPage';
import { HomePage } from '../pages/HomePage';
import { TeamScreen } from '../team';


const router = createBrowserRouter([
    {
        path: "/auth/*",
        element: <Login />,
    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "clients",
                element: <ClientApp /> 
            },
            {
                path: "calendar",
                element: <CalendarApp />
            },
            {
                path: "team",
                element: <TeamScreen />
            }
        ]
    }
]);

export const AppRouter = () => {
    return (
        <>
            <RouterProvider router={ router }/>
        </>
    )
}
