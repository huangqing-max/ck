<template>
	<view>
		<view>
			
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">我的招标</text>
				</view>
			</view>
			
			<view style="height: 100rpx;"></view>
			<!-- <view v-if="data.length==0" class="noData"> -->
			<view v-if="boxShow" class="noData">
				<image src="../../../../common/image/index/icon/my/nodata.jpg" mode=""></image>
			</view>
			<view v-if="data.length>0" class="">
				<view class="data" v-for="(item,index) in data" :key="index">
					<view  @click="biddingClick(item.contentid)" >
					<view class="data-text1">项目编号：{{item.contentid}}</view>
					<view class="data-text2">发布时间：{{item.inputtime}}</view>
					<view class="data-right">
						<text>{{item.status}}</text>
					</view>
					<view class="data-right2">
						<u-icon name="arrow-right"></u-icon>
					</view>
					<view class="backgrund"></view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:[],
				page:0,
				boxShow:false,
			}
		},
		watch:{},
		computed:{},
		created(){},
		onShow() {
			this.handleData()
		},
		mounted(){
			// this.handleData()
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods:{
			handleData(){
				++this.page
				let obj = {
					page:this.page
				}
				//我的招标列表
				let _this = this
				this.$http.MyGet('my_center/myorder',obj).then(res=>{
					console.log('我的招标列表',res.data)
					if(res.data.code==0){
						this.data = res.data.data
						if(this.data.length == 0){
							_this.boxShow = true
						}else{
							_this.boxShow = false
						}
					}else{
						_this.boxShow = true
					}
				})
			},
			
			// 点击列表跳转详情页面
			biddingClick(id){
				uni.setStorage({
					key:'myBiddingContentid',
					data:id,
					success() {
						console.log('存入contentid成功')
						uni.navigateTo({
							url:'bidding-detail'
						})
					},
					fail(err) {
						console.log('存入contentid出错',err)
					}
				})
			}
		},
		
	}
</script>

<style scoped>
	.noData{
		width: 100%;
		height: 736rpx;
	}
	.noData image{
		width: 100%;
		height: 100%;
	}
	.data{
		position: relative;
		margin-top: 30rpx;
	}
	.data-text1{
		color: #101010;
		font-size: 28rpx;
		margin: 12rpx 30rpx;
	}
	.data-text2{
		color: #666666;
		font-size: 24rpx;
		margin: 0 30rpx;
		margin-bottom: 26rpx;
	}
	.data-right{
		position: absolute;
		top:20rpx;
		right: 210rpx;
		color: rgba(238, 88, 88, 100);
		font-size: 28rpx;
	}
	.data-right2{
		position: absolute;
		top:20rpx;
		right: 30rpx;
		color: #101010;
	}
	
	.backgrund{
		height: 20rpx;
		width: 100%;
		background-color: #F7F7F8;
	}
	
	/* 头部 */
	.top-title{
		position: fixed;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	.top-title-icon{
		position: absolute;
		top: 28rpx;
		left: 30rpx;
	}
	.top-title-text{
		position: absolute;
		color: #101010;
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
