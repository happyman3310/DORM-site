import React from "react";
import { Button, Input, Textarea, Checkbox, Select, SelectItem, addToast } from "@heroui/react";
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

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      // In a real app, you would send this data to your backend
      // sendForm(formData, "dormcommunity@gmail.com");

      setIsSubmitting(false);
      setFormData({
        name: "",
        birthYear: "",
        email: "",
        about: "",
        consent: false,
      });

      addToast({
        title: t("product.success"),
        description: formData.email,
        color: "success",
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
            <motion.div
              initial={{ opacity: 0, rotateY: -5 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              whileHover={{ rotateY: 5 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="shadow-xl rounded-lg overflow-hidden"
            >
              <img
                src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6839501ea3c8b17327a3de90_68395369f018c4379d2a7c23/scale_1200"
                alt="DORM Platform Mockup 1"
                className="w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateY: 5 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              whileHover={{ rotateY: -5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="shadow-xl rounded-lg overflow-hidden lg:ml-12"
            >
              <img
                src="https://img.heroui.chat/image/dashboard?w=600&h=400&u=mockup-2"
                alt="DORM Platform Mockup 2"
                className="w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateY: -5 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              whileHover={{ rotateY: 5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="shadow-xl rounded-lg overflow-hidden"
            >
              <img
                src="https://img.heroui.chat/image/dashboard?w=600&h=400&u=mockup-3"
                alt="DORM Platform Mockup 3"
                className="w-full h-auto"
              />
            </motion.div>
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
                label={t("product.name")}
                placeholder="Иван Громов"
                value={formData.name}
                onValueChange={(value) => handleChange("name", value)}
                required
                className="bg-surface-gray"
              />

              <Select
                label={t("product.birthyear")}
                placeholder="1990"
                selectedKeys={formData.birthYear ? [formData.birthYear] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChange("birthYear", selected);
                }}
                required
                className="bg-surface-gray"
                popoverProps={{
                  classNames: {
                    content: "bg-surface-gray text-text-light"
                  }
                }}
              >
                {generateYearOptions().map((year) => (
                  <SelectItem key={year}>{year}</SelectItem>
                ))}
              </Select>

              <Input
                type="email"
                label={t("product.email")}
                placeholder="ivan.gromov@example.com"
                value={formData.email}
                onValueChange={(value) => handleChange("email", value)}
                required
                className="bg-surface-gray"
              />

              <Textarea
                label={t("product.about")}
                placeholder="Расскажите немного о себе..."
                value={formData.about}
                onValueChange={(value) => handleChange("about", value)}
                required
                className="bg-surface-gray"
                minRows={3}
              />

              <Checkbox
                isSelected={formData.consent}
                onValueChange={(value) => handleChange("consent", value)}
                required
              >
                {t("product.consent")}
              </Checkbox>

              <Button
                type="submit"
                color="secondary"
                className="bg-accent-orange text-black w-full"
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