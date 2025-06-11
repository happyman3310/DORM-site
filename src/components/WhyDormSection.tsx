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
  
  // ... остальная часть компонента без изменений
  // ... the rest of the component remains unchanged
  
  return (
      // JSX...
  );
};

export default WhyDormSection;
