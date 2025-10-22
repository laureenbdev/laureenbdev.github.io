import React from "react";
import "./contact.css";

import { Icon } from '@iconify/react';

// todo : mettre une image

const Contact: React.FC = () => {
    return (
        <section id="contact"> 
            <div className="filter"></div>
            <div className="content">
                <div className="left">
                    <div className="text">
                        <h2>Me contacter</h2>
                            <p> Vous pouvez me contacter via les moyens suivants : <br /> <br />
                                <Icon icon="material-symbols:mail" /> : laureenbelgrand.dev@gmail.com <br />
                                <Icon icon="ic:sharp-phone" /> : 0768735193 <br />
                                <Icon icon="mdi:linkedin" /> : <a href="https://www.linkedin.com/in/laureen-belgrand-313652208/" target="_blank" rel="noreferrer">Laureen Belgrand</a> <br />
                                <Icon icon="ant-design:github-filled" /> : <a href="https://www.github.com/meihwg" target="_blank" rel="noreferrer">meihwg</a>
                            </p>
                    </div>
                    <div className="text">
                        <h2>Quelques liens :</h2>
                        <p>Mon site multifonction sur le jeu Genshin Impact : <a href="https://meihwg.github.io/genshin/" target="_blank" rel="noreferrer">https://meihwg.github.io/genshin/</a></p>
                    </div>
                </div>
                <div className="image"></div>
            </div>
        </section>
    );
};

export default Contact;