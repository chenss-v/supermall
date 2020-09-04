<template>
  <div class="backtop">
    <img src="~assets/img/common/back-top.png" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: { 
    backClick() {

    }
  },
  components: {

  },
  props: {

  },
}
</script>

<style scoped>
  .backtop{
    position: fixed;
    right: 10px;
    bottom: 50px;
  }
  .backtop img{
    width: 45px;
    height: 45px;
    border-radius: 100px;
  }
</style>
