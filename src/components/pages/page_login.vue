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
        methods: {
            loginfct() {
                this.$api.token({ email: this.user.email, password: this.user.password })
                    .then(resp => resp.json())
                    .then((resp) => {
                            const token = `token ${resp.auth_token}`;
                            this.$api.me(token)
                                .then(resp => resp.json())
                                .then((resp) => {
                                        this.user = resp;
                                        this.user.token = token;
                                        // delete this.user.password;
                                        this.$store.dispatch('changeUser', this.user);
                                        this.$router.push({ name: 'welcome' });
                                    }
                                );
                        }
                    );
            },

            registerfct() {
                this.$api.createUser({ email: this.user.email, password: this.user.password }).then(
                    resp => this.loginfct()
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
