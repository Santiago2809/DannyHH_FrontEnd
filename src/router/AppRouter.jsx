import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';

const router = createBrowserRouter([
    publicRoutes(),
    privateRoutes(),
    {
        path: "/*",
        element: <Navigate to="/calendar" replace/>
    }
]);

export const AppRouter = () => {
    return (
        <>
            <RouterProvider router={ router }/>
        </>
    )
}
