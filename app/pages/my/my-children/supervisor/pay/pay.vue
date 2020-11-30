<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../appointment/appointment" hover-class="none">
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <view class="top-title-text">支付</view>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		<view class="content">
			<view class="text1">
				远程费用
			</view>
			<view class="text2">
				50元
			</view>
			<view class="text3">
				确认支付
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		width: 690rpx;
		margin: 80rpx auto;
	}
	.text1{
		font-size: 28rpx;
	}
	.text2{
		font-size: 72rpx;
		text-align: center;
		height: 500rpx;
		line-height: 500rpx;
	}
	.text3{
		width: 670rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 0 auto;
		text-align: center;
		background-color: #2F61F4;
		border-radius: 10rpx;
		font-size: 36rpx;
		color: #fff;
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
		text-align: center;
		color: #101010;
		font-size: 28rpx;
		line-height: 80rpx;
	}
</style>
