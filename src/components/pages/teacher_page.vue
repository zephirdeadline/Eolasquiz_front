<template>
    <div>
        <header-main />
        <div class="teacher_page">
            <div>Broadcast a quiz</div>
            <div>Dashboard</div>
            <div>Overview</div>
            <div>Send message to teacher</div>
            <div>add class
                <form @click.prevent="addClass()">
                    <input type="text" v-model="class_name" placeholder="name">
                    <input type="submit" />
                </form>
            </div>
        </div>
        <quiz_broadcaster/>
    </div>
</template>

<script>
    import HeaderMain from "../header_main";
    import Quiz_broadcaster from "../quiz_broadcaster";
    export default {
        name: "teacher_page",
        components: {Quiz_broadcaster, HeaderMain},
        data() {
            return {
                class_name: ''
            }
        },
        methods: {
            addClass() {
                this.$api.postClass(this.class_name)
            }
        }
    }
</script>

<style scoped>

</style>