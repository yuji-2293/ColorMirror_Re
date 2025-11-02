import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import colorsGetData from './api/colorsGetData.ts';
import colorsPostData from './api/colorsPostData.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App colorsPostData={colorsPostData} colorsGetData={colorsGetData} />
  </StrictMode>
);
