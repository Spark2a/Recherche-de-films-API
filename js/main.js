import TmdbApi from '../js/TmdbApi.js';


const tmdbApi = new TmdbApi();


const movieResults = document.getElementById('movie-results');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('movie-search');

// Afficher Film
function displayMovies(movies) {
    movieResults.innerHTML = ''; // Reset
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        `;
        movieResults.appendChild(movieCard);
    });
}

// Charger film recommandé
async function loadRecommendedMovies() {
    const movies = await tmdbApi.discoverMovies();
    displayMovies(movies);
}

// Effectuer une recherche
async function searchMovies(query, page = 1) {
    const movies = await tmdbApi.searchMovies(query, page);
    displayMovies(movies.results); // Afficher les films
    setupPagination(movies.total_pages, query); // Configurer la pagination
}

// Configuration de la pagination
function setupPagination(totalPages, query) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');
    movieResults.appendChild(paginationContainer);

    for (let i = 1; i <= Math.min(totalPages, 10); i++) { 
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => searchMovies(query, i));
        paginationContainer.appendChild(pageButton);
    }
}

// Event formulaire soumission
searchForm.addEventListener('submit', event => {
    event.preventDefault(); // Empêcher le rechargement de la page
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    }
});

loadRecommendedMovies();
