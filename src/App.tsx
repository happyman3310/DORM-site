import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Product from './pages/Product';
import Team from './pages/Team';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/product" element={<Product />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
