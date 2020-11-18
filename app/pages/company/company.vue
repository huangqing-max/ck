<template>
	<view>
		<view>
			<!-- 顶部搜索框 -->
			<view class="top-search">
				<view>
					<!-- 跳转到城市页面 -->
					<view @click="navigateClick()" >
					<view class="top-search-text">
						{{cityPosition}}{{'&nbsp;'}}
						<u-icon  name="arrow-down"></u-icon>
					</view>
					</view>
					<!-- 跳转到搜索页面 -->
					<!-- <navigator url="../index/index-children/search/search" open-type="navigate" hover-class="none" > -->
					<input type="text"  v-model="ekeyword" placeholder-style="line-height:60rpx;color:#999999;font-size:24rpx;" placeholder="大数据智选装修公司" class="index-top-search-input" />
					<image @click="searchClick()" class="iconSearch" src="../../common/image/index/icon/md-search.png" mode=""></image>
					<!-- </navigator> -->
					
					</view>
			</view>
			<u-toast ref="uToast" position="top" />
			<view style="height: 88rpx;"></view>
			
			<view>
				<u-popup z-index="1066" v-model="popupShow" mode="top">
					<view style="height: 210rpx;"></view>
					<u-row class="m20">
						<u-col v-if="isActive==0" span="4" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton1:true}" 
						    @click="childClick(item,index)"	>{{item.name}}</view>
						</u-col>
						<u-col v-if="isActive!=0" :span="item.name.length<7?'3':'6' " v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item,index)"	>{{item.name}}</view>
						</u-col>
					</u-row>
				</u-popup>
			</view>
			
			
			<view>
				
				<view class="center-title">
					<u-row>
						<u-col span="6" v-for="(item,index) in titleData" :key="index" @click="titleClick(item,index)">
							<view :class="{titleActive:index==isActive,centerTitleView:true}">
							<text >{{ titleShowChildData[index]||item.title}}{{'&emsp;'}}</text>
							<u-icon name="arrow-down" v-if="index!=isActive"  ></u-icon>
							<u-icon name="arrow-up" v-if="index==isActive"  ></u-icon>
							</view>
						</u-col>
					</u-row>
					
				</view>
				
			</view>
			
			<view style="height: 120rpx;"></view>
			
			<view class="img-box">
				<!-- <view v-if="boxData.length==0" class="noData"> -->
				<view v-if="boxShow" class="noData">
					<image src="../../common/image/index/icon/my/nodata.jpg" mode=""></image>
				</view>
				<view class="center-box" v-for="(item,index) in boxData" @click="companyClick(item)" :key="index">
					<image class="box-img" :src="item.logo_long" mode=""></image>
					<view class="box-text-one">
						<view>{{item.companyname}}</view>
						
						<image src="../../common/image/index/icon/fasfa_gem.png" v-if="item.group=='diamond'"   mode=""></image>
					</view>
					<view class="box-text-two">
						<u-icon class="icon-star" color="#FA3534" :name="index>item.star?'star':'star-fill'" v-for="index in 5" :key="index">
						</u-icon>
						<text>{{'&nbsp;&nbsp;'}}{{item.comment_count}}条评价</text>
					</view>
					<view class="box-button"  v-if="item.company_label=='recommend'" >推荐</view>
					<view class="box-button2" v-if="item.company_label=='certified'" >认证</view>
					<view class="box-text-three">
						<u-icon name="map-fill"></u-icon>
						<text>{{'&nbsp;'}}{{item.area_name}}</text>
					</view>
					<view class="box-col-one">
						<u-row>
							<u-col span="3">
								案例{{item.anlicount}}套
							</u-col>
							<u-col span="3">
								文章{{item.articlecount}}篇
							</u-col>
							<u-col span="3">
								预约{{item.ordercount}}次
							</u-col>
							<u-col span="3">
								工地{{item.gongdicount}}个
							</u-col>
						</u-row>
					</view>
					<view class="box-col-two">
						<view v-for="(i,index) in item.biaoqian" :key="index" class="box-col-two-view">{{i}}</view>
					</view>
				</view>
			    <view style="text-align: center;">
			    	<u-loading mode="circle" color="#18B566" :show="showDown"  size="88"></u-loading>
					<view v-if="nomoreShow" class="nomore">
						没有更多了
					</view>
			    </view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				status:'loadmore',
				ekeyword:'',
				cityPosition:'',
				titleData:[
					{title:'综合排序',data:[
						{name:'综合排序',sort:0},
						{name:'满意度',sort:1},
						{name:'活跃度',sort:2},
						]},
					{title:'区域划分',data:[]}
				],
				boxData:[],
				childrenTitleList:[],
				isChildActive:-1,
				img:require('../../common/image/index/icon/fasfa_gem.png'),
				isActive:-1,
				starIndex:3,
				data:[],
				titleShowChildData:[],
				sort:0,
				dir:'',
				show:false,
				boxShow:false,
				nomoreShow:false,
				popupShow:false,
				showDown:false,
				areaid:'',
				page:1,
			}
		},
		watch:{
			popupShow(value){
				if(!value){
					uni.showTabBar({
						success(res) {
							console.log('弹出层消失显示tabbar',res)
						}
					})
					this.isActive = -1
				}
				if(value){
					uni.hideTabBar({
						success(res) {
							console.log('隐藏底部成功',res)
						}
					})
				}
			}
		},
		computed:{},
		created(){
			
			this.handle()
		},
		
		onPullDownRefresh() {
			// this.handle()
			
		},
		onReachBottom() {
			this.loadStatus = 'loading'
			this.showDown = true
			let _this = this
			setTimeout(function(){
				_this.handleData()
			},1500)
			
			// 模拟数据加载
		},
		onShow() {
			uni.startPullDownRefresh({
				success(res) {
					console.log('刷新成功',res)
				},
				fail(err) {
					console.log(err)
				}
			})
			
		},
		
		methods:{
			
			handle(){
				let _this = this
				
				uni.getStorage({
					key:'dirAndAreaid',
					success(res){
						console.log('存储的地理位置信息在公司页面取出',res.data)
						_this.cityPosition = res.data.areaname
						let obj={
							page:1,
							pagesize:10,
							dir:res.data.dir,
							sort:1
						}
						// 根据城市获取区域
						_this.dir = res.data.dir
						obj.areaid = res.data.areaid
						_this.$http.Get('area/getChildByAreaid',obj).then(res=>{
							console.log('本地区域',res.data.data)
							_this.titleData[1].data = res.data.data
						})
						_this.$http.Get('company/getList',obj).then(res=>{
							console.log('进入页面获取装修公司列表',res.data.data)
							let data = res.data.data
							if(data.length == 0){
								_this.boxShow = true
							}else{
								_this.boxShow = false
							}
							_this.boxData = data
							uni.stopPullDownRefresh()
						})
					}
				})
				
			},
			
			searchClick(){
				if(!this.ekeyword){
					this.$refs.uToast.show({
						title: '请输入搜索关键词',
						type: 'warning',
					})
					return
				}
				let obj = {
					ekeyword:this.ekeyword,
					page:1
				}
				this.$http.Get('company/companySearch',obj).then(res=>{
					console.log('装修公司-搜索',res.data)
					let data = res.data.data
					if(!data){
						_this.boxShow = true
					}else{
						_this.boxShow = false
					}
					this.boxData = data
					setTimeout(()=>{
						uni.stopPullDownRefresh()
					},500)
				})
			},
			
			//存入当前公司url
			companyClick(item){
				let data  = {
					companyname:item.companyname,
					url:item.url,
				}
				uni.setStorage({
					key:'companyUrl',
					data:data,
					success() {
						console.log('存入当前公司url及名字成功')
						uni.navigateTo({
							url:'company-detail'
						})
					}
				})
			},
			
			
			handleData(){
				++this.page
				let that = this
				let obj={
					page:this.page,
					pagesize:10,
					dir:this.dir,
					sort:this.sort,
					areaid:this.areaid
				}
				let _this = this
				this.$http.Get('company/getList',obj).then(res=>{
					console.log('获取装修公司列表',res.data)
					if(this.page !=1){
						if(res.data.data.length==0){
							this.showDown = false
							this.nomoreShow = true
							uni.stopPullDownRefresh()
							return
						}
					}
					let data = res.data.data
					if(data.length == 0){
						_this.boxShow = true
					}else{
						_this.boxShow = false
					}
					this.showDown = false
					setTimeout(()=>{
						uni.stopPullDownRefresh()
					},500)
					
					if(this.page==1){
						this.boxData = data
						return
					}
					if(data.length==0){
						console.log('没有数据')
						--this.page
						return
					}
					console.log('当前页数',this.page)
					this.boxData = this.boxData.concat(data)
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
				this.childrenTitleList = e.data
			},
			
			childClick(e,i){
				// 判断点击点击项是否是上一点击项，不是就选中，是就取消选中
				if(this.isChildActive != i){
					this.isChildActive = i
					this.popupShow = false
					// 将选中项在title标题部分暂时
					this.titleShowChildData[this.isActive] = this.childrenTitleList[i].name
				}else{
					this.isChildActive = -1
					this.titleShowChildData[this.isActive] = ''
				}
				if(this.isActive==0){
					this.sort = e.sort
				}else{
					this.areaid = e.areaid
				}
				this.page = 0
				this.isActive = -1
				uni.startPullDownRefresh({
					success() {
						console.log('更新数据的时候显示刷新')
					}
				})
				this.handleData()
				this.show = false
			},
			
			navigateClick(){
				uni.setStorage({
					key:'navigateValue',
					data:'../../../company/company',
					success() {
						uni.navigateTo({
							url:'../index/index-children/address/address'
						})
					}
				})
				
			}
		},
		
	}
</script>

<style scoped>
	.m20{
		margin: 20rpx 0;
	}
	.noData{
		height: 60vh;
		text-align: center;
		padding-top: 30vh;
	}
	.nomore{
		height: 6vh;
		text-align: center;
		padding-top: 3vh;
	}
	/* 中部图片box */
	.center-box{
		width: 690rpx;
		margin: 20rpx 30rpx;
		position: relative;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
		border-radius: 16rpx;
		padding-left: 30rpx;
	}
	
	.box-img{
		margin-top: 30rpx;
		width: 220rpx;
		height: 100rpx;
		border: 2rpx solid #E5E5E5;
	}
/* 	.box-text-one{
		
	} */
	.box-text-one view{
		position: absolute;
		font-size: 32rpx;
		font-weight: bold;
		left: 264rpx;
		top: 30rpx;
		width: 300rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.box-text-one image{
		position: absolute;
		font-size: 32rpx;
		font-weight: bold;
		right: 98rpx;
		top: 38rpx;
		width: 28rpx;
		height: 28rpx;
	}
	.box-text-two{
		position: absolute;
		left: 264rpx;
		top: 90rpx;
	}
	.box-text-two text{
		font-size: 24rpx;
	}
	
	.box-button{
		position: absolute;
		height: 40rpx;
		width: 64rpx;
		text-align: center;
		border-radius: 12rpx;
		font-size: 20rpx;
		line-height: 40rpx;
		top: 30rpx;
		right: 20rpx;
		background-color: #FFEED6;
	}
	.box-button::after{
		border: none;
	}
	
	.box-button2{
		position: absolute;
		/* width: 100rpx; */
		height: 40rpx;
		width: 64rpx;
		text-align: center;
		border-radius: 12rpx;
		font-size: 20rpx;
		line-height: 40rpx;
		top: 30rpx;
		right: 20rpx;
		color: #4E87C0;
		background-color: #E9F3F8;
	}
	.box-button2::after{
		border: none;
	}
	
	
	.box-text-three{
		position: absolute;
		right: 20rpx;
		top: 90rpx;
	}
	.box-text-three text{
		font-size: 24rpx;
	}
	.box-col-one{
		font-size: 24rpx;
		line-height: 34rpx;
		color: #101010;
		margin: 0 -6rpx;
		margin: 24rpx 0;
	}
	.box-col-two{
		font-size: 20rpx;
		color: #101010;
		margin-left: -6rpx;
	}
	.box-col-two-view{
		display: inline-block;
		border: 1rpx solid rgba(238, 238, 241, 100);
		border-radius: 12rpx;
		font-size: 20rpx;
		margin: 0 10rpx;
		margin-bottom: 32rpx;
		height: 40rpx;
		padding: 0 10rpx;
		line-height: 40rpx;
		text-align: center;
	}
	
	/* 头部 */
	.top-search {
		height: 88rpx;
		width: 750rpx;
		position: fixed;
		z-index: 1088;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05);
		background-color: #FFFFFF;
	}
	
	.top-search-text {
		position: absolute;
		font-size: 28rpx;
		line-height: 40rpx;
		left: 30rpx;
		top: 22rpx;
		color: #101010;
		
	}
	
	.top-search-icon {
		position: absolute;
		line-height: 48rpx;
		left: 170rpx;
		top: 28rpx;
	}
	.top-search .iconSearch{
		position: absolute;
		right: 40rpx;
		top: 20rpx;
		width: 48rpx;
		height: 48rpx;
	}
	
	.index-top-search-input {
		padding-left: 30rpx!important;
		position: absolute;
		right: 20rpx;
		top: 14rpx;
		background-color: #F7F7F8;
		width: 500rpx;
		height: 60rpx;
		border-radius: 40rpx;
		font-size: 24rpx;
		line-height: 60rpx;
		color: #999999;
	}
	
	/* 中部类别 */
	.center-title{
		position: fixed;
		width: 750rpx;
		padding: 20rpx 0rpx;
		background-color: #FFFFFF;
		border: 2rpx solid rgba(255, 255, 255, 0);
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05);
		z-index: 1088;
	}
	.titleActive{
		font-weight: bold;
	}
	
	.dataTitle{
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}
	.centerTitleView{
		text-align: center;
		margin: 20rpx 0;
		color: rgba(16, 16, 16, 100);
		font-size: 26rpx;
	}
	
	
	
	/* 子类别样式 */
	.childButton{
		width: 100%;
		/* height: 60rpx; */
		line-height: 60rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 20rpx 0;
		/* padding-top: 10rpx; */
		border-radius: 30rpx;	
		background-color: #F7F7F8;
	}
	.childButton1{
		width: 100%;
		/* height: 60rpx; */
		line-height: 60rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 20rpx 0;
		/* padding-top: 10rpx; */
		border-radius: 30rpx;	
	}
	.child-title{
		margin: 30rpx;
	}
	.childActive{
		background-color: #FFEEE8;
		color: #FF794A!important;
	}
</style>
