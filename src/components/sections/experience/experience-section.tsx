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
                    {experienceData.map((exp, index) => {
                        const endDateValue = t(exp.endDateKey);
                        const isCurrent = endDateValue === 'now';

                        return (
                            <article 
                                key={exp.id} 
                                className={[
                                    'experience-item',
                                    `experience-item--${exp.type}`,
                                    isCurrent ? 'experience-item--current' : 'experience-item--past',
                                    'animate-on-scroll',
                                ].join(' ')}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                            >
                                <div className="experience-marker" aria-hidden="true"></div>
                                <div className="experience-content">
                                    <div className="experience-meta">
                                        <div className="experience-badges">
                                            <span className="experience-type">
                                                {t(`experience.types.${exp.type}`)}
                                            </span>
                                            {isCurrent && (
                                                <span className="experience-current">
                                                    {t('experience.current')}
                                                </span>
                                            )}
                                        </div>
                                        <span className="experience-period">
                                            {t(exp.startDateKey)} - {isCurrent ? t('experience.now') : endDateValue}
                                        </span>
                                    </div>

                                    <div className="experience-header">
                                        {exp.image && (
                                            <div className="experience-image-wrapper">
                                                <img 
                                                    src={exp.image} 
                                                    alt=""
                                                    className="experience-image"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="experience-heading">
                                            <h3 className="experience-title">{t(exp.titleKey)}</h3>
                                            <p className="experience-company">{t(exp.companyKey)}</p>
                                        </div>
                                    </div>

                                    <ul className="experience-description">
                                        {exp.descriptionKeys.map((key, descIndex) => (
                                            <li key={descIndex}>{t(key)}</li>
                                        ))}
                                    </ul>

                                    {exp.technologies.length > 0 && (
                                        <div className="experience-technologies">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
