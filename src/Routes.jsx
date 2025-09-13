import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmergencyResponseCoordinationCenter from './pages/emergency-response-coordination-center';
import TouristAnalyticsAndComplianceDashboard from './pages/tourist-analytics-and-compliance-dashboard';
import RealTimeSituationalAwarenessCommandCenter from './pages/real-time-situational-awareness-command-center';
import ExecutiveSafetyIntelligenceOverview from './pages/executive-safety-intelligence-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmergencyResponseCoordinationCenter />} />
        <Route path="/emergency-response-coordination-center" element={<EmergencyResponseCoordinationCenter />} />
        <Route path="/tourist-analytics-and-compliance-dashboard" element={<TouristAnalyticsAndComplianceDashboard />} />
        <Route path="/real-time-situational-awareness-command-center" element={<RealTimeSituationalAwarenessCommandCenter />} />
        <Route path="/executive-safety-intelligence-overview" element={<ExecutiveSafetyIntelligenceOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
