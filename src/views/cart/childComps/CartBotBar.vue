<template>
	<div class="cart-bot-bar flex">
		<div><input type="checkbox" class="check" id="check" @checkBtnClick="checkBtnClick" v-model="isSelectAll">&ensp;<label for="check">全选</label></div>
		<div>合计：{{totalPrice}}</div>
		<div class="red">去结算{{checkLength}}</div>
	</div>
</template>

<script>
export default {
	name: 'CartBotBar',
	computed: {
		totalPrice() {
			return '￥' + this.$store.state.cartList.filter(item => {
				return item.checked
			}).reduce((preValue, item) => {
				return preValue+ item.price * item.count
			},0).toFixed(2)
		},
		checkLength() {
			return '(' + this.$store.state.cartList.filter(item => item.checked).length + ')';
		},
		isSelectAll() {
      return this.$store.state.cartList.find(item => item.checked === false) === undefined
    }	
	},
	methods: {
		checkBtnClick() {
			// 判断是否有未选中的按钮
			// let isSelectedAll = this.$store.state.cartList.find(item => !item.checked)
			if(this.isSelectedAll) {
				this.cartList.forEach(item => item.checked = true)
			} 
			else {
				this.cartList.forEach(item => item.checked = true)
			}
    }
	},
}
</script>

<style lang="less" scoped="scoped">
	.cart-bot-bar {
		display: flex;
		position: fixed;
		bottom: 49px;
		left:0;
		right: 0;
		height: 40px;
		padding: 5 20px;	
		font-size: 15px;
		align-items: center;
		justify-content: space-between;
		background-color: #eee;
		border-bottom: 1px solid #ececec;
		border-top: 1px solid #ececec;
		.check {
			margin-left: 10px;
			width: 18px;
			height: 18px;
			overflow: hidden;
			border-radius: 100%;
			vertical-align: bottom;
			border: 1px solid #ececec;
		}
		.check:checked {
			border: 1px solid var(--color-high-text);
			// background: url(~assets/images/detail/check_active.png) no-repeat center;
			background-size: cover;
		}
		
		.red{
			background-color: red;
			height: 40px;
			line-height: 40px;
			color: #fff;
			width: 100px;
			text-align: center;
		}
	}
</style>