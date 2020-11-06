
<template>
	<view>
		<view>
			
			<web-view :src="url"></web-view>
		</view>
		
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
		created() {
			let that = this
			uni.getStorage({
				key:'learnDetail',
				success(res) {
					console.log('日记外部网址已经获取',res.data)
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
