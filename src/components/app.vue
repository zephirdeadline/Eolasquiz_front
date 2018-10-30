
<template>  
    <div>
        <div class="ui secondary pointing menu" >
            <router-link to="/" class="item" exact>
                Home
            </router-link>
            <router-link :to="{ name: 'admin'}" class="item" exact v-if="$store.getters.getUser.token !== undefined">
                Admin
            </router-link>
           
            <div class="right menu" >
                <a class="ui item" @click="logout" >
                <span v-if="$store.getters.getUser.token !== undefined">Logout</span>
                <span v-else>Login</span> 
                </a>
            </div>
        </div>
        <div class="ui segment">
            <router-view></router-view>
        </div>

    </div>
    
</template>


<script>
export default { 
  store: require('../store').default,

  methods: {
      logout(){
          window.localStorage.clear()
          this.$router.push('/')
      }
  }
  
  }
</script>

