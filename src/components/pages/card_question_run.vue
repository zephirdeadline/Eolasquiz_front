<template xmlns="http://www.w3.org/1999/html">
  <div class="current-question" :class="isVisible(question.id)">

    <div class="">
      <label v-html="question.text"></label>

      <div v-for="answer in question.answers" :key="answer.id" class="answer">
        <div >
          <label>
            <input type="radio" class='ui radio checkbox' :value="answer.id" :name="question.id"/>
            <span v-html="answer.text">
            </span>
          </label>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card_question_run",
    props: ['question', 'currentQuestion'],
    methods: {
      isVisible (id) {
        if (id === this.currentQuestion)
          return 'show'
        else
          return 'hide'
      },
    }
  }
</script>

<style scoped>
  .hide {
    display: none;
  }

  .show {
    display: block;
  }
  .answer {
    padding: 5px;
  }
  .current-question {
    box-shadow: grey 0px 2px 33px -3px;
    margin: 20px;
    border-radius: 10px;
    padding: 20px;
  }
</style>