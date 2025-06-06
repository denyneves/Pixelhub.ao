document.addEventListener('DOMContentLoaded', function() {

    // --- DADOS DOS PROJETOS (SIMULAÇÃO DE UM BANCO DE DADOS/API) ---
    // Adicione quantos projetos quiser aqui. A página se adaptará automaticamente.
    const projectData = {
        1: {
            title: "Plataforma Web para Fintech",
            category: "Web Design",
            images: ["assets/img/project6-cover.jpg", "assets/img/choice-ia.jpg", "assets/img/project1-slide3.jpg"],
            description: "Desenvolvemos uma plataforma web completa e segura para uma startup de fintech, focada em usabilidade e performance. A interface intuitiva permite que os usuários gerenciem suas finanças com facilidade, enquanto o back-end robusto garante a segurança das transações.",
            tags: ["React", "Node.js", "UX/UI Design", "API Integration"],
            liveLink: "#"
        },
        2: {
            title: "Identidade Visual para Marca de Café",
            category: "Branding",
            images: ["assets/img/project6-cover.jpg", "assets/img/choice-ia.jpg"],
            description: "Criamos uma identidade visual completa para uma nova marca de café artesanal. O projeto incluiu a criação do logotipo, design de embalagens, material de ponto de venda e um guia de marca abrangente para garantir consistência em todas as comunicações.",
            tags: ["Branding", "Illustrator", "Packaging", "Graphic Design"],
            liveLink: "#"
        },
        3: {
            title: "Campanha Digital para E-commerce de Moda",
            category: "Marketing",
            images: ["assets/img/project6-cover.jpg"],
            description: "Executamos uma campanha de marketing digital 360° para um e-commerce de moda sustentável. Utilizando estratégias de SEO, mídias sociais e influenciadores, aumentamos o tráfego orgânico em 200% e as vendas em 150% em três meses.",
            tags: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
            liveLink: "#"
        },
        4: {
            title: "Aplicativo Mobile de Meditação",
            category: "Apps",
            images: ["assets/img/project6-cover.jpg", "assets/img/choice-ia.jpg"],
            description: "Desenvolvemos um aplicativo nativo para iOS e Android que oferece meditações guiadas e sons relaxantes. O foco foi criar uma experiência de usuário calma e imersiva, com um design minimalista e animações suaves.",
            tags: ["Swift (iOS)", "Kotlin (Android)", "Firebase", "Mobile UI"],
            liveLink: "#"
        },
        5: {
            title: "Site Institucional para Escritório de Advocacia",
            category: "Web Design",
            images: ["assets/img/project6-cover.jpg"],
            description: "Redesenhamos o site institucional de um renomado escritório de advocacia, projetando uma imagem de seriedade, confiança e modernidade. O site é totalmente responsivo e otimizado para performance e SEO.",
            tags: ["Wordpress", "Custom Theme", "SEO", "Responsive Design"],
            liveLink: "#"
        },
        6: {
            title: "Rebranding para Startup de IA",
            category: "Branding",
            images: ["assets/img/project6-cover.jpg", "assets/img/choice-ia.jpg"],
            description: "Conduzimos um processo completo de rebranding para uma startup de Inteligência Artificial, desenvolvendo um novo nome, logotipo e identidade visual que comunicam inovação, tecnologia e vanguarda.",
            tags: ["Branding Strategy", "Logo Design", "UI Kit", "Figma"],
            liveLink: "#"
        }
    };

    // --- LÓGICA DO FILTRO DE PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Gerencia o botão ativo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                // Mostra ou esconde os cards
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    const shouldShow = (filter === 'all' || cardCategory === filter);
                    
                    if (shouldShow) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }


    // --- LÓGICA DO MODAL DE PROJETOS (ROBUSTA E CORRIGIDA) ---
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const projectId = button.dataset.projectId;
            const data = projectData[projectId];

            const modalTitle = projectModal.querySelector('.modal-title');
            const modalBody = projectModal.querySelector('.modal-body');

            // Limpa o conteúdo anterior e mostra um spinner
            modalTitle.textContent = 'Carregando...';
            modalBody.innerHTML = `
                <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                </div>`;

            if (!data) {
                modalTitle.textContent = 'Erro';
                modalBody.innerHTML = '<p>Desculpe, não foi possível encontrar os detalhes deste projeto.</p>';
                return;
            }

            // Atraso simulado para percepção de carregamento (opcional, pode remover)
            setTimeout(() => {
                modalTitle.textContent = data.title;

                let carouselItems = data.images.map((imgSrc, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${imgSrc}" class="d-block w-100" alt="Imagem ${index + 1} do projeto ${data.title}">
                    </div>
                `).join('');
                
                let tagsHtml = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                modalBody.innerHTML = `
                    <div class="project-modal-layout">
                        <div class="project-modal-carousel">
                            <div id="modalCarousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    ${carouselItems}
                                </div>
                                ${data.images.length > 1 ? `
                                <button class="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Anterior</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Próximo</span>
                                </button>
                                ` : ''}
                            </div>
                        </div>
                        <div class="project-modal-details">
                            <h3>Sobre o Projeto</h3>
                            <p>${data.description}</p>
                            <h3>Tecnologias e Serviços</h3>
                            <div class="project-tags">
                                ${tagsHtml}
                            </div>
                            <a href="${data.liveLink}" class="pixelhub-btn pixelhub-btn--primary" target="_blank" rel="noopener noreferrer">Visitar Site</a>
                        </div>
                    </div>
                `;
                
                // Reinicializa o carrossel dentro do modal
                const modalCarousel = new bootstrap.Carousel('#modalCarousel');
            }, 200); // 200ms de atraso
        });
    }
});