<template>
  <div class="login">
    <form
      class="ui form"
      @submit.prevent
    >
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="user.email"
          name="email"
          type="text"
        >
      </div>
      <div class="field">
        <label for="">password</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
        >
      </div>
      <input
        class="ui button"
        type="submit"
        value="Login"
        @click="loginfct"
      >
      <input
        class="ui button"
        type="submit"
        value="Register"
        @click="registerfct"
      >
      <input
        class="ui button"
        type="submit"
        value="Skip"
        @click="skipfct"
      >
    </form>
  </div>
</template>


<script>

export default {
  name: 'Login',
  data() {
    return {
      user: { email: '', password: '' },
    };
  },
  computed: {
  },
  methods: {
    loginfct() {
      this.$http.post('auth/token/create/', { email: this.user.email, password: this.user.password })
        .then(
          (Response) => {
            const token = `token ${JSON.parse(Response.bodyText).auth_token}`;
            this.$http.get('auth/users/me/', { headers: { Authorization: token } }).then(
              (Response) => {
                this.user = JSON.parse(Response.bodyText);
                this.user.token = token;
                // delete this.user.password;
                this.$store.dispatch('changeUser', this.user);
                this.$router.push({ name: 'welcome' });
              },
              Response => Response,
            );
          },

          Response => Response,
        );
    },

    registerfct() {
      this.$http.post('auth/users/create/', { email: this.user.email, password: this.user.password }).then(
        response => this.loginfct(), response => response,
      );
    },

    skipfct() {
      this.$router.push({ name: 'welcome' });
    },
  },
};
</script>

<style>
    .login
    {
        max-width: 500px;
        margin: auto
    }
</style>
