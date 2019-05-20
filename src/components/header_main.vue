<template>
  <div class="ui secondary pointing menu">
    <router-link
      to="/"
      class="item"
      exact
    >
      Home
    </router-link>
    <router-link
      v-if="isLogged"
      :to="{ name: 'admin'}"
      class="item"
      exact
    >
      Admin
    </router-link>
    <router-link
      v-if="isLogged && getLicenceType === 'teacher'"
      :to="{ name: 'teacher'}"
      class="item"
      exact
    >
      Teacher
    </router-link>
    <router-link
      v-if="isLogged && getLicenceType === 'school'"
      :to="{ name: 'school'}"
      class="item"
      exact
    >
      School
    </router-link>
    <router-link
      v-if="isLogged && getLicenceType === 'student'"
      :to="{ name: 'student'}"
      class="item"
      exact
    >
      Student
    </router-link>
<!-- **************   -->
    <div class="right menu">
      <router-link
        v-if="isLogged"
        :to="{ name: 'messages'}"
        class="item"
        exact>
        <span>Messages</span>
      </router-link>
      <a class="ui item">
        <span
          v-if="isLogged"
        >Notifications</span>
      </a>
      <a class="ui item">
        <span
          v-if="isLogged"
          @click="view_profile"
        >Profile</span>
      </a>
      <a class="ui item">
        <span
          v-if="isLogged"
          @click="logout"
        >Logout</span>
        <span
          v-else
          @click="login"
        >Login</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  name: 'HeaderMain',
  data() {
    return {
      isLogged: false,
      test: true
    }
  },

  computed: {
    getUserName() {
      if (this.is_logged()) {
        return this.$store.state.user.username;
      }
      return '';
    },
    getLicenceType() {
      if (this.is_logged()) {
        return this.$store.state.user.licence_type;
      }
      return '';
    },
  },
  methods: {

    is_logged() {
      console.log(this.$store.state.user, this.$store.getters.user)
      return this.$store.state.user !== undefined;
    },
    logout() {
      this.$store.dispatch('clear');
      window.localStorage.clear();
      this.$router.push({ name: 'login' });
      this.isLogged = this.is_logged()
    },
    login() {
      this.$router.push({ name: 'login' });
    },
    view_profile() {
      this.$router.push({ name: 'profile' });
    },
  },

  mounted() {
    this.isLogged = this.is_logged();
    console.log("mounted")
  }
};
</script>

<style scoped>

</style>
