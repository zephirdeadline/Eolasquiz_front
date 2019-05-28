<template>
  <div>
    <i class="fas fa-share-alt" @click="displayForm()"></i>
    <div class="view" v-if="viewForm">
      <form @submit.prevent="shareQuiz">
        <input type="text" v-model="instanceName" placeholder="Instance's name"/>
        <input type="text" v-model="email" placeholder="Email to"/>
        <input type="submit"/>
      </form>
      <span>{{url}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "quiz_sharer",
    props: ['quiz_id', 'nb_questions'],
    data() {
      return {
        email: "",
        instanceName: "",
        url: "",
        viewForm: false
      }
    },
    methods: {
      displayForm() {
        this.viewForm = ! this.viewForm
      },
      shareQuiz() {
        this.$api.resultId(this.instanceName)
                    .then((resp) => {
                      if (resp.status < 400) {
                        console.log("instance's name already taken")
                      }
                      this.url = window.location.hostname + "/test/26/"+ this.nb_questions +"/"+this.instanceName
                    })

      }
    }
  }
</script>

<style scoped>
.fas {
    color: #2a292c;
  cursor: pointer;
  }

  .fas:hover {
    color: blue;
  }
</style>