import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './projects-section.scss';
import { projects, Project, ProjectType, ProjectCategory, getProjectTechnologies, techMatches } from '../../../data/data';
import ProjectModal from '../../modal/project-modal';

interface ProjectsSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
    techFilterRequest?: { tech: string; key: number } | null;
}

const HIDE_DURATION_MS = 320;
const SCROLL_EPSILON = 2;

const allTechnologies = getProjectTechnologies();

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef, techFilterRequest = null }) => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<ProjectType>('all');
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [isTechMenuOpen, setIsTechMenuOpen] = useState(false);
    const [techQuery, setTechQuery] = useState('');
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
    const techFilterRef = useRef<HTMLDivElement | null>(null);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const typeMatch = selectedType === 'all' || project.type === selectedType;
            const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
            const techMatch =
                selectedTechs.length === 0 ||
                selectedTechs.every((tech) =>
                    project.keywords.some((keyword) => techMatches(keyword, tech))
                );
            return typeMatch && categoryMatch && techMatch;
        });
    }, [selectedType, selectedCategory, selectedTechs]);

    const visibleTechnologies = useMemo(() => {
        const query = techQuery.trim().toLowerCase();
        if (!query) return allTechnologies;
        return allTechnologies.filter((tech) => tech.toLowerCase().includes(query));
    }, [techQuery]);

    const techTriggerLabel = useMemo(() => {
        if (selectedTechs.length === 0) return t('projects.filters.all');
        if (selectedTechs.length <= 2) return selectedTechs.join(', ');
        return t('projects.filters.techSelected', { count: selectedTechs.length });
    }, [selectedTechs, t]);

    const projectTypes: ProjectType[] = ['all', 'personal', 'professional', 'academic', 'associative'];
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

    const hasActiveFilters =
        selectedType !== 'all' || selectedCategory !== 'all' || selectedTechs.length > 0;

    const handleClearAllFilters = () => {
        if (!hasActiveFilters || isFiltering) return;
        changeFilter(() => {
            setSelectedType('all');
            setSelectedCategory('all');
            setSelectedTechs([]);
        });
        setIsTechMenuOpen(false);
        setTechQuery('');
    };

    const handleTechToggle = (tech: string) => {
        setSelectedTechs((prev) =>
            prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]
        );
        scrollContainerRef.current?.scrollTo({ left: 0 });
    };

    useEffect(() => {
        if (!techFilterRequest) return;

        setSelectedType('all');
        setSelectedCategory('all');
        setSelectedTechs([techFilterRequest.tech]);
        setIsTechMenuOpen(false);
        setTechQuery('');
        scrollContainerRef.current?.scrollTo({ left: 0 });
    }, [techFilterRequest]);

    const closeTechMenu = useCallback(() => {
        setIsTechMenuOpen(false);
        setTechQuery('');
    }, []);

    useEffect(() => {
        if (!hasRevealed) return;

        const timer = window.setTimeout(() => {
            revealCards();
            updateScrollArrows();
        }, 40);

        return () => window.clearTimeout(timer);
    }, [selectedTechs, hasRevealed, revealCards, updateScrollArrows]);

    useEffect(() => {
        if (!isTechMenuOpen) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (techFilterRef.current && !techFilterRef.current.contains(event.target as Node)) {
                closeTechMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeTechMenu();
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isTechMenuOpen, closeTechMenu]);

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
                        <div className="projects-filters-toolbar">
                            <button
                                type="button"
                                className="filters-reset"
                                onClick={handleClearAllFilters}
                                disabled={!hasActiveFilters || isFiltering}
                                aria-label={t('projects.filters.clearFilters')}
                                title={t('projects.filters.clearFilters')}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

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
                        <div className="filter-row">
                            <span className="filter-label">{t('projects.filters.techLabel')}</span>
                            <div className="tech-select" ref={techFilterRef}>
                                <button
                                    type="button"
                                    className={`tech-select-trigger${isTechMenuOpen ? ' is-open' : ''}${selectedTechs.length > 0 ? ' has-value' : ''}`}
                                    onClick={() => setIsTechMenuOpen((open) => !open)}
                                    disabled={isFiltering}
                                    aria-expanded={isTechMenuOpen}
                                    aria-haspopup="listbox"
                                >
                                    <span className="tech-select-value">{techTriggerLabel}</span>
                                    <svg className="tech-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>

                                {isTechMenuOpen && (
                                    <div className="tech-select-menu" role="listbox" aria-multiselectable="true">
                                        <div className="tech-select-search">
                                            <input
                                                type="search"
                                                value={techQuery}
                                                onChange={(event) => setTechQuery(event.target.value)}
                                                placeholder={t('projects.filters.techSearch')}
                                                autoFocus
                                            />
                                        </div>

                                        <div className="tech-select-options">
                                            {visibleTechnologies.length === 0 ? (
                                                <p className="tech-select-empty">{t('projects.empty')}</p>
                                            ) : (
                                                visibleTechnologies.map((tech) => {
                                                    const isActive = selectedTechs.includes(tech);
                                                    return (
                                                        <label
                                                            key={tech}
                                                            className={`tech-select-option${isActive ? ' is-active' : ''}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={isActive}
                                                                onChange={() => handleTechToggle(tech)}
                                                            />
                                                            <span>{tech}</span>
                                                        </label>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                                        <span className="project-date">
                                                            {project.date.replace(/\bnow\b/, t('experience.now'))}
                                                        </span>
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
