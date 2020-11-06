
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">{{navTitle}}</text>
			</view>
			
			<view class="center">
				<view class="center-title">
					<u-row>
						<u-col span="6" v-for="(item,index) in titleData" :key="index" >
							<view :class="{titleActive:index==isActive,centerTitleView:true}" >
							<text @click="titleClick(item,index)">{{titleShowChildData[index]||item.title}}{{'&nbsp;&nbsp;'}}</text>
							
							<u-icon name="arrow-down" v-if="index!=isActive"  ></u-icon>
							<u-icon name="arrow-up" v-if="index==isActive"  ></u-icon>
							</view>
						</u-col>
					</u-row>
				
				</view>
				<!-- <view  class="child-title" v-if="isActive!=-1">
					<u-row>
						<u-col span="3" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item,index)"	>{{item.name}}</view>
						</u-col>
					</u-row>
				</view> -->
			</view>
		</view>
		
		<view style="height: 150rpx;"></view>
		
		<view>
			<u-popup z-index="66" v-model="popupShow" mode="top">
				<view style="height: 180rpx;"></view>
				<view  class="child-title" v-if="isActive!=-1">
					<u-row>
						<u-col v-if="isActive==0" span="6" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item,index)"	>{{item.name}}</view>
						</u-col>
						<u-col v-if="isActive==1" :span="item.name.length<7?'3':'6'" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item,index)"	>{{item.name}}</view>
						</u-col>
					</u-row>
				</view>
			</u-popup>
		</view>
		
		
		<view class="img-bottom">
			<view class="img-box" v-for="(item,index) in loaclData" :key="index">
				<view @click="handleTo(item.dirname)" >
				<view class="img-box-up">
					<image :src="item.thumb" mode=""></image>
				</view>
				<view class="img-box-center">
					<text>{{item.title}}</text>
				</view>
				<view class="img-box-down-two">
					<u-icon name="eye" size="28"></u-icon>
					{{'&nbsp;'}}{{item.hits}}
				</view>
				<view class="img-box-down">
					<u-icon name="map-fill" size="28"></u-icon>
					<text>{{'&nbsp;'}}{{item.address}}</text>
				</view>
				</view>
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
				titleData:[
					{title:'综合排序',data:[
						{sort:1,name:'浏览数升序'},
						{sort:2,name:'浏览数降序'},
					]},
					{title:'区域划分',data:[]},
				],
				titleShowChildData:[],
				navTitle:'',
				showDown:false,
				popupShow:false,
				childrenTitleList:[],
				loaclData:[],
				cityPosition:'',
				isChildActive:-1,
				isActive:-1,
				area:'',
				sort:0,
				dir:'',//城市目录
				areaid:'',
				page:0,
			}
		},
		watch:{
			popupShow(value){
				if(!value){
					this.isActive = -1
				}
			}
		},
		onShow() {
			this.cityPosition = getApp().globalData.city
			this.dir = getApp().globalData.dir
			this.areaid = getApp().globalData.areaid
			uni.startPullDownRefresh({
				success() {
					console.log('进入页面的刷新掩饰加载数据')
				}
			})
		},
		
		onPullDownRefresh() {
			this.handleData()
		},
		onReachBottom() {
			this.showDown = true
			let _this = this
			
		},
		created() {
			let _this = this
			
			uni.getStorage({
				key:'dirAndAreaid',
				success(res){
					console.log('存储的地理位置信息在本地小区页面取出',res.data.areaname)
					console.log('存储的地理位置信息在本地小区页出',_this.dir)
					console.log('存储的地理位置信息面取出',res.data.dir)
					_this.dir =res.data.dir
					_this.areaid =res.data.areaid
					// _this.navTitle = res.data.dir + '小区'
					let obj = {}
					obj.dir = res.data.dir
					obj.areaid = res.data.areaid
					_this.$http.Get('area/getChildByAreaid',obj).then(res=>{
						console.log('本地区域',res.data)
						_this.titleData[1].data = res.data.data	
						
					})
				}
			})
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		mounted() {
			this.handleData()
		},
		methods: {
			
			//存入当前点击项目
			handleTo(dirname){
				uni.setStorage({
					key:'villageDirname',
					data:dirname,
					success() {
						console.log('存入当前点击项目dirname成功')
						uni.navigateTo({
							url:'village'
						})
					}
				})
			},
			
			handleData(){
				++this.page
				let obj = {
					page:this.page,
					pagesize:10
				}
				obj.dir = this.dir
				obj.areaid = this.area
				obj.sort = this.sort
				this.$http.Get('village/getListPage',obj).then(res=>{
					console.log("加搜索条件的小区",res.data)
					this.navTitle = res.data.nav_title
					let data = res.data.data
					
					if(this.page!=1){
						this.loaclData = this.loaclData.concat(data)
					}else{
						this.loaclData = data
					}
					this.showDown = false
					setTimeout(function(){
						uni.stopPullDownRefresh()
					},1500)
				})
			},
			
			titleClick(e,i){
				if(this.isActive != i){
					this.isActive = i
					this.popupShow = true
				}else{
					this.isActive = -1
					this.popupShow = false
				}
				this.isChildActive = -1
				this.childrenTitleList = e.data
			},
			
			childClick(e,i){
				console.log(e,i)
				if(this.isActive==0){
					this.sort = e.sort
				}
				if(this.isActive==1){
					this.area = e.areaid
				}
				if(this.isChildActive != i){
					this.titleShowChildData[this.isActive] = e.name
					this.isChildActive = i
				}else{
					this.titleShowChildData[this.isActive] = ''
					this.isChildActive = -1
				}
				this.popupShow = false
				this.page = 0
				this.loaclData = []
				this.isActive = -1
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				this.handleData()
			}
		}
	}
</script>

<style scoped>
	
	/* 图片 */
	.img-bottom{
		margin-top: 40rpx;
	}
	.img-box{
		width: 690rpx;
		margin: 30rpx;
		position: relative;
		border-radius: 16rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}
	.img-box-up image{
		width: 100%;
		height: 360rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
	.img-box-center{
		font-size: 28rpx;
		line-height: 36rpx;
		color: #101010;
		margin: 24rpx 20rpx;
	}
	.img-box-down-two{
		position: absolute;
		font-size: 26rpx;
		line-height: 36rpx;
		right: 20rpx;
		top: 384rpx;
		color: #B1B1B1;
	}
	.img-box-down{
		margin-left: 20rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		margin-bottom: 34rpx;
	}
	
	.img-box-down text{
		color: #999999;
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
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05) ;
		
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
	
	
	/* 中部类别 */
	.center-title{
		width: 690rpx;
		margin: 30rpx;
		margin-top: 100rpx;
		padding: 10rpx 0;
	}
	.titleActive{
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.dataTitle{
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}
	.centerTitleView{
		text-align: center;
		font-size: 26rpx;
		color: #101010;
	}
	

	
	/* 子类别样式 */
	.childButton{
		width: 100%;
		text-align: center;
		margin: 10rpx 0;
		padding: 10rpx 6rpx;
		border-radius: 30rpx;	
		background-color: #F7F7F8;
	}
	.child-title{
		margin: 20rpx 30rpx;
	}
	.childActive{
		background-color: #FFEEE8;
		color: #FF794A;
	}
</style>
