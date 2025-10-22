import React, { useEffect, useRef } from "react";
import "./about.css";

import { Icon } from '@iconify/react';

// todo : mettre une image

const About: React.FC = () => {
    const aboutRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Vérifier si on est dans la section about
            if (aboutRef.current && aboutRef.current.contains(e.target as Node)) {
                // Empêcher le scroll par défaut
                e.preventDefault();
                
                // Faire défiler vers la section projects
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        // Ajouter l'event listener
        document.addEventListener('wheel', handleWheel, { passive: false });

        // Nettoyer l'event listener
        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <section id="about" ref={aboutRef}>
            <div className="filter"></div>
            <div className="content">
                <div className="text">
                    <h2>Laureen Belgrand</h2>
                    <h3>Développeuse web fullstack </h3>
                </div>
                <div className="icons">
                    <div className="icons-container">
                        <a href="mailto:laureenbelgrand.dev@gmail.com"><Icon icon="material-symbols:mail" className="icon" /></a>
                        <span title="0768735193"><Icon icon="ic:sharp-phone" className="icon" /></span>
                        <a href="https://www.linkedin.com/in/laureen-belgrand-313652208/" target="_blank" rel="noreferrer"><Icon icon="mdi:linkedin" className="icon" /></a>
                        <a href="https://github.com/meihwg" target="_blank" rel="noreferrer"><Icon icon="ant-design:github-filled" className="icon" /></a>
                    </div>
                    <a href="#projects" id="scrollDown"><Icon icon="material-symbols:keyboard-arrow-down" className="icon" /></a>
                </div>
            </div>
        </section>
    );
};

export default About;