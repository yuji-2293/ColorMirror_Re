import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import colorsGetData from './api/colorsGetData.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App colorsGetData={colorsGetData} />
  </StrictMode>
);
