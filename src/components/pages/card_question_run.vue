<template>
  <div class="ui bottom attached  tab segment" :class="isVisible(question.id)">

                    <div class="grouped fields">
                        <label>{{question.text}}</label>

                        <div v-for="answer in question.answers" :key="answer.id">
                            <div class="field">
                                <label ><input type="radio" class='ui radio checkbox' :value="answer.id" :name="question.id" />
                                    {{answer.text}}</label>
                            </div>
                        </div>
                    </div>


                </div>
</template>

<script>
    export default {
        name: "card_question_run",
        props: ['question', 'currentQuestion'],
        methods: {
            isVisible (id) {
                if (id === this.currentQuestion)
                    return 'active'
                else
                    return ''
            },
        }
    }
</script>

<style scoped>

</style>