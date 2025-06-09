import React from "react";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { useLanguage } from "../context/LanguageContext";

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-text-light/80">{t("cookie.message")}</p>
      <div className="flex gap-2">
        <ChakraLink href="/legal" className="text-accent-orange hover:underline">
          {t("cookie.more")}
        </ChakraLink>
        <Button
          color="secondary"
          className="bg-accent-orange text-black hover:bg-accent-orange/90"
          onClick={onAccept}
        >
          {t("cookie.accept")}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
