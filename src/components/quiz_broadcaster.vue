<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "quiz_broadcaster",
    data() {
      return {
        classes: []
      }
    },
    methods: {
      getClasses() {
        this.$api.getClasses().then(resp => { this.classes = resp })
      }
    },
    mounted() {
      this.getClasses()
    }
  }
</script>

<style scoped>

</style>