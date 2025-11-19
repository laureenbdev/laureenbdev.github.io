import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './projects-section.scss';
import { projects, Project, ProjectType, ProjectCategory } from '../../../data/data';
import ProjectModal from '../../modal/project-modal';

interface ProjectsSectionProps {
    sectionRef: (el: HTMLDivElement | null) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<ProjectType>('all');
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const typeMatch = selectedType === 'all' || project.type === selectedType;
            const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
            return typeMatch && categoryMatch;
        });
    }, [selectedType, selectedCategory]);

    const projectTypes: ProjectType[] = ['all', 'personal', 'professional', 'academic'];
    const projectCategories: ProjectCategory[] = ['all', 'web', 'application', 'mobile', 'game'];

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
                ref={sectionRef}
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
                                        onClick={() => setSelectedType(type)}
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
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {t(`projects.filters.category.${category}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="projects-scroll-container">
                        <div className="projects-scroll">
                            {filteredProjects.map((project, index) => {
                                const firstImage = project.images && project.images.length > 0 
                                    ? `/img/projects/${project.images[0]}.png` 
                                    : null;
                                
                                return (
                                    <div 
                                        key={index} 
                                        className="project-card animate-on-scroll"
                                        style={{ animationDelay: `${index * 0.1}s` }}
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
