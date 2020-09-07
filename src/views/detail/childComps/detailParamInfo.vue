<template>
	<div v-if="Object.keys(paramInfo).length !== 0" class="params-wrap">
		<div v-for="(item, index) in paramInfo.rule" :key="index">
			<div v-for="(list, index) in item" :key="index" class="" >
				<div v-for="(listitem, index) in list" :key="index" class="rule-list-item">
					{{listitem}}
				</div>
			</div>
		</div>
		<div v-for="(info, index) in paramInfo.info" :key="index" class="flex info-list-wrap">
			<div class="info-list-tit">{{info.key}}</div>
			<div>{{info.value}}</div>
		</div>
	</div>
</template>
flex
<script>
	export default {
		name:'DetailParamInfo',
		props: {
			paramInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.params-wrap {
		border-top: 4px solid #ececec;
    border-bottom: 4px solid #ececec;
  }
  
	.rule-list-item {
		font-size: 12px;
		width: 20%;
		border-bottom: 1px solid #ececec;
    padding: 10px 4px;
    float: left;
	}
	.info-list-wrap {
		font-size: 14px;;
		border-bottom: 1px solid #ececec;
		padding: 10px 4px;
		line-height: 20px;
		.info-list-tit {
			width: 18%;
		}
	}
</style>