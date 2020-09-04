<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data(){
    return {
      scroll: null
    }
  },
  methods: { 
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
			this.scroll && this.scroll.finishPullUp()
		},
  },
  components: {

  },
  props: {
    probeType: {
			type: Number,
			default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      scrollY: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动的位置
		if(this.probeType === 2 || this.probeType === 3){
			this.scroll.on('scroll',position => {
				this.$emit('scroll',position)
			})
    }
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>
