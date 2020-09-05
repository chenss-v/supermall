<template>
  <div>
    <Navbar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar/Navbar'

export default {
  data(){
    return {  
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: { 
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  },
  components: {
    Navbar
  },
  props: {

  },
}
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.left img{
  width: 25px;
  height: 25px;
  margin-top: 10px;
}
</style>
