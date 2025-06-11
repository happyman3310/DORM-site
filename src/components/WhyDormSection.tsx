import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const WhyDormSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 6);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { emoji: "🚀", title: t("why.cards.1.title"), desc: t("why.cards.1.desc") },
    { emoji: "💡", title: t("why.cards.2.title"), desc: t("why.cards.2.desc") },
    { emoji: "🌐", title: t("why.cards.3.title"), desc: t("why.cards.3.desc") },
    { emoji: "📈", title: t("why.cards.4.title"), desc: t("why.cards.4.desc") },
    { emoji: "🤝", title: t("why.cards.5.title"), desc: t("why.cards.5.desc") },
    { emoji: "👨‍🎓", title: t("why.cards.6.title"), desc: t("why.cards.6.desc") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - 3D letter */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              <img
                src="https://placehold.co/640x640?text=D"
                alt="DORM 3D Letter"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Right side - Swiper cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col space-y-4"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className={`transition-all duration-300 ${
                  activeCard === index ? "scale-105" : ""
                }`}
              >
                <Card
                  className="bg-surface-gray ring-1 ring-primary-blue/40"
                  cursor="pointer"
                  onClick={() => setActiveCard(index)}
                >
                  <CardBody className="flex flex-row items-start gap-4 p-6">
                    <div className="text-4xl">{card.emoji}</div>
                    <div>
                      <h3 className="text-xl font-ubuntu font-semibold mb-2">{card.title}</h3>
                      <p className="text-text-light/80">{card.desc}</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}

            {/* Swiper indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {cards.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCard === index ? "bg-accent-orange w-6" : "bg-accent-orange/40"
                  }`}
                  onClick={() => setActiveCard(index)}
                  aria-label={`Go to card ${index + 1}`}
                ></button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyDormSection;
