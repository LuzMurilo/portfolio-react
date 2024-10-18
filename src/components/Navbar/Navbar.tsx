import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getImageURL } from "../../utils";
import { useState } from "react";
import SvgIcon from "../SVG/SvgIcon";

import data from "../../data/navigation.json";


interface navbarProps {
    setLanguage?: () => void;
    language: string;
    navData: {
        title: string;
        pages: {
            pageName: { [key:string] : string}
            path: string;
        }[];
        socials: {
            id: string;
            link: string;
            icon: string;
        }[];
    };
}

const Navbar = ({ language = "en", navData }: navbarProps) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    // const [language, setLanguage] = useState<string>("en");

  return (
    <>
        <nav className={styles.navbar} id="navbar">
            <Link to="/" className={styles.title}>{data.title}</Link>
            <div className={styles.menu}>
                <ul className={`${styles.navList} ${!menuOpen && styles.hidden}`}
                    onClick={() => setMenuOpen(false)}>
                    {navData.pages.map((page) => 
                        <li className={styles.navItem} key={page.pageName[language]}>
                            <NavLink to={page.path}>{page.pageName[language]}</NavLink>
                        </li>
                    )}
                    <li className={`${styles.navItem} ${styles.socials}`}>
                        {navData.socials.map((social) => 
                            <a href={social.link} target="_blank" className={styles.socialBtn} key={social.id}>
                                <SvgIcon icon={social.icon} />
                            </a>
                        )}
                    </li>
                </ul>
                <img className={styles.menuBtn} 
                    src={menuOpen ? getImageURL("nav/closeIcon.png") : getImageURL("nav/menuIcon.png")} 
                    alt="menu icon" 
                    onClick={() => setMenuOpen(!menuOpen)}/>
            </div>
        </nav>
        <div className={styles.space} id="anchor"></div>
    </>
  )
}

export default Navbar