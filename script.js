document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('theme-toggle');
            const currentTheme = localStorage.getItem('theme');

            if (currentTheme === 'light') {
                document.body.classList.add('light-mode');
                themeToggle.textContent = '🌙';
            }

            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');

                let theme = 'dark';
                if (document.body.classList.contains('light-mode')) {
                    theme = 'light';
                    themeToggle.textContent = '🌙';
                } else {
                    themeToggle.textContent = '☀️';
                }
                localStorage.setItem('theme', theme);
            });

            const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            document.querySelectorAll('.section').forEach(section => { observer.observe(section); });

            document.querySelectorAll('.contact-item[data-copy]').forEach(item => {
                item.addEventListener('click', () => {
                    const textToCopy = item.dataset.copy;
                    if (textToCopy) {
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            item.classList.add('is-copied');
                            setTimeout(() => { item.classList.remove('is-copied'); }, 1000);
                        }).catch(err => { console.error('Failed to copy text: ', err); });
                    }
                });
            });

            document.querySelectorAll('.liquid-glass-card').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        });