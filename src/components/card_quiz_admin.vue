<template>
  <div class="item" >
            <img class="image" v-bind:src="'https://picsum.photos/200/200/?random=' + Math.floor(Math.random()*1000)">

          <div class="content">
            <i class="fas fa-times-circle" @click="deleteQuiz(quiz.id)"></i>
            <a class="header">{{quiz.name}}</a>
            <div class="meta">
              <span class="cinema">{{quiz.questions.length}} questions</span>
            </div>
            <div class="description">
              <p>{{quiz.description}}</p>
            </div>
            <div>
              <div class="button-admin" @click="editquiz(quiz.id)">
                Update
                <i class="fas fa-chevron-right"></i>
              </div>
            <router-link :to="{name: 'result', params: {quizid: quiz.id}}" class="button-admin">
              View results
              <i class="fas fa-chevron-right"></i>
            </router-link>
             <router-link :to="{name: 'quiz', params: {id: quiz.id}}" class="button-admin">
              Run!
              <i class="fas fa-chevron-right"></i>
            </router-link>
            </div>

            <span class="grow"></span>
            <div class="like-stat">
              <div class="like">
                <i class="fas faslike fa-thumbs-up">{{quiz.likes.length }}</i>
              </div>

              <div class="like">
                <i class="fas fa-thumbs-down">{{quiz.dislikes.length }}</i>
              </div>
            </div>

          </div>
        </div>
</template>

<script>
  export default {
    name: "card_quiz_admin",
    props: ['quiz'],
    methods: {
      editquiz(id) {
        this.$router.push({name: "editquiz", params: {id: id}});
      },
      deleteQuiz(id) {
        this.$api.deleteQuiz(id).then(
          (resp) =>
          { this.quizs = this.quizs.filter(quiz => quiz.id !== id)}
        )
      },
    }
  }
</script>

<style scoped>
 .item {
    display: flex;
    box-shadow: grey 0px 0px 11px 2px;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    }
  .grow{
     flex-grow: 1;
  }
  .content {
    /*width: 500px;*/
    flex: 1;
    display: flex;
    flex-direction: column;
    /*justify-content: flex-start; !* align items in Main Axis *!*/
    /*align-items: stretch; !* align items in Cross Axis *!*/
    /*align-content: stretch;*/
    padding: 10px;
  }
  .fa-times-circle {
    margin-left: auto;
  }
  .update-button {

  }
  .like {
    display: inline;
  }
  .like-stat {
    color: #037aff;
    margin-left: auto;
  }
  .faslike {
    margin: 5px;
  }

  .image {
    width: 200px;
  }

  .button-admin {
    border: solid #037aff 1px;
    border-radius: 10px;
    color: #037aff;
    text-decoration: none;
    padding: 5px;
    margin-left: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline;
  }

  .button-admin:hover {
    background-color: #94caff;
    cursor: pointer;
  }
  .fa-times-circle:hover {
    cursor: pointer;
    color: red;
  }
</style>