<template>
  <div class="quiz_config">
    <div class="ui card">
      <div class="image">
        <img src="../assets/quiz.jpg">
      </div>
      <div class="content">
        <a class="header">{{quiz.name}}</a>
        <div class="meta">
          <span class="date">{{quiz.created_at}}</span>
        </div>
        <div class="description">
          {{ quiz.description }}
        </div>
      </div>
      <div class="extra content">
      </div>
    </div>

    <form class="ui form" @submit.prevent>
      <div class="field">
        <label for="">Nombre de questions</label>
        <input name="nb_questions" type="number" v-model="nb_question" placeholder="10" min="1"/>
      </div>

      <input class="ui button" type="submit" value="Tester!" @click="runtest()">
    </form>
  </div>
</template>

<script>
    export default {
        name: "quiz_configurater",
        data () {
            return {
                quiz: {},
                nb_question: 10,
            }
        },

        mounted() {
            this.getQuizFromServer(this.$route.params.id);
        },

        methods: {
            getQuizFromServer(id) {
                this.$api.quiz(id)
                    .then(resp => resp.json())
                    .then((resp) => { this.quiz = resp; })
            },

            runtest() {
                var uniqid = require('uniqid')
                this.$router.push({name: "autotest", params: {id: this.quiz.id, nbquestion: this.nb_question }})
            }
        }
    }
</script>

<style scoped>
  .quiz_config {
    margin: auto;
    text-align: center;
    max-width: 300px;
  }

  .card {
    text-align: center;
  }
</style>