export type ProjectType = 'personal' | 'professional' | 'academic' | 'associative' | 'all';
export type ProjectCategory = 'web' | 'application' | 'mobile' | 'game' | 'all';

export interface Project {
  titleKey: string;
  descriptionShortKey: string;
  descriptionKey: string;
  images: string[];
  type: ProjectType;
  category: ProjectCategory;
  date: string;
  keywords: string[];
  link?: string;
  codeLink?: string;
}

export interface Skill {
  categoryKey: string;
  items: string[];
}

export type ExperienceType = 'work' | 'education' | 'association';

export interface Experience {
  id: string;
  type: ExperienceType;
  titleKey: string;
  companyKey: string;
  startDateKey: string;
  endDateKey: string;
  descriptionKeys: string[];
  technologies: string[];
  image?: string;
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  cssbattle?: string;
  codewars?: string;
}

export interface AboutData {
  name: string;
  titleKey: string;
  bioKeys: string[];
  image?: string;
}

export const aboutData: AboutData = {
  name: "Laureen Belgrand",
  titleKey: "about.title",
  bioKeys: [
    "about.bio.paragraph1",
    "about.bio.paragraph2",
    "about.bio.paragraph3"
  ],
  image: undefined
};

export const projects: Project[] = [
  {
    titleKey: "projects.list.project9.title",
    descriptionShortKey: "projects.list.project9.descriptionShort",
    descriptionKey: "projects.list.project9.description",
    images: ["cssbattle"],
    type: "personal",
    category: "web",
    date: "07/2026 - now",
    keywords: ['HTML', 'CSS', 'JS'],
    link: "https://github.com/laureenbdev/cssbattle",
  },
  {
    titleKey: "projects.list.project8.title",
    descriptionShortKey: "projects.list.project8.descriptionShort",
    descriptionKey: "projects.list.project8.description",
    images: ["prolo2026", "prolo2026-2"],
    type: "associative",
    category: "web",
    date: "05/2026 - now",
    keywords: ['CSS'],
  },
  {
    titleKey: "projects.list.project10.title",
    descriptionShortKey: "projects.list.project10.descriptionShort",
    descriptionKey: "projects.list.project10.description",
    images: ["portfolio", "portfolio-2"],
    type: "personal",
    category: "web",
    date: "11/2025 - now",
    keywords: ['React', 'TypeScript', 'SCSS'],
    codeLink: "https://github.com/laureenbdev/laureenbdev.github.io",
  },
  {
    titleKey: "projects.list.project1.title",
    descriptionShortKey: "projects.list.project1.descriptionShort",
    descriptionKey: "projects.list.project1.description",
    images: ["keyfigures"],
    type: "professional",
    category: "web",
    date: "07-2025",
    keywords: ['PHP', 'Moodle', 'JavaScript', 'HTML', 'CSS'],
    link: "https://moodle.org/plugins/block_key_figures",
    codeLink: "https://github.com/Eticeo/moodle-block_key_figures",
  },
  {
    titleKey: "projects.list.project2.title",
    descriptionShortKey: "projects.list.project2.descriptionShort",
    descriptionKey: "projects.list.project2.description",
    images: ["gadi", "gadi-2", "gadi-4", "gadi-3"],
    type: "academic",
    category: "web",
    date: "09/2023 - 03/2024",
    keywords: ['TypeScript', 'Angular', 'PHP', 'Symfony', 'PostgreSQL'],
  },
  {
    titleKey: "projects.list.project3.title",
    descriptionShortKey: "projects.list.project3.descriptionShort",
    descriptionKey: "projects.list.project3.description",
    images: ["blackholebot", "blackholebot-2"],
    type: "academic",
    category: "game",
    date: "09/2023",
    keywords: ['Python', 'Pygame'],
    codeLink: "https://github.com/Erlow38/gravity-bot",
  },
  {
    titleKey: "projects.list.project5.title",
    descriptionShortKey: "projects.list.project5.descriptionShort",
    descriptionKey: "projects.list.project5.description",
    images: ["chatjsuispt"],
    type: "personal",
    category: "web",
    date: "09/2023",
    keywords: ['HTML', 'CSS', 'JavaScript'],
    link: "https://www.ethan-ehrler.fr/chatjsuispt/",
    codeLink: "https://github.com/Erlow38/chatjsuispt",
  },
  {
    titleKey: "projects.list.project4.title",
    descriptionShortKey: "projects.list.project4.descriptionShort",
    descriptionKey: "projects.list.project4.description",
    images: ["intemporal", "intemporal-2", "intemporal-3", "intemporal-4"],
    type: "academic",
    category: "web",
    date: "2023",
    keywords: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQLite'],
  },
  {
    titleKey: "projects.list.project6.title",
    descriptionShortKey: "projects.list.project6.descriptionShort",
    descriptionKey: "projects.list.project6.description",
    images: ["hopack", "hopack-1", "hopack-3"],
    type: "academic",
    category: "application",
    date: "2022",
    keywords: ['Java', 'JavaFX'],
  },
  {
    titleKey: "projects.list.project7.title",
    descriptionShortKey: "projects.list.project7.descriptionShort",
    descriptionKey: "projects.list.project7.description",
    images: ["hardis"],
    type: "academic",
    category: "web",
    date: "2021",
    keywords: ['HTML', 'CSS'],
  },
];

