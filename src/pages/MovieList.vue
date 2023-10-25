<template>
    <div>
      <!-- Movie Search Bar -->
      <div class="movie-search">
        <div class="text-center">
          <input
            type="text"
            class="form-control"
            placeholder="Search for movies..."
            v-model="searchQuery"
            style="margin-bottom: 10px;"
          />
          <button @click="searchMovies" class="btn btn-primary mt-2">Search</button>
        </div>
      </div>
      <!-- Movie List -->
      <div class="movie-list">
        <!-- Loop through the movie data and display each movie -->
        <div
          class="movie-card"
          v-for="movie in movies"
          :key="movie.id"
          @click="fetchMovieDetails(movie.id)"
          data-toggle="modal"
          data-target="#movieModal"
        >
          <h3>{{ movie.title }}</h3>
          <p>Rating: {{ movie.rating }}</p>
          <p>Release Date: {{ movie.release_date }}</p>
        </div>
      </div>
      <!-- Movie Modal -->
      <div class="modal fade" id="movieModal" tabindex="-1" role="dialog" aria-labelledby="movieModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="movieModalLabel">{{ selectedMovie ? selectedMovie.title : 'Movie Title' }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><strong>Overview:</strong> {{ selectedMovie ? selectedMovie.overview : 'No overview available' }}</p>
              <p><strong>Rating:</strong> {{ selectedMovie ? selectedMovie.rating : 'N/A' }}</p>
              <p><strong>Release Date:</strong> {{ selectedMovie ? selectedMovie.release_date : 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '', // Input for movie search
        movies: [], // Movie data fetched from your API
        selectedMovie: null, // Store the selected movie
      };
    },
  
    methods: {
      async fetchMovieDetails(movieId) {
        // Access the token from your store's state
        const token = window.$cookies.get('auth_token')
  
        try {
          // Make an API request to fetch movie details for the given movieId
          const response = await fetch(`http://127.0.0.1:8000/movies/${movieId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`, // Include the token in the Authorization header
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.selectedMovie = data; // Set the selected movie for the modal
          } else {
            console.error(`Error fetching movie details: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      },
  
      async searchMovies() {
        // Access the token from your store's state
        const token = window.$cookies.get('auth_token')
  
        try {
          // Make an API request to search for movies based on the searchQuery
          const response = await fetch(`http://127.0.0.1:8000/movies?keyword=${this.searchQuery}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`, // Include the token in the Authorization header
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.movies = data; // Update the movies array with search results
          } else {
            console.error(`Error searching for movies: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      },
  
      async fetchAllMovies() {
        // Access the token from your store's state
        const token = window.$cookies.get('auth_token')
  
        try {
          // Make an API request to fetch all movies
          const response = await fetch('http://127.0.0.1:8000/movies', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`, // Include the token in the Authorization header
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.movies = data;
          } else {
            console.error(`Error fetching all movies: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      // Call the API and list all movies when the component is created
      this.fetchAllMovies();
    },
  };
  </script>
  
  <!-- Add your styles here -->
  <style scoped>
  /* Add some basic styling */
  .movie-search {
    text-align: center;
    margin: 20px 0;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .movie-card {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    cursor: pointer; /* Add a cursor to indicate that the card is clickable */
  }
  
  .movie-card img {
    max-width: 100%;
    height: auto;
  }
  
  .movie-card h3 {
    font-size: 1.2rem;
  }
  
  .movie-card p {
    margin: 10px 0;
  }
  </style>
  