import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '../components/Home.jsx';
import TodoItem from '../components/TodoItem.jsx';

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home />

    }, {
        path: '/item/:id',
        element: <TodoItem />
    }
]);

export  { router, RouterProvider };