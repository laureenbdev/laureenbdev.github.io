export interface Project {
    title: string;
    images: string[];
    tags: string[];
    date: string;
    description: string;
    keywords: string[];
}

export const projects: Project[] = [
    {
        title: "Key figures - Plugin bloc Moodle",
        images: ["keyfigures"],
        tags: ["Web", "Professionnels"],
        date: "07-2025",
        description: `Dans le contexte de mon travail dans l'entreprise Eticeo, j'ai l'occasion de développer de nombreux plugins utilisés sur nos plateformes Moodle.
                                <br>
                                <br>
                                Le plugin block_key_figures est le premier de ces plugins que j'ai eu l'occasion de publier pour le rendre accessible à la communauté.
                                Le plugin est assez simple, il permet de visualiser des chiffres clés définis en dur dans les paramètres de l'instance du bloc.
                                Par exemple, il peut être utilisé sur les pages d'accueil des plateformes pour montrer certaines données aux visiteurs et les motiver à s'inscrire aux formations.
                                <br>
                                <br>
                                Avant de publier ce plugin, il a fallut lui apporter quelques modifications pour qu'il puisse être validés par les modérateurs Moodle.
                                Ces modifications comprennent : 
                                <ul>
                                    <li>Refactorisation et simplification du plugin</li>
                                    <li>Nettoyage du code</li>
                                    <li>Ajout de documentation</li>
                                    <li>Modification pour suivre les directives Moodle concernant notamment la syntaxe, la qualité du code, la sécurité, et la compatibilité avec les autres composants</li>
                                </ul>
                                <br>
                                <br>
                                Voici le lien vers le plugin : <a href='https://moodle.org/plugins/block_key_figures' target='_blank'>https://moodle.org/plugins/block_key_figures</a>`,
        keywords: ['PHP', 'Moodle', 'Plugin', 'Block', 'Optimisation', 'Refactorisation', 'Nettoyage', 'Normes'],
    },
    {
        title: "GADI - Gestion Administrative du Département Informatiques",
        images: ["gadi", "gadi-2", "gadi-4", "gadi-3"],
        tags: ["Web", "Universitaires"],
        date: "09/2023 - 03/2024",
        description: `Durant ma troisième année de BUT, j'ai eu l'occasion de travailler sur un projet complet sur l'entièreté de l'année scolaire. Ce projet, réalisé en équipe de 7,
                                avait pour objectif de réaliser une application web afin de faciliter l'organisation des cours et des ressources à nos professeurs et personnels du
                                département informatique de notre IUT. 
                                <br />
                                L'objectif de ce projet était de ce projet était de <b/>simuler une entreprise</b> de développement logiciel. Nous avions donc des postes au sein de cette entreprise,
                                des réunions régulières d'équipes et avec les <b/>clients</b>, des délais à respecter, etc.
                                <br />
                                <br />
                                L'application réalisée, nommée GADI pour Gestion Administrative du Département Informatique, permet aux professeurs de planifier leurs séances de cours sur
                                l'entièreté de l'année, de gérer les ressources nécessaires à ces cours (salles, matériels, etc.), de gérer les étudiants et les groupes de TP, etc. afin de permettre
                                la création des emplois du temps.
                                <br />
                                <br />
                                L'application a été réalisée en <b/>Angular</b> pour le front-end et en <b/>Symfony</b> pour le back-end. Nous avons également utilisé <b/>PostgreSQL</b> pour la base de données.
                                Mon rôle dans l'équipe a principalement été de travailler sur le front-end de l'application, en réalisant les maquettes IHM et en les implémentant en Angular et en CSS. J'ai
                                également eu l'occasion d'être responsable de la communication avec les clients et les futurs utilisateurs afin de définir les besoins et organiser les réunions.
                                <br />
                                <br />
                                Cette expérience a été très enrichissante car elle nous a permit de prendre en main un projet plus compliqué que ce que nous avions l'habitude de réaliser et de travailler en
                                équipe sur un projet de longue durée. Nous avons également eu l'occasion de travailler avec des clients et de devoir répondre à leurs besoins.`,
        keywords: ['TypeScript', 'Angular', 'PHP', 'Symfony', 'PostgreSQL', 'Web', 'Front-end', 'Gestion', 'IHM', 'Communication', 'Client'],
    },
    {
        title: "Black Hole Bot - Jeu vidéo",
        images: ["blackholebot", "blackholebot-2"],
        tags: ["Jeu", "GameJam", "Universitaires"],
        date: "09/2023",
        description: `En début de troisième année, nous avons eu l'occasion de participer à une Game Jam interne à notre IUT organisée par nos professeurs.
                                L'objectif de la Game Jam est de créer un jeu vidéo dans un temps limité avec un thème imposé.
                                <br />
                                Pour cette occasion, nous avons eu 4 jours, en équipe de 4, pour créer un jeu vidéo sur les thèmes <b/>''Maître de la gravité''</b> et <b/>''Il était une fois un robot''</b>.
                                <br />
                                <br />
                                Dans cette objectif, nous avons créé Black Hole Bot, un jeu de plateforme en 2D où le joueur incarne un robot qui doit se frayer un chemin à travers des niveaux en 
                                utilisant la gravité à son avantage afin de récupérer les différentes pièces manquantes de son vaisseau. Les différents niveaux utilisent des gravités différentes et
                                le robot peut utiliser le pouvoir du trou noir afin de se défendre contre les astéroïdes.
                                <br />
                                <br />
                                Le jeu a été réalisé grâce à la librairie Python <b/>Pygame</b> et a été présenté à la fin de la Game Jam devant un jury composé de nos professeurs.
                                Mon rôle dans l'équipe a principalement consisté à réaliser les sprites du jeu, à les animer et à régler quelques bugs mineurs.`,
        keywords: ['Python', 'Pygame', 'Game Jam', 'Jeu vidéo', 'Plateforme', 'Gravité', 'Robot', 'Sprites'],
    },
    {
        title: "Intemporal - Site de vente aux enchères de montres",
        images: ["intemporal", "intemporal-2", "intemporal-3", "intemporal-4"],
        tags: ["Web", "Universitaires"],
        date: "2023",
        description: `L'objectif du projet Intemporal, réalisé en deuxième année, était de réaliser un site de vente aux enchères fonctionnel.
                                Nous avions le choix du thèmes du site et du type d'enchères réalisées. Nous avons choisi de réaliser un site de vente aux enchères de montres
                                et de proposer des <b/>enchères anglaises (ascendantes)</b> en <b/>CToC</b>.
                                <br />
                                L'objectif de l'exercice était de réaliser un site fonctionnel et sécurisé, prenant en charge des enchères en temps réel et permettant aux utilisateurs
                                de suivre les enchères en cours et de participer à celles-ci.
                                <br />
                                <br />
                                A l'issue du projet, notre site permettait aux utilisateurs de s'inscrire, d'ajouter leurs montres à la vente, de visualiser les enchères en cours et de participer
                                à celles-ci. Le site était sécurisé et les enchères étaient gérées en temps réel. Nous avons également réfléchi à une politique de vérification des articles
                                afin de garantir la validité des annonces.
                                <br />
                                <br />
                                Nous avons réalisé ce projet en équipe de 6 personnes et nous avons utilisé les technologies suivantes : <b/>HTML, CSS, JavaScript, PHP, SQLite</b>.
                                Mon rôle dans l'équipe a consisté à créer le schéma de la base de données, les scripts de création et de peuplement de la base de données avec des données
                                fictives pour les tests et la démonstration, puis j'ai rejoins l'équipe back-end.
                                <br />
                                <br />
                                Ce projet nous a vallut le troisième prix du jury de notre promotion.`,
        keywords: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQLite', 'Web', 'Vente aux enchères', 'Montres', 'Enchères anglaises', 'CToC', 'Base de données'],
    },
    {
        title: "Chatjsuispt - Chatbot IA parodique",
        images: ["chatjsuispt"],
        tags: ["Web", "Personnels"],
        date: "2023",
        description: `Ce projet est initialement né d'une blague avec un ami avant que nous décidions de le réaliser réellement.
                                <br />
                                Chatjsuispt est un <b/>chatbot IA</b> qui a pour objectif de parodier le chatbot ChatGPT de OpenAI, et ses réponses parfois incohérentes. Son objectif est, 
                                contrairement à une IA classique, de ne répondre que des choses absurdes et incohérentes.
                                <br />
                                <br />
                                Ce projet utilise <b/>HTML, CSS et JavaScript</b> et intègre plusieurs méthodes de génération de réponses. Certaines sont prédéfinies lorsque certains
                                mots sont détéctés, d'autres prennent des réponses aléatoires dans une liste de réponses prédéfinies, et d'autres encore utilisent une méthode de génération
                                de phrases mal construites.
                                <br />
                                <br />
                                Le site est hébergé et accessible à l'adresse suivante : <a href='https://www.ethan-ehrler.fr/chatjsuispt/' target='_blank'>https://www.ethan-ehrler.fr/chatjsuispt/</a>.`,
        keywords: ['HTML', 'CSS', 'JavaScript', 'Web', 'Chatbot', 'IA', 'Parodie'],
    },
    {
        title: "Hopack",
        images: ["hopack", "hopack-1", "hopack-3"],
        tags: ["Logiciel", "Maquette", "Universitaires"],
        date: "2022",
        description: `Lors de notre première année de BUT, il nous a été demandé de réalisé une application d'organisation d'évènementiel en équipe de 6. Le type d'évènements
                                était libre et nous avons choisi de réaliser une application <b/>d'organisation de mariages</b> à destination <b/>d'organisateurs de mariage professionnels</b>. L'objectif
                                pour eux était de gérer leurs mariages, leur calendrier, leur liste de contacts de prestataires, etc.
                                <br />
                                <br />
                                L'application devait être réalisée en <b/>Java</b> avec une interface graphique en <b/>JavaFX</b>. Dans l'équipe, j'ai principalement travaillé sur les maquettes IHM
                                et leur implémentation en JavaFX. L'objectif principal de ce projet était de travailler sur les critères ergonomiques, nous avons donc pris soin de mettre en oeuvre
                                une interface simple et intuitive pour les utilisateurs.`,
        keywords: ['Java', 'JavaFX', 'Logiciel', 'Organisation', 'Mariage', 'IHM'],
    },
    {
        title: "Hardis Group - Site internet de présentation d'une ESN",
        images: ["hardis"],
        tags: ["Web", "Vitrine", "Universitaires"],
        date: "2021",
        description: `L'objectif de ce projet, réalisé en équipe de 3, était de réaliser un site vitrine de présentation d'une ESN (Entreprise de Services du Numérique) du secteur
                                grenoblois. Il s'agit d'un des premiers sites internet que nous avons pu réaliser.
                                <br />
                                <br />
                                Nous avons réalisé ce site en <b/>HTML et CSS</b>.`,
        keywords: ['HTML', 'CSS', 'Web', 'Site vitrine', 'ESN'],
    },
];