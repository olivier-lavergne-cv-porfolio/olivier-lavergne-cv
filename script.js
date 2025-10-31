/* ==============================
   Olivier Lavergne | script.js
   Optimized 2025 version
   ============================== */

// === CACHED DOM ELEMENTS ===
const dom = {
    body: document.body,
    themeSwitcher: document.querySelector('.theme-switcher'),
    langSwitcher: document.querySelector('.lang-switcher'),
    themeBtns: document.querySelectorAll('.theme-btn'),
    langBtns: document.querySelectorAll('.lang-btn'),
    translatableElements: document.querySelectorAll('[data-i18n]'),
    header: document.querySelector('header'),
    smoothScrollLinks: document.querySelectorAll('a[href^="#"]'),
};

// === TRANSLATION DICTIONARY ===
const i18n = {
    fr: {
        "meta.title": "Olivier Lavergne | Vidéaste & Motion Designer",
        "meta.description": "Olivier Lavergne - Vidéaste Motion Designer & Créateur de Contenus Intelligents",
        "hero.overline": "🚀 Vidéaste & Motion Designer",
        "hero.title": "Créateur de<br><span>Contenus</span><br>Extraordinaires",
        "hero.subtitle": "Transformez vos défis marketing en succès mesurables grâce à une approche créative data-driven boostée par l'IA générative.",
        "hero.cta": "Découvrir mon approche",
        "about.overline": "À PROPOS",
        "about.title": "Vidéaste créatif & stratège <span class='accent'>marketing</span>",
        "about.subtitle": "Plus de 15 années d'expertise dans la création de contenus visuels d'impact.",
        "about.p1": "<strong>Spécialiste en création vidéo et motion design</strong> avec une expérience confirmée auprès de grands comptes (Airbus, M6 Group, secteur tech).",
        "about.p2": "Je maîtrise l'intégration des outils IA générative pour optimiser les workflows créatifs, réduire les délais de production de 30% et maximiser le ROI marketing.",
        "about.highlight": "L'avenir de la création vidéo réside dans la symbiose entre intuition artistique et intelligence artificielle.",
        "about.stat1": "Vues générées",
        "about.stat2": "Engagement moyen",
        "about.stat3": "Vidéos réalisées",
        "about.stat4": "Années d'expérience",
        "experience.overline": "PARCOURS",
        "experience.title": "Expérience <span class='accent'>Professionnelle</span>",
        "experience.job1.year": "2008 - Présent",
        "experience.job1.title": "Designer Marketing",
        "experience.job1.description": "Stratégie inbound, direction artistique, coordination d'équipes, campagnes print/web/vidéo.",
        "experience.job2.title": "Vidéaste / Motion Designer",
        "experience.job2.description": "Réalisation de vidéos et motion design pour Airbus. Intégration d'outils IA génératifs pour optimiser les workflows.",
        "experience.job3.title": "Marketing Designer",
        "experience.job3.description": "Production print, web et vidéo. Positionnement des marques. Coordination d'équipes créatives.",
        "experience.job4.title": "Designer Digital",
        "experience.job4.description": "Conception de spots TV, campagnes web et mobile. Production haute cadence qualité broadcast.",
        "experience.job5.title": "Directeur Artistique",
        "experience.job5.description": "Direction artistique et motion design. Spots TV pour BET et MTV. Adaptation culturelle US/EU.",
        "experience.job6.title": "Directeur Artistique Junior",
        "experience.job6.description": "Direction artistique de campagnes print 12 pays. Gestion équipe créative 6 personnes.",
        "portfolio.overline": "PORTFOLIO",
        "portfolio.title": "Projets & <span class='accent'>Réalisations</span>",
        "portfolio.subtitle": "Une sélection de mes meilleures créations vidéo et motion design.",
        "portfolio.item1.title": "Portfolio Principal",
        "portfolio.item1.description": "Compilation de mes meilleurs projets vidéo et motion design pour grandes entreprises.",
        "portfolio.item2.title": "Contenu Court Format",
        "portfolio.item2.description": "Créations optimisées pour les réseaux sociaux et le short-form content.",
        "portfolio.item3.title": "Motion Design & Effects",
        "portfolio.item3.description": "Démonstration de techniques avancées en motion design et effets visuels.",
        "skills.overline": "COMPÉTENCES",
        "skills.title": "Expertise <span class='accent'>Technique</span>",
        "skills.subtitle": "Maîtrise des outils modernes et des technologies créatives du moment.",
        "skills.skill1.title": "IA & Innovation",
        "skills.skill1.list": "<strong>IA Générative:</strong> GPT-5, Claude 4, Gemini 2.5<br><strong>Vidéo:</strong> Google Veo3, Runway Gen-3<br><strong>Image:</strong> Midjourney V7, FLUX.1<br><strong>Automation:</strong> Prompt Engineering avancé",
        "skills.skill2.title": "Marketing & Analytics",
        "skills.skill2.list": "<strong>Strategy:</strong> ROI Tracking, KPI Marketing<br><strong>Tools:</strong> Google Analytics 4, YouTube Ads<br><strong>Content:</strong> Data-driven Storytelling<br><strong>Performance:</strong> A/B Testing, SEO/SEM",
        "skills.skill3.title": "Création Graphique",
        "skills.skill3.list": "<strong>Adobe CC:</strong> Photoshop, Illustrator, InDesign<br><strong>Direction:</strong> Branding & Brand Identity<br><strong>Design:</strong> UI/UX, Editorial Design<br><strong>Typo:</strong> Hiérarchie visuelle, Typography",
        "skills.skill4.title": "Audio & Vidéo",
        "skills.skill4.list": "<strong>Vidéo:</strong> After Effects, DaVinci Resolve<br><strong>Montage:</strong> Premiere Pro, CapCut<br><strong>Audio:</strong> Logic Pro X, FL Studio<br><strong>Post-prod:</strong> Color Grading, Mastering",
        "skills.skill5.title": "Management & Leadership",
        "skills.skill5.list": "<strong>Coordination:</strong> Équipes, agences, freelances<br><strong>Project Mgmt:</strong> Gestion de projets complexes<br><strong>Direction:</strong> Direction artistique, Creative Lead<br><strong>Soft Skills:</strong> Communication, Collaboration",
        "skills.skill6.title": "International & Langues",
        "skills.skill6.list": "<strong>Langues:</strong> 🇫🇷 Français (Natif), 🇺🇸 Anglais (Courant)<br><strong>Expérience:</strong> USA, EU, International<br><strong>Adaptation:</strong> Culturelle, stratégique<br><strong>Réseaux:</strong> Global networking",
        "footer.title": "Créons l'<span class='accent'>extraordinaire</span><br>ensemble 🚀",
        "footer.call": "📲 Appeler",
        "footer.email": "✉️ Email",
        "footer.portfolio": "🎬 Portfolio",
        "footer.videos": "🎥 Vidéos",
        "footer.credit": "© 2025 Olivier Lavergne • Toulouse & Beyond<br>Vidéaste Motion Designer • Créateur de Contenus Intelligents"
    },
    en: {
        "meta.title": "Olivier Lavergne | Videographer & Motion Designer",
        "meta.description": "Olivier Lavergne - Videographer Motion Designer & Smart Content Creator",
        "hero.overline": "🚀 Videographer & Motion Designer",
        "hero.title": "Creator of<br><span>Extraordinary</span><br>Content",
        "hero.subtitle": "Transform your marketing challenges into measurable success through a data-driven creative approach powered by generative AI.",
        "hero.cta": "Discover my approach",
        "about.overline": "ABOUT",
        "about.title": "Creative videographer & <span class='accent'>marketing</span> strategist",
        "about.subtitle": "Over 15 years of expertise in creating high-impact visual content.",
        "about.p1": "<strong>Specialist in video creation and motion design</strong> with confirmed experience working with major accounts (Airbus, M6 Group, tech sector).",
        "about.p2": "I master the integration of generative AI tools to optimize creative workflows, reduce production time by 30%, and maximize marketing ROI.",
        "about.highlight": "The future of video creation lies in the symbiosis between artistic intuition and artificial intelligence.",
        "about.stat1": "Views generated",
        "about.stat2": "Average engagement",
        "about.stat3": "Videos produced",
        "about.stat4": "Years of experience",
        "experience.overline": "EXPERIENCE",
        "experience.title": "Professional <span class='accent'>Experience</span>",
        "experience.job1.year": "2008 - Present",
        "experience.job1.title": "Marketing Designer",
        "experience.job1.description": "Inbound strategy, art direction, team coordination, print/web/video campaigns.",
        "experience.job2.title": "Videographer / Motion Designer",
        "experience.job2.description": "Video production and motion design for Airbus. Integration of generative AI tools to optimize workflows.",
        "experience.job3.title": "Marketing Designer",
        "experience.job3.description": "Print, web and video production. Brand positioning. Coordination of creative teams.",
        "experience.job4.title": "Digital Designer",
        "experience.job4.description": "Design of TV spots, web and mobile campaigns. High-speed broadcast quality production.",
        "experience.job5.title": "Art Director",
        "experience.job5.description": "Art direction and motion design. TV spots for BET and MTV. Cultural adaptation US/EU.",
        "experience.job6.title": "Junior Art Director",
        "experience.job6.description": "Art direction for print campaigns in 12 countries. Management of 6-person creative team.",
        "portfolio.overline": "PORTFOLIO",
        "portfolio.title": "Projects & <span class='accent'>Creations</span>",
        "portfolio.subtitle": "A selection of my best video and motion design creations.",
        "portfolio.item1.title": "Main Portfolio",
        "portfolio.item1.description": "Compilation of my best video and motion design projects for major companies.",
        "portfolio.item2.title": "Short Form Content",
        "portfolio.item2.description": "Creations optimized for social networks and short-form content.",
        "portfolio.item3.title": "Motion Design & Effects",
        "portfolio.item3.description": "Demonstration of advanced motion design and visual effects techniques.",
        "skills.overline": "SKILLS",
        "skills.title": "Technical <span class='accent'>Expertise</span>",
        "skills.subtitle": "Mastery of modern tools and creative technologies of the moment.",
        "skills.skill1.title": "AI & Innovation",
        "skills.skill1.list": "<strong>Generative AI:</strong> GPT-5, Claude 4, Gemini 2.5<br><strong>Video:</strong> Google Veo3, Runway Gen-3<br><strong>Image:</strong> Midjourney V7, FLUX.1<br><strong>Automation:</strong> Advanced Prompt Engineering",
        "skills.skill2.title": "Marketing & Analytics",
        "skills.skill2.list": "<strong>Strategy:</strong> ROI Tracking, KPI Marketing<br><strong>Tools:</strong> Google Analytics 4, YouTube Ads<br><strong>Content:</strong> Data-driven Storytelling<br><strong>Performance:</strong> A/B Testing, SEO/SEM",
        "skills.skill3.title": "Graphic Creation",
        "skills.skill3.list": "<strong>Adobe CC:</strong> Photoshop, Illustrator, InDesign<br><strong>Direction:</strong> Branding & Brand Identity<br><strong>Design:</strong> UI/UX, Editorial Design<br><strong>Typo:</strong> Visual hierarchy, Typography",
        "skills.skill4.title": "Audio & Video",
        "skills.skill4.list": "<strong>Video:</strong> After Effects, DaVinci Resolve<br><strong>Editing:</strong> Premiere Pro, CapCut<br><strong>Audio:</strong> Logic Pro X, FL Studio<br><strong>Post-prod:</strong> Color Grading, Mastering",
        "skills.skill5.title": "Management & Leadership",
        "skills.skill5.list": "<strong>Coordination:</strong> Teams, agencies, freelancers<br><strong>Project Mgmt:</strong> Complex project management<br><strong>Direction:</strong> Art direction, Creative Lead<br><strong>Soft Skills:</strong> Communication, Collaboration",
        "skills.skill6.title": "International & Languages",
        "skills.skill6.list": "<strong>Languages:</strong> 🇫🇷 French (Native), 🇺🇸 English (Fluent)<br><strong>Experience:</strong> USA, EU, International<br><strong>Adaptation:</strong> Cultural, strategic<br><strong>Networks:</strong> Global networking",
        "footer.title": "Let's create the<br><span class='accent'>extraordinary</span> together 🚀",
        "footer.call": "📲 Call",
        "footer.email": "✉️ Email",
        "footer.portfolio": "🎬 Portfolio",
        "footer.videos": "🎥 Videos",
        "footer.credit": "© 2025 Olivier Lavergne • Toulouse & Beyond<br>Videographer Motion Designer • Smart Content Creator"
    }
};

