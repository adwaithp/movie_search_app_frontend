<template>
    <div>
      <nav class="navbar navbar-default" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><button class="btn btn-primary">The Movie Search App</button></a>
          </div>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="nav navbar-nav">
              <!-- Show "Login" and "Signup" when not authenticated -->
              <li v-if="!authenticated">
                <router-link to="/login"><button class="btn btn-primary">Login</button></router-link>
              </li>
              <li v-if="!authenticated">
                <router-link to="/signup"><button class="btn btn-primary">Signup</button></router-link>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <!-- Show "Logout" when authenticated -->
              <li v-if="authenticated">
                <button class="btn btn-primary" @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      authenticated() {
        return this.$store.state.authenticated;
      },
    },
    methods: {
      async logout() {
        try {
          // API request to the logout endpoint to log the user out
          const response = await fetch('http://ec2-3-108-252-153.ap-south-1.compute.amazonaws.com/logout/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            this.$store.commit('setAuthenticated', false); // Update the state to reflect that the user is logged out
            this.$router.push('/login'); // Redirect to the login page
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style>
  .navbar {
    background-color: #0062cb;
  }
  .navbar-nav > li > a {
    color: #060606;
  }
  
  .navbar-nav > li > a:hover {
    color: #ffffff;
  }
  </style>
  