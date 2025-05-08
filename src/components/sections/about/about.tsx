import React from "react";
import "./about.css";

import { Icon } from '@iconify/react';

// todo : mettre une image

const About: React.FC = () => {
    return (
        <section id="about">
            <div className="filter"></div>
            <div className="content">
                <div className="left">
                    <div className="image"></div>
                    <div className="icons">
                        <a href="mailto:laureenbelgrand.dev@gmail.com"><Icon icon="material-symbols:mail" className="icon" /></a>
                        <span title="0768735193"><Icon icon="ic:sharp-phone" className="icon" /></span>
                        <a href="https://www.linkedin.com/in/laureen-belgrand-313652208/" target="_blank" rel="noreferrer"><Icon icon="mdi:linkedin" className="icon" /></a>
                        <a href="https://github.com/meihwg" target="_blank" rel="noreferrer"><Icon icon="ant-design:github-filled" className="icon" /></a>
                    </div>
                </div>
                <div className="right">
                    <div className="text">
                        <h2>Laureen Belgrand</h2>
                        <h3>Développeuse web fullstack </h3>
                        <p>Actuellement développeuse web fullstack pour l'entreprise Eticeo, j'aime aussi réaliser des projets informatiques sur mon temps libre.
                            <br />
                            Vous pourrez trouver, sur ce portefolio, des détails sur mon parcours ainsi que différents projets que j'ai pu réaliser durant mes études,
                            mes activités professionnelles ou mon temps libre.
                            <br />
                            <br />
                            Pour me contacter, vous pouvez utiliser les boutons ci-contre ou accéder à la section <a href="#contact">Contact</a>.
                        </p>
                    </div>
                    <div className="text">
                        <h3>Quelques liens :</h3>
                        <p>Mon site multifonction sur le jeu Genshin Impact : <a href="https://meihwg.github.io/genshin/" target="_blank" rel="noreferrer">https://genshin-impact.vercel.app/</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;