<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../my" open-type="switchTab">
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">用户信息</text>
			</view>
		</view>
		<view class="center">
			<view >
				<view class="text">
					<view class="left1">
						<view class="left-left">
							姓名
						</view>
						<view class="left-right">
							{{info.name}}
						</view>
						<view class="clear">
							
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				<view class="text">
					<view class="left1">
						<view class="left-left">
							身份证
						</view>
						<view class="left-right">
							{{info.sid}}
						</view>
						<view class="clear">
							
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				<view class="text">
					<view class="left2">
						<view class="left-left">
							图片
						</view>
						<view class="left-img">
							<view class="img">
								<image :src="info.sid_1" mode=""></image>
							</view>
							<view class="img">
								<image :src="info.sid_2" mode=""></image>
							</view>
						</view>
						<view class="clear">
							
						</view>
					</view>
					
				</view>
				<view class="text">
					<view class="left1">
						<view class="left-left">
							状态
						</view>
						<view class="left-right">
							{{info.status_chn}}
						</view>
						<view class="clear">
							
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				
				
			</view>
			<view class="down" v-if="info.status!=1">
				<navigator  url="userinfo" hover-class="none">
					<view class="button">
						继续完善信息
					</view>
				</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:{},
			}
		},
		created() {
			
		},
		onShow() {
			this.handleData()
		},
		methods:{
			handleData(){
				this.$http.MyGet('my_center/getUserDataStatus').then(res=>{
					console.log('个人中心信息',res.data)
					
					if(res.data.code==0){
						this.info = res.data.data
					}
				})
			},
		}
		
	}
</script>

<style scoped>
	.down{
		position: fixed;
		bottom: 200rpx;
	}
	.button{
		width: 400rpx;
		height: 80rpx;
		margin: 0 175rpx;
		border-radius: 10rpx;
		text-align: center;
		color: #fff;
		font-size: 32rpx;
		line-height: 80rpx;
		background-color: rgba(255, 103, 74, 100);
	}
	.left-img{
		display: flex;
	}
	.img{
		width: 240rpx;
		height: 140rpx;
		margin: 10rpx 50rpx 0 30rpx;
	}
	.img image{
		width: 100%;
		height: 100%;
	}
	.text{
		display: flex;
	}
	.left1{
		height: 100rpx;
		width: 680rpx;
		    margin-top: 4rpx;
	}
	.left2{
		height: 220rpx;
		width: 680rpx;
	}
	.clear{
		clear: both;
	}
	.left-right{
		float: right;
		font-size: 24rpx;
		margin-right: 30rpx;
		color: #999;
	}
	.left-left{
		margin-left: 30rpx;
		height: 40rpx;
		font-size: 28rpx;
		float: left;
		color: #101010;
	}
	.right{
		width: 70rpx;
	}
	.left{
		width: 680rpx;
	}
	.center{
		width: 100%;
		padding-top: 160rpx;
		display: flex;
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
		color: #101010;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
