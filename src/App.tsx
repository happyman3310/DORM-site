import React from "react";
import { Route, Switch } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import TeamPage from "./pages/TeamPage";
import LegalPage from "./pages/LegalPage";
import { LanguageProvider } from "./context/LanguageContext";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  const [showCookieConsent, setShowCookieConsent] = React.useState(false);

  React.useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowCookieConsent(false);
  };

  return (
    <LanguageProvider>
      <div className="dark min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/legal" component={LegalPage} />
          </Switch>
        </main>
        <Footer />
        {showCookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-content1 p-4 shadow-lg"
          >
            <CookieConsent onAccept={handleCookieConsent} />
          </motion.div>
        )}
      </div>
    </LanguageProvider>
  );
}
