<template>
    <div>
        <header-main/>
    <div class="school_page">
        <div>add class</div>
        <div>Add teacher</div>
        <form @submit.prevent="addTeacher()">
            <input type="text" v-model="email" placeholder="Email" />
            <input type="submit" />
        </form>
        <p>Liste des profs</p>
        <ul>
            <li v-for="teacher in teachers" :key="teacher.id">
                <span>{{teacher.username}}</span>
            </li>
        </ul>
    </div>
        </div>
</template>

<script>
    import HeaderMain from "../header_main";
    export default {
        name: "school_page",
        components: {HeaderMain},
        data() {
            return {
                teachers: [],
                email: ""
            }
        },
        methods: {
            addTeacher() {
                this.$api.postTeacher(this.email)
            }
        }
    }
</script>

<style scoped>

</style>