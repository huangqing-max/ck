<template>
	<view>
	

		<web-view  :webview-styles="webviewStyles" src="//m.zx123.cn/zxt/sheji.html?utm_source=app"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				webviewStyles: {
					progress: {
						color: '#FF3333',
					}
				},
			}
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
			},2000)
		},
		
	}
</script>

<style scoped>
	

</style>
