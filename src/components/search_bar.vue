<template>
  <div class="">
      <h1>WikiQuiz →</h1>
      <form
        @submit.prevent="FindQuiz"
      >
        <div class="search-input">
        <input class="input"
          v-model="toFind"
          name="value"
          type="text"
          placeholder="Search..."
        />
        <i @click="FindQuiz" class="fas fa-search"></i>
          </div>
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
                this.$emit('FindQuiz', this.toFind);
            }
        }
    }
</script>

<style scoped>
  .fa-search{
    right: 0;
  }

</style>