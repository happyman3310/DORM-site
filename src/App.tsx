import { Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import AppShell from './shared/components/AppShell';
import AuthPage from './features/auth/AuthPage';
import CheckpointPage from './features/checkpoint/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import DirectionCreatePage from './features/directions/DirectionCreatePage';
import DirectionReviewPage from './features/directions/DirectionReviewPage';
import DirectionsPage from './features/directions/DirectionsPage';
import HistoryPage from './pages/HistoryPage';
import PricingPage from './pages/PricingPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/checkpoint" element={<CheckpointPage />} />
        <Route path="/directions" element={<DirectionsPage />} />
        <Route path="/directions/new" element={<DirectionCreatePage />} />
        <Route path="/directions/review" element={<DirectionReviewPage />} />
        <Route path="/directions/review/:id" element={<DirectionReviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
