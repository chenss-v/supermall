<template>
  <div id="home" class="wrapper">
    <!-- 导航栏 -->
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <!-- 商品导航栏 -->
    <TabContorl class="tabcontorl-top" :titles="['流行', '精选', '新款']" @tabClick="tabClick" ref="tabContorl1" v-show="isTabShow"/>

    <Scroll class="scroll-content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMroe">
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <!-- 推荐栏 -->
      <HomeRecommendView :recommends="recommends"/>
      <!-- 本周流行 -->
      <HomeFeatrueView />
      <!-- 商品导航栏 -->
      <TabContorl :titles="['流行', '精选', '新款']" @tabClick="tabClick" ref="tabContorl2"/>
      <!-- 商品信息 -->
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <!-- 回到顶部 -->
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0,
      itemImgLister: null
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
      this.$refs.tabContorl1.currentIndex = index;
      this.$refs.tabContorl2.currentIndex = index;
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0)
    }, 
    //返回顶部是否显示
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 500;
			this.isTabShow = (-position.y) > this.tabOffsetTop;
    }, 
    //下拉加载更多
    loadMroe() {
      this.getGoodsData(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabContorl2.$el.offsetTop;
    },
    // 网络请求
    getHomeMultiData(){
      //请求多个数据（banner,类目）
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getGoodsData(type){
      //请求商品数据
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
  mounted() {
    // this.$bus.$on('itemImageLoad', () => {
    //   this.$refs.scroll.refresh()
    // })
    this.$bus.$on('itemImgLoad',this.itemImgLister)
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
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存Y值
		this.saveY = this.$refs.scroll.scroll.y
		//取消全局的事件监听
		this.$bus.$off('itemImgLoad',this.itemImgLister)
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
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .scroll-content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabcontorl-top{
    position: relative;
    z-index: 9;
  }
</style>