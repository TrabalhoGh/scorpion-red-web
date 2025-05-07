
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  // Add console logs to help with debugging
  console.log("Main.tsx loaded, rendering App component");

  // Make sure we have a root element
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
  } else {
    createRoot(rootElement).render(<App />);
  }
} catch (error) {
  console.error("Error rendering the application:", error);
  
  // Show a basic error message to the user
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application encountered an error. Please try refreshing the page.</p>
      </div>
    `;
  }
}
