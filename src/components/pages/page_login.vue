<template>
<div class="login">
    <form class="ui form" @submit.prevent>
        <div class="field">
            <label for="">username</label>
            <input name="username" type="text" v-model="user.username"/>
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
            user: { username: "", password: ""}
        }
    },
    computed: {
    },
    methods: {
        loginfct () {
            this.$http.post('auth/token/create/', { "username": this.user.username, "password": this.user.password })
            .then(
                Response => {
                    this.user.token = 'token ' + JSON.parse(Response.bodyText).token;
                    this.$http.get('auth/users/me/', { headers: {Authorization: this.user.token}}).then( 
                        Response => { 
                            this.user.id = JSON.parse(Response.bodyText).id;
                            delete this.user.password;
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
            this.$http.post('auth/users/create/',  { "username": this.user.username, "password": this.user.password }).then(
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