export const skillsData: Skill[] = [
  {
    categoryKey: "skills.categories.frontend",
    items: ["HTML", "CSS", "SCSS", "JavaScript", "TypeScript", "JQuery", "React", "Angular"],
  },
  {
    categoryKey: "skills.categories.backend",
    items: ["PHP", "Symfony", "Python", "Java", "C", "C++"],
  },
  {
    categoryKey: "skills.categories.database",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Neo4j", "Elasticsearch", "Redis", "Oracle"]
  },
  {
    categoryKey: "skills.categories.devops",
    items: ["Docker", "Git", "CI/CD", "Linux"]
  },
  {
    categoryKey: "skills.categories.design",
    items: ["Figma", "Whimsical"]
  },
  {
    categoryKey: "skills.categories.languages",
    items: ["French", "English"]
  }
];

export const experienceData: Experience[] = [
  {
    id: "2",
    type: "work",
    titleKey: "experience.list.exp2.title",
    companyKey: "experience.list.exp2.company",
    startDateKey: "experience.list.exp2.startDate",
    endDateKey: "experience.list.exp2.endDate",
    descriptionKeys: [
      "experience.list.exp2.description.1",
      "experience.list.exp2.description.2",
      "experience.list.exp2.description.3"
    ],
    technologies: ["PHP", "JavaScript", "CSS", "SCSS", "HTML", "MySQL", "Moodle", "JQuery"],
    image: "/img/exp/eticeo.png"
  },
  {
    id: "1",
    type: "work",
    titleKey: "experience.list.exp1.title",
    companyKey: "experience.list.exp1.company",
    startDateKey: "experience.list.exp1.startDate",
    endDateKey: "experience.list.exp1.endDate",
    descriptionKeys: [
      "experience.list.exp1.description.1",
      "experience.list.exp1.description.2"
    ],
    technologies: ["HTML", "CSS"],
    image: "/img/exp/iut2.png"
  },
  {
    id: "7",
    type: "association",
    titleKey: "experience.list.exp7.title",
    companyKey: "experience.list.exp7.company",
    startDateKey: "experience.list.exp7.startDate",
    endDateKey: "experience.list.exp7.endDate",
    descriptionKeys: [
      "experience.list.exp7.description.1",
      "experience.list.exp7.description.2"
    ],
    technologies: ["HTML", "CSS", "Hugo"],
    image: "/img/exp/prologin.webp"
  },
  {
    id: "3",
    type: "education",
    titleKey: "experience.list.exp3.title",
    companyKey: "experience.list.exp3.company",
    startDateKey: "experience.list.exp3.startDate",
    endDateKey: "experience.list.exp3.endDate",
    descriptionKeys: [
      "experience.list.exp3.description.1"
    ],
    technologies: [],
    image: "/img/exp/iut2.png"
  },
  {
    id: "4",
    type: "work",
    titleKey: "experience.list.exp4.title",
    companyKey: "experience.list.exp4.company",
    startDateKey: "experience.list.exp4.startDate",
    endDateKey: "experience.list.exp4.endDate",
    descriptionKeys: [
      "experience.list.exp4.description.1"
    ],
    technologies: ["Python", "Django", "SQL", "HTML", "CSS", "JavaScript"],
    image: "/img/exp/branchet.jpg"
  },
  {
    id: "5",
    type: "work",
    titleKey: "experience.list.exp5.title",
    companyKey: "experience.list.exp5.company",
    startDateKey: "experience.list.exp5.startDate",
    endDateKey: "experience.list.exp5.endDate",
    descriptionKeys: [
      "experience.list.exp5.description.1"
    ],
    technologies: ["JavaScript", "D3.js", "HTML", "CSS"],
    image: "/img/exp/lig.png"
  },
  {
    id: "6",
    type: "education",
    titleKey: "experience.list.exp6.title",
    companyKey: "experience.list.exp6.company",
    startDateKey: "experience.list.exp6.startDate",
    endDateKey: "experience.list.exp6.endDate",
    descriptionKeys: [
      "experience.list.exp6.description.1"
    ],
    technologies: [],
    image: "/img/exp/lpo.png"
  }
];

export const contactData: ContactInfo = {
  email: "laureenbelgrand.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/laureen-belgrand-313652208/",
  github: "https://github.com/laureenbdev",
  cssbattle: "https://cssbattle.dev/player/mei_",
  codewars: "https://www.codewars.com/users/meimei_"
};

