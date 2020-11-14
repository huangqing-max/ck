<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../set" hover-class="none">
					<u-icon  :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">修改手机号码</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		created() {
			
		},
		methods:{
			
		}
		
	}
</script>

<style scoped>
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
