import React from 'react';
import { useTranslation } from 'react-i18next';
import './contact-section.scss';
import { contactData } from '../../../data/data';

interface ContactSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    return (
        <section 
            id="contact" 
            className="section section-contact"
            ref={sectionRef}
            data-section-id="contact"
        >
            <div className="section-container">
                <div className="section-header">
                    <span className="section-number">04</span>
                    <h2 className="section-title">{t('sections.contact')}</h2>
                </div>
                <div className="contact-content">
                    <p className="contact-intro">
                        {t('contact.intro')}
                    </p>
                    <div className="contact-links">
                        <a href={`mailto:${contactData.email}`} className="contact-link">
                            <span className="contact-link-label">{t('contact.email')}</span>
                            <span className="contact-link-value">{contactData.email}</span>
                        </a>
                        {contactData.linkedin && (
                            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                                <span className="contact-link-label">{t('contact.linkedin')}</span>
                                <span className="contact-link-value">{t('contact.linkedinProfile')}</span>
                            </a>
                        )}
                        {contactData.github && (
                            <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                                <span className="contact-link-label">{t('contact.github')}</span>
                                <span className="contact-link-value">{t('contact.githubProfile')}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

