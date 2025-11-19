import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './header.scss';
import { aboutData } from '../../data/data';

interface HeaderProps {
    activeSection: string;
    onNavigate: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
    const { t, i18n: i18nInstance } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18nInstance.changeLanguage(lng);
    };

    const handleNavClick = (sectionId: string) => {
        onNavigate(sectionId);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-logo">
                    <span className="logo-text">{aboutData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <button 
                            className={activeSection === 'about' ? 'active' : ''}
                            onClick={() => handleNavClick('about')}
                        >
                            {t('nav.about')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeSection === 'projects' ? 'active' : ''}
                            onClick={() => handleNavClick('projects')}
                        >
                            {t('nav.projects')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeSection === 'skills' ? 'active' : ''}
                            onClick={() => handleNavClick('skills')}
                        >
                            {t('nav.skills')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeSection === 'experience' ? 'active' : ''}
                            onClick={() => handleNavClick('experience')}
                        >
                            {t('nav.experience')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={() => handleNavClick('contact')}
                        >
                            {t('nav.contact')}
                        </button>
                    </li>
                </ul>
                <div className="nav-language">
                    <button 
                        className={`lang-button ${i18nInstance.language === 'fr' ? 'active' : ''}`}
                        onClick={() => changeLanguage('fr')}
                        title="Français"
                    >
                        FR
                    </button>
                    <button 
                        className={`lang-button ${i18nInstance.language === 'en' ? 'active' : ''}`}
                        onClick={() => changeLanguage('en')}
                        title="English"
                    >
                        EN
                    </button>
                </div>
                <button 
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

export default Header;

