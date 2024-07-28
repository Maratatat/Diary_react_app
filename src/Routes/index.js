import Reports from "../pages/Reports";
import EditReportPage from "../pages/EditReportPage";
import About from "../pages/About";
import Authorization from "../pages/Authorization";
import Error from "../pages/Error";

export const privateRoutes = [
    {path: '/reports', component: Reports},
    {path: '/reports/:id', component: EditReportPage},
    {path: '/about', component: About},
    {path: '*', component: Error}
]

export const publicRoutes = [
    {path: '/about', component: About},
    {path: '/auth', component: Authorization},
    {path: '*', component: Error}
]