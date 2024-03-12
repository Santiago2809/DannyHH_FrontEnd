import { Login } from "../auth"

export const publicRoutes = () => {
    return {
        path: "/auth/*",
        element: <Login />,
    }
}