import React from "react";
import MissionSection from "../components/MissionSection";
// import { SEO } from "../components/SEO"; // Раскомментируйте, если нужно добавить SEO

const MissionPage: React.FC = () => {
  return (
    <>
      {/* Раскомментируйте и настройте, если нужно SEO
        <SEO 
          title="Наша Миссия" 
          description="Узнайте о миссии и ценностях DORM Community." 
        /> 
      */}

      {/* Стандартная обертка для страниц, чтобы контент не уезжал под фиксированный хедер.
        Класс pt-header добавляет padding-top, равный высоте хедера.
      */}
      <div className="pt-header">
        {/* Внутри рендерим единственную секцию, которая составляет эту страницу */}
        <MissionSection />
      </div>
    </>
  );
};

export default MissionPage;
