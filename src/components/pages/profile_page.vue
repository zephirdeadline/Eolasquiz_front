<template>
  <div class="content">
    <header-main/>
    <form @submit="updateProfile">
      <label for="username">Username</label>
      <input
        v-model="user.username"
        type="text"
        name="username"
        class="search-input"
      >

      <label for="email">Email</label>
      <input
        v-model="user.email"
        type="text"
        name="email"
        class="search-input"
      >
      <button type="submit"
        class="button-wikiquiz">
        Send
      </button>
    </form>
    <hr>
    <form>
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        class="search-input"
      >

      <label for="confirm_password">Confirm password</label>
      <input
        type="password"
        name="confirm_password"
        class="search-input"
      >

      <button type="submit"
        class="button-wikiquiz">
        Send
      </button>
    </form>
    <hr>
    STATS
  </div>
</template>

<script>
import HeaderMain from '../header_main';

export default {
  name: 'ProfilePage',
  components: {HeaderMain},
  data() {
    return {
      user: { username: '', email: '' },
    };
  },
  methods: {
    updateProfile(e) {
      e.preventDefault();
      this.$api.updateProfile(this.user).then(res => console.log(res), res => console.log(res));
    },
  },
};
</script>

<style scoped>

</style>
