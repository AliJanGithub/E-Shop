import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; // Import the Tailwind CSS file


import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import { UserProvider } from './context/userAuth.tsx';

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <UserProvider>

   
    <RouterProvider router={router}/>

    </UserProvider>
    
  </StrictMode>,
)
