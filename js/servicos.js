document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS DOS SERVIÇOS (SIMULAÇÃO DE UMA API) ---
    const servicesData = {
        'app-dev': {
            title: "Desenvolvimento de Aplicativos",
            icon: "fa-mobile-alt",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Transformamos sua visão em um aplicativo móvel nativo (iOS/Android) ou híbrido, focado em performance, segurança e uma experiência de usuário impecável. Cuidamos de todo o ciclo de vida do seu app.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Aplicativo para iOS e Android publicado nas lojas</li>
                    <li>Código-fonte completo e documentado</li>
                    <li>Painel de Administração para gerenciamento</li>
                    <li>Design System e protótipos interativos</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Startups, empresas que buscam um novo canal de vendas ou engajamento, e negócios que precisam de uma solução mobile para otimizar operações.</p>
            `
        },
        'web-sys': {
            title: "Sistemas Web e SaaS",
            icon: "fa-sitemap",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Construímos plataformas web complexas, desde dashboards de BI até soluções completas de Software as a Service (SaaS). Utilizamos arquiteturas modernas para garantir escalabilidade, segurança e alta performance.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Plataforma web customizada e responsiva</li>
                    <li>API robusta para integração</li>
                    <li>Infraestrutura na nuvem (AWS, Azure, GCP)</li>
                    <li>Testes automatizados e CI/CD</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Empresas que precisam de uma ferramenta interna, um portal para clientes ou que desejam lançar um produto de software no modelo de assinatura.</p>
            `
        },
        'ecommerce': {
            title: "Soluções E-commerce",
            icon: "fa-shopping-cart",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Criamos lojas virtuais de alta conversão, integradas com os principais meios de pagamento e logística. Nossas soluções são otimizadas para SEO e preparadas para escalar junto com o seu negócio.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Loja virtual completa e personalizada</li>
                    <li>Integração com gateways de pagamento e frete</li>
                    <li>Painel de gerenciamento de produtos e pedidos</li>
                    <li>Estratégia de SEO On-page inicial</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Varejistas que desejam expandir para o online, marcas D2C (direto ao consumidor) e negócios que buscam otimizar sua operação de vendas digitais.</p>
            `
        },
        'ui-ux': {
            title: "Design UI/UX",
            icon: "fa-drafting-compass",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Nossa abordagem de design é centrada no ser humano. Mapeamos a jornada do seu usuário para criar interfaces que não são apenas visualmente deslumbrantes, mas também intuitivas, eficientes e que resolvem problemas reais.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Pesquisa de usuário e personas</li>
                    <li>Fluxos de usuário e wireframes</li>
                    <li>Protótipos interativos de alta fidelidade</li>
                    <li>Design System completo para consistência</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Qualquer produto digital (novo ou existente) que busca se destacar no mercado através de uma experiência de usuário superior e memorável.</p>
            `
        },
        'branding': {
            title: "Identidade Visual e Branding",
            icon: "fa-lightbulb",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Sua marca é seu ativo mais valioso. Nós a construímos ou a revitalizamos, criando uma identidade visual e verbal forte que ressoa com seu público e comunica seus valores de forma clara e impactante.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Logotipo e suas variações</li>
                    <li>Manual da Marca (Brand Guide)</li>
                    <li>Paleta de cores e tipografia</li>
                    <li>Templates para mídias sociais e apresentações</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Novas empresas, startups em busca de investimento e marcas estabelecidas que precisam de um rebranding para se reconectar com o mercado.</p>
            `
        },
        'consulting': {
            title: "Consultoria e Estratégia",
            icon: "fa-brain",
            image: "assets/img/choice-equipe.jpg",
            content: `
                <p>Antes de escrever uma linha de código, ajudamos você a validar sua ideia, definir o escopo do MVP (Produto Mínimo Viável) e traçar uma estratégia de produto clara, minimizando riscos e maximizando as chances de sucesso.</p>
                <h3>Entregáveis Principais:</h3>
                <ul>
                    <li>Análise de mercado e concorrentes</li>
                    <li>Documento de escopo do projeto (Product Roadmap)</li>
                    <li>Estratégia de monetização</li>
                    <li>Plano de lançamento e marketing inicial</li>
                </ul>
                <h3>Ideal Para:</h3>
                <p>Empreendedores com uma ideia de aplicativo, empresas que exploram a transformação digital e projetos que precisam de um direcionamento estratégico claro.</p>
            `
        }
    };

    // --- LÓGICA DO MODAL DE SERVIÇOS ---
    const modal = document.getElementById('service-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const serviceCards = document.querySelectorAll('.service-card[data-service-id]');

    const openModal = (serviceId) => {
        const data = servicesData[serviceId];
        if (!data || !modal) return;

        // Preenche o modal com os dados
        modal.querySelector('#modal-title').textContent = data.title;
        modal.querySelector('#modal-icon').className = `fas ${data.icon}`;
        modal.querySelector('#modal-image').src = data.image;
        modal.querySelector('#modal-image').alt = data.title;
        modal.querySelector('#modal-body').innerHTML = data.content;
        
        // Exibe o modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Impede o scroll da página de fundo
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.dataset.serviceId;
            openModal(serviceId);
        });

        // Lógica para o efeito de brilho no mouse
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });
});