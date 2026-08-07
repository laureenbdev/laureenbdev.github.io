import React from 'react';
import { useTranslation } from 'react-i18next';
import './contact-section.scss';
import { contactData } from '../../../data/data';

interface ContactSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

type ContactLink = {
    key: string;
    href: string;
    label: string;
    value: string;
    external: boolean;
};

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();

    const contactLinks: ContactLink[] = [
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
    ];

    const usefulLinks: ContactLink[] = [
        ...(contactData.github
            ? [{
                key: 'github',
                href: contactData.github,
                label: t('contact.github'),
                value: t('contact.githubProfile'),
                external: true,
            }]
            : []),
        ...(contactData.cssbattle
            ? [{
                key: 'cssbattle',
                href: contactData.cssbattle,
                label: t('contact.cssbattle'),
                value: t('contact.cssbattleProfile'),
                external: true,
            }]
            : []),
        ...(contactData.codewars
            ? [{
                key: 'codewars',
                href: contactData.codewars,
                label: t('contact.codewars'),
                value: t('contact.codewarsProfile'),
                external: true,
            }]
            : []),
    ];

    const renderLinks = (links: ContactLink[], delayOffset: number) => (
        <div className="contact-links">
            {links.map((link, index) => (
                <a
                    key={link.key}
                    href={link.href}
                    className="contact-link animate-on-scroll"
                    style={{ ['--appear-delay' as string]: `${delayOffset + index * 0.1}s` }}
                    {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                >
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                </a>
            ))}
        </div>
    );

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
                            style={{ ['--appear-delay' as string]: '0.05s' }}
                        >
                            {t('contact.intro')}
                        </p>
                    )}

                    <div className="contact-groups">
                        <div className="contact-group">
                            <h3
                                className="contact-group-title animate-on-scroll"
                                style={{ ['--appear-delay' as string]: '0.08s' }}
                            >
                                {t('contact.contactsTitle')}
                            </h3>
                            {renderLinks(contactLinks, 0.15)}
                        </div>

                        <div className="contact-group">
                            <h3
                                className="contact-group-title animate-on-scroll"
                                style={{ ['--appear-delay' as string]: '0.28s' }}
                            >
                                {t('contact.linksTitle')}
                            </h3>
                            {renderLinks(usefulLinks, 0.35)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
