
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">{{'装修问答'}}</text>
				<image  class="top-search-icon" @click="show=true" src="../../../../common/image/index/icon/md-search.png" mode=""></image>
			</view>
			
			<view class="tab-title2">
				<v-tabs :tabs="answerData" v-model="current" fontSize="24rpx" field="catname"    :bold="false" 
				   activeColor="#101010" color="#101010" @change="changeTab"  >	
				</v-tabs>
			</view>
		</view>
		
		<!-- 搜索弹出层 -->
		<u-popup height="200" v-model="show" z-index="1066" mode="top">
			<view>
				<u-input v-model="inputValue" class="popup-input" placeholder-style="line-height:60rpx;color: rgba(153, 153, 153, 100);font-size: 24rpx;" type="text"  placeholder="靠谱公司有哪些？" />
				<image src="../../../../common/image/index/icon/md-search.png" class="top-search-icon"  @click="searchClick()"></image>
			</view>
			<view class="popup-text">
				{{'热门搜索：'}}
				<text @click="textClick(item,index)" class="popup-span" v-for="(item,index) in searchData" :key="index">
				{{item.name}}
				</text>
			</view>
		</u-popup>
		
		<view style="height: 200rpx;"></view>
		
		
		<view >
			<view  v-for="(item,index) in childrenData" :key="index">
				<view class="info-imgs" @click="answerClick(item)" >
					<view class="info-imgs-text">{{item.title}}</view>
					<view class="info-imgs-title">
						<view class="info-imgs-icon">
							<text class="info-text-left">{{item.catname}}</text>
							<text class="info-text-center">{{item.answercount}}个回答</text>
							<view class="info-text-right">
								<text >{{item.addtime}}</text>
							</view>
						</view>
					</view>
					
				</view>
				<view style="height: 16rpx;background-color: #F7F7F8;"></view>
			</view>
			<view style="text-align: center;">
				<u-loading mode="circle" color="#18B566" :show="showDown"  size="88"></u-loading>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				current:0,
				show:false,
				showDown:false,
				inputValue:'',
				answerData:[],
				childrenData:[],
				catid:'',
				page:0,
				searchData:[
					{name:'省钱装修'},
					{name:'如何选择装修公司'},
					{name:'装修风格'},
				],
			}
		},
		computed:{
			
		},
		watch:{
			catid(value){
				console.log('监听的值',value)
				this.handleData()
			}
		},
		created() {
			this.$http.Get('ask/getTopCategory').then(res=>{
				console.log('获取问答分类',res.data)
				this.answerData = res.data.data
				this.catid = res.data.data[0].catid
			})
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},500)
		},
		onReachBottom() {
			this.showDown = true
			let _this = this
			setTimeout(function(){
				_this.handleData()
			},1500)
		},
		mounted() {
			
		},
		onShow() {
			let _this = this
			_this.current = 0
			
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		onPullDownRefresh() {
			this.handleData()
			// setTimeout(function(){
			// 	uni.stopPullDownRefresh()
			// },1000)
		},
		methods: {
			
			//存入当前url
			answerClick(item){
				let data  = {
					url:item.url,
				}
				uni.setStorage({
					key:'answerUrl',
					data:data,
					success() {
						console.log('存入当前url及名字成功')
						uni.navigateTo({
							url:'answers-detail'
						})
					}
				})
			},
			
			//搜索数据的获取
			searchClick(){
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				let data = {}
				if(!this.inputValue){
					this.show = false
					return
				}
				data.kw = this.inputValue
				this.$http.Get('ask/getListBySearch',data).then(res=>{
					console.log('搜索获取结果列表',res.data)
					this.childrenData = res.data.data
					this.show = false
				})
				setTimeout(function(){
					uni.stopPullDownRefresh()
				},500)
			},
			
			
			// 获取数据
			handleData(){
				++this.page
				let obj = {
					page:this.page,
					pageSize:10
				}
				obj.catid = this.catid
				
				this.$http.Get('ask/getListByCatid',obj).then(res=>{
					console.log('通过分类id获取相应问答列表',res.data)
					let data = res.data.data
					if(this.page==1||this.page==0){
						this.childrenData = data
					}
					if(this.page>1){
						this.childrenData = this.childrenData.concat(data)
					}
					this.showDown = false
					setTimeout(function(){
						uni.stopPullDownRefresh()
					},500)
				})
				
			},
			
			//tab标签点击
			changeTab(index) {
				console.log(index)
				this.current = index
				this.childrenData = []
				this.page = 0
				this.catid = this.answerData[index].catid
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
			},
			
			tabClick(index){
				this.current = index
			},
			
			// 选中搜索项
			textClick(e,i){
				console.log(e,i)
				this.show = false
				this.inputValue = e.name
				this.childrenData = []
				this.page = 0
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				this.searchClick()
				
			}
		}
	}
</script>

<style scoped>
	
	/* 标题 */
	.tabTitlePrent{
		position: relative;
		height: 60rpx;
	}
	.tabTitlechild{
		position: absolute;
		
	}
		
	
	.tabActive{
		width: 160rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 40rpx;
		background-color: rgba(247, 247, 248, 1);
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, 0);
	}
	
	.popup-input{
		padding: 0rpx!important;
		padding-left: 30rpx!important;
		width: 640rpx;
		margin-top: 14rpx;
		margin-left: 100rpx;
		line-height: 70rpx;
		border-radius: 40rpx;
		background-color: #F7F7F8;
		font-size: 24rpx;
		color: rgba(153, 153, 153, 100);
	}
	.popup-input text{
		line-height: 60rpx;
	}
	
	.popup-text{
		margin-top: 40rpx;
		margin-left: 30rpx;
		font-size: 24rpx;
		color: rgba(102, 102, 102, 100);
	}
	.popup-span{
		margin-right: 50rpx;
		
	}
	
	/* 图片 */
	.info-imgs {
		width: 100%;
		/* height: 190rpx; */
		/* position: relative; */
		background-color: #FFFFFF;
		margin: 10rpx 0;
	}
	
	.info-img {
		/* position: absolute; */
		width: 220rpx;
		height: 150rpx;
		right: 20rpx;
		top: 20rpx;
	}
	
	.info-imgs-text {
		width: 690rpx;
		margin: 0 30rpx;
		margin-top: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-weight: bold;
		font-size: 32rpx;
		line-height: 45rpx;
	}
	
	.info-text-left{
		color: rgba(161, 189, 230, 100);
		margin-right: 50rpx;
	}
	
	.info-text-center{
		font-size: 24rpx;
		color: rgba(102, 102, 102, 100);
	}
	
	.info-text-right{
		position: absolute;	
		color: rgba(102, 102, 102, 100);
		right: 20rpx;
		bottom: 0rpx;
	}
	
	.info-imgs-title {
		padding: 30rpx;
		margin-bottom: 4rpx;
		
	}
	
	.info-imgs-icon {
		position: relative;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	
	/* 头部 */
	.top{
		 position: fixed;
		 z-index: 88;
		 background-color: #FFFFFF;
		 box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	
	.top-title{
		position: fixed;
		height: 80rpx;
		width: 100%;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05);
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
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
	
	.top-search-icon{
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		right: 64rpx;
		top: 26rpx;
	}
	
	.tab-title{
		width: 690rpx;
		margin: 10rpx 30rpx;
		margin-top: 88rpx;
	}
	.tab-title2{
		width: 690rpx;
		margin: 24rpx 30rpx;
		margin-top: 104rpx;
	}
	
</style>
