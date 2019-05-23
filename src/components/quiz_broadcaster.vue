<template>
  <div>
    <form @submit.prevent="broadcast()">
      quiz id <input v-model="quizToBroadcast.quiz" type="number">
      to class id: <input v-model="quizToBroadcast.classe" type="number">
      <input type="submit">
    </form>
    <div v-for="c in classes" :key="c.id">
      {{c.name}} {{c.id}}
    </div>
    <div v-for="q in quizs" :key="q.id">
      {{q.name}} {{q.id}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "quiz_broadcaster",
    data() {
      return {
        classes: [],
        quizs: [],
        quizToBroadcast: {quiz: null, classe: null}
      }
    },
    methods: {
      getClasses() {
        this.$api.getClasses().then(resp => { this.classes = resp })
      },
      getLastQuiz() {
        this.$api.last()
          .then((resp) => {
            this.quizs = resp.results
          })
      },
      broadcast() {
        this.$api.broadcastQuiz(this.quizToBroadcast)
                  .then((resp) => {
                  })
              }
    },
    mounted() {
      this.getClasses();
      this.getLastQuiz()
    }
  }
</script>

<style scoped>

</style>