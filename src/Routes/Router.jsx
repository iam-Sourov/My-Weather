import { createBrowserRouter } from "react-router";
import Root from '../layout/Root';
import Home from '../pages/Home';



const Router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
]);



export default Router;