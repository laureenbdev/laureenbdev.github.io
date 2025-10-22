export interface CareerExperience {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    date: string;
    image: string;
    keywords: string[];
    type: 'work' | 'education' | 'internship';
}

export const experiences: CareerExperience[] = [
    {
        id: 1,
        title: "Développeuse web Full Stack",
        company: "Eticeo",
        location: "Grenoble, Auvergne-Rhône-Alpes, France",
        description: `Personnalisation graphique et fonctionnelle de plateformes de formation en ligne avant mise en production
                        <br>Création de fonctionnalités spécifiques via des plugins pour répondre aux besoins du client
                        <br>Maintenance, résolution de bugs et amélioration continue des plateformes et des outils après déploiement
                        <br>Réunions avec les clients pour définir avec précision les besoins`,
        date: "Septembre 2024 - Aujourd'hui",
        image: "eticeo.png",
        keywords: ["PHP", "Moodle", "JavaScript", "JQuery", "SQL", "Bootstrap"],
        type: "work"
    },
    {
        id: 2,
        title: "Enseignante vacataire en Développement d'interfaces web",
        company: "IUT2 - UGA",
        location: "Grenoble, Auvergne-Rhône-Alpes, France",
        description: `Intervention sur le cours de Développement d'interfaces web auprès des étudiants de première année de BUT Informatique
                        <br>Encadrement de travaux pratiques et de projet`,
        date: "Octobre 2025 - Novembre 2025",
        image: "iut2.png",
        keywords: ["HTML", "CSS"],
        type: "work"
    },
    {
        id: 3,
        title: "BUT Informatique",
        company: "IUT2 - UGA",
        location: "Grenoble, Auvergne-Rhône-Alpes, France",
        description: `Parcours Développement d'Applications`,
        date: "Septembre 2023 - Juin 2025",
        image: "iut2.png",
        keywords: [],
        type: "education"
    },
    {
        id: 4,
        title: "Développeuse web Full Stack - Stage",
        company: "Branchet Solutions",
        location: "Meylan, Auvergne-Rhône-Alpes, France",
        description: `Conception, développement et intégration d’un nouveau processus métier à une application existante
                        <br>Conception de l’interface d'un formulaire complexe et interactif et du schéma de la base de donnée
                        <br>Réunions avec le product owner pour définir avec précision les besoins`,
        date: "Mars 2024 - Juillet 2024",
        image: "branchet.png",
        keywords: ["Pyhton", "Django", "JavaScript", "CSS", "SQL"],
        type: "work"
    },
    {
        id: 5,
        title: "Développeuse web front-end - Stage",
        company: "LIG - Laboratoire d'Informatique de Grenoble",
        location: "Saint-Martin-d'Hères, Auvergne-Rhône-Alpes, France",
        description: `Visualisation de distributions fortement inégales appliquée aux émissions CO2 du laboratoire 
                        <br>
                        Developpement de graphiques interactifs à l'aide d'une librairie JavaScript`,
        date: "Avril 2023 - Juillet 2023",
        image: "lig.png",
        keywords: ["JavaScript", "D3.js"],
        type: "work"
    },
    {
        id: 6,
        title: "Baccalauréat Général",
        company: "Lycée Portes de l'Oisans",
        location: "Vizille, France",
        description: `Spécialités Numérique et Sciences Informatiques et Arts plastiques, option Mathématiques complémentaires`,
        date: "2021",
        image: "lycee-portes-de-l-oisans.png",
        keywords: [],
        type: "education"
    }
];
