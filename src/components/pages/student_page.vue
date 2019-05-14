<template>
    <div>
        <header-main/>
        <div class="student-page">
            <div class="notif">View notification</div>
            <div class="dashboard">Dashboard</div>
            <div>Overview</div>
            <div>Send message to</div>
        </div>
    </div>
</template>

<script>
    import HeaderMain from "../header_main";
    export default {
        name: "student_page",
        components: {HeaderMain}
    }
</script>

<style scoped>

</style>