import React from "react";
import "./career-card.css";

import { Icon } from '@iconify/react';

interface CareerCardProps {
    title: string;
    company: string;
    location: string;
    description: string;
    date: string;
    image: string;
    keywords: string[];
    type: 'work' | 'education' | 'internship';
    isLeft: boolean;
}

const CareerCard: React.FC<CareerCardProps> = ({ 
    title, 
    company, 
    location, 
    description, 
    date, 
    image, 
    keywords, 
    type,
    isLeft 
}) => {
    
    const getTypeIcon = () => {
        switch (type) {
            case 'work':
                return 'material-symbols:work';
            case 'education':
                return 'material-symbols:school';
            default:
                return 'material-symbols:work';
        }
    };

    return (
        <div className={`career-card ${isLeft ? 'left' : 'right'}`}>
            <div className="card-content">
                <div className="card-image">
                    <img src={`/img/career/${image}`} alt={`${company} logo`} />
                </div>
                <div className="card-info">
                    <div className="card-header">
                        <div className="type-indicator" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <Icon icon={getTypeIcon()} className="type-icon" />
                        </div>
                        <div className="title-section">
                            <h3>{title}</h3>
                            <div className="company-location">
                                <span className="company">{company}</span>
                                <span className="location">{location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="description">{description}</p>
                        <div className="keywords">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="keyword">{keyword}</span>
                            ))}
                        </div>
                    </div>
                    <div className="card-footer">
                        <span className="date">{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerCard;
