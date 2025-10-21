document.addEventListener('DOMContentLoaded', () => {

    // --- Logique pour le changement de langue ---
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-lang-fr]');

    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            const text = el.dataset[lang === 'en' ? 'langEn' : 'langFr'];
            if (text) {
                el.innerHTML = text;
            }
        });
        document.documentElement.lang = lang;
        langToggle.textContent = lang === 'en' ? 'FR' : 'EN';
        localStorage.setItem('language', lang);
    };

    const currentLang = localStorage.getItem('language') || 'fr';
    setLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        const newLang = localStorage.getItem('language') === 'fr' ? 'en' : 'fr';
        setLanguage(newLang);
    });


    // --- Logique pour l'animation au défilement ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
