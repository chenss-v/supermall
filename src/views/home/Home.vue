<template>
  <div id="home">
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <div>首页</div>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar/Navbar'
import {getHomeMultiData} from "network/home"

export default {
  data () {
    return {
      banners: [],
      recommends: [],
    }
  },
  created() {
    getHomeMultiData().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },components: {
    Navbar
  },
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>