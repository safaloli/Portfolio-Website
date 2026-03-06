import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/front/HomePage";
import ErrorPage from "../pages/errors/ErrorPage";

const router = createBrowserRouter([
    {path: '/', element: <HomePage/>},
    {path: '*', element: <ErrorPage code={404}/>}
])

export default function RouterConfig () {
    return(
        <>
            <RouterProvider router={router}/>
        </>
    )
}