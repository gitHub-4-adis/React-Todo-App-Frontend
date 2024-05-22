import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

import { ToastContainer, toast } from 'react-toastify';
import { ListContextProvider } from './context/listContextProvider.jsx';
import {router, RouterProvider} from './router/router.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ListContextProvider >
    <React.StrictMode>
        <RouterProvider router={router}/>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition: Bounce
        />
    </React.StrictMode>
  </ListContextProvider>
)
