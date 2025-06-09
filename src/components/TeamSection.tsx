import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  telegram?: string;
  linkedin?: string;
}

const TeamSection: React.FC = () => {
  const { t } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);

  // Sample team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Даниил Блчкарев",
      role: t("team.role.founder"),
      bio: "Основатель DORM Community с 4-летним опытом в IT. Студент ГУУ, серийный предприниматель. Верит в силу сообщества и потенциал каждого человека.",
      image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6839446bb406aa11a810b5f8_6839447b23ddd33f9a432403/scale_1200",
      telegram: "https://t.me/Bochkarev_Daniil",
      linkedin: "https://linkedin.com/in/daniil"
    },
    {
      id: 2,
      name: "Сиявуш Джамалов",
      role: t("team.role.cto"),
      bio: "Технический директор с опытом разработки высоконагруженных систем. Студент МГУ, ранее работал в Яндексе. Эксперт в области искусственного интеллекта и машинного обучения.",
      image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6839446bb406aa11a810b5f8_683944a7ed091725769875d9/scale_1200",
      telegram: "https://t.me/by_call",
      linkedin: "https://linkedin.com/in/alexey"
    },
    {
      id: 3,
      name: "Александр Радько",
      role: t("team.role.SMM"),
      bio: " SMM специалист DORM . Студент МГУ.",
      image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6839446bb406aa11a810b5f8_6839448345c53a72bd1a6fc7/scale_1200",
      telegram: "https://t.me/locolittle",
      linkedin: "https://linkedin.com/in/maria"
    },
    {
      id: 4,
      name: "Прохор Павлов",
      role: t("team.role.content-making"),
      bio: "Контент-мейкер. Студент ГУУ ",
      image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6839446bb406aa11a810b5f8_683944b147468404dc455910/scale_1200",
      telegram: "https://t.me/Prsh_a",
      linkedin: "https://linkedin.com/in/sergey"
    }
  ];

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    onOpen();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="team" className="py-32 bg-background">
      <div className="container mx-auto max-w-container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-poppins font-black text-center mb-12"
        >
          {t("team.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover rounded-lg team-image"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member details modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          {selectedMember && (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-surface-gray text-text-light">
                {selectedMember.name}
              </ModalHeader>
              <ModalBody className="bg-surface-gray text-text-light">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-accent-orange mb-2">
                          {selectedMember.role}
                        </h3>
                        <p className="mb-4">{selectedMember.bio}</p>
                        <div className="flex gap-4">
                          {selectedMember.telegram && (
                            <a
                              href={selectedMember.telegram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-orange hover:text-accent-orange/80 transition-colors"
                            >
                              <Icon icon="lucide:send" width={24} height={24} />
                            </a>
                          )}
                          {selectedMember.linkedin && (
                            <a
                              href={selectedMember.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-orange hover:text-accent-orange/80 transition-colors"
                            >
                              <Icon icon="lucide:linkedin" width={24} height={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </ModalBody>
              <ModalFooter className="bg-surface-gray">
                <Button colorScheme="orange" className="text-black" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default TeamSection;