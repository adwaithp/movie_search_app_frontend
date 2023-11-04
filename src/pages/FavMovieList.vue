<template>
    <div>
      <!-- Movie List -->
      <div class="movie-list">
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
              <button class="btn btn-primary mt-2" v-on:click="toggleFavorite(selectedMovie.id)">{{ isFavorite ? 'Remove From Favorite' : 'Add to Favorites' }}</button>
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
        currentPage: 1, // Current page
        totalPages: 1,
        isFavorite: false,
      };
    },
  
    methods: {
      async fetchMovieDetails(movieId) {
        const token = window.$cookies.get('auth_token');
        console.log("MOvie id",movieId)
        this.checkIfFavorite(movieId)
        try {
          const response = await fetch(`http://3.108.252.153:8000/movies/${movieId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.selectedMovie = data;
          } else {
            console.error(`Error fetching movie details: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async toggleFavorite(movie_id) {
        console.log('remove')
        const token = window.$cookies.get('auth_token');
        if (this.isFavorite) {
          try {
        const response = await fetch(`http://3.108.252.153:8000/favorites/add/${movie_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          this.isFavorite = false;
          this.fetchDataFromAPI()
        } else {
          console.error(`Error fetching movie details: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
        } else {
          try {
          const response = await fetch(`http://3.108.252.153:8000/favorites/add/${movie_id}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
  
          if (response.ok) {
            this.isFavorite = true;
            this.fetchDataFromAPI()
          } else {
            console.error(`Error fetching movie details: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
        }
      },
    
      async checkIfFavorite(movieId) {
        const token = window.$cookies.get('auth_token');
        try {
          const response = await fetch(`http://3.108.252.153:8000/favorites/add/${movieId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            if (data.is_favorite == true){
              this.isFavorite = true;
            }else{
              this.isFavorite = false;
            }  
          } else {
            console.error(`Error fetching movie details: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      },
  
      async fetchDataFromAPI() {
    const token = window.$cookies.get('auth_token');
  
    try {
      const response = await fetch('http://3.108.252.153:8000/favorites/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        this.movies = data;
      } else {
        console.error(`Error fetching data: ${response.status}`);
        const errorData = await response.json();
        console.error(errorData.detail);
      }
    } catch (error) {
      console.error(error);
    }
  },
    },
  
  
    created() {
      // Call the API and list all favorates movies when the component is created
      this.fetchDataFromAPI('http://3.108.252.153:8000/favorites');
    },
  };
  </script>
  
  
  <style scoped>
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
    cursor: pointer;
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
  
  .movie-pagination {
    text-align: center;
    margin: 20px 0;
  }
  
  .current-page {
    margin: 0 10px;
  }
  </style>
  