import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const RoadmapSection: React.FC = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const roadmapItems = [
    { year: "2023", label: t("roadmap.2023"), desc: t("roadmap.2023.desc") },
    { year: "2024", label: t("roadmap.2024"), desc: t("roadmap.2024.desc") },
    { year: "2025", label: t("roadmap.2025"), desc: t("roadmap.2025.desc") },
    { year: "2026", label: t("roadmap.2026"), desc: t("roadmap.2026.desc") },
    { year: "2027", label: t("roadmap.2027"), desc: t("roadmap.2027.desc") },
    { year: "2030", label: t("roadmap.2030"), desc: t("roadmap.2030.desc") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="roadmap" className="py-32 bg-background">
      <div className="container mx-auto max-w-container px-6">
        <div className="relative flex flex-col items-center" ref={ref}>
          {/* Vertical line */}
          <div className="roadmap-line"></div>

          {/* Roadmap items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10 w-full max-w-3xl"
          >
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start mb-16 last:mb-0"
              >
                {/* Node */}
                <div className="flex-shrink-0 relative">
                  <div className="roadmap-node w-5 h-5 bg-primary-blue rounded-full"></div>
                </div>

                {/* Content - alternating sides */}
                <div
                  className={`flex-grow ${
                    index % 2 === 0 ? "ml-6" : "ml-6"
                  }`}
                >
                  <div className="bg-surface-gray p-6 rounded-lg">
                    <h3 className="font-poppins text-3xl text-text-light mb-2">{item.year}</h3>
                    <h4 className="font-ubuntu font-semibold text-xl text-accent-orange mb-2">
                      {item.label}
                    </h4>
                    <p className="text-text-light/80">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Final node with DORM logo */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-md overflow-hidden">
                <img 
                  src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_683949d58071012ad0b271fe_683949f69d2ccd3aa028765f/scale_1200" 
                  alt="DORM Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;