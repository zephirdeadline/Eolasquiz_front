<template>
    <form @submit.prevent="addClass()">
                    <input type="text" v-model="class_name" placeholder="name">
                    <input type="submit" />
                </form>
</template>

<script>
    export default {
        name: "add_class",
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