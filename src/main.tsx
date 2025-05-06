
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a console log to check for Button import issues
console.log("Main.tsx loaded, rendering App component");

createRoot(document.getElementById("root")!).render(<App />);
