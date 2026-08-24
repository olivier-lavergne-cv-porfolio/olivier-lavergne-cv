import { Mail, ArrowRight, Video, PenTool, Sparkles, TrendingUp, MonitorPlay, Code, GraduationCap, Languages, Mic, ShieldCheck, Clapperboard, Palette } from "lucide-react";

const contact = {
  email: "olivierlavergne@gmail.com",
  phone: "+33 6 51 04 93 25",
  location: "Toulouse & au-delà",
  linkedin: "https://linkedin.com/in/olivierlavergne",
  github: "https://github.com/olivier-lavergne-cv-porfolio",
  instagram: "https://instagram.com/ol_creative_design"
};

export const CV_DATA_FR = {
  name: "Olivier Lavergne",
  title: "VIDÉASTE / MOTION DESIGNER",
  subtitle: "EXPERT IA GÉNÉRATIVE CRÉATIVE",
  description: "Vidéaste, motion designer et directeur artistique avec plus de 20 ans d'expérience. Pionnier de l'intégration des IA génératives dans les workflows de production créative.",
  stats: [
    { value: "20+", label: "Années d'expérience" },
    { value: "360°", label: "Maîtrise de la chaîne" },
    { value: "IA", label: "Pionnier Génératif" },
    { value: "NYC/FR", label: "Portée Internationale" },
  ],
  about: {
    paragraphs: [
      "Vidéaste, motion designer et directeur artistique avec plus de 20 ans d'expérience en production audiovisuelle, création de contenu vidéo et direction artistique pour grands comptes (Airbus, M6 Group) et marchés internationaux (New York).",
      "Expert IA générative créative, pionnier de l'intégration des IA génératives (vidéo, image, contenu, automatisation) dans les workflows de production, avec une maîtrise complète de la chaîne : stratégie de contenu, storytelling, tournage, montage, étalonnage, motion design, sound design et diffusion multicanal (réseaux sociaux, broadcast, web, corporate).",
      "Force de proposition sur l'innovation IA et l'optimisation des processus créatifs, avec un impact direct sur les délais, les coûts et la performance des campagnes."
    ],
    highlight: "Force de proposition sur l'innovation IA et l'optimisation des processus créatifs pour réduire délais et coûts."
  },
  experience: [
    {
      period: "Depuis 2008",
      title: "Designer Marketing & Créateur de Contenus Intelligents",
      company: "Freelance",
      location: "Toulouse",
      description: "Stratégie inbound (contenu, réseaux sociaux) et direction artistique d'identités visuelles print/digital. Coordination d'équipes agences/freelances et exécution de campagnes print, web et vidéo. Développement de la marque Onesiker (artiste contemporain) : stratégie de marque, production de contenu, site e-commerce."
    },
    {
      period: "2022 - 2024",
      title: "Vidéaste / Motion Designer",
      company: "Adonis Créative",
      location: "Toulouse",
      description: "Réalisation vidéo pour Airbus / Airbus Defence Space. Couverture évènementielle 360° et création de contenus marketing cybersécurité. Innovation IA : intégration d'outils IA génératifs dans les processus de production."
    },
    {
      period: "2015 - 2018",
      title: "Motion Designer / Marketing Designer",
      company: "Ethics Group",
      location: "Toulouse",
      description: "Gestion de la production print, web et vidéo ; positionnement des marques (com' interne/externe). Coordination des créatifs, agences et freelances ; tournage indoor/outdoor, shooting photo."
    },
    {
      period: "2011 - 2015",
      title: "Motion Designer / Designer Digital",
      company: "LaCréa — M6 Group",
      location: "Toulouse",
      description: "Conception de spots TV pour campagnes web et mobile ; storytelling visuel orienté conversion. Production haute cadence qualité broadcast ; créations newsletters, affiches et web."
    },
    {
      period: "2006 - 2008",
      title: "Directeur Artistique & Motion Designer",
      company: "MSMART / QMobile",
      location: "New York City",
      description: "Direction artistique et motion design pour spots TV BET et MTV, urban content. Adaptation culturelle pour marchés US/EU ; supervision de campagnes multicanal."
    },
    {
      period: "2002 - 2005",
      title: "Directeur Artistique Junior",
      company: "123/Index Multimédia",
      location: "Toulouse",
      description: "Direction artistique de campagnes print (12 pays) ; gestion d'une équipe créative de 6 personnes."
    }
  ],
  skills: [
    {
      category: "Expertise IA Générative Créative",
      icon: Sparkles,
      items: ["Gemini / Veo, Runway, Kling, Luma", "Pika, Seedance, Higgsfield, HeyGen", "Midjourney, Nano Banana, GPT Image, Firefly", "Workflows courts (Reels, TikTok)", "ChatGPT, Claude, Gemini, Mistral", "Veille active & test permanent"],
      mobileOnly: true
    },
    {
      category: "IA Générative Vidéo",
      icon: Clapperboard,
      items: ["Gemini / Veo, Runway, Kling, Luma", "Pika, Seedance, Higgsfield, HeyGen", "Workflows courts (Reels, TikTok)"],
      desktopOnly: true
    },
    {
      category: "IA Générative Image & Texte",
      icon: Palette,
      items: ["Midjourney, Nano Banana, GPT Image, Firefly", "ChatGPT, Claude, Gemini, Mistral", "Veille active & test permanent"],
      desktopOnly: true
    },
    {
      category: "Vidéo & Motion",
      icon: Video,
      items: ["Davinci Resolve", "Premiere Pro", "After Effects", "CapCut", "Tournage & Direction Artistique"]
    },
    {
      category: "Audio & Sound Design",
      icon: Mic,
      items: ["Logic Pro X", "Sound Design", "Mixage", "Mastering (Ozone)"]
    },
    {
      category: "Création Graphique",
      icon: PenTool,
      items: ["Photoshop", "Lightroom", "Illustrator", "InDesign", "Pixelmator Pro", "Canva", "Topaz"]
    },
    {
      category: "Droits d'usage & Propriété Intellectuelle",
      icon: ShieldCheck,
      items: ["Vérification & sécurisation des droits", "Images, vidéos, musiques", "Print & audiovisuel"]
    },
    {
      category: "Développement & automatisation",
      icon: Code,
      items: ["Claude Code", "Protocole MCP", "Plateformes d'orchestration (Composio, Apify)", "Connexion IA / workflow créatif (Figma, Notion...)"]
    },
    {
      category: "Formation & Langues",
      icon: GraduationCap,
      items: ["BTS Réalisateur Multimédia (CESI) — 2001", "Français (Natif)", "Anglais (Courant)"]
    }
  ],
  webDesign: {
    title: "onesiker.org",
    description: "Conception du site vitrine et de la boutique e-commerce, développement du back-office et stratégie de lancement — un projet mené de A à Z."
  },
  contact
};

