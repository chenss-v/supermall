<template>
  <div id="home">
    <!-- 导航栏 -->
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <!-- 轮播图 -->
    <HomeSwiper :banners="banners"/>
    <!-- 推荐栏 -->
    <HomeRecommendView :recommends="recommends"/>
    <!-- 本周流行 -->
    <HomeFeatrueView />
    
    <TabContorl class="tabcontorl" :titles="['流行', '精选', '新款']" @tabClick="tabClick"/>

    <GoodsList :goods="showGoods"/>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar/Navbar'
import TabContorl from 'components/common/tabContorl/TabContorl'
import GoodsList from 'components/content/goods/GoodsList'

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
      currentType: 'pop'
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
    GoodsList
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
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .tabcontorl{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>