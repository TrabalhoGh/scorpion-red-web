
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add console logs to help with debugging
console.log("Main.tsx loaded, rendering App component");

// Make sure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  createRoot(rootElement).render(<App />);
}
