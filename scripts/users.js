const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const usersElement = document.getElementById('users');

const fetchUsers = async () => {
    loadingElement.classList.remove('hidden'); // Mostrar el indicador de carga
    errorElement.classList.add('hidden'); // Ocultar el mensaje de error
    usersElement.classList.add('hidden'); // Ocultar los usuarios

    try {
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;
        displayUsers(users);
    } catch (e) {
        errorElement.textContent = axios.isAxiosError(e) ? e.message : 'Ha ocurrido un error';
        errorElement.classList.remove('hidden'); // Mostrar el mensaje de error
    } finally {
        loadingElement.classList.add('hidden'); // Ocultar el indicador de carga
    }
};

const displayUsers = (users) => {
    usersElement.innerHTML = ''; // Limpiar el contenedor de usuarios
    users.forEach(user => {
        const userCard = document.createElement('article');
        userCard.className = 'bg-white rounded-lg shadow overflow-hidden';
        userCard.setAttribute('data-testid', 'user-card');

        userCard.innerHTML = `
                    <img src="${user.image}" alt="${user.firstName}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h2 class="font-semibold text-xl">${user.firstName} ${user.lastName}</h2>
                        <p class="text-gray-600">${user.email}</p>
                        <p class="text-gray-700 mt-2">Compañía: ${user.company.name}</p>
                    </div>
                `;

        usersElement.appendChild(userCard);
    });
    usersElement.classList.remove('hidden'); // Mostrar el contenedor de usuarios
};

// Llamar a la función fetchUsers al cargar la página
fetchUsers();
