document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA DO SLIDE DE FUNDO DO HERO DA PÁGINA "SOBRE" ---
    const sobreHeroSlider = document.querySelector('.sobre-hero .hero-background-slider');

    if (sobreHeroSlider) {
        const slides = sobreHeroSlider.querySelectorAll('.hero-background-slider__slide');
        let currentSlide = 0;
        const slideInterval = 7000; // 7 segundos

        if (slides.length > 1) {
            const nextSlide = () => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            };

            setInterval(nextSlide, slideInterval);
        }
    }

    // --- DADOS DA EQUIPE (SIMULAÇÃO DE UM BANCO DE DADOS/API) ---
    const teamData = {
        1: {
            name: "João Silva",
            role: "CEO & Fundador",
            photo: "assets/img/avatar.jpg",
            bio: "Com mais de 15 anos de experiência em tecnologia e liderança, João fundou a PixelHub com a visão de construir uma agência que une expertise técnica com uma abordagem humana e criativa. Ele é apaixonado por ajudar empresas a prosperarem no mundo digital.",
            socials: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        2: {
            name: "Jeovany Gabriel",
            role: "Diretor de Arte & UI/UX",
            photo: "assets/img/avatar.jpg",
            bio: "Jeovany é a mente criativa por trás das interfaces intuitivas e designs premiados da PixelHub. Com um olhar apurado para a estética e uma profunda compreensão da experiência do usuário, ele garante que cada projeto não seja apenas bonito, mas também funcional e cativante.",
            socials: {
                linkedin: "#",
                dribbble: "#",
                behance: "#"
            }
        },
        3: {
            name: "Roly Ezequiel",
            role: "Líder de Engenharia",
            photo: "assets/img/avatar.jpg",
            bio: "Roly é o nosso mestre do código. Ele lidera a equipe de desenvolvimento com um foco rigoroso em qualidade, performance e escalabilidade. Não há desafio técnico que ele não consiga resolver, garantindo que nossas soluções sejam robustas e seguras.",
            socials: {
                linkedin: "#",
                github: "#"
            }
        },
        4: {
            name: "Augusto Neves",
            role: "Cyber Seguranca",
            photo: "assets/img/avatar.jpg",
            bio: "Augusto vive e respira dados. Ele é a especialista por trás das nossas campanhas de cyber Seguranca, usando análise de dados para criar estratégias que geram Seguranca, engajamento e, o mais importante, protegendo e garantindo o bem estar dos nossos clientes.",
            socials: {
                linkedin: "#",
                twitter: "#"
            }
        }
    };

    // --- LÓGICA DO MODAL DA EQUIPE ---
    const teamMemberModal = document.getElementById('teamMemberModal');
    if (teamMemberModal) {
        teamMemberModal.addEventListener('show.bs.modal', function (event) {
            const card = event.relatedTarget;
            const memberId = card.dataset.memberId;
            const data = teamData[memberId];

            const modalContent = teamMemberModal.querySelector('.modal-content');

            if (!data) {
                modalContent.innerHTML = `<div class="modal-body text-center p-4"><p>Desculpe, informações não encontradas.</p></div>`;
                return;
            }

            let socialLinksHTML = '';
            for (const [key, value] of Object.entries(data.socials)) {
                socialLinksHTML += `<a href="${value}" target="_blank" rel="noopener noreferrer" aria-label="${key}"><i class="fab fa-${key}"></i></a>`;
            }

            modalContent.innerHTML = `
                <div class="member-modal-body">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    <div class="member-modal-header">
                        <div class="member-modal-cover"></div>
                        <img src="${data.photo}" alt="Foto de ${data.name}" class="member-modal-photo">
                    </div>
                    <div class="member-modal-content">
                        <h2 class="member-modal-name">${data.name}</h2>
                        <p class="member-modal-role">${data.role}</p>
                        <p class="member-modal-bio">${data.bio}</p>
                        <div class="member-modal-socials">
                            ${socialLinksHTML}
                        </div>
                    </div>
                </div>
            `;
        });
    }

});