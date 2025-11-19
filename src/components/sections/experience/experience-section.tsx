import React from 'react';
import { useTranslation } from 'react-i18next';
import './experience-section.scss';
import { experienceData } from '../../../data/data';

interface ExperienceSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    return (
        <section 
            id="experience" 
            className="section section-experience"
            ref={sectionRef}
            data-section-id="experience"
        >
            <div className="section-container">
                <div className="section-header">
                    <span className="section-number">03</span>
                    <h2 className="section-title">{t('sections.experience')}</h2>
                </div>
                <div className="experience-timeline">
                    {experienceData.map((exp, index) => (
                        <div 
                            key={exp.id} 
                            className="experience-item animate-on-scroll"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="experience-marker"></div>
                            <div className="experience-content">
                                <div className="experience-header">
                                    <h3 className="experience-title">
                                        {exp.image && (
                                            <div className="experience-image-wrapper">
                                                <img 
                                                    src={exp.image} 
                                                    alt={t(exp.companyKey)}
                                                    className="experience-image"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {t(exp.titleKey)}
                                    </h3>
                                    <span className="experience-period">
                                        {t(exp.startDateKey)} - {
                                            (() => {
                                                const endDateValue = t(exp.endDateKey);
                                                return endDateValue === 'now' ? t('experience.now') : endDateValue;
                                            })()
                                        }
                                    </span>
                                </div>
                                <p className="experience-company">
                                    <div className="experience-image-wrapper">
                                        <img 
                                            src={exp.image} 
                                            alt={t(exp.companyKey)}
                                            className="experience-company-image"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    {t(exp.companyKey)}
                                </p>
                                <ul className="experience-description">
                                    {exp.descriptionKeys.map((key, descIndex) => (
                                        <li key={descIndex}>{t(key)}</li>
                                    ))}
                                </ul>
                                <div className="experience-technologies">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;

