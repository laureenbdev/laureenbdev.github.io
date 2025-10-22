import React from 'react';
import './main-page.css';

import Header from '../header/header.tsx';
import About from '../sections/about/about.tsx';
import Projects from '../sections/projects/projects.tsx';
import Career from '../sections/career/career.tsx';
import Contact from '../sections/contact/contact.tsx';
import Footer from '../footer/footer.tsx';

const MainPage: React.FC = () => {
    return (
        <>
            <About />
            <Header />
            <Projects />
            <Career />
            <Contact />
            <Footer />
        </>
    );
}

export default MainPage;