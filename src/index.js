import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from 'App';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer autoClose={3000} theme="dark"/>
    <App />
  </React.StrictMode>
);
