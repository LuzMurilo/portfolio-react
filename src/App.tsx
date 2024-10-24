import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// DATA
import navigationData from "./data/navigation.json";

function App() {

  const [language, setLanguage] = useState<string>("en");

  var navbarComponent: HTMLElement | null;
  var navbarAnchor: HTMLElement | null;

  useEffect(() => {
    function handleScroll() {
      if (!navbarComponent || !navbarAnchor) {
        navbarComponent = document.getElementById("navbar");
        navbarAnchor = document.getElementById("anchor");
        return;
      }

      const topBorder = navbarAnchor.getBoundingClientRect().top;

      topBorder >= 0
      ? navbarComponent.classList.remove("fixed")
      : navbarComponent.classList.add("fixed");
    }

    window.addEventListener('scroll', handleScroll);

    return (() => {
      window.removeEventListener('scroll', handleScroll);
    })
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={styles.app}>
        <header>
          <Navbar navData={navigationData} language={language} setLanguage={setLanguage}/>
        </header>
        <main>
          <Routes>
            <Route index element={<Home language={language} />}  />
            <Route path="/projects" element={<Projects language={language}/>} />
            <Route path="/experiences" element={<Experiences language={language}/>} />
            <Route path="/contact" element={<Contact language={language}/>} />
          </Routes>
        </main>
        <footer>
          <Footer navData={navigationData} language={language}/>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
