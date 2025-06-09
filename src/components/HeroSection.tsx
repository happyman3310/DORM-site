import React from "react";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [visitCount, setVisitCount] = React.useState<number>(0);
  const [prevCount, setPrevCount] = React.useState<number>(0);
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Get initial visit count from localStorage or set to a default value
    const storedCount = localStorage.getItem("visitor-count") || "1000";
    const initialCount = parseInt(storedCount, 10);
    setPrevCount(initialCount);
    setVisitCount(initialCount);
    
    // Simulate API call to increment visit count
    const fetchVisits = async () => {
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch('/api/visits');
        // const data = await response.json();
        // setVisitCount(data.count);
        
        // For demo purposes, increment by 1 and store in localStorage
        const newCount = initialCount + 1;
        localStorage.setItem("visitor-count", newCount.toString());
        
        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => {
          setVisitCount(newCount);
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000);
        }, 1500);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };
    
    fetchVisits();
    // Remove the interval as we only want to increment once per session
    // const interval = setInterval(fetchVisits, 30000);
    // return () => clearInterval(interval);
  }, []);

  const scrollToProduct = () => {
    const productSection = document.getElementById("product");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-hero pt-header overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_683949d58071012ad0b271fe_68394cb323ddd33f9a4cf01c/scale_1200)`,
          backgroundPosition: "50% center",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40 z-0"></div>

      <div className="container mx-auto max-w-container px-6 py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-poppins font-black text-6xl md:text-7xl text-text-light mb-8"
          >
            <span className="text-accent-orange">Раскрой</span> потенциал — <br />
            <span className="text-primary-blue">создай</span> будущее
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ubuntu text-xl md:text-2xl text-text-light mb-10 max-w-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                colorScheme="orange"
                size="lg"
                onClick={scrollToProduct}
                className="font-ubuntu text-lg bg-accent-orange text-black px-8 py-6"
              >
                {t("hero.join")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center bg-surface-gray/80 backdrop-blur-sm border-2 border-primary-blue rounded-full px-6 py-3"
            >
              <div className="relative font-mono text-2xl md:text-3xl text-text-light mr-2 min-w-[80px] text-center">
                {isAnimating ? (
                  <>
                    <motion.span
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {prevCount.toLocaleString()}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="absolute inset-0"
                    >
                      {visitCount.toLocaleString()}
                    </motion.span>
                  </>
                ) : (
                  visitCount.toLocaleString()
                )}
              </div>
              <span className="text-text-light/80">{t("hero.counter")}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;