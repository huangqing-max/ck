<template>
	<view>
		<view>
			<view class="back">
				<navigator url="../../index" hover-class="none" open-type="switchTab">
					<u-icon class="backIcon" name="arrow-left"></u-icon>
					<text class="backName">智选公司</text>
				</navigator>
			</view>
			<web-view style="margin-top: 80rpx;" :src="'//m.zx123.cn/ads/dashuju_2020.php?laiyuan='+encodeURIComponent('app')"></web-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onShow() {
					 this.handleData()
			uni.startPullDownRefresh({
				success() {
					console.log('进入页面的刷新掩饰加载数据')
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},2000)
		},
		watch:{},
		computed:{},
		created(){},
		mounted(){},
		methods:{},
		
	}
</script>

<style scoped>
	.back{
		z-index: 9999;
		position: fixed;
		width: 100%;
		height: 80rpx;
		line-height: 88rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
		text-align: center;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05);
	}
	.backIcon{
		position: absolute;
		left: 30rpx;
		top: 30rpx;
	}
	
</style>
