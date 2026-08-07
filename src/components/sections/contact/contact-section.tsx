import React from 'react';
import { useTranslation } from 'react-i18next';
import './contact-section.scss';
import { contactData } from '../../../data/data';

interface ContactSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    const links = [
        {
            key: 'email',
            href: `mailto:${contactData.email}`,
            label: t('contact.email'),
            value: contactData.email,
            external: false,
        },
        ...(contactData.linkedin
            ? [{
                key: 'linkedin',
                href: contactData.linkedin,
                label: t('contact.linkedin'),
                value: t('contact.linkedinProfile'),
                external: true,
            }]
            : []),
        ...(contactData.github
            ? [{
                key: 'github',
                href: contactData.github,
                label: t('contact.github'),
                value: t('contact.githubProfile'),
                external: true,
            }]
            : []),
    ];

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
                    {t('contact.intro') && (
                        <p
                            className="contact-intro animate-on-scroll"
                            style={{ transitionDelay: '0.05s' }}
                        >
                            {t('contact.intro')}
                        </p>
                    )}
                    <div className="contact-links">
                        {links.map((link, index) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="contact-link animate-on-scroll"
                                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                                {...(link.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                            >
                                <span className="contact-link-label">{link.label}</span>
                                <span className="contact-link-value">{link.value}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
