<template>
	<div class="cart-wrap">
		<!-- 导航 -->
		<nav-bar class="cart-nav">
			<div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.png" alt="">
      </div>
			<div slot="center">购物车({{num}})</div>
		</nav-bar>
		<cart-list></cart-list>
		<cart-bot-bar></cart-bot-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/Navbar/Navbar.vue'
	import CartList from './childComps//CartList'
	import CartBotBar from './childComps/CartBotBar'
	export default {
		name: 'Cart',
		components: {
			NavBar,
			CartList,
			CartBotBar
		},
		methods: {
			backClick() {
      this.$router.back()
    }
		},
		computed: {
			num() {
				return this.$store.state.cartList.length;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.cart-nav {
		color: #fff;
		background-color: var(--color-high-text);
		position: fixed;
		top:0;
		left:0;
		right: 0;
		// z-index: 1;
	}
	.left img{
  width: 25px;
  height: 25px;
  margin-top: 10px;
}
</style>