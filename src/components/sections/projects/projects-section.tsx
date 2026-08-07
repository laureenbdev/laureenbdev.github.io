import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './projects-section.scss';
import { projects, Project, ProjectType, ProjectCategory } from '../../../data/data';
import ProjectModal from '../../modal/project-modal';

interface ProjectsSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const HIDE_DURATION_MS = 320;
const SCROLL_EPSILON = 2;

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<ProjectType>('all');
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [hasRevealed, setHasRevealed] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const sectionElRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
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

    const updateScrollArrows = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > SCROLL_EPSILON);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - SCROLL_EPSILON);
    }, []);

    const scrollByCard = useCallback((direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const card = container.querySelector('.project-card') as HTMLElement | null;
        const gap = 24;
        const amount = (card?.offsetWidth ?? 320) + gap;
        container.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    }, []);

    const hideCards = useCallback(() => {
        const cards = scrollRef.current?.querySelectorAll('.project-card');
        cards?.forEach((card) => {
            const el = card as HTMLElement;
            el.style.setProperty('--appear-delay', '0s');
            el.classList.remove('visible');
        });
    }, []);

    const revealCards = useCallback(() => {
        const cards = scrollRef.current?.querySelectorAll('.project-card');
        cards?.forEach((card, index) => {
            const el = card as HTMLElement;
            el.classList.remove('visible');
            el.style.setProperty('--appear-delay', `${index * 0.08}s`);
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                cards?.forEach((card) => card.classList.add('visible'));
                updateScrollArrows();
            });
        });
    }, [updateScrollArrows]);

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
                scrollContainerRef.current?.scrollTo({ left: 0 });
                updateScrollArrows();
            }, 40);
        }, HIDE_DURATION_MS);
    }, [hideCards, revealCards, updateScrollArrows]);

    const handleTypeChange = (type: ProjectType) => {
        if (type === selectedType || isFiltering) return;
        changeFilter(() => setSelectedType(type));
    };

    const handleCategoryChange = (category: ProjectCategory) => {
        if (category === selectedCategory || isFiltering) return;
        changeFilter(() => setSelectedCategory(category));
    };

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
        const container = scrollContainerRef.current;
        if (!container) return;

        updateScrollArrows();
        container.addEventListener('scroll', updateScrollArrows, { passive: true });
        window.addEventListener('resize', updateScrollArrows);

        const resizeObserver = new ResizeObserver(() => updateScrollArrows());
        resizeObserver.observe(container);
        if (scrollRef.current) {
            resizeObserver.observe(scrollRef.current);
        }

        return () => {
            container.removeEventListener('scroll', updateScrollArrows);
            window.removeEventListener('resize', updateScrollArrows);
            resizeObserver.disconnect();
        };
    }, [filteredProjects, updateScrollArrows]);

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
                        <div className="filter-row">
                            <span className="filter-label">{t('projects.filters.typeLabel')}</span>
                            <div className="filter-tabs" role="group" aria-label={t('projects.filters.typeLabel')}>
                                {projectTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`filter-tab ${selectedType === type ? 'active' : ''}`}
                                        onClick={() => handleTypeChange(type)}
                                        disabled={isFiltering}
                                        aria-pressed={selectedType === type}
                                    >
                                        {t(`projects.filters.type.${type}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-row">
                            <span className="filter-label">{t('projects.filters.categoryLabel')}</span>
                            <div className="filter-tabs" role="group" aria-label={t('projects.filters.categoryLabel')}>
                                {projectCategories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        className={`filter-tab filter-tab--category ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                        disabled={isFiltering}
                                        aria-pressed={selectedCategory === category}
                                    >
                                        {t(`projects.filters.category.${category}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="projects-carousel">
                        {canScrollLeft && (
                            <button
                                type="button"
                                className="projects-scroll-arrow projects-scroll-arrow--left"
                                onClick={() => scrollByCard('left')}
                                aria-label="Scroll left"
                            >
                                &#10094;
                            </button>
                        )}

                        <div
                            className={`projects-scroll-container${isFiltering ? ' is-filtering' : ''}`}
                            data-manual-reveal="true"
                            ref={scrollContainerRef}
                        >
                            <div className="projects-scroll" ref={scrollRef}>
                                {filteredProjects.length === 0 ? (
                                    <p className="projects-empty">{t('projects.empty')}</p>
                                ) : (
                                    filteredProjects.map((project, index) => {
                                        const firstImage = project.images && project.images.length > 0 
                                            ? `/img/projects/${project.images[0]}.png` 
                                            : null;
                                        const shortDesc = t(project.descriptionShortKey);
                                        
                                        return (
                                            <article 
                                                key={project.titleKey} 
                                                className="project-card animate-on-scroll"
                                                style={{ ['--appear-delay' as string]: `${index * 0.08}s` }}
                                                onClick={() => openModal(project)}
                                            >
                                                <div className="project-image-wrapper">
                                                    {firstImage ? (
                                                        <img 
                                                            src={firstImage} 
                                                            alt=""
                                                            className="project-image"
                                                        />
                                                    ) : (
                                                        <div className="project-image-placeholder" />
                                                    )}
                                                </div>

                                                <div className="project-body">
                                                    <div className="project-tags">
                                                        <span className="project-tag project-tag--type">
                                                            {t(`projects.filters.type.${project.type}`)}
                                                        </span>
                                                        <span className="project-tag project-tag--category">
                                                            {t(`projects.filters.category.${project.category}`)}
                                                        </span>
                                                    </div>

                                                    <div className="project-heading">
                                                        <h3 className="project-title">{t(project.titleKey)}</h3>
                                                        <span className="project-date">{project.date}</span>
                                                    </div>

                                                    {shortDesc && (
                                                        <p className="project-description">{shortDesc}</p>
                                                    )}

                                                    <span className="project-view-more">
                                                        {t('projects.viewMore')}
                                                    </span>
                                                </div>
                                            </article>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {canScrollRight && (
                            <button
                                type="button"
                                className="projects-scroll-arrow projects-scroll-arrow--right"
                                onClick={() => scrollByCard('right')}
                                aria-label="Scroll right"
                            >
                                &#10095;
                            </button>
                        )}
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
