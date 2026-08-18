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
    experienceTitle: string;
    videosLabel: string;
    webDesignTitle: string;
    watchOn: string;
    visitSite: string;
    social: string;
    menu: string;
    play: string;
    swipeHint: string;
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
  experienceTitle: "Parcours & Expérience",
  videosLabel: "Vidéos & Motion Design",
  webDesignTitle: "Web Design",
  watchOn: "Voir sur",
  visitSite: "Visiter le site",
  social: "Réseaux",
  menu: "Menu",
  play: "Lire",
  swipeHint: "Glisse ou fais défiler →",
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
  experienceTitle: "Career & Experience",
  videosLabel: "Videos & Motion Design",
  webDesignTitle: "Web Design",
  watchOn: "Watch on",
  visitSite: "Visit site",
  social: "Social",
  menu: "Menu",
  play: "Play",
  swipeHint: "Swipe or scroll →",
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
