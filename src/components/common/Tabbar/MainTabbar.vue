<template>
  <Tabbar>
      <TabbarItem path="/home" activeColor="red">
        <img slot="item-icon" src="~assets/img/Tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/Tabbar/home-active.png" alt="">
        <div slot="item-text">首页</div>
      </TabbarItem>
      <TabbarItem path="/sort" activeColor="red">
        <img slot="item-icon" src="~assets/img/Tabbar/sort.png" alt="">
        <img slot="item-icon-active" src="~assets/img/Tabbar/sort-active.png" alt="">
        <div slot="item-text">分类</div>
      </TabbarItem>
      <TabbarItem path="/cart" activeColor="red">
        <img slot="item-icon" src="~assets/img/Tabbar/cart.png" alt="">
        <img slot="item-icon-active" src="~assets/img/Tabbar/cart-active.png" alt="">
        <div slot="item-text">购物车</div>
      </TabbarItem>
      <TabbarItem path="/user" activeColor="red">
        <img slot="item-icon" src="~assets/img/Tabbar/user.png" alt="">
        <img slot="item-icon-active" src="~assets/img/Tabbar/user-active.png" alt="">
        <div slot="item-text">我的</div>
      </TabbarItem>
    </Tabbar>
</template>

<script>
import Tabbar from './Tabbar'
import TabbarItem from './TabbarItem'

export default {
  name: 'MainTabbar',
  data() {
    return {
      
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>