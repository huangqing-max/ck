<template>
	<view>
		<view>
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:''
			}
		},
		watch:{},
		computed:{},
		created(){},
		mounted(){},
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
					key:'indexUrl',
					success(res){
						console.log('index的详细地址',res.data)
						_this.url = res.data
					}
				})
			}
		}
		
	}
</script>

<style scoped>
</style>
