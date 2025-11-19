import React from 'react';
import { useTranslation } from 'react-i18next';
import './footer.scss';
import { aboutData } from '../../data/data';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} {aboutData.name}. {t('footer.rights')}</p>
        </footer>
    );
};

export default Footer;

