
<template>
	<view>
		
		<web-view  :webview-styles="webviewStyles"  :src="url">
		</web-view>
	</view>
</template>

<script>
	var wv;//计划创建的webview
	export default {
		components:{},
		data() {
			return {
				list: [ {
					text: '分享'
				}, {
					text: '评论' 
				}],
				show: true,
				webviewStyles: {
					progress: {
						color: '#FF3333',
					}
				},
				url:'',
				companyname:''
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
					key:'companyUrl',
					success(res){
						console.log('公司的详细地址',res.data)
						_this.url = res.data.url
						_this.companyname = res.data.companyname
						
					}
				})
			}
		}
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
