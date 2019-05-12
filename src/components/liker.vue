<template>
  <div>
    <span @click="Like(quiz.id)">
      <i
              class="like icon"
      />
      {{ nbLike }}
      <span v-if="isUserLikeQuiz">with you</span>
    </span>
    <span  @click="Dislike(quiz.id)">
      <i
              class="thumbs down icon"
      />
      {{ nbDislikes }}
      <span v-if="isUserDislikeQuiz">with you</span>
    </span>
  </div>
</template>

<script>
    export default {
        name: "liker",
        props: ['quiz'],
        data() {
            return {
                liked: 0,
                disliked: 0,
            }
        },
        computed: {
            nbLike() {
                return this.quiz.likes.length;
            },
            nbDislikes() {
                return this.quiz.dislikes.length;
            },
            isUserLikeQuiz() {
                return this.quiz.likes.find(
                    like => like.user === this.$store.getters.getUser.id,
                );
            },
            isUserDislikeQuiz() {
                return this.quiz.dislikes.find(
                    dislike => dislike.user === this.$store.getters.getUser.id,
                );
            },
        },
        methods: {
            Like(id) {
                this.$api.like(id).then(res => this.UpdateLiker(id))
            },

            Dislike(id) {
                this.$api.dislike(id)
                    .then(res => this.UpdateLiker(id))
            },
            UpdateLiker(id) {
                return this.$api.liker(id)
                    .then(res => res.json())
                    .then(res => {
                            this.quiz.likes = res.likes;
                            this.quiz.dislikes = res.dislikes;
                        }
                    );
            }

        }
    }
</script>

<style scoped>

</style>