<template>
  <div class="detail">
    <DetailNavBar  class="top-nav" @titleClick="titleClick" ref="nav"/>

    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="goodsImgLoad"/>
      <DetailParamInfo :paramInfo="paramInfo" ref="param"/>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"/>
      <GoodsList :goods="recommendInfo" ref="recommend"/>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    <DetailBottomBar @addCart="addCart"/>    
    <!-- <p class="prompt" ref="p">Submission of success</p> -->
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import DetailNavBar from './childComps/childNavBar'
import DetailSwiper from './childComps/childSwiper'
import BackTop from 'components/common/backTop/BackTop'
import DetailBaseInfo from './childComps/detailBaseInfo'
import DetailShopInfo from './childComps/detailShopInfo'
import DetailGoodsInfo from './childComps/detailGoodsInfo'
import DetailParamInfo from './childComps/detailParamInfo'
import DetailBottomBar from './childComps/detailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import DetailCommentInfo from './childComps/detailCommentInfo'

import {getDetail, Goods, Shop, Param, getRecommend} from 'network/detail'


export default {
  name: 'Detail',
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommendInfo: [],
      themeTopY: [],
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  methods: { 
    goodsImgLoad() {
			this.$refs.scroll.refresh();
				this.themeTopY = [];
				this.themeTopY.push(0);
				this.themeTopY.push(this.$refs.param.$el.offsetTop);
				this.themeTopY.push(this.$refs.comment.$el.offsetTop);
				this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
		},
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0)
    }, 
    contentScroll(position) {
      const positionY = -(position.y);
			let length = this.themeTopY.length;
			for(let i=0; i<length-1; i++){
				//if(this.currentIndex !== i && ((i <length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i]))) {
        if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {  
          this.currentIndex = i;
					this.$refs.nav.currentIndex = this.currentIndex;
				}
      }
      this.isShowBackTop = (-position.y) > 500;
    },
    //加入购物车
		addCart() {
			// 获取购物车需要展示的信息
			const product = {}
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.newPrice;
			product.iid = this.iid;
			//将商品添加到购物车里
      this.$store.commit('addCart', product);
		},
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,  
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop
  },
  props: {

  },
  created() {
    //保存传入的id
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //1.获取顶部banner
      this.topImages = data.itemInfo.topImages
      //2.获取商品详情
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取商家详情
      this.shop =new Shop(data.shopInfo)
      //4.获取商家详情图片
			this.detailInfo = data.detailInfo
			//5.获取参数信息
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
			if(data.rate.cRate !== 0){
				this.commentInfo = data.rate.list
			}
    })
    //请求推荐数据
		getRecommend().then(res => {
      this.recommendInfo = res.data.list
		})
  },
  // mounted() {
	// 	//请求数据列表后刷新
	// 	this.itemImgLister = ()=> {
  // 		this.$refs.scroll.refresh();
	// 	}
	// 	this.$bus.$on('itemImgLoad',this.itemImgLister);
	// },
  destroyed() {
		//取消全局的事件监听
		this.$bus.$off('itemImgLoad',this.itemImgLister)
	}
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.top-nav {
	background-color: #fff;
	position: relative;
	top: 0;
	left: 0;
	right: 0;
	z-index: 11;
}
.content {
	position: absolute;
	top: 44px;
	bottom: 49px;
	left: 0;
	right: 0;
}
/* .prompt{
  display: none;
  padding:20px;
  position: fixed;
  top: 40%; left:40%;
  border-radius:5px;
  background: rgba(0,0,0,0.4);
  z-index: 5000;
  color:#FFF;
} */
</style>
