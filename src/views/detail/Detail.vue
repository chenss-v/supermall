<template>
  <div class="detail">
    <DetailNavBar  class="top-nav"/>
    <Scroll class="content" ref="scroll" :probeType="3">
      <DetailSwiper :topImages="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="goodsImgLoad"/>
      <DetailParamInfo :paramInfo="paramInfo" ref="param"/>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"/>
      <GoodsList :goods="recommendInfo" ref="recommend"/>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/childNavBar'
import DetailSwiper from './childComps/childSwiper'
import DetailBaseInfo from './childComps/detailBaseInfo'
import DetailShopInfo from './childComps/detailShopInfo'
import DetailGoodsInfo from './childComps/detailGoodsInfo'
import DetailParamInfo from './childComps/detailParamInfo'
import DetailCommentInfo from './childComps/detailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

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
    }
  },
  methods: { 
    goodsImgLoad() {
				this.$refs.scroll.refresh();
				// this.themeTopY = [];
				// this.themeTopY.push(0);
				// this.themeTopY.push(this.$refs.param.$el.offsetTop);
				// this.themeTopY.push(this.$refs.comment.$el.offsetTop);
				// this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
				// this.themeTopY.push(Number.MAX_VALUE);
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
    GoodsList,
    Scroll,
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
</style>
