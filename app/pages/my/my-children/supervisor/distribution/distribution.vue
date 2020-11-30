<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="" >
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <view class="top-title-text">分配监理</view>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		
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
