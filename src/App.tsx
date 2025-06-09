import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { AlertProvider } from "./components/AlertSystem";
import { EnhancedAlertProvider } from "./components/EnhancedAlertSystem";
import FlowWizard from "./components/FlowWizard";
import { AuthenticationFlow } from "./components/AuthenticationFlow";

function App() {
  return (
    <EnhancedAlertProvider>
      <AlertProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-flow" element={<FlowWizard />} />
            <Route path="/create-flow/:templateId" element={<FlowWizard />} />
            <Route path="/template/:templateId" element={<FlowWizard />} />
            <Route path="/auth" element={<AuthenticationFlow />} />
            <Route path="/login" element={<AuthenticationFlow initialView="login" />} />
            <Route path="/register" element={<AuthenticationFlow initialView="register" />} />
            <Route path="/reset-password" element={<AuthenticationFlow initialView="reset-password" />} />
          </Routes>
          <Toaster />
        </Router>
      </AlertProvider>
    </EnhancedAlertProvider>
  );
}

export default App;
