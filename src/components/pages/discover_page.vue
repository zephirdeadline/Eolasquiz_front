<template>
    <div class="discover_page">
        <div>
            <p @click="goPaiement('teacher')">Buy a Teacher Licence 20€</p>
            <p @click="goPaiement('school')">Buy a School Licence 200€</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "discover_page",
        methods: {
            goPaiement(type) {
                this.$router.push({ name: 'paiement', query: { plan: type }});
            }
        }
    }
</script>

<style scoped>

</style>