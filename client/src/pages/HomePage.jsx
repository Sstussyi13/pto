import { Helmet,  } from "react-helmet-async";
import HeroSection from "../components/home/HeroSection";
import TeamSection from "../components/home/TeamSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ServicesSection from "../components/home/ServicesSection";
import CallToAction from "../components/home/CallToAction";
import FAQSection from "../components/home/FAQSection";


export default function HomePage() {
  return (
    <>
      <Helmet>
  <title>ППР, проектирование и техническая документация по всей России | ПТО / ППР</title>
  <meta
    name="description"
    content="Разработка ППР, проектной и технической документации для строительных объектов. Работаем по всей России. Бесплатная консультация."
  />
  <meta name="keywords" content="ППР, проектирование, строительная документация, технический проект, Россия, ПТО, план производства работ" />
  <link rel="canonical" href="https://24ptoppr.ru" />

  {/* Open Graph (для соцсетей и мессенджеров) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ПТО / ППР — Профессиональное проектирование и документация" />
  <meta property="og:description" content="Создаём ППР и технические проекты под ключ. Работаем по всей России. Консультация бесплатно." />
  <meta property="og:url" content="https://24ptoppr.ru" />
  <meta property="og:image" content="https://24ptoppr.ru/preview.jpg" />

  {/* Twitter Cards (по желанию) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ПТО / ППР — Профессиональное проектирование и документация" />
  <meta name="twitter:description" content="ППР, технические проекты, планы работ. Работаем по всей России." />
  <meta name="twitter:image" content="https://24ptoppr.ru/preview.jpg" />
</Helmet>


      <div className="bg-white text-gray-800">
        <HeroSection />
        <TeamSection />
        <FeaturesSection />
        <ServicesSection />
        <FAQSection />
      
        <CallToAction />
      </div>
    </>
  );
}
