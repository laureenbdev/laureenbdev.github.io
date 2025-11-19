import React from 'react';
import { useTranslation } from 'react-i18next';
import './about-section.scss';
import { aboutData } from '../../../data/data';

interface AboutSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    return (
        <section 
            id="about" 
            className="section section-about"
            ref={sectionRef}
            data-section-id="about"
        >
            <div className="section-container">
                <div className="about-content">
                    <div className="about-text">
                        <h1 className="about-name">{aboutData.name}</h1>
                        <p className="about-title">{t(aboutData.titleKey)}</p>
                        <div className="about-bio">
                            {aboutData.bioKeys.map((key, index) => (
                                <p key={index}>{t(key)}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

