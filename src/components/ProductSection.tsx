import React from "react";
import { Button, Input, Textarea, Checkbox, Select, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface FormData {
  name: string;
  birthYear: string;
  email: string;
  about: string;
  consent: boolean;
}

const ProductSection: React.FC = () => {
  const { t } = useLanguage();
  const toast = useToast();
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    birthYear: "",
    email: "",
    about: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setFormData({
        name: "",
        birthYear: "",
        email: "",
        about: "",
        consent: false,
      });

      toast({
        title: t("product.toast.success"),
        description: t("product.toast.description", { email: formData.email }),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }, 1500);
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2010; year >= 1960; year--) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <section id="product" className="py-40 bg-gradient-to-b from-background to-primary-blue">
      <div className="container mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Mockups */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Mockups... без изменений */}
          </div>

          {/* Right side - Beta form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-sm mx-auto lg:mx-0"
          >
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-accent-orange mb-8">
              {t("product.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder={t("product.namePlaceholder")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                bg="surface-gray"
                border="none"
              />

              <Select
                placeholder={t("product.birthYearPlaceholder")}
                value={formData.birthYear}
                onChange={(e) => handleChange("birthYear", e.target.value)}
                required
                bg="surface-gray"
                border="none"
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>

              <Input
                type="email"
                placeholder={t("product.emailPlaceholder")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                bg="surface-gray"
                border="none"
              />

              <Textarea
                placeholder={t("product.aboutPlaceholder")}
                value={formData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                required
                bg="surface-gray"
                border="none"
                rows={3}
              />

              <Checkbox
                isChecked={formData.consent}
                onChange={(e) => handleChange("consent", e.target.checked)}
                required
              >
                {t("product.consent")}
              </Checkbox>

              <Button
                type="submit"
                bg="accent-orange"
                color="black"
                w="full"
                _hover={{ bg: 'accent-orange/90' }}
                isLoading={isSubmitting}
                isDisabled={isSubmitting || !formData.consent}
              >
                {t("product.submit")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
