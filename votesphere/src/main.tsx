import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { PollProvider } from './contexts/PollContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PollProvider>
      <RouterProvider router={router} />
    </PollProvider>
  </StrictMode>
);
