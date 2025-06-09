import React from "react";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";

const MissionSection: React.FC = () => {
  const { t } = useLanguage();

  const handleContactClick = () => {
    window.location.href = "mailto:hr@dorm.com";
  };

  return (
    <section id="mission" className="relative py-40">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/60 z-10"></div>
        <img
          src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_683949d58071012ad0b271fe_68394cb31f7971729734c930/scale_1200"
          alt="Mission background"
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-accent-orange mb-8">
            {t("mission.title")}
          </h2>

          <p className="font-ubuntu text-lg text-text-light mb-8 leading-relaxed">
            {t("mission.content")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-poppins font-bold text-2xl md:text-3xl text-accent-orange">
              {t("mission.keywords")}
            </h3>
          </motion.div>

          <p className="font-ubuntu italic text-text-light/80 mb-8">{t("mission.signature")}</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                colorScheme="orange"
                className="bg-accent-orange text-black"
                onClick={handleContactClick}
                leftIcon={<Icon icon="lucide:mail" />}
              >
                {t("mission.button")}
              </Button>
            </motion.div>

            <div className="bg-white p-2 rounded-md">
              <img
                src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_683949d58071012ad0b271fe_68394c0eed09172576a1593c/scale_1200"
                alt="Telegram QR Code"
                width={128}
                height={128}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;