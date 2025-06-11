import { Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage'; // Создайте этот файл
import ProductPage from './pages/ProductPage';
import TeamPage from './pages/TeamPage';
import LegalPage from './pages/LegalPage';
import Header from './components/Header'; // Убедитесь, что этот компонент существует
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/mission" element={<MissionPage />} /> 
        <Route path="/product" element={<ProductPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="*" element={<HomePage />} /> {/* Или страница 404 */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
