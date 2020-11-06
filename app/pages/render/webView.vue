
<template>
	<view>
		
		<web-view  :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				url:''
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
		
		created() {
			let that = this
			uni.getStorage({
				key:'3DimgUrl',
				success(res) {
					console.log(res.data)
					that.url = res.data
				}
			})
		},
		methods: {
		}
	}
</script>

<style scoped>

</style>
