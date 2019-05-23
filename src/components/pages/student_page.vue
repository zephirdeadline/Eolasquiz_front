<template>
    <div>
        <header-main/>
        <div class="student-page">
            <div class="dashboard">Dashboard
                <div v-for="result in results" :key="result.id">
                    {{result.quiz_name}} {{result.score}}
                </div>
            </div>

            <div>Overview</div>
        </div>
    </div>
</template>

<script>
    import HeaderMain from "../header_main";
    export default {
        name: "student_page",
        components: {HeaderMain},
        data() {
            return {
                results: []
            }
        },
        mounted() {
            this.$api.getMyResults().then(
                    (resp) => { this.results = resp }
            )
        }
    }
</script>

<style scoped>

</style>