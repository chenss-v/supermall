<template>
  <div id="home" class="wrapper">
    <!-- 导航栏 -->
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>

    <Scroll class="scroll-content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMroe">
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners"/>
      <!-- 推荐栏 -->
      <HomeRecommendView :recommends="recommends"/>
      <!-- 本周流行 -->
      <HomeFeatrueView />

      <TabContorl class="tabcontorl" :titles="['流行', '精选', '新款']" @tabClick="tabClick"/>

      <GoodsList :goods="showGoods"/>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar/Navbar'
import Scroll from 'components/common/scroll/Scroll'
import TabContorl from 'components/common/tabContorl/TabContorl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/common/backTop/BackTop'


import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatrueView from './childComps/HomeFeatrueView'

import { getHomeMultiData, getGoodsData } from "network/home"

export default {
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
				'pop': {page: 0, list:[]},
				'new': {page: 0, list:[]},
				'sell': {page: 0, list:[]},
      },
      currentType: 'pop',
      isShowBackTop: false
      // tabOffsetTop: 0,
			// isTabShow: false,
    }
  },
  methods: {
    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break;
        case 1: 
          this.currentType = 'new'
          break;
        case 2: 
          this.currentType = 'sell'
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0)
    }, 
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 500;
			// this.isTabShow = (-position.y) > this.tabOffsetTop;
    }, 
    loadMroe() {
      this.getGoodsData(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    // 网络请求
    getHomeMultiData(){
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getGoodsData(type){
      const page = this.goods[type].page + 1
      getGoodsData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  created() {
    this.getHomeMultiData()
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')
  },
  components: {
    Navbar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatrueView,
    TabContorl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tabcontorl{
    position: relative;
    /* top: 44px; */
    z-index: 9;
  }
  .scroll-content{
    /* overflow: hidden; */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>