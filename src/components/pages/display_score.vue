<template>
  <div class="displayresult">
            <h3>Félicitations!</h3>
            <h3>Tu as obtenu un score de:</h3>
            <h2>{{ result.score }}/20</h2>
            <p style="color: black">Voici la correction de tes erreurs:</p>
            <div v-for="answer in result.badAnswers" :key="answer.id" class="correction">
                {{answer}}
            </div>
            <p v-if="resultSaved">Result available to : {{uniqId}}</p>
        </div>
</template>

<script>
    export default {
        name: "display_score",
        props: ['result', 'resultSaved', 'uniqId'],
        data() {
            return {

            }
        },

    }
</script>

<style scoped>

</style>