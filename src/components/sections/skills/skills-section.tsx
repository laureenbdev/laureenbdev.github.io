import React from 'react';
import { useTranslation } from 'react-i18next';
import './skills-section.scss';
import { skillsData } from '../../../data/data';

interface SkillsSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    return (
        <section 
            id="skills" 
            className="section section-skills"
            ref={sectionRef}
            data-section-id="skills"
        >
            <div className="section-container">
                <div className="section-header">
                    <span className="section-number">02</span>
                    <h2 className="section-title">{t('sections.skills')}</h2>
                </div>
                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <div 
                            key={index} 
                            className="skill-category animate-on-scroll"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <h3 className="skill-category-title">{t(skill.categoryKey)}</h3>
                            <div className="skill-items">
                                {skill.items.map((item, itemIndex) => (
                                    <span key={itemIndex} className="skill-item">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

