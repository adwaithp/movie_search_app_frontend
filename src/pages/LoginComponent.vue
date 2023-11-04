<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">Login</h3>
            </div>
            <div class="panel-body">
              <form @submit.prevent="loginUser">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="formData.email"
                    type="text"
                    class="form-control"
                    id="email"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    id="password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
              <div v-if="loginFailed" class="alert alert-danger mt-3">
                Login failed. Please check your credentials.
              </div>
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
        formData: {
          email: '',
          password: ''
        },
        loginFailed: false
      };
    },
    methods: {
      loginUser() {
        console.log("Login function")
        fetch('http://127.0.0.1:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        })
          .then(response => response.json())
          .then(data => {
            if (data.token) {
              window.$cookies.set('auth_token', data.token, '1d');
              if (window.$cookies.get('auth_token') != ''){
                this.$store.commit('setAuthenticated', true);
              }
              console.log(this.$store.state.authenticated)
              this.$router.push('/movie_list');
            } else {
              this.loginFailed = true
              window.$cookies.set('auth_token', '', '1d');
                this.$store.commit('setAuthenticated', false);
                
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  