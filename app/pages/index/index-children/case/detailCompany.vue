
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
		created() {
			let that = this
			uni.getStorage({
				key:'caseDetailCompany',
				success(res) {
					console.log('公司外部网址已经获取',res.data)
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
