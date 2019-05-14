<template>
    <div>
        <header-main/>
    <div class="school_page">
        <div @click="AddTeacher">Add teacher</div>
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
                teachers: []
            }
        }
    }
</script>

<style scoped>

</style>