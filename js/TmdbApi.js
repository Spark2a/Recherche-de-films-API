class TmdbApi {
    constructor() {
        // Jeton d'accès à l'API TMDb
        this.apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjg0MjhkODFjZjVlODVjMGY5MjUzZjE4YzFkZDE5YyIsIm5iZiI6MTczMjI3ODkzNC43NzY1MjksInN1YiI6IjY3NDA3OWUwMzJhOWFhZjQzZDk2ODM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-9KQZ1xwg6mqVE1032hzdl4pIKAgYUS6I83wXGN9aro';
        this.baseUrl = 'https://api.themoviedb.org/3'; 
    }

    // En-têtes des requêtes
    getHeaders() {
        return {
            Authorization: `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json;charset=utf-8',
        };
    }

    // Récupérer 20 films discover
    async discoverMovies() {
        const endpoint = `${this.baseUrl}/discover/movie`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return data.results; // Retourne la liste des films
        } catch (error) {
            console.error('Erreur lors de la récupération des films :', error);
            return [];
        }
    }

    // Rechercher des films par mot-clé
    async searchMovies(query, page = 1) {
        const endpoint = `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return data; // Retourne tous les détails de la recherche, y compris le total des pages
        } catch (error) {
            console.error('Erreur lors de la recherche de films :', error);
            return { results: [], total_pages: 0 };
        }
    }
}

export default TmdbApi;