// === STATE MANAGEMENT ===
const state = {
    theme: localStorage.getItem("theme") || "dark",
    lang: localStorage.getItem("lang") || "fr",
};

// === FUNCTIONS ===

/**
 * Sets the theme and updates the UI.
 * @param {string} theme - The theme to set ('light' or 'dark').
 */
const setTheme = (theme) => {
    state.theme = theme;
    dom.body.classList.toggle('light-mode', theme === 'light');
    dom.themeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
    localStorage.setItem("theme", theme);
};

/**
 * Sets the language and updates the text content.
 * @param {string} lang - The language to set ('fr' or 'en').
 */
const setLanguage = (lang) => {
    state.lang = lang;
    document.documentElement.lang = lang;
    dom.langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

    dom.translatableElements.forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key]) {
            // Use 'content' attribute for meta tags, otherwise use innerHTML
            if (el.tagName === 'META') {
                el.setAttribute('content', i18n[lang][key]);
            } else {
                el.innerHTML = i18n[lang][key];
            }
        }
    });

    localStorage.setItem("lang", lang);
};

/**
 * Handles smooth scrolling for anchor links.
 * @param {Event} e - The click event.
 */
const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
};

/**
 * Toggles the 'scrolled' class on the header based on scroll position.
 */
const handleHeaderScroll = () => {
    dom.header.classList.toggle('scrolled', window.scrollY > 60);
};

// === EVENT LISTENERS ===

// Use event delegation for theme and language switchers
dom.themeSwitcher.addEventListener('click', (e) => {
    if (e.target.matches('.theme-btn')) {
        setTheme(e.target.dataset.theme);
    }
});

dom.langSwitcher.addEventListener('click', (e) => {
    if (e.target.matches('.lang-btn')) {
        setLanguage(e.target.dataset.lang);
    }
});

// Smooth scroll for all anchor links
dom.smoothScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
});

// Header effect on scroll
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    setTheme(state.theme);
    setLanguage(state.lang);
});
