<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  data(){
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: { 
  },
  methods: { 
    imgLoad(){
			if(!this.isLoad){
				this.$emit('swiperImgLoad')
				this.isLoad = true
			}
		}
  },
}
</script>

<style scoped>

</style>
