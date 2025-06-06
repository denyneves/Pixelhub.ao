/*
 * PIXELHUB - SCRIPT PARA A PÁGINA DE BLOG
 * Gerencia a funcionalidade de expandir/recolher os posts.
 */

document.addEventListener('DOMContentLoaded', function() {

    const blogGrid = document.getElementById('blog-posts');

    // Usamos delegação de eventos no contêiner do grid para melhor performance
    if (blogGrid) {
        blogGrid.addEventListener('click', function(event) {
            // Verifica se o elemento clicado é o nosso botão de toggle
            if (event.target.classList.contains('blog-post-card__toggle-btn')) {
                
                const button = event.target;
                const card = button.closest('.blog-post-card');
                
                if (card) {
                    const excerpt = card.querySelector('.blog-post-card__excerpt');
                    const fullContent = card.querySelector('.blog-post-card__full-content');

                    // Alterna a classe 'is-expanded' no card pai
                    card.classList.toggle('is-expanded');

                    if (card.classList.contains('is-expanded')) {
                        // Se está expandido
                        excerpt.style.display = 'none';
                        fullContent.style.display = 'block';
                        button.textContent = 'Ver menos';
                    } else {
                        // Se está recolhido
                        excerpt.style.display = 'block';
                        fullContent.style.display = 'none';
                        button.textContent = 'Ver mais';
                    }
                }
            }
        });
    }

    // Lógica para o formulário de comentário (exemplo)
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            
            // Aqui você poderia adicionar a lógica para enviar o comentário para um servidor
            // Por enquanto, apenas damos um feedback visual.
            const submitButton = commentForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Enviando...';

            setTimeout(() => {
                alert('Comentário enviado para moderação! Obrigado.');
                submitButton.textContent = 'Enviar Comentário';
                commentForm.reset(); // Limpa o formulário
            }, 1500);
        });
    }
});