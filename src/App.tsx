
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LegalServices from "./pages/LegalServices";
import NotFound from "./pages/NotFound";
import React, { useEffect } from "react";

// Debug to verify Button component is accessible
console.log("App.tsx loading...");
try {
  // Check if Button is importable
  const Button = require("@/components/ui/button").Button;
  console.log("Button component successfully imported:", Button);
} catch (e) {
  console.error("Failed to import Button component:", e);
}

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal-services" element={<LegalServices />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
