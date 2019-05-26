<template>
  <div class="card">
        <div class="certificated" v-if="quiz.is_cert_teacher">
          <i class="fas fa-check"></i>Certificated
        </div>
        <div class="image">
          <img :src="'https://picsum.photos/200/150?random=' + Math.floor(Math.random()*531)">
        </div>
        <div class="content">
          <router-link
            :to="{ name: 'quiz', params: { id: quiz.id }}"
            class="header"
          >
            {{ quiz.name }}
          </router-link>
          <div class="meta">
            <span class="date">{{(new Date(quiz.created_at)).toLocaleDateString('fr-FR') }}</span>
          </div>
          <div class="description">
            {{ quiz.description }}
          </div>
        </div>
        <div class="extra">
          <liker class="liker" :quiz="quiz" ></liker>
        </div>
        <quiz_sharer class="sharer" :quiz_id="quiz.id" nb_questions="10"/>

      </div>
</template>

<script>
    import Liker from './liker';
    import Quiz_sharer from "./quiz_sharer";
    export default {
        name: "card_quiz",
        props:['quiz'],
        components:{Quiz_sharer, Liker}
    }
</script>

<style scoped>
  .liker {
    margin: 5px;
  }
  .sharer {
    margin: 5px;
  }

  .certificated{
    font-size: small;
    padding: 5px;
    height: 15px;
    background-color: #458050;
    position: absolute;
    margin: -5px 0 0 -5px;
    border-radius: 10px 10px 10px 10px;
  }

  .card {
    overflow: hidden;
    border-radius: 10px 10px 10px 10px;
    margin: 10px;
    width: 200px;
    box-shadow: -1px 4px 8px 2px grey;
    background-color: #94caff;
    transition: all;
    transition-duration: 0.25s;
  }
  .card:hover {
    box-shadow: -1px 4px 19px 11px #343434;
  }
  .meta{
    margin-top: 10px;
    font-size: small;
  }
  .description {
    font-size: small;
  }
  .extra {
    font-size: small;
  }
  .header {
    padding-bottom: 10px;
  }
  a, a:visited{
    text-decoration: none;
    color: darkblue;
  }
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .content {
    max-width: 100%;
    overflow: hidden;
    padding: 5px;
  }
</style>