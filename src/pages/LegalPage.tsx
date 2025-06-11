import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, CardBody } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../context/LanguageContext";

const LegalPage: React.FC = () => {
  const { t } = useLanguage();

  const termsContent = t("legal.terms.content");
  const privacyContent = t("legal.privacy.content");

  return (
    <div className="pt-header py-16 bg-background">
      <div className="container mx-auto max-w-container px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-poppins font-black text-center mb-12"
        >
          {t("footer.legal")}
        </motion.h1>

        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>{t("legal.terms.title")}</Tab>
            <Tab>{t("legal.privacy.title")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card bg="surface-gray">
                <CardBody className="prose prose-invert max-w-none">
                  <ReactMarkdown>{termsContent}</ReactMarkdown>
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card bg="surface-gray">
                <CardBody className="prose prose-invert max-w-none">
                  <ReactMarkdown>{privacyContent}</ReactMarkdown>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default LegalPage;
