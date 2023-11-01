<template>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Sign Up</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="registerUser">
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="formData.email" type="text" class="form-control" id="email" required/>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input v-model="formData.name" type="text" class="form-control" id="name" required />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="formData.password" type="password" class="form-control" id="password" required/>
              </div>
              <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input v-model="formData.repeatPassword" type="password" class="form-control" id="repeatPassword" required />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary" id="signup-button">Sign Up</button>
              </div>
            </form>
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
          name: '',
          password: '',
          repeatPassword: ''
        }
      };
    },
    methods: {
      registerUser() {
    // Check if passwords match
    if (this.formData.password !== this.formData.repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    fetch('http://3.108.252.153:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.formData)
    })
      .then(response => {
        if (response.status === 201) {
          this.$router.push('/login');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  }
    }
  };
  </script>
  