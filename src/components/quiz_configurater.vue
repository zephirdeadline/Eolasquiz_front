<template>
  <div class="quiz_config">
    <card_quiz_play
                :quiz="quiz"
        />

  </div>
</template>

<script>
    import Card_quiz from "./card_quiz";
    import Card_quiz_play from "./card_quiz_play";
    export default {
        name: "quiz_configurater",
        components: {Card_quiz_play, Card_quiz},
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
    width: 100%;
    align-content: center;
    align-items: center;
  }

  .card {
    text-align: center;
    align-items: center;
    align-content: center;
    width: 400px;
    height: 300px;
    /*overflow: hidden;*/
  }

  img{
    width: 100%;
  }

</style>