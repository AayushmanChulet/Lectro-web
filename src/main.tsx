import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from './layout/layout.tsx';
import Lectro from './pages/lectro.tsx';
import Landing from './pages/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children :[
      {
        path : "/",
        Component : Landing
      }, 
      {
        path : "/:url",
        Component : Lectro,
      }
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
