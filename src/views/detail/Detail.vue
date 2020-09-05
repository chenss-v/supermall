<template>
  <div class="detail">
    <DetailNavBar />
    <DetailSwiper :topImages="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/childNavBar'
import DetailSwiper from './childComps/childSwiper'

import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  data(){
    return {
      iid: null,
      topImages: []
    }
  },
  methods: { 

  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  props: {

  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {

      this.topImages = res.result.itemInfo.topImages
    })
  },
}
</script>

<style scoped>

</style>
