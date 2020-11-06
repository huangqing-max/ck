
<template>
	<view>
		
		<web-view    :webview-styles="webviewStyles"  :src="url">
		</web-view>
	</view>
</template>

<script>
	var wv;//计划创建的webview
	export default {
		components:{},
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333',
					}
				},
				url:'',
				answer:''
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
			
		},
		methods: {
			handleData(){
				let _this = this
				uni.getStorage({
					key:'answerUrl',
					success(res){
						console.log('公司的详细地址',res.data)
						_this.url = res.data.url
						
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>
