import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './project-modal.scss';
import { Project } from '../../data/data';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setCurrentImageIndex(0);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const projectImages = project.images.map(img => `/img/projects/${img}.png`);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % projectImages.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + projectImages.length) % projectImages.length
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                
                <div className="modal-header">
                    <h2 className="modal-title">{t(project.titleKey)}</h2>
                    <span className="modal-date">{project.date}</span>
                    <div className="modal-categories">
                        <span className="category-tag">{t(`projects.filters.type.${project.type}`)}</span>
                        <span className="category-tag">{t(`projects.filters.category.${project.category}`)}</span>
                    </div>
                </div>

                <div className="modal-body">
                    {projectImages.length > 0 && (
                        <div className="modal-images">
                            <div className="modal-image-gallery">
                                <img 
                                    src={projectImages[currentImageIndex]} 
                                    alt={`${t(project.titleKey)} - Image ${currentImageIndex + 1}`}
                                    className="modal-main-image"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                <div className="modal-thumbnails">
                                    {projectImages.length > 1 && (
                                        <>
                                            <button className="gallery-nav-button prev" onClick={prevImage}>&#10094;</button>

                                            {projectImages.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`${t(project.titleKey)} - ${index + 1}`}
                                                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ))}

                                            <button className="gallery-nav-button next" onClick={nextImage}>&#10095;</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="modal-description">
                        <div className="modal-description-text" dangerouslySetInnerHTML={{ __html: t(project.descriptionKey) }} />
                    </div>

                    <div className="modal-technologies">
                        <h3 className="modal-technologies-title">{t('projects.keywords') || 'Mots-clés'}</h3>
                        <div className="modal-tech-tags">
                            {project.keywords.map((keyword, index) => (
                                <span key={index} className="tech-tag">{keyword}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

