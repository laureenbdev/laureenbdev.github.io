import React, { useState, useEffect, useRef } from 'react';
import './main-page.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import AboutSection from '../sections/about/about-section';
import ProjectsSection from '../sections/projects/projects-section';
import SkillsSection from '../sections/skills/skills-section';
import ExperienceSection from '../sections/experience/experience-section';
import ContactSection from '../sections/contact/contact-section';

const MainPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('about');
    const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
    const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        // Intersection Observer to detect visible sections
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-section-id');
                        if (id) {
                            setActiveSection(id);
                            setVisibleElements((prev) => {
                                const newSet = new Set(prev);
                                newSet.add(id);
                                return newSet;
                            });
                        }
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-100px 0px -100px 0px'
            }
        );

        // Observer for animatable elements
        const animatedObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        animatedObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const observeAnimatedElements = () => {
            document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach((el) => {
                if (el.closest('[data-manual-reveal="true"]')) return;
                animatedObserver.observe(el);
            });
        };

        // Wait until elements are rendered
        setTimeout(() => {
            // Observe main sections
            Object.values(sectionsRef.current).forEach((element) => {
                if (element) {
                    observer.observe(element);
                }
            });

            observeAnimatedElements();
        }, 100);

        const mutationObserver = new MutationObserver(() => {
            observeAnimatedElements();
        });

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mutationObserver.observe(mainContent, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
            animatedObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    const replaySectionAnimations = (sectionId: string) => {
        const section = sectionsRef.current[sectionId];
        if (!section) return;

        const animated = section.querySelectorAll('.animate-on-scroll');
        animated.forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Prevent appear delay from also applying to hover transitions
            htmlEl.style.transitionDelay = '';
            htmlEl.style.setProperty('--appear-delay', '0s');
            htmlEl.classList.remove('visible');
        });

        // Force reflow to restart transitions
        void section.offsetHeight;

        animated.forEach((el, index) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.setProperty('--appear-delay', `${index * 0.08}s`);
        });

        window.setTimeout(() => {
            animated.forEach((el) => el.classList.add('visible'));
        }, 280);
    };

    const scrollToSection = (sectionId: string) => {
        const element = sectionsRef.current[sectionId];
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
            replaySectionAnimations(sectionId);
        }
    };

    const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
        sectionsRef.current[id] = el;
    };

    return (
        <div className="portfolio">
            <Header activeSection={activeSection} onNavigate={scrollToSection} />

            <main className="main-content">
                <AboutSection sectionRef={setSectionRef('about')} />
                <ProjectsSection sectionRef={setSectionRef('projects')} />
                <SkillsSection sectionRef={setSectionRef('skills')} />
                <ExperienceSection sectionRef={setSectionRef('experience')} />
                <ContactSection sectionRef={setSectionRef('contact')} />
            </main>

            <Footer />
        </div>
    );
}

export default MainPage;
