import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import firebaseApp from './firebaseConfig'; // Import firebaseApp at the top
import { LoadingProvider } from './LoadingContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <LoadingProvider>
    <App />
  </LoadingProvider>,
  document.getElementById('root')
);

reportWebVitals();
