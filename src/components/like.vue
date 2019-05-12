<template>
  <a>
            <i
              class="like icon"
              @click="Like(quiz.id)"
            />
            {{ nbLike + liked }}
            <span v-if="isUserLikeQuiz(quiz) || liked > 0">with you</span>
          </a>
</template>

<script>
    export default {
        name: "like",
        props: ['quiz'],
        data() {
            return {
                liked: 0,
            }
        },
        computed: {
            nbLike() {
                return this.quiz.likes.length;
            }
        },
        methods: {
            Like(id) {
                this.$api.like(id)
                  .then(() => this.liked=1, Response => Response);
            },
            isUserLikeQuiz(quiz) {
                return this.quiz.likes.find(
                    like => like.user === this.$store.getters.getUser.id,
                );
            },
        }
    }
</script>

<style scoped>

</style>