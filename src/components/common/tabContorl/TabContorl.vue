<template>
  <div class="tabcontorl">
    <div v-for="(item, index) in titles" :key="index" class="tabcontorl-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: { 
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
  components: {

  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }  
  },
}
</script>

<style scoped>
  .tabcontorl{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
  }
  .tabcontorl-item{
    flex: 1;
  }
  .tabcontorl-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
