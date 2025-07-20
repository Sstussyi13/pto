import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "@studio-freight/lenis";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/HomePage.jsx";
import Services from "./pages/ServicesPage.jsx";
import Steps from "./pages/StepsPage.jsx";
import Contacts from "./pages/Contacts.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import MultiStepVacancyForm from "./pages/Vacancypage.jsx"; 
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const lenis = new Lenis({ smooth: true, lerp: 0.1 });
    lenisRef.current = lenis;
    window.lenis = lenis;

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    const links = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      }
    };
    links.forEach((link) => link.addEventListener("click", handleAnchorClick));

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      links.forEach((link) => link.removeEventListener("click", handleAnchorClick));
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/steps" element={<Steps />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/MultiStepVacancyForm" element={<MultiStepVacancyForm />} /> 
        </Route>
        <Route path="/super/login" element={<LoginPage />} />
        <Route
          path="/super"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}
