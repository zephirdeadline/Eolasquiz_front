<template>
    <div>
    <header-main/>
        <h1>View result</h1>
        <div class="ui celled list">
            <div class="item" v-for="result in results" :key="result.id">
                <img class="ui avatar image" width="35" height="35" src="https://t3.ftcdn.net/jpg/00/64/67/80/160_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg">
                <div class="content">
                    <div class="header">{{result.uniq_id}}</div>
                    {{result.score}}/20
                    </div>
            </div>
        </div>
        
    </div>
</template>


<script>
import HeaderMain from "../header_main";
export default {
    name: 'result',
    components: {HeaderMain},
    data () {
        return {
            results: []
        }
    },

    mounted () {
        this.$api.allResult(this.$route.params.quizid).then(
            Response => this.results = Response
        )
    },
    methods: {

    }
}
</script>


<style scoped>
.item {
    display: flex;
    margin: 20px;
}
</style>
