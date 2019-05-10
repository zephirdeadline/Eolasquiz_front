<template>
  <div class="content">
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
      <div class="ui segment" id="loader" v-if="is_loading">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>
    </div>
    <hr>
    <div class="ui five quiz stackable cards" v-if="!is_loading">
      <div class="ui card" id="card" v-for="quiz in quizs" :key="quiz.id">
        <div class="image">
          <img v-bind:src="'https://picsum.photos/200/150?random=' + Math.floor(Math.random()*531)">
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

    export default {
        name: "welcome",

        data() {
            return {
                nextUrl: "",
                toFind: "",
                quizs: [],
                headers: {
                    headers: this.$api.getHeader()
                },
                is_loading: false,
                isSearch : false,
                bottom: false,
                //last_load = null
            };
        },

        computed: {},
        watch: {
            bottom(bottom) {
                if (bottom && !this.isSearch) {
                    this.loadMore()
                }
            }
        },
        methods: {
            bottomVisible() {
                const scrollY = window.scrollY
                const visible = document.documentElement.clientHeight
                const pageHeight = document.documentElement.scrollHeight
                const bottomOfPage = visible + scrollY >= pageHeight
                return bottomOfPage || pageHeight < visible
            },
            loadMore () {
                var getLocation = function(href) {
                    var l = document.createElement("a");
                    l.href = href;
                    return l;
                };
                var l = getLocation(this.nextUrl);
                this.$http
                    .get(this.nextUrl)
                    .then(
                        Response => {
                            let pagination = JSON.parse(Response.bodyText);
                            this.quizs = this.quizs.concat(pagination.results);
                            this.nextUrl = pagination.next;
                        },
                        Response => console.log(Response)
                    );
            },
            FindQuiz(e) {
                this.is_loading = true;
                this.isSearch = true;
                if (this.toFind === "") {
                    this.getQuizs();
                    this.is_loading = false
                    this.isSearch = false
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
                this.is_loading = true
                this.$http.get("api/quiz/last/").then(
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
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            })
        }
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
