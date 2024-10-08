import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";

function App() {

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
      <div className={styles.app}>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
