<template>
  <div class="play_card">
      <card_quiz :quiz="quiz"/>
      <form class="ui form">
      <div class="field">

        <input class="input-question" name="nb_questions" type="number" v-model="nb_question" placeholder="10" min="1" />questions
      </div>
          <div class="start">
          <!--<input type="submit"  @click="runtest()"/>-->
          <i class="fas fa-play " @click="runtest()"></i>
          </div>
    </form>
  </div>
</template>

<script>
    import Card_quiz from "./card_quiz";
    export default {
        name: "card_quiz_play",
        components: {Card_quiz},
        props:['quiz'],
        methods: {
            runtest() {
                var uniqid = require('uniqid')
                this.$router.push({name: "autotest", params: {id: this.quiz.id, nbquestion: this.nb_question }})
            }
        }
    }
</script>

<style scoped>

  .input-question{
    border: solid 1px;
    width: 40px;
    border-color: transparent transparent blue transparent;
    margin-bottom: 10px;
  }
  .label {
    display: block;
  }

.play_card {
  display: flex;
  width: 600px;
  margin: auto;
  align-items: center;
}

  .button {
    border-radius: 50%;
  }

  .start{
    margin-left: 10px;
    font-size: 4em;
    border-radius: 50%;
    background-color: cornflowerblue;
    width: 100px;
    text-align: center;
    line-height: 100% !important;
    height: 100px;
  }
  .fa-play {
    position: relative;
    width: 100%;
    height: 100%;
    top: 16px;
    left: 6px
  }

  .fa-play:hover {
    color: #00d300;
    cursor: pointer;
  }

</style>
