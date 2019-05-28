<template>
  <div>
    <header-main/>
    <div class="adminpanel">
      <router-link to="createquiz" class="button-wikiquiz">Creer un quiz</router-link>
      <h2>Voici la list de vos quiz</h2>
      <span>Derniers résultats:</span>
      <div v-for="result in results" :key="result.id">
        <span>{{result.score}} ({{result.uniq_id}}) -> {{result.quiz_name}}</span>
      </div>
      <search_bar @FindQuiz="FindQuiz" />

      <div class="item-list">
        <card_quiz_admin v-for="quiz in quizs" :key="quiz.id" :quiz="quiz"/>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderMain from "../header_main";
  import Search_bar from "../search_bar";
  import Card_quiz_admin from "../card_quiz_admin";
  export default {
    name: "admin",
    components: {Card_quiz_admin, Search_bar, HeaderMain},
    data() {
      return {
        quizs: [],
        nextUrl: "",
        isSearch: false,
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

      FindQuiz(e) {
        if (e === "") {
          this.isSearch = true;
          this.getQuizs();
          return;
        }
        this.$api.findQuizInMine(e)
          .then(resp => {
            this.isSearch = false;
            this.quizs = resp
          });
      }

    },
    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
    }
  };
</script>

<style scoped>

  .input {
    border: none;
  }
  .adminpanel {
    max-width: 600px;
    margin: auto;
  }
  .close {
    float: right;
  }
  .item-list{

  }

</style>
