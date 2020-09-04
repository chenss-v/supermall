<template>
  <div class="backtop">
    <img src="~assets/img/common/back-top.jpg" alt="">
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
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
</style>
