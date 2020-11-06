<template>
	<view>
		<view>
			<view class="top-search">
				<navigator url="../render" open-type="switchTab" hover-class="none">
				<u-icon class="backIcon" size="36" name="arrow-left"> </u-icon>
				</navigator>
				<input placeholder-style="line-height:64rpx" type="text" class="inputText" v-model="searchInput" placeholder="海量高清效果图任你搜" >
				<image class="searchIcon" src="../../../common/image/index/icon/md-search.png" @click="searchClick()" ></image>
				</input>
			</view>
			<view style="height: 88rpx;"></view>
			<view>
				<view class="wrap">
					<u-waterfall v-model="flowList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.filepath" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view  class="M10T">
									<u-icon name="thumb-up"  size="36"></u-icon>{{item.hits}}
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.filepath" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view class="M10T">
									<u-icon name="thumb-up"  size="36"></u-icon>{{item.hits}}
								</view>
							</view>
						</template>
					</u-waterfall>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				searchInput:'',
				flowList:[]
			}
		},
		watch:{},
		computed:{},
		created(){},
		mounted(){
			this.searchClick()
		},
		methods:{
			
			// 点击图片跳转详情页面
			urlClick(url){
				uni.setStorage({
					key:'3DimgUrl',
					data:url,
					success() {
						console.log('存入3D跳转路径成功')
						uni.navigateTo({
							url:'../webView'
						})
					}
				})
			},
			
			searchClick(){
				this.flowList = []
				this.$refs.uWaterfall.clear()
				let obj = {
					ekeyword:this.searchInput
				}
				if(this.searchInput.length==0){
					obj.ekeyword = '小户型'
				}
				this.$http.Get('xgt/search',obj).then(res=>{
					console.log('搜索数据',res.data)
					this.flowList = res.data.data
				})
			},
			
		},
		
	}
</script>

<style scoped>
	
	.demo-warter-left{
		margin: 10rpx 10rpx 10rpx 20rpx;
		border-radius: 10rpx;
		box-shadow:1px 1px 1px 1px rgba(0,0,0,0.05) ;
	}
	.demo-warter-right{
		margin: 10rpx 20rpx 10rpx 10rpx;
		border-radius: 10rpx;
		box-shadow:1px 1px 1px 1px rgba(0,0,0,0.05) ;
	}
	.M10{
		margin: 20rpx;
		
	}
	.M10T{
		margin: 20rpx;
		color: #999999;
	}
	
	/* 头部 */
	.top-search{
		position: fixed;
		height: 88rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1)
		
	}
	.inputText{
		margin: 14rpx 30rpx;
		margin-left: 100rpx;
		height: 60rpx;
		background-color: #F6F6F6;
		font-size: 24rpx;
		line-height: 60rpx;
		padding-left: 20rpx;
		border-radius: 40rpx;
	}
	.backIcon{
		position: absolute;
		top: 26rpx;
		left: 20rpx;
	}
	.searchIcon{
		position: absolute;
		height: 48rpx;
		width: 48rpx;
		right: 54rpx;
		top: 20rpx;
	}
</style>
