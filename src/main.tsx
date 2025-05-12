
import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for the entire application
const renderApp = () => {
  try {
    // Ensure we have a valid DOM element to mount to
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error("Failed to find the root element");
    }

    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to render the application:", error);
    // Display a fallback error message on the page
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: sans-serif;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
};

// Initialize the application
renderApp();
