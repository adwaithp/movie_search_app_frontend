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
        <button @click="searchMovies" class="btn btn-primary mt-2" >Search</button>
        <button @click="resetSearch" class="btn btn-secondary mt-2">Reset</button>
      </div>
    </div>
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
    <div class="movie-pagination">
      <button @click="fetchPage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-primary">Previous</button>
      <span class="current-page">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="fetchPage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-primary">Next</button>
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
      currentPage: 1, // Current page
      totalPages: 1,
    };
  },

  methods: {
    async fetchMovieDetails(movieId) {
      const token = window.$cookies.get('auth_token');

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

    async fetchDataFromAPI(url) {
  const token = window.$cookies.get('auth_token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.movies = data.results;
      this.currentPage = data.current_page
      this.totalPages = data.total_pages
    } else {
      console.error(`Error fetching data: ${response.status}`);
      const errorData = await response.json();
      console.error(errorData.detail);
    }
  } catch (error) {
    console.error(error);
  }
},


    async searchMovies() {
      const url = `http://3.108.252.153:8000/movies?keyword=${this.searchQuery}&page=1`;
      await this.fetchDataFromAPI(url);
    },

    async fetchPage(page) {
      if (page < 1 || page > this.totalPages) return;
      const url = `http://3.108.252.153:8000/movies?keyword=${this.searchQuery}&page=${page}`;
      await this.fetchDataFromAPI(url);
    },
    async resetSearch() {
    // Clear the search query
    this.searchQuery = '';
    // Fetch the first page of the entire movie list
    this.fetchDataFromAPI('http://3.108.252.153:8000/movies?page=1');
  },
  },


  created() {
    // Call the API and list all movies when the component is created
    this.fetchDataFromAPI('http://3.108.252.153:8000/movies?page=1');
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
