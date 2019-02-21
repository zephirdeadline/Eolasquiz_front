<template>
  <div class="content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="is_loading" infinite-scroll-distance="100">
    <h1 class="ui center aligned icon header title">
      <i class="circular users icon"></i>
    </h1>
    <div class="ui center aligned icon input">
      <h1>Kaestio →</h1>
      <form @submit="FindQuiz" method="GET">
        <input v-model="toFind" name="value" type="text" placeholder="Search...">
        <i class="circular search link icon"></i>
      </form>
    </div>
    <div>
      <div class="ui segment" id="loader" v-if="!is_loading">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>
    </div>
    <hr>
    <div class="ui four quiz stackable cards" v-if="is_loading">
      <div class="ui card" id="card" v-for="quiz in quizs" :key="quiz.id">
        <div class="image">
          <img src="../../assets/quiz.jpg">
        </div>
        <div class="content">
          <router-link :to="{ name: 'quiz', params: { id: quiz.id }}" class="header">{{quiz.name}}</router-link>
          <div class="meta">
            <span class="date">{{quiz.created_at}}</span>
          </div>
          <div class="description">{{ quiz.description }}</div>
        </div>
        <div class="extra content">
          <a>
            <i class="like icon" @click="Like(quiz.id)"></i>
            {{ quiz.likes.length }}
            <span v-if="isUserLikeQuiz(quiz)">with you</span>
          </a>
          <a>
            <i class="thumbs down icon" @click="Dislike(quiz.id)"></i>
            {{ quiz.dislikes.length }}
            <span v-if="isUserDislikeQuiz(quiz)">with you</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vuex from "vuex";

export default {
  name: "welcome",

  data() {
    return {
      nextUrl: "",
      toFind: "",
      quizs: [],
      headers: {
        headers: { Authorization: this.$store.getters.getUser.token }
      },
      is_loading: true,
      last_load = null
    };
  },

  computed: {},

  methods: {
    loadMore () {
      if (Date.now() - this.last_load == 1000){
        this.is_loading = true
         this.$http
            .get(this.nextUrl.substr(this.nextUrl.indexOf("/", 7) + 1))
            .then(
              Response => {
                
                let pagination = JSON.parse(Response.bodyText);
                this.quizs = this.quizs.concat(pagination.results);
                this.nextUrl = pagination.next;
                this.is_loading = false
                last_load = Date.now()
                
                
              },
              Response => console.log(Response)
            );
      }
    },
    FindQuiz(e) {
      this.is_loading = true;
      if (this.toFind === "") {
        this.getQuizs();
        return;
      }
      this.$http.get("api/quiz/find/" + this.toFind).then(
        Response => {
          this.quizs = JSON.parse(Response.bodyText);
          this.is_loading = false;
        },
        Response => console.log(Response.error)
      );
      e.preventDefault();
    },
    Like(id) {
      this.$http
        .post("api/like/", [{ quiz: id }], this.headers)
        .then(this.getQuizs, Response => Response);
    },
    Dislike(id) {
      this.$http
        .post("api/dislike/", [{ quiz: id }], this.headers)
        .then(this.getQuizs, Response => Response);
    },
    isUserLikeQuiz(quiz) {
      return quiz.likes.find(
        like => like.user === this.$store.getters.getUser.id
      );
    },
    isUserDislikeQuiz(quiz) {
      return quiz.dislikes.find(
        like => like.user === this.$store.getters.getUser.id
      );
    },
    getQuizs() {
      this.$http.get("api/quiz/last/", this.headers).then(
        Response => {
          let pagination = JSON.parse(Response.bodyText);
          this.quizs = pagination.results;
          this.nextUrl = pagination.next;

          this.is_loading = false;
        },
        Response => console.log(Response)
      );
    }
  },

  mounted() {
    this.getQuizs();
  },
};
</script>


<style>
.lazyloaded {
  width: 100% !important;
  height: 100% !important;
}

.thumbs.down.icon {
  margin-left: 5px;
}
.quiz {
  display: flex;
  height: 100%;
}

h1 {
  text-align: center;
}
#loader {
  height: 500px;
}
.title {
  color: aliceblue !important;
}
</style>
