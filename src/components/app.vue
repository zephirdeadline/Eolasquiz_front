
<template>  
    <div>
        <div class="ui secondary pointing menu" >
            <router-link :to="{ name: 'welcome'}" class="item" exact>
                Home
            </router-link>
            <router-link :to="{ name: 'admin'}" class="item" exact>
                Admin
            </router-link>
           
            <div class="right menu">
                <a class="ui item">
                Logout
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
}
</script>
