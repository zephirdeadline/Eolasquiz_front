<template>
    <div>
        <h1>View result</h1>
        <div class="ui celled list">
            <div class="item" v-for="result in results" :key="result.id">
                <img class="ui avatar image" src="../../assets/quiz.jpg">
                <div class="content">
                    <div class="header">{{result.uniq_id}}</div>
                    {{result.score}}/20
                    </div>
            </div>
        </div>
        
    </div>
</template>


<script>
export default {
    name: 'result',
    
    data () {
        return {
            results: []
        }
    },

    mounted () {
        this.$http.get('api/allresult/'+this.$route.params.quizid).then(
            Response => this.results = JSON.parse(Response.bodyText),
            Response => console.log(Response)
        )
    },
    methods: {

    }
}
</script>


<style>

</style>
