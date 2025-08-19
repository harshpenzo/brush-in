
import React from "react";
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx'
import './index.css'

// Error boundary for the entire application
const renderApp = () => {
  try {
    console.log("Starting app rendering...");
    // Ensure we have a valid DOM element to mount to
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error("Failed to find the root element");
    }

    createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    );

    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to render the application:", error);
    // Display a fallback error message on the page
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: sans-serif; background-color: #fff; color: #333;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please try refreshing the page.</p>
        <pre style="max-width: 800px; overflow: auto; padding: 16px; background: #f0f0f0; border-radius: 4px; margin-top: 16px;">${error instanceof Error ? error.stack : String(error)}</pre>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer; background-color: #0ea5e9; color: white; border: none; border-radius: 4px;">
          Reload Page
        </button>
      </div>
    `;
  }
};

// Initialize the application
renderApp();
