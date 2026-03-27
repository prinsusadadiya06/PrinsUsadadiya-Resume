import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Contact from './Contact';
import Project from './Project';
import About from './About';
import Resume from './Resume';
import { Toaster } from 'sonner';

let allpages = createHashRouter([
  {
    path: "/",
    element: <About />
  },
  {
    path: "resume",
    element: <Resume />
  },
  {
    path: "project",
    element: <Project />
  },
  {
    path: "contact",
    element: <Contact />
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={allpages} />
      <Toaster
        position="top-right"
        richColors
        offset="80px"
        toastOptions={{
          style: {
            width: "280px",
          },
        }}
      />
    </>
  </StrictMode>,
)