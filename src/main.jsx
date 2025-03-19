import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router as webrouter } from './web-router';
import { router as mobilerouter } from './mobile-router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={!import.meta.env.VITE_IS_MOBILE ? mobilerouter : webrouter} />
  </React.StrictMode>
);
