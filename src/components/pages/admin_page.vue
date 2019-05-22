<template>
  <div>
    <header-main/>
    <div class="adminpanel">
      <router-link to="createquiz" class="ui primary button">Creer un quiz</router-link>
      <h2>Voici la list de vos quiz</h2>
      <span>Derniers résultats:</span>
      <div v-for="result in results" :key="result.id">
        <span>{{result.score}} ({{result.uniq_id}}) -> {{result.quiz_name}}</span>
      </div>
      <form @submit="FindQuiz" method="GET">
        <input v-model="toFind" name="value" type="text" placeholder="Search...">
        <i class="circular search link icon"></i>
      </form>
      <div class="ui divided items">
        <div class="item" v-for="quiz in quizs" :key="quiz.id">
          <div class="image">
            <img v-bind:src="'https://picsum.photos/200/300/?random=' + Math.floor(Math.random()*1000)">
          </div>
          <div class="content">
            <button class="ui circular close icon button" @click="deleteQuiz(quiz.id)">
              <i class="close icon"></i>
            </button>
            <a class="header">{{quiz.name}}</a>
            <div class="meta">
              <span class="cinema">{{quiz.questions.length}} questions</span>
            </div>
            <div class="description">
              <p>{{quiz.description}}</p>
            </div>
            <div class="extra">
              <div class="ui right floated primary button" @click="editquiz(quiz.id)">
                Update
                <i class="right chevron icon"></i>
              </div>

              <div class="ui label">
                <i class="like icon">{{quiz.likes.length }}</i>
              </div>

              <div class="ui label">
                <i class="thumbs down icon">{{quiz.dislikes.length }}</i>
              </div>
            </div>
            <router-link :to="{name: 'quiz', params: {id: quiz.id}}" class="ui green basic button">
              Run!
              <i class="right chevron icon"></i>
            </router-link>
            <router-link :to="{name: 'result', params: {quizid: quiz.id}}" class="ui right floated brown basic button">
              View results
              <i class="right chevron icon"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderMain from "../header_main";
  export default {
    name: "admin",
    components: {HeaderMain},
    data() {
      return {
        quizs: [],
        nextUrl: "",
        isSearch: false,
        toFind: "",
        results: [],
        bottom: false,
      };
    },

    mounted() {
      this.getQuizs();
      this.getResult()
    },
    watch: {
      bottom(bottom) {
        console.log("watch");
        if (bottom && !this.isSearch) {
          this.loadMore()
        }
      }
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        return bottomOfPage || pageHeight < visible
      },
      loadMore() {
        this.$api.loadMore(this.nextUrl/*.substr(this.nextUrl.indexOf("/", 7) + 1)*/)
          .then(
            resp => {
              this.quizs = this.quizs.concat(resp.results);
              this.nextUrl = resp.next;
            }
          );
      },
      getQuizs() {
        this.$api.quizAdmin()
          .then((resp) => {
            this.quizs = resp.results;
            this.nextUrl = resp.next
          })
      }
      ,
      getResult() {
        this.$api.allAdminResult()
          .then((resp) => {
              this.results = resp
            }
          )
      },
      editquiz(id) {
        this.$router.push({name: "editquiz", params: {id: id}});
      },
      deleteQuiz(id) {
        this.$api.deleteQuiz(id).then(
          (resp) =>
          { this.quizs = this.quizs.filter(quiz => quiz.id !== id)}
        )
      },
      FindQuiz(e) {
        if (this.toFind === "") {
          this.isSearch = true
          this.getQuizs();
          return;
        }
        this.$api.findQuizInMine(this.toFind)
          .then(resp => {
            this.isSearch = false;
            this.quizs = resp
          });
        e.preventDefault();
      }

    },
    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
    }
  };
</script>

<style>
  .adminpanel {
    max-width: 600px;
    margin: auto;
  }
  .close {
    float: right;
  }
</style>