export const CV_DATA_EN = {
  name: "Olivier Lavergne",
  title: "VIDEOGRAPHER / MOTION DESIGNER",
  subtitle: "CREATIVE GENERATIVE AI EXPERT",
  description: "Videographer, motion designer, and art director with over 20 years of experience. Pioneer in integrating generative AI into creative production workflows.",
  stats: [
    { value: "20+", label: "Years of Experience" },
    { value: "360°", label: "Full Pipeline Mastery" },
    { value: "AI", label: "Generative Pioneer" },
    { value: "NYC/FR", label: "International Reach" },
  ],
  about: {
    paragraphs: [
      "Videographer, motion designer, and art director with over 20 years of experience in audiovisual production, video content creation, and art direction for major accounts (Airbus, M6 Group) and international markets (New York).",
      "Creative Generative AI expert, pioneering the integration of generative AI (video, image, content, automation) into production workflows, with complete mastery of the pipeline: content strategy, storytelling, shooting, editing, color grading, motion design, sound design, and multichannel distribution (social media, broadcast, web, corporate).",
      "Proactive in AI innovation and optimizing creative processes, directly impacting campaign turnaround times, costs, and performance."
    ],
    highlight: "Proactive in AI innovation and optimizing creative processes to reduce turnaround times and costs."
  },
  experience: [
    {
      period: "Since 2008",
      title: "Marketing Designer & Smart Content Creator",
      company: "Freelance",
      location: "Toulouse",
      description: "Inbound strategy (content, social media) and art direction for print/digital visual identities. Coordination of agency/freelance teams and execution of print, web, and video campaigns. Development of the Onesiker brand (contemporary artist): brand strategy, content production, e-commerce site."
    },
    {
      period: "2022 - 2024",
      title: "Videographer / Motion Designer",
      company: "Adonis Créative",
      location: "Toulouse",
      description: "Video production for Airbus / Airbus Defence Space. 360° event coverage and creation of cybersecurity marketing content. AI Innovation: integration of generative AI tools into production processes."
    },
    {
      period: "2015 - 2018",
      title: "Motion Designer / Marketing Designer",
      company: "Ethics Group",
      location: "Toulouse",
      description: "Management of print, web, and video production; brand positioning (internal/external comms). Coordination of creatives, agencies, and freelancers; indoor/outdoor shooting, photo shooting."
    },
    {
      period: "2011 - 2015",
      title: "Motion Designer / Digital Designer",
      company: "LaCréa — M6 Group",
      location: "Toulouse",
      description: "Design of TV spots for web and mobile campaigns; conversion-oriented visual storytelling. High-paced broadcast-quality production; creation of newsletters, posters, and web content."
    },
    {
      period: "2006 - 2008",
      title: "Art Director & Motion Designer",
      company: "MSMART / QMobile",
      location: "New York City",
      description: "Art direction and motion design for BET and MTV TV spots, urban content. Cultural adaptation for US/EU markets; supervision of multichannel campaigns."
    },
    {
      period: "2002 - 2005",
      title: "Junior Art Director",
      company: "123/Index Multimédia",
      location: "Toulouse",
      description: "Art direction for print campaigns (12 countries); management of a 6-person creative team."
    }
  ],
  skills: [
    {
      category: "Creative Generative AI Expertise",
      icon: Sparkles,
      items: ["Gemini / Veo, Runway, Kling, Luma", "Pika, Seedance, Higgsfield, HeyGen", "Midjourney, Nano Banana, GPT Image, Firefly", "Short-form workflows (Reels, TikTok)", "ChatGPT, Claude, Gemini, Mistral", "Active watch & continuous testing"],
      mobileOnly: true
    },
    {
      category: "Generative AI Video",
      icon: Clapperboard,
      items: ["Gemini / Veo, Runway, Kling, Luma", "Pika, Seedance, Higgsfield, HeyGen", "Short-form workflows (Reels, TikTok)"],
      desktopOnly: true
    },
    {
      category: "Generative AI Image & Text",
      icon: Palette,
      items: ["Midjourney, Nano Banana, GPT Image, Firefly", "ChatGPT, Claude, Gemini, Mistral", "Active watch & continuous testing"],
      desktopOnly: true
    },
    {
      category: "Video & Motion",
      icon: Video,
      items: ["Davinci Resolve", "Premiere Pro", "After Effects", "CapCut", "Shooting & Art Direction"]
    },
    {
      category: "Audio & Sound Design",
      icon: Mic,
      items: ["Logic Pro X", "Sound Design", "Mixing", "Mastering (Ozone)"]
    },
    {
      category: "Graphic Design",
      icon: PenTool,
      items: ["Photoshop", "Lightroom", "Illustrator", "InDesign", "Pixelmator Pro", "Canva", "Topaz"]
    },
    {
      category: "Usage Rights & Intellectual Property",
      icon: ShieldCheck,
      items: ["Rights verification & security", "Images, videos, music", "Print & broadcast"]
    },
    {
      category: "Development & Automation",
      icon: Code,
      items: ["Claude Code", "MCP Protocol", "Orchestration Platforms (Composio, Apify)", "Connecting AI / creative workflow (Figma, Notion...)"]
    },
    {
      category: "Education & Languages",
      icon: GraduationCap,
      items: ["Multimedia Director BTS (CESI) — 2001", "French (Native)", "English (Fluent)"]
    }
  ],
  webDesign: {
    title: "onesiker.org",
    description: "Design of the showcase site and e-commerce store, back-office development, and launch strategy — a project handled end-to-end."
  },
  contact: {
    ...contact,
    location: "Toulouse & beyond"
  }
};
