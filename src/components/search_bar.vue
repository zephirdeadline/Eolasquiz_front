<template>
  <div class="ui center aligned icon input">
      <h1>Kaestio →</h1>
      <form
        method="GET"
        @submit="FindQuiz"
      >
        <input
          v-model="toFind"
          name="value"
          type="text"
          placeholder="Search..."
        >
        <i class="circular search link icon" />
      </form>
    </div>
</template>

<script>
    export default {
        name: "search_bar",
        data() {
            return {
                toFind: '',
            }
        },
        methods: {
            FindQuiz(e) {
                e.preventDefault();
                this.$emit('FindQuiz', this.toFind);
            }
        }
    }
</script>

<style scoped>

</style>