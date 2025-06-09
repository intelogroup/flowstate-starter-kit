
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AlertProvider } from "@/components/AlertSystem";
import { LoadingOverlay } from "@/components/TransitionalScreens";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FlowDetails from "./components/FlowDetails";
import FlowWizard from "./components/FlowWizard";
import TemplatePreview from "./components/TemplatePreview";
import FlowsPage from "./pages/FlowsPage";
import RequestFlowPage from "./pages/RequestFlowPage";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="flowstate-ui-theme">
        <AlertProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LoadingOverlay 
              isVisible={isInitialLoading} 
              message="Loading FlowState..." 
            />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/flows" element={<FlowsPage />} />
                  <Route path="/flow/:id" element={<FlowDetails />} />
                  <Route path="/create-flow" element={<FlowWizard />} />
                  <Route path="/create-flow/:templateId" element={<FlowWizard />} />
                  <Route path="/template/:id" element={<TemplatePreview />} />
                  <Route path="/request-flow" element={<RequestFlowPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
