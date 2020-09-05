<template>
      <div class="goodsItem">
        <img :src="goodsItem.show.img" alt="" @load="imageLoad">
        <div class="goodsinfo">
          <p>{{goodsItem.title}}</p>
          <span class="price">￥{{goodsItem.price}}</span>
          <span class="cfav">{{goodsItem.cfav}}</span>
        </div>
      </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: { 
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    }
  },
  components: {

  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>
  .goodsItem{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goodsItem img{
    width: 100%;
    border-radius: 5px;
  }
  .goodsinfo{
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goodsinfo p{
    /* 溢出隐藏 */
    overflow: hidden;
    /* 多行文本溢出显示省略号 */
    text-overflow: ellipsis;
    /* 强行显示所有的文本不换行 */
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodsinfo .price{
    color: var(--color-hith-text);
    margin-right: 20px;
  }
  .goodsinfo .cfav{
    position: relative;
  }
  .goodsinfo .cfav::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.gif') 0 0/14px 14px;;
  }
</style>
