<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    
    <MainTabbar />   
  </div>
</template>

<script>
  import MainTabbar from 'components/common/Tabbar/MainTabbar'
  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
 @import "assets/css/base.css";
</style>
