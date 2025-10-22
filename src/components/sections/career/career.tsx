import React from "react";
import "./career.css";

import CareerCard from "../../cards/career-card/career-card";
import { experiences } from "./data";

const Career: React.FC = () => {
    return (
        <section id="career">
            <h2>Parcours</h2>
            <div className="timeline-container">
                <div className="timeline">
                        {experiences.map((experience, index) => (
                            <div key={experience.id} className="timeline-item">
                                <CareerCard
                                    title={experience.title}
                                    company={experience.company}
                                    location={experience.location}
                                    description={experience.description}
                                    date={experience.date}
                                    image={experience.image}
                                    keywords={experience.keywords}
                                    type={experience.type}
                                    isLeft={index % 2 === 0}
                                />
                            </div>
                        ))}
                </div>
                <div className="timeline-line"></div>
            </div>
        </section>
    );
};

export default Career;