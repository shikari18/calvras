import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App, { ErrorBoundary } from './App';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppTree = PUBLISHABLE_KEY
  ? (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ClerkProvider>
  )
  : (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {AppTree}
  </React.StrictMode>,
);

