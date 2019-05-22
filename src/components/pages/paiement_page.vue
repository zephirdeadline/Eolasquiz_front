<template>
    <div>
        <header-main/>
    <button @click="paiement()">Paiement</button>
        </div>
</template>

<script>
    import HeaderMain from "../header_main";
    export default {
        name: "paiement_page",
        components: {HeaderMain},
        methods: {
            paiement(){
                console.log(this.$route.query.plan)
                this.setLicence()
            },
            setLicence() {
                this.$api.updateLicence(this.$route.query.plan)
                        .then(resp => this.$store.dispatch('changeUser', { ...resp, token: this.$store.getters.user.token }))
            }
        }
    }
</script>

<style scoped>

</style>