<template>
  <div class="content">
    <form @submit="updateProfile" >
      <label for="username">Username</label>
      <input v-model="user.username" type="text" name="username"/>

      <label for="email">Email</label>
      <input v-model="user.email" type="text" name="email"/>
      <button type="submit">Send</button>
    </form>
    <hr>
    <form>
      <label for="password">Password</label>
      <input type="password" name="password"/>

      <label for="confirm_password">Confirm password</label>
      <input type="password" name="confirm_password"/>

      <button type="submit">Send</button>
    </form>
    <hr>
    STATS
  </div>
</template>

<script>
    import Header_main from "../header_main";
    export default {
        name: "profile_page",
        data() {
          return {
            user: {username: "", email: ""}
          }
        },
        methods: {
            updateProfile(e) {
                e.preventDefault()
                this.$api.updateProfile(this.user).then(res => console.log(res), res => console.log(res))
            }
        }
    }
</script>

<style scoped>

</style>