
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import TodoPage from "./pages/TodoPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthenticationFlow initialView="login" />} />
            <Route path="/register" element={<AuthenticationFlow initialView="register" />} />
            <Route path="/reset-password" element={<AuthenticationFlow initialView="reset-password" />} />
            <Route path="/auth" element={<AuthenticationFlow />} />
            
            {/* Protected routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/todos" element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            } />
            <Route path="/create-flow" element={
              <ProtectedRoute>
                <FlowWizard />
              </ProtectedRoute>
            } />
            <Route path="/create-flow/:templateId" element={
              <ProtectedRoute>
                <FlowWizard />
              </ProtectedRoute>
            } />
            <Route path="/template/:templateId" element={
              <ProtectedRoute>
                <FlowWizard />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </Router>
      </AlertProvider>
    </EnhancedAlertProvider>
  );
}

export default App;
