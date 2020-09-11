<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: { 

  },
  components: {

  },
  props: {
    message: {
      type: String,
      default: ''  
    },
    show: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
