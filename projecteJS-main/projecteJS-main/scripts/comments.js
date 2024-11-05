const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const commentsContainer = document.getElementById('comments-container');

const fetchComments = async () => {
    loader.classList.remove('hidden'); // Mostrar el loader
    errorMessage.classList.add('hidden'); // Ocultar mensaje de error
    commentsContainer.classList.add('hidden'); // Ocultar contenedor de comentarios

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) throw new Error('Failed to fetch comments');

        const comments = await response.json();
        displayComments(comments);
    } catch (e) {
        errorMessage.textContent = e instanceof Error ? e.message : 'An error occurred';
        errorMessage.classList.remove('hidden'); // Mostrar mensaje de error
    } finally {
        loader.classList.add('hidden'); // Ocultar el loader
    }
}

const displayComments = (comments) => {
    commentsContainer.innerHTML = ''; // Limpiar contenedor
    comments.forEach(comment => {
        const article = document.createElement('article');
        article.className = 'bg-white p-4 rounded-lg shadow';
        article.setAttribute('data-testid', 'comment-card');

        const h2 = document.createElement('h2');
        h2.className = 'font-semibold text-lg mb-2';
        h2.textContent = comment.name;

        const pEmail = document.createElement('p');
        pEmail.className = 'text-gray-600 text-sm mb-2';
        pEmail.textContent = comment.email;

        const pBody = document.createElement('p');
        pBody.className = 'text-gray-800';
        pBody.textContent = comment.body;

        article.appendChild(h2);
        article.appendChild(pEmail);
        article.appendChild(pBody);
        commentsContainer.appendChild(article);
    });
    commentsContainer.classList.remove('hidden'); // Mostrar contenedor de comentarios
}

// Llamar a la función para obtener comentarios al cargar la página
window.onload = fetchComments;
