<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="" >
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <view class="top-title-text">预约监理</view>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		<view class="content">
			<view class="text-top">
				<view class="text">
					预约阶段：水电施工验收
				</view>
				<view class="text">
					预约日期：
				</view>
				<view class="text">
					<text class="text-left">支付远程费用：50元</text>   
					<navigator url="../pay/pay" >
						<text class="text-right">去支付 &gt;</text>
					</navigator>
					<view class="clear">
						
					</view>
				</view>
			</view>
			
			<view class="text4">
				温馨提示：为了合理分配装修监理，只能预约2天后的装修监理。具体上门时间点监理将致电您，与您确认。
			</view>
			<view class="text5">
				确定
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
	.clear{
		clear: both;
	}
	.text-top{
		margin: 80rpx;
	}
	.text5{
		width: 360rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		border: 2rpx solid #1AAD19;
		margin: 100rpx auto;
		border-radius: 10rpx;
		color: #1AAD19;
		font-size: 32rpx;
	}
	.text4{
		margin: 70rpx 50rpx;
	}
	.text{
		line-height: 100rpx;
	}
	.text-left{
		float: left;
	}
	.text-right{
		float: right;
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
