import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 64;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { key: "product", label: t("nav.product"), href: "/product" },
    { key: "mission", label: t("nav.mission"), href: "/#mission" },
    { key: "roadmap", label: t("nav.roadmap"), href: "/#roadmap" },
    { key: "team", label: t("nav.team"), href: "/team" },
    { key: "contacts", label: t("nav.contacts"), href: "/#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full h-header header-transition ${
        scrolled ? "bg-surface-gray/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-container px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center">
          <div className="h-9 w-9 flex items-center justify-center overflow-hidden rounded-sm">
            <img 
              src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_683949d58071012ad0b271fe_683949f69d2ccd3aa028765f/scale_1200" 
              alt="DORM Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="ml-2 font-poppins font-black text-xl text-text-light">DORM</span>
        </RouterLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              as={RouterLink}
              to={item.href}
              className="font-ubuntu text-text-light hover:text-accent-orange transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right section: Language switcher and CTA */}
        <div className="flex items-center space-x-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="min-w-0 px-2 font-mono"
                startContent={
                  <Icon
                    icon={language === "ru" ? "logos:russia" : "logos:united-kingdom"}
                    width={20}
                    height={20}
                  />
                }
              >
                {language === "ru" ? "RU" : "EN"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              onAction={(key) => setLanguage(key as "ru" | "en")}
              selectedKeys={[language]}
            >
              <DropdownItem
                key="ru"
                startContent={<Icon icon="logos:russia" width={20} height={20} />}
              >
                Русский
              </DropdownItem>
              <DropdownItem
                key="en"
                startContent={<Icon icon="logos:united-kingdom" width={20} height={20} />}
              >
                English
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as={RouterLink}
              to="/product"
              color="secondary"
              className="bg-accent-orange hover:bg-gradient-primary-accent hover:shadow-glow transition-all duration-300"
            >
              {t("cta.start")}
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;