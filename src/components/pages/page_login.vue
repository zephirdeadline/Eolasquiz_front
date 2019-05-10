<template>
<div class="login">
    <form class="ui form" @submit.prevent>
        <div class="field">
            <label for="">Email</label>
            <input name="email" type="text" v-model="user.email"/>
        </div>
        <div class="field">
            <label for="">password</label>
            <input type="password" name="password" v-model="user.password"/>
        </div>
        <input class="ui button" type="submit" @click="loginfct" value="Login"> 
        <input class="ui button" @click="registerfct" type="submit" value="Register">
        <input class="ui button" @click="skipfct" type="submit" value="Skip">
    </form>
</div>
</template>



<script>

export default {
    name:'login',
    data () {
        return {
            user: { email: "", password: ""}
        }
    },
    computed: {
    },
    methods: {
        loginfct () {
            this.$http.post('auth/token/create/', { "email": this.user.email, "password": this.user.password })
            .then(
                Response => {
                    this.user.token = 'token ' + JSON.parse(Response.bodyText).auth_token;
                    this.$http.get('auth/users/me/', { headers: {Authorization: this.user.token}}).then( 
                        Response => { 
                            this.user = JSON.parse(Response.bodyText);
                            //delete this.user.password;
                            this.$store.dispatch('changeUser', this.user);
                            this.$router.push({name: "welcome"})
                        }, 
                        Response => Response
                    )
                }, 
                
                Response => Response
            )
        },

        registerfct () {
            this.$http.post('auth/users/create/',  { "email": this.user.email, "password": this.user.password }).then(
                response => this.loginfct(), response => response
            )
        },

        skipfct () {
            this.$router.push({name: "welcome"})
        }
    }
}
</script>

<style>
    .login
    {
        max-width: 500px;
        margin: auto
    }
</style>

