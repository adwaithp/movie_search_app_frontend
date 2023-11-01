<template>
  <TheNavigation></TheNavigation>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
 
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';

export default {
  name: 'App',
  components: {
    TheNavigation
  },
  methods: {
    async auth() {
      const auth_token = window.$cookies.get('auth_token');
      if (auth_token) {
        this.$store.commit('setAuthenticated', true);
      } else {
        this.$store.commit('setAuthenticated', false);
      }
      console.log("auth in the app.vue", this.$store.state.authenticated);
    },
  },
  async created() {
    await this.auth();
  },
}
</script>


<style>
</style>
