<template>
    <button @click="paiement()">Paiement</button>
</template>

<script>
    export default {
        name: "paiement_page",
        methods: {
            paiement(){
                console.log(this.$route.query.plan)
                this.setLicence()
            },
            setLicence() {
                this.$api.update_licence(this.$route.query.plan)
            }
        }
    }
</script>

<style scoped>

</style>