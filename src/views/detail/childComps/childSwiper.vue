<template>
    <Swiper  class="swiper-item">
      <SwiperItem v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  data(){
    return {

    }
  },
  methods: { 

  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>
