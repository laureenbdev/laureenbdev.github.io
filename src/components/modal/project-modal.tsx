import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './project-modal.scss';
import { Project } from '../../data/data';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ANIMATION_MS = 280;

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [displayedProject, setDisplayedProject] = useState<Project | null>(null);

    useEffect(() => {
        let openFrame: number | undefined;
        let closeTimeout: number | undefined;

        if (isOpen && project) {
            setDisplayedProject(project);
            setCurrentImageIndex(0);
            setIsMounted(true);
            document.body.style.overflow = 'hidden';

            openFrame = window.requestAnimationFrame(() => {
                openFrame = window.requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setIsVisible(false);
            closeTimeout = window.setTimeout(() => {
                setIsMounted(false);
                setDisplayedProject(null);
                document.body.style.overflow = '';
            }, ANIMATION_MS);
        }

        return () => {
            if (openFrame !== undefined) {
                window.cancelAnimationFrame(openFrame);
            }
            if (closeTimeout !== undefined) {
                window.clearTimeout(closeTimeout);
            }
        };
    }, [isOpen, project]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!isVisible || !displayedProject) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            const imageCount = displayedProject.images.length;
            if (imageCount <= 1) return;

            if (event.key === 'ArrowRight') {
                setCurrentImageIndex((prev) => (prev + 1) % imageCount);
            }
            if (event.key === 'ArrowLeft') {
                setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, onClose, displayedProject]);

    if (!isMounted || !displayedProject) return null;

    const projectImages = displayedProject.images.map((img) => `/img/projects/${img}.png`);
    const hasMultipleImages = projectImages.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + projectImages.length) % projectImages.length
        );
    };

    return (
        <div
            className={`modal-overlay${isVisible ? ' is-open' : ''}`}
            onClick={onClose}
        >
            <div
                className={`modal-content${isVisible ? ' is-open' : ''}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                {projectImages.length > 0 && (
                    <header className="modal-slider">
                        <div className="modal-slider-stage">
                            <img
                                src={projectImages[currentImageIndex]}
                                alt={`${t(displayedProject.titleKey)} - ${currentImageIndex + 1}`}
                                className="modal-slider-image"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />

                            {hasMultipleImages && (
                                <>
                                    <button
                                        type="button"
                                        className="modal-slider-nav prev"
                                        onClick={prevImage}
                                        aria-label="Previous image"
                                    >
                                        &#10094;
                                    </button>
                                    <button
                                        type="button"
                                        className="modal-slider-nav next"
                                        onClick={nextImage}
                                        aria-label="Next image"
                                    >
                                        &#10095;
                                    </button>
                                </>
                            )}
                        </div>

                        {hasMultipleImages && (
                            <div className="modal-slider-dots" role="tablist" aria-label="Gallery">
                                {projectImages.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        role="tab"
                                        aria-selected={index === currentImageIndex}
                                        className={`modal-slider-dot${index === currentImageIndex ? ' active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                        aria-label={`Image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </header>
                )}

                <div className="modal-body">
                    <div className="modal-meta">
                        <div className="modal-categories">
                            <span className="modal-tag modal-tag--type">
                                {t(`projects.filters.type.${displayedProject.type}`)}
                            </span>
                            <span className="modal-tag modal-tag--category">
                                {t(`projects.filters.category.${displayedProject.category}`)}
                            </span>
                        </div>
                        <span className="modal-date">{displayedProject.date}</span>
                    </div>

                    <div className="modal-title-row">
                        <h2 className="modal-title">{t(displayedProject.titleKey)}</h2>
                        {displayedProject.link && (
                            <a
                                href={displayedProject.link}
                                className="modal-project-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('projects.viewProject')}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M7 17L17 7M17 7H9M17 7V15"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>

                    <div
                        className="modal-description"
                        dangerouslySetInnerHTML={{ __html: t(displayedProject.descriptionKey) }}
                    />

                    {displayedProject.keywords.length > 0 && (
                        <div className="modal-keywords">
                            <h3 className="modal-keywords-title">{t('projects.keywords')}</h3>
                            <div className="modal-keywords-list">
                                {displayedProject.keywords.map((keyword, index) => (
                                    <span key={index} className="tech-tag">{keyword}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
