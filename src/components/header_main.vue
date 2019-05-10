<template>
  <div class="ui secondary pointing menu" >
      <router-link to="/" class="item" exact>
        Home
      </router-link>
      <router-link :to="{ name: 'admin'}" class="item" exact v-if="is_logged">
        Admin
      </router-link>

      <div class="right menu" >

        <a class="ui item" >
          <span v-if="is_logged" @click="view_profile">Profile</span>
        </a>
        <a class="ui item" >
          <span v-if="is_logged" @click="logout">Logout</span>
          <span v-else @click="login">Login</span>
        </a>

      </div>
    </div>
</template>

<script>
    export default {
        name: "header_main",
        computed: {
            is_logged() {
                return this.$store.getters.getUser !== undefined
            }
        },
        methods: {
            logout(){
                window.localStorage.clear()
                this.$store.dispatch('clear')
                this.$router.push({name: "login"})
            },
            login() {
                this.$router.push({name: "login"})
            },
            view_profile(){
                this.$router.push({name: "profile"})
            }
        }
    }
</script>

<style scoped>

</style>