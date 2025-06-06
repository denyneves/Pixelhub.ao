/**
 * PIXELHUB - SCRIPT DE INTERATIVIDADE E ANIMAÇÃO V11 (MAIS DESTAQUE)
 *
 * Gerencia:
 * 1. Animações de Entrada (Scroll) com Efeito Escalonado (Stagger)
 * 2. Transição de Página com Efeito de Cortina Deslizante
 * 3. Lógica do Active Link na Navbar (CORRIGIDO)
 * 4. Menu Mobile (Off-canvas)
 * 5. Botões Flutuantes (FAB)
 * 6. Modo Escuro (Dark Mode)
 * 7. Carrosséis (Bootstrap)
 * 8. Slide de Fundo do Hero
 * 9. Atualização Dinâmica do Ano no Rodapé
 */

document.addEventListener('DOMContentLoaded', function() {

    const transitionEffect = document.getElementById('page-transition-effect');

    // --- 1. ANIMAÇÕES DE ENTRADA (SCROLL) COM EFEITO ESCALONADO ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Verifica se o elemento é um container de stagger
                    if (entry.target.hasAttribute('data-stagger-container')) {
                        const children = entry.target.querySelectorAll('[data-stagger-child]');
                        children.forEach((child, index) => {
                            child.style.transitionDelay = `${index * 100}ms`;
                            child.classList.add('visible'); // Adiciona a classe de visibilidade
                        });
                    }
                    observer.unobserve(entry.target); // Opcional: para a animação acontecer apenas uma vez
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    }

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. TRANSIÇÃO DE PÁGINA COM EFEITO DE CORTINA DESLIZANTE ---
    const transitionEffect = document.getElementById('page-transition-effect');

    // **Animação de ENTRADA na página**
    // Garante que a cortina comece na posição correta e deslize para fora
    if (transitionEffect) {
        // Começa na posição de entrada (cobrindo a tela)
        transitionEffect.classList.add('is-entering'); 
        
        // Após um pequeno delay, adiciona a classe de saída para animar
        // o deslizamento para fora, revelando o conteúdo.
        setTimeout(() => {
            transitionEffect.classList.add('is-leaving');
        }, 50); // Delay mínimo para garantir que a transição CSS seja acionada
    }

    // **Animação de SAÍDA da página**
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const isLocalLink = href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank' && !link.hasAttribute('data-bs-toggle');
            
            // Verifica se o link clicado é o da página atual para não fazer a transição
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const linkPath = href ? (href.split('/').pop() || 'index.html') : '';
            if (isLocalLink && currentPath !== linkPath) {
                e.preventDefault(); // Impede a navegação imediata
                
                if (transitionEffect) {
                    // Remove a classe de saída e força a cortina a cobrir a tela novamente
                    transitionEffect.classList.remove('is-leaving');
                    
                    // Aguarda a animação de saída terminar para então navegar
                    setTimeout(() => {
                        window.location.href = href;
                    }, 800); // Deve ser igual à duração da transição no CSS
                } else {
                    // Caso o elemento de transição não exista, navega normalmente
                    window.location.href = href;
                }
            }
        });
    });
});

    // Animação de saída da página
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && href.indexOf('mailto:') === -1 && href.indexOf('tel:') === -1 && link.target !== '_blank' && !link.hasAttribute('data-bs-toggle')) {
                e.preventDefault();
                if (transitionEffect) {
                    transitionEffect.style.transform = 'translateY(0)';
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // Duração da animação de saída
            }
        });
    });

    // --- 3. LÓGICA DO ACTIVE LINK NA NAVBAR (CORRIGIDO) ---
    const mainNavLinks = document.querySelectorAll('.pixelhub-header__nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    mainNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- 4. LÓGICA DO MENU MOBILE (OFF-CANVAS ANIMADO) ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        const openMenu = () => {
            mainNav.classList.add('ativo');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        };
        const closeMenu = () => {
            mainNav.classList.remove('ativo');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        };
        menuToggle.addEventListener('click', () => {
            mainNav.classList.contains('ativo') ? closeMenu() : openMenu();
        });
    }

    // --- 5. LÓGICA DOS BOTÕES FLUTUANTES (FAB) ---
    const fabContainer = document.getElementById('fab-container');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (fabContainer) {
        window.addEventListener('scroll', () => {
            fabContainer.classList.toggle('ativo', window.scrollY > 300);
        });
    }
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 6. LÓGICA DO MODO ESCURO (DARK MODE) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;
    if (themeSwitcher && htmlElement) {
        const applyTheme = (theme) => {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('pixelhub-theme', theme);
        };
        const savedTheme = localStorage.getItem('pixelhub-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);
        themeSwitcher.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- 7. INICIALIZAÇÃO DOS CARROSSÉIS (BOOTSTRAP) ---
    const clientCarouselEl = document.getElementById('clientCarousel');
    if (clientCarouselEl) { new bootstrap.Carousel(clientCarouselEl, { interval: 8000, wrap: true }); }

    // --- 8. LÓGICA DO SLIDE DE FUNDO DO HERO ---
    const heroSlider = document.querySelector('.hero-background-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-background-slider__slide');
        if (slides.length > 1) {
            let currentSlide = 0;
            const slideInterval = 7000;
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, slideInterval);
        }
    }
    
    // --- 9. ATUALIZAÇÃO DINÂMICA DO ANO NO RODAPÉ ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});