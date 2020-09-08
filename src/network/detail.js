import {request} from './request'

//请求详情
export function getDetail(iid){
	return request({
		url:'/detail',
		params: {
			iid
		}
	})
}
//商品基本信息
export class Goods{
	constructor(itemInfo, columns, services) {
	this.title = itemInfo.title;
		this.desc = itemInfo.desc;
		this.newPrice = itemInfo.lowNowPrice;
		this.oldPrice = itemInfo.oldPrice;
		this.discount = itemInfo.discountDesc;
		this.columns = columns;
		this.services = services;
		this.realPrice = itemInfo.lowNowPrice;
	}
}

//商铺信息
export class Shop {
	constructor(shopInfo) {
		this.shopLogo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.score = shopInfo.score;
		this.cSells = shopInfo.cSells;
		this.cGoods = shopInfo.cGoods;
	}
}
//参数信息
export class Param {
	constructor(info, rule) {
		this.image = info.image ? info.image[0] : ''
		this.info = info.set;
		this.rule = rule.tables;
	}
} 
//请求推荐recommend
export function getRecommend(){
	return request({
		url:'/recommend'
	})
}
