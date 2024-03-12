import { ClientApp } from "../clients/pages/ClientApp";
import { HomePage } from "../pages/HomePage";
import { TeamScreen } from "../team/pages/TeamScreen";
import { ErrorPage } from "./ErrorPage";
import { CalendarApp } from "../calendar/pages/CalendarApp";


export const privateRoutes = () => {
    return {
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
}