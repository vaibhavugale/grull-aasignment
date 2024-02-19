import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './components/pages/Cart/Cart';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Category from './components/pages/Category/Category';
import { ContextProvider } from './Context';
import Toaster from "react-hot-toast"

const router = createBrowserRouter([

  {
    path:"/",
    element:<ContextProvider>
      <App/>
      <Toaster 
        position="top-left"
        containerStyle={{"z-index":100}}
  reverseOrder={false} />
    </ContextProvider>,
    children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/cart",
          element:<Cart />
        },{
          path:"/category/:catName",
          element:<Category />
        }
    ]
  }
]

)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);