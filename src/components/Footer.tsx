import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your subscription service
    console.log("Subscribing email:", email);
    setEmail("");
    alert("Subscription successful!");
  };

  const navItems = [
    { key: "product", label: t("nav.product"), href: "/product" },
    { key: "mission", label: t("nav.mission"), href: "/#mission" },
    { key: "roadmap", label: t("nav.roadmap"), href: "/#roadmap" },
    { key: "team", label: t("nav.team"), href: "/team" },
    { key: "contacts", label: t("nav.contacts"), href: "/#contacts" },
  ];

  const socialLinks = [
    { icon: "lucide:github", href: "https://github.com" },
    { icon: "lucide:twitter", href: "https://twitter.com" },
    { icon: "lucide:linkedin", href: "https://linkedin.com" },
    { icon: "lucide:instagram", href: "https://instagram.com" },
  ];

  return (
    <footer id="contacts" className="bg-surface-gray py-16">
      <div className="container mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-brand-yellow h-10 w-10 flex items-center justify-center">
                <span className="font-poppins font-black text-black text-xl">D</span>
              </div>
              <span className="ml-2 font-poppins font-black text-2xl text-text-light">DORM</span>
            </div>
            <p className="text-text-light/80 mb-4 max-w-md">{t("footer.about")}</p>
            <p className="text-text-light/60">{t("footer.copyright")}</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-ubuntu font-semibold text-xl mb-4 text-text-light">
              {t("nav.contacts")}
            </h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  as={RouterLink}
                  to={item.href}
                  className="text-text-light/80 hover:text-accent-orange transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Subscribe and Social */}
          <div>
            <h3 className="font-ubuntu font-semibold text-xl mb-4 text-text-light">
              {t("footer.subscribe")}
            </h3>
            <form onSubmit={handleSubscribe} className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="footer-input flex-grow"
              />
              <Button
                type="submit"
                className="bg-accent-orange text-black hover:bg-accent-orange/90 ml-2"
              >
                {t("footer.subscribe.button")}
              </Button>
            </form>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <Icon icon={link.icon} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-text-light/10 flex justify-between items-center">
          <Link
            as={RouterLink}
            to="/legal"
            className="text-text-light/60 hover:text-accent-orange transition-colors"
          >
            {t("footer.legal")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
