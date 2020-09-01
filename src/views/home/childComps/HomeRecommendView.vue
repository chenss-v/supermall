<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  components: {
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: { 
  },
  methods: { 
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 80%;
    height: 75%;
    margin-bottom: 5px;
  }
</style>
