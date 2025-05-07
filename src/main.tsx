
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add console logs to help with debugging
console.log("Main.tsx loaded, rendering App component");

createRoot(document.getElementById("root")!).render(<App />);
