import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // Updated to match your folder structure
import App from './App.jsx';

// Mount the React application to the root div in index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}