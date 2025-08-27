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
import ModeProvider from './context/modeProvider.tsx';
import ScrollProvider from './components/layout/scrollProvider.tsx';

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
    <ModeProvider>
      <ScrollProvider>
        <RouterProvider router={router}/> 
      </ScrollProvider>
    </ModeProvider>
  </StrictMode>,
)
