import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
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

const TeamPage: React.FC = () => {
  const { t } = useLanguage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);

  // Extended team members data for full gallery
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Даниил Петров",
      role: t("team.role.founder"),
      bio: "Основатель DORM Community с 10-летним опытом в IT и образовании. Выпускник МФТИ, серийный предприниматель, создавший несколько успешных стартапов в EdTech сфере. Верит в силу сообщества и потенциал каждого человека.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-1",
      telegram: "https://t.me/daniil",
      linkedin: "https://linkedin.com/in/daniil"
    },
    {
      id: 2,
      name: "Алексей Иванов",
      role: t("team.role.cto"),
      bio: "Технический директор с опытом разработки высоконагруженных систем. Выпускник ВШЭ, ранее работал в Яндексе и Mail.ru Group. Эксперт в области искусственного интеллекта и машинного обучения.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-2",
      telegram: "https://t.me/alexey",
      linkedin: "https://linkedin.com/in/alexey"
    },
    {
      id: 3,
      name: "Мария Соколова",
      role: t("team.role.designer"),
      bio: "Главный дизайнер DORM с опытом работы в международных агентствах. Выпускница Британской высшей школы дизайна. Специализируется на UX/UI дизайне и создании уникальных пользовательских интерфейсов.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-3",
      telegram: "https://t.me/maria",
      linkedin: "https://linkedin.com/in/maria"
    },
    {
      id: 4,
      name: "Сергей Новиков",
      role: t("team.role.marketing"),
      bio: "Директор по маркетингу с 8-летним опытом в digital-маркетинге. Ранее возглавлял маркетинговые отделы в крупных технологических компаниях. Эксперт в области growth hacking и построения бренда.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-4",
      telegram: "https://t.me/sergey",
      linkedin: "https://linkedin.com/in/sergey"
    },
    // Additional team members for the full gallery
    {
      id: 5,
      name: "Екатерина Смирнова",
      role: "Руководитель отдела разработки",
      bio: "Опытный разработчик и руководитель команды с более чем 7-летним стажем в создании сложных веб-приложений. Специализируется на архитектуре и оптимизации производительности.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-5",
      telegram: "https://t.me/ekaterina",
      linkedin: "https://linkedin.com/in/ekaterina"
    },
    {
      id: 6,
      name: "Андрей Козлов",
      role: "Руководитель отдела продукта",
      bio: "Продакт-менеджер с опытом работы в крупных IT-компаниях. Отвечает за стратегию развития продукта и взаимодействие с пользователями.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-6",
      telegram: "https://t.me/andrey",
      linkedin: "https://linkedin.com/in/andrey"
    },
    {
      id: 7,
      name: "Ольга Морозова",
      role: "Руководитель отдела контента",
      bio: "Опытный редактор и контент-стратег. Отвечает за создание и курирование образовательных материалов на платформе.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-7",
      telegram: "https://t.me/olga",
      linkedin: "https://linkedin.com/in/olga"
    },
    {
      id: 8,
      name: "Михаил Волков",
      role: "Руководитель отдела аналитики",
      bio: "Специалист по данным с опытом работы в аналитических отделах крупных компаний. Отвечает за сбор и анализ данных о пользователях и использовании платформы.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-8",
      telegram: "https://t.me/mikhail",
      linkedin: "https://linkedin.com/in/mikhail"
    },
    {
      id: 9,
      name: "Анна Белова",
      role: "Руководитель отдела поддержки",
      bio: "Специалист по работе с клиентами с многолетним опытом. Отвечает за качество обслуживания пользователей и решение их проблем.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-9",
      telegram: "https://t.me/anna",
      linkedin: "https://linkedin.com/in/anna"
    },
    {
      id: 10,
      role: "Руководитель отдела HR",
      name: "Дмитрий Соловьев",
      bio: "Опытный HR-специалист, отвечающий за подбор и развитие команды. Создает комфортную рабочую среду и поддерживает корпоративную культуру.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-10",
      telegram: "https://t.me/dmitry",
      linkedin: "https://linkedin.com/in/dmitry"
    },
    {
      id: 11,
      name: "Наталья Кузнецова",
      role: "Финансовый директор",
      bio: "Опытный финансист с образованием в области экономики. Отвечает за финансовую стратегию и инвестиционную политику компании.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-11",
      telegram: "https://t.me/natalia",
      linkedin: "https://linkedin.com/in/natalia"
    },
    {
      id: 12,
      name: "Игорь Лебедев",
      role: "Руководитель отдела безопасности",
      bio: "Специалист по информационной безопасности с опытом работы в крупных IT-компаниях. Отвечает за защиту данных пользователей и безопасность платформы.",
      image: "https://img.heroui.chat/image/avatar?w=280&h=280&u=team-12",
      telegram: "https://t.me/igor",
      linkedin: "https://linkedin.com/in/igor"
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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="pt-header py-16 bg-background">
      <div className="container mx-auto max-w-container px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-poppins font-black text-center mb-12"
        >
          {t("team.title")}
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
              <h3 className="mt-2 text-lg font-semibold">{member.name}</h3>
              <p className="text-accent-orange">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member details modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            selectedMember && (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedMember.name}
                </ModalHeader>
                <ModalBody>
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
                            className="text-primary-blue hover:text-accent-orange transition-colors"
                          >
                            <Icon icon="lucide:send" width={24} height={24} />
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-blue hover:text-accent-orange transition-colors"
                          >
                            <Icon icon="lucide:linkedin" width={24} height={24} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>{t("team.modal.close")}</Button>
                </ModalFooter>
              </>
            )
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TeamPage;
