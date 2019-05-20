<template>
  <div
        id="card"
        class="ui card"
      >
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
            <span class="date">{{ quiz.created_at }}</span>
          </div>
          <div class="description">
            {{ quiz.description }}
          </div>
        </div>
        <div class="extra content">
          <liker :quiz="quiz" ></liker>
        </div>
        <quiz_sharer :quiz_id="quiz.id" nb_questions="10"/>

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

</style>