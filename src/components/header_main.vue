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
      v-if="is_logged"
      :to="{ name: 'admin'}"
      class="item"
      exact
    >
      Admin
    </router-link>
    <router-link
      v-if="is_logged && getLicenceType === 'teacher'"
      :to="{ name: 'teacher'}"
      class="item"
      exact
    >
      Teacher
    </router-link>
    <router-link
      v-if="is_logged && getLicenceType === 'school'"
      :to="{ name: 'school'}"
      class="item"
      exact
    >
      School
    </router-link>
    <router-link
      v-if="is_logged && getLicenceType === 'student'"
      :to="{ name: 'student'}"
      class="item"
      exact
    >
      Student
    </router-link>
<!-- **************   -->
    <div class="right menu">
      <a class="ui item">
        <span
          v-if="is_logged"
        >Notifications</span>
      </a>
      <a class="ui item">
        <span
          v-if="is_logged"
          @click="view_profile"
        >Profile</span>
      </a>
      <a class="ui item">
        <span
          v-if="is_logged"
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
export default {
  name: 'HeaderMain',
  computed: {
    getUserName() {
      if (this.is_logged) {
        return this.$store.getters.getUser.username;
      }
      return '';
    },
    getLicenceType() {
      if (this.is_logged) {
        return this.$store.getters.getUser.licence_type;
      }
      return '';
    },
    is_logged() {
      return this.$store.getters.getUser !== undefined;
    },
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$store.dispatch('clear');
      this.$router.push({ name: 'login' });
    },
    login() {
      this.$router.push({ name: 'login' });
    },
    view_profile() {
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>

<style scoped>

</style>
