<template>
  <div>
    <form @submit.prevent="create_student()">
      email student: <input  class="search-input" v-model="email" type="text">
      class: <input  class="search-input" v-model="class_entity_id" type="number">
      <input type="submit"  class="button-wikiquiz">
    </form>

  </div>
</template>

<script>
  export default {
    name: "create_student",
    data() {
      return {
        email: '',
        class_entity_id: null
      }
    },
    methods: {
      create_student() {
        this.$api.postUser({ email: this.email, licence_type: 'student', class_entity_id: this.class_entity_id })
          .then(resp => {})
      }
    }
  }
</script>

<style scoped>

</style>