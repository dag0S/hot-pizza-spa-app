import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Home from './pages/Home/Home.tsx';
import Cart from './pages/Cart/Cart.tsx';
import FullPizza from './pages/FullPizza/FullPizza.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/pizza/:id',
        element: <FullPizza />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
