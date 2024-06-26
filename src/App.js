import Navbar from "./components/Navbar";
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import Main from "./components/Main";

import { AuthorizeUser } from './middleware/auth.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/username',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <Password></Password>
    },
    {
        path: '/profile',
        element: <Profile></Profile>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
])
function App() {
  return (
    <>
        <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
