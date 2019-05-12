<template>
  <div class="content">
    <h1 class="ui center aligned icon header title">
      <i class="circular users icon" />
    </h1>
    <search_bar @FindQuiz="FindQuiz" />
    <div>
      <loader_panel :is_loading="is_loading" />
    </div>
    <hr>
    <div
            v-if="!is_loading"
            class="ui five quiz stackable cards"
    >
      <card_quiz
              v-for="quiz in quizs"
              :key="quiz.id"
              :quiz="quiz"
      />
    </div>
  </div>
</template>


<script>

    import Card_quiz from '../card_quiz';
    import Search_bar from "../search_bar";
    import Loader_panel from "../loader_panel";

    export default {
        name: 'Welcome',
        components: {Loader_panel, Search_bar, Card_quiz },
        data() {
            return {
                nextUrl: null,
                toFind: '',
                quizs: [],
                is_loading: false,
                isSearch: false,
                bottom: false,
            };
        },
        watch: {
            bottom(bottom) {
                if (bottom && !this.isSearch) {
                    this.loadMore();
                }
            },
        },
        mounted() {
            this.getQuizs();
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible();
            });
        },
        methods: {
            bottomVisible() {
                const { scrollY } = window;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible;
            },
            loadMore() {
                if (this.nextUrl !== null) {
                    this.$api.loadMore(this.nextUrl)
                        .then(resp => resp.json())
                        .then((resp) => {
                                this.quizs = this.quizs.concat(resp.results);
                                this.nextUrl = resp.next;
                            }
                        );
                }
            },
            FindQuiz(e) {
                this.is_loading = true;
                this.isSearch = true;
                if (e === '') {
                    this.getQuizs();
                    this.isSearch = false;
                    return;
                }
                this.$api.find(e)
                    .then(Response => Response.json())
                    .then((Response) => {
                        this.quizs = Response;
                        this.is_loading = false;
                    });
            },
            getQuizs() {
                this.is_loading = true;
                this.$api.last()
                    .then(resp => resp.json())
                    .then((resp) => {
                        this.quizs = resp.results;
                        this.nextUrl = resp.next;
                        this.is_loading = false;
                    });
            },
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
