<template>
  <div>
    <header-main/>
    <div>
      <h3>Messages List</h3>
        <div v-for="message in messages" :key="message.id">
        </div>
    </div>
  </div>
</template>

<script>
  import HeaderMain from "../header_main";
  export default {
    name: "message_page",
    components: {HeaderMain},
    data() {
      return {
        messages: []
      }
    },
    mounted() {
      this.$api.messages().then(resp => resp.json())
        .then(resp => { this.messages = resp })
    }
  }
</script>

<style scoped>

</style>