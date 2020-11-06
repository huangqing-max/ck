<template>
	<view>
		<view>
			
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon  :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">我的消息</text>
				</view>
			</view>
			
			<view style="height: 100rpx;"></view>
			<view v-if="infoData.length==0" class="noData">
				<image src="../../../../common/image/index/icon/my/nodata.jpg" mode=""></image>
			</view>
			<view v-if="infoData.length>0" v-for="(item,index) in infoData" :key="index" >
				<view class="data">
					<view class="image">
						<image  src="../../../../common/image/index/icon/my/md-notifications_active.png" mode=""></image>
					</view>
					<view class="data-text1">
						{{item.subject}}
					</view>
					<view class="data-text2">{{item.message_time}}</view>
					<view class="data-text3">{{item.content}}</view>
					</view>
				<view class="backgrund"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				infoData:[]
			}
		},
		watch:{},
		onShow() {
			this.handleData()
		},
		computed:{},
		created(){},
		mounted(){},
		methods:{
			handleData(){
				let obj = {
					page:1
				}
				
				this.$http.MyGet('my_center/myMessage',obj).then(res=>{
					console.log('搜索数据',res.data)
					this.infoData = res.data.data
				})
			},
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
		height: 150rpx;
	}
	.data-text1{
		position: absolute;
		top: 20rpx;
		left:150rpx;
		color: #101010;
		font-size: 28rpx;
		color: #101010;
	}
	.data-text2{
		position: absolute;
		top: 20rpx;
		right: 30rpx;
		color: #666666;
	}
	.data-text3{
		position: absolute;
		top: 80rpx;
		left: 150rpx;
		color: #666666;
	}
	.image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		position: absolute;
		top: 20rpx;
		left: 30rpx;
		background-color:#FF674A;
		text-align: center;
	}
	.image image{
		margin-top: 26rpx;
		width: 48rpx;
		height: 48rpx;
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
		font-size: 28rpx;
		line-height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
