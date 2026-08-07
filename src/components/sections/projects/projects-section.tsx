import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './projects-section.scss';
import { projects, Project, ProjectType, ProjectCategory } from '../../../data/data';
import ProjectModal from '../../modal/project-modal';

interface ProjectsSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const HIDE_DURATION_MS = 320;

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<ProjectType>('all');
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [hasRevealed, setHasRevealed] = useState(false);

    const sectionElRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const filterTimeoutRef = useRef<number | null>(null);

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const typeMatch = selectedType === 'all' || project.type === selectedType;
            const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
            return typeMatch && categoryMatch;
        });
    }, [selectedType, selectedCategory]);

    const projectTypes: ProjectType[] = ['all', 'personal', 'professional', 'academic'];
    const projectCategories: ProjectCategory[] = ['all', 'web', 'application', 'mobile', 'game'];

    const setCombinedRef = useCallback((el: HTMLDivElement | null) => {
        sectionElRef.current = el;
        sectionRef(el);
    }, [sectionRef]);

    const hideCards = useCallback(() => {
        const cards = scrollRef.current?.querySelectorAll('.project-card');
        cards?.forEach((card) => {
            const el = card as HTMLElement;
            el.style.transitionDelay = '0s';
            el.classList.remove('visible');
        });
    }, []);

    const revealCards = useCallback(() => {
        const cards = scrollRef.current?.querySelectorAll('.project-card');
        cards?.forEach((card, index) => {
            const el = card as HTMLElement;
            el.classList.remove('visible');
            el.style.transitionDelay = `${index * 0.08}s`;
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                cards?.forEach((card) => card.classList.add('visible'));
            });
        });
    }, []);

    const changeFilter = useCallback((apply: () => void) => {
        if (filterTimeoutRef.current) {
            window.clearTimeout(filterTimeoutRef.current);
        }

        setIsFiltering(true);
        hideCards();

        filterTimeoutRef.current = window.setTimeout(() => {
            apply();
            setIsFiltering(false);

            window.setTimeout(() => {
                revealCards();
                setHasRevealed(true);
            }, 40);
        }, HIDE_DURATION_MS);
    }, [hideCards, revealCards]);

    const handleTypeChange = (type: ProjectType) => {
        if (type === selectedType || isFiltering) return;
        changeFilter(() => setSelectedType(type));
    };

    const handleCategoryChange = (category: ProjectCategory) => {
        if (category === selectedCategory || isFiltering) return;
        changeFilter(() => setSelectedCategory(category));
    };

    // Première apparition au scroll dans la section
    useEffect(() => {
        const section = sectionElRef.current;
        if (!section || hasRevealed) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    revealCards();
                    setHasRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [hasRevealed, revealCards]);

    useEffect(() => {
        return () => {
            if (filterTimeoutRef.current) {
                window.clearTimeout(filterTimeoutRef.current);
            }
        };
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <>
            <section 
                id="projects" 
                className="section section-projects"
                ref={setCombinedRef}
                data-section-id="projects"
            >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-number">01</span>
                        <h2 className="section-title">{t('sections.projects')}</h2>
                    </div>

                    <div className="projects-filters">
                        <div className="filter-group">
                            <div className="filter-tabs">
                                {projectTypes.map((type) => (
                                    <button
                                        key={type}
                                        className={`filter-tab ${selectedType === type ? 'active' : ''}`}
                                        onClick={() => handleTypeChange(type)}
                                        disabled={isFiltering}
                                    >
                                        {t(`projects.filters.type.${type}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-group">
                            <div className="filter-tabs">
                                {projectCategories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                        disabled={isFiltering}
                                    >
                                        {t(`projects.filters.category.${category}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`projects-scroll-container${isFiltering ? ' is-filtering' : ''}`}
                        data-manual-reveal="true"
                    >
                        <div className="projects-scroll" ref={scrollRef}>
                            {filteredProjects.map((project, index) => {
                                const firstImage = project.images && project.images.length > 0 
                                    ? `/img/projects/${project.images[0]}.png` 
                                    : null;
                                
                                return (
                                    <div 
                                        key={project.titleKey} 
                                        className="project-card animate-on-scroll"
                                        style={{ transitionDelay: `${index * 0.08}s` }}
                                    >
                                        {firstImage && (
                                            <div 
                                                className="project-image-wrapper"
                                                onClick={() => openModal(project)}
                                            >
                                                <img 
                                                    src={firstImage} 
                                                    alt={t(project.titleKey)}
                                                    className="project-image"
                                                />
                                            </div>
                                        )}
                                        <div className="project-header">
                                            <h3 className="project-title">{t(project.titleKey)}</h3>
                                        </div>
                                        <span className="project-date">{project.date}</span>
                                        <p className="project-description">{t(project.descriptionShortKey)}</p>
                                        <div className="project-categories">
                                            <span className="category-tag">{t(`projects.filters.type.${project.type}`)}</span>
                                            <span className="category-tag">{t(`projects.filters.category.${project.category}`)}</span>
                                        </div>
                                        <button 
                                            className="project-view-more"
                                            onClick={() => openModal(project)}
                                        >
                                            {t('projects.viewMore')}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <ProjectModal 
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
};

export default ProjectsSection;
