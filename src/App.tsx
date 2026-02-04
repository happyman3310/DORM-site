import { Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import AppShell from './components/AppShell';
import AuthPage from './pages/AuthPage';
import CheckpointPage from './pages/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import DirectionCreatePage from './pages/DirectionCreatePage';
import DirectionReviewPage from './pages/DirectionReviewPage';
import DirectionsPage from './pages/DirectionsPage';
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
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
