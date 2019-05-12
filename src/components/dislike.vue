<template>
  <a>
            <i
              class="thumbs down icon"
              @click="Dislike(quiz.id)"
            />
            {{ nbDislikes + disliked }}
            <span v-if="isUserDislikeQuiz(quiz) || disliked > 0">with you</span>
          </a>
</template>

<script>
    export default {
        name: "dislike",
        props: ['quiz'],
        data() {
            return {
                disliked: 0,
            }
        },
        computed: {
            nbDislikes() {
                return this.quiz.dislikes.length;
            }
        },
        methods: {
            Dislike(id) {
                this.$api.dislike(id)
                  .then(() => {
                    if (this.disliked > 0) {
                        this.disliked = 0;
                    } else {
                        this.disliked = 1;
                    }
                  }, Response => Response);
            },
            isUserDislikeQuiz(quiz) {
                return this.quiz.dislikes.find(
                    dislike => dislike.user === this.$store.getters.getUser.id,
                );
            },
        }
    }
</script>

<style scoped>

</style>