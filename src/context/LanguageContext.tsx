import React, { createContext, useContext, useState } from 'react';
import { CV_DATA_FR, CV_DATA_EN } from '../data';

type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof CV_DATA_FR;
  ui: {
    expertise: string;
    experience: string;
    contact: string;
    download: string;
    startProject: string;
    viewProject: string;
    featured: string;
    letsTalk: string;
    skillsTitle: string;
    skillsSubtitle: string;
    experienceTitle: string;
    experienceSubtitle: string;
    videosLabel: string;
    showreelSubtitle: string;
    webDesignTitle: string;
    watchOn: string;
    visitSite: string;
    social: string;
    menu: string;
    play: string;
    swipeHint: string;
    showDetail: string;
    hideDetail: string;
  }
}

const UI_FR = {
  expertise: "Expertise",
  experience: "Expérience",
  contact: "Contact",
  download: "CV PDF",
  startProject: "Démarrer un projet",
  viewProject: "Voir le projet",
  featured: "En Vedette",
  letsTalk: "Let's talk",
  skillsTitle: "Compétences",
  skillsSubtitle: "De la prise de vue à l'IA générative.",
  experienceTitle: "Parcours & Expérience",
  experienceSubtitle: "Vingt ans, six étapes.",
  videosLabel: "Vidéos & Motion Design",
  showreelSubtitle: "Faire ressentir, d'abord.",
  webDesignTitle: "Web Design",
  watchOn: "Voir sur",
  visitSite: "Visiter le site",
  social: "Réseaux",
  menu: "Menu",
  play: "Lire",
  swipeHint: "Glisse ou fais défiler →",
  showDetail: "Voir le détail",
  hideDetail: "Masquer le détail",
};

const UI_EN = {
  expertise: "Expertise",
  experience: "Experience",
  contact: "Contact",
  download: "PDF Resume",
  startProject: "Start a project",
  viewProject: "View project",
  featured: "Featured",
  letsTalk: "Let's talk",
  skillsTitle: "Skills",
  skillsSubtitle: "From filming to generative AI.",
  experienceTitle: "Career & Experience",
  experienceSubtitle: "Twenty years, six stages.",
  videosLabel: "Videos & Motion Design",
  showreelSubtitle: "Feel it first.",
  webDesignTitle: "Web Design",
  watchOn: "Watch on",
  visitSite: "Visit site",
  social: "Social",
  menu: "Menu",
  play: "Play",
  swipeHint: "Swipe or scroll →",
  showDetail: "View details",
  hideDetail: "Hide details",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');

  const value = {
    lang,
    setLang,
    t: lang === 'fr' ? CV_DATA_FR : CV_DATA_EN,
    ui: lang === 'fr' ? UI_FR : UI_EN,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
