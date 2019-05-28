<template>
    <div>
        <header-main/>
        <div class="school_page">
            <div>add class
                <add_class/>
            </div>
            <div>Add teacher</div>
            <form @submit.prevent="addTeacher()">
                <input class="search-input" type="text" v-model="email" placeholder="Email" />
                <input class="button-wikiquiz" type="submit" />
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
    import Add_class from "../add_class";
    export default {
        name: "school_page",
        components: {Add_class, HeaderMain},
        data() {
            return {
                teachers: [],
                email: ""
            }
        },
        methods: {
            addTeacher() {
                this.$api.postUser({ 'email': this.email, 'licence_type': 'teacher' })
            }
        }
    }
</script>

<style scoped>

</style>