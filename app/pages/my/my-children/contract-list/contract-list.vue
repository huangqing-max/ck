<template>
	<view>
		<view>
			
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">合同列表</text>
				</view>
			</view>
			
			<view style="height: 100rpx;"></view>
			<view v-if="data.length==0" class="noData">
				<image src="../../../../common/image/index/icon/my/nodata.jpg" mode=""></image>
			</view>
			<view v-if="data.length>0">
				<!-- <view class="noText">
					暂无资料
				</view> -->
					<view class="data" v-for="(item,index) in data" :key="index">
						<view  @click="biddingClick(item.id)" >
						<view class="data-text1">项目编号：{{item.id}}</view>
						<view class="data-text2">发布时间：{{item.inputtime}}</view>
						<view class="data-right">
							<text>{{item.status_text}}</text>
						</view>
						<view class="data-right2">
							<u-icon :bold="true" name="arrow-right"></u-icon>
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
			}
		},
		watch:{},
		computed:{},
		created(){},
		mounted(){},
		onShow() {
			this.handleData()
		},
		methods:{
			
			handleData(){
				
				// this.$http.MyGet('my_center/getUserInfo').then(res=>{
				// 	console.log('个人中心首页获取是否已经完善了身份证信息',res.data)
				// 	if(res.data.data.isperfect!=1){
				// 		uni.navigateTo({
				// 			url:'../userinfo/userinfo'
				// 		})
				// 	}
				// })
				
				this.$http.MyGet('my_center/contractList').then(res=>{
					console.log('合同列表',res.data)
					this.data = res.data.data
				})
			},
			
			// 点击列表跳转详情页面
			biddingClick(id){
				uni.setStorage({
					key:'contractListContentid',
					data:id,
					success() {
						console.log('存入contractListContentid成功')
						uni.navigateTo({
							url:'list-detail'
						})
					},
					fail(err) {
						console.log('存入contractListContentid出错',err)
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
	.data{
		position: relative;
		padding-top: 10rpx;
	}
	.data-text1{
		color: #101010;
		font-size: 28rpx;
		margin: 14rpx 30rpx;
	}
	.data-text2{
		color: #666666;
		font-size: 24rpx;
		margin: 0 30rpx;
		margin-bottom: 26rpx;
	}
	.data-right{
		position: absolute;
		top:44rpx;
		left: 60%;
	}
	.data-right2{
		position: absolute;
		top:46rpx;
		right: 30rpx;
		color: #101010;
	}
	.data-right text{
		color: #EE5858;
	}
	.backgrund{
		height: 6rpx;
		width: 100%;
		background-color: #F7F7F8;
	}
	

	
	.content{
		height: 160rpx;
		position: relative;
	}
	.text{
		position: absolute;
		top: 60rpx;
		left: 30rpx;
		font-size: 28rpx;
		color: #101010;
	}
	.image image{
		position: absolute;
		top: 40rpx;
		right: 30rpx;
		width: 140rpx;
		height: 80rpx;
	}
		
	
	
	.noText{
		text-align: center;
		color: #999999;
		margin: 30rpx;
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
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 316rpx;
	}
</style>
