
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add console logs to help with debugging
console.log("Main.tsx loaded, rendering App component");
console.log("Button component path:", require.resolve("@/components/ui/button"));

createRoot(document.getElementById("root")!).render(<App />);
