import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    token: '',
  },
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    },
    setToken(state, token) {
      state.token = token; // Set the token
    },
  },
});
