<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
				<text class="top-title-text">{{'装修视频'}}</text>
			</view>
		</view>

		<view style="height: 120rpx;"></view>
		
		
	    <!-- 瀑布流 -->
		<view class="content">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="videoClick(item.url)" >
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.thumb" :index="index"></u-lazy-load>
						<!-- #endif -->
						
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-tag">
							<image :src="item.head_pic" mode=""></image>
							<text>{{item.username}}</text>	
						</view>
						<view class="demo-price">
							<u-icon name="thumb-up"></u-icon>
							<text class="demo-tag-text">
								{{'&nbsp;'}}{{item.hits}}
							</text>
						</view>
						<view>
							{{'&emsp;'}}
						</view>
						<view>
							{{'&emsp;'}}
						</view>
						<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
						<u-icon name="play-circle" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="videoClick(item.url)">
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.thumb" :index="index"></u-lazy-load>
						<!-- #endif -->
						
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-tag">
							<image :src="item.head_pic" mode=""></image>
						<text>{{item.username}}</text>	
						</view>
						<view class="demo-price">
							<u-icon name="thumb-up"></u-icon>
							<text class="demo-price-text">
								{{'&nbsp;'}}{{item.hits}}
							</text>
						</view>
						<view>
							{{'&emsp;'}}
						</view>
						<view>
							{{'&emsp;'}}
						</view>
						<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
						<u-icon name="play-circle" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
			</u-waterfall>
			<view>
				<u-loading mode="circle" color="#18B566" :show="showDown" style="margin-left: 300rpx;" size="88"></u-loading>
			</view>
		</view>


		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				flowList: [],
				count:1,
				showDown:false,
				list: []
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			uni.startPullDownRefresh({
				success() {
					console.log('刷新加载数据')
				}
			})
			this.showDown = true
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		onShow() {
			uni.startPullDownRefresh({
				success() {
					console.log('进入页面的刷新掩饰加载数据')
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1000)
		},
		created() {
			let obj = {
				'page':1,
				'pagesize':10,
			}
			this.$http.Get('video/getlist',obj).then(res=>{
				console.log('接口获取数据',res.data.data)
				this.flowList = res.data.data
			})
		},
		methods: {
			
			//存入当前url
			videoClick(url){
				
				uni.setStorage({
					key:'videoUrl',
					data:url,
					success() {
						console.log('存入当前url及名字成功')
						uni.navigateTo({
							url:'video-detail'
						})
					}
				})
			},
			
			addRandomData() {
				this.count ++
				let obj = {
					'page':this.count,
					'pagesize':10,
				}
				let data = []
				this.$http.Get('video/getlist',obj).then(res=>{
					data = res.data.data
					for(let i = 0; i < data.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(data[i]))
						// 设计师的时候名字不能超过5个字
						if(item.username.length>7){
							item.username = item.username.substring(0,7)
						}
						item.id = this.$u.guid();
						this.flowList.push(item)
					}
					this.showDown = false
				})
				
			},
			remove(id) {
				console.log('这是播放的开关')
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>

<style scoped>
	.content{
		margin: 0 15rpx;
	}

	/* 头部 */
	.top-title {
		position: fixed;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}

	.top-title-text {
		position: absolute;
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
	.top-title-icon{
		position: absolute;
		left: 30rpx;
		top: 26rpx;
	}
	
	
	
	/* 瀑布流 */
	
	.demo-warter {
			border-radius: 8px;
			margin: 15rpx;
			background-color: #ffffff;
			position: relative;
			box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		}
		
		.u-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
		}
		
		.demo-image {
			width: 100%;
			border-radius: 4px;
		}
		
		.demo-title {
			font-size: 28rpx;
			line-height: 36rpx;
			font-weight: bold;
			margin: 0 20rpx;
			margin-top: 5px;
			color: $u-main-color;
		}
		
		.demo-tag text{
			font-size: 24rpx;
			line-height: 40rpx;
			color: #666666;
			position: absolute;
			left: 80rpx;
			bottom: 24rpx;
		}
		.demo-tag image{
			position: absolute;
			border-radius: 40rpx;
			left: 20rpx;
			bottom: 20rpx;
			width: 48rpx;
			height: 48rpx;
		}
		.demo-tag-owner {
		}
		
		.demo-price-text {
			color: #999999;
		}
		
		.demo-price {
			position: absolute;
			color: #999999;
			right: 20rpx;
			bottom: 28rpx;
		}
		
		.demo-shop {
		}

</style>
