
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">{{cityPosition+'装修案例'}}</text>
			</view>
			
			<view class="center">
				<view class="center-title">
					<u-row>
						<u-col span="0.6"></u-col>
						<u-col class="center-title-col" span="2.7" v-for="(item,index) in titleData" :key="index" >
							<view :class="{titleActive:index==isActive,centerTitleView:true}"  @click="titleClick(item,index)" >
							<text class="centerTitleViewText">{{ data[index]||item.title}}{{'&nbsp;&nbsp;'}}</text>
							<u-icon name="arrow-down" size="20" v-if="index!=isActive"  ></u-icon>
							<u-icon name="arrow-up" size="20" v-if="index==isActive"  ></u-icon>
							</view>
						</u-col>
						<u-col span="0.6"></u-col>
					</u-row>
				</view>
				<!-- <view  class="child-title" v-if="isActive!=-1">
					<u-row>
						<u-col span="3" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item.value,index)"	>{{item.name}}</view>
						</u-col>
					</u-row>
				</view> -->
			</view>
			
		</view>
		
		<view style="height: 200rpx;"></view>
		
		<view>
			<u-popup z-index="66" v-model="popupShow" mode="top">
				<view style="height: 180rpx;"></view>
				<view  class="child-title" v-if="isActive!=-1">
					<u-row>
						<u-col span="3" v-for="(item,index) in childrenTitleList" :key="index">
							<view :class="{childActive:index==isChildActive,childButton:true}" 
						    @click="childClick(item.value,index)"	>{{item.name}}</view>
						</u-col>
					</u-row>
				</view>
			</u-popup>
		</view>

		
		<view class="img-bottom">
			<view class="img-box" v-for="(item,index) in list" :key="index">
				<view @click="detailClick(item.contentid)" >
				<view class="img-box-up">
					<image :src="item.filepath" mode=""></image>
				</view>
				<view class="img-box-center">
					<text>{{item.title}}</text>
				</view>
				
				<view class="img-box-down">
					<text class="img-box-down-left">{{item.jzmj}}/{{item.jtzxcj}}/{{item.zxfg}}</text>
					<text class="img-box-down-right">{{item.companyname_s}}</text>
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
				titleData:[],
				list:[],
				childrenTitleList:[],
				isChildActive:-1,
				isActive:-1,
				data:[],
				showDown:false,
				popupShow:false,
				page:0,
				areaname:'',
				cityPosition:'',
				house:0,
				jzmj:0,
				jiag:0,
				fege:0,
			}
		},
		watch:{
			popupShow(value){
				if(!value){
					this.isActive = -1
				}
			}
		},
		created() {
			this.$http.Get('gallery/getFilterData').then(res=>{
				console.log('案例标题',res.data.data)
				this.titleData = res.data.data
			})
			let _this = this
			uni.getStorage({
				key:'dirAndAreaid',
				success(res){
					console.log('存储的地理位置信息在公司页面取出',res.data.areaname)
					_this.cityPosition = res.data.areaname
				}
			})
		},
		onShow() {
			this.handleData()
		},
		onPullDownRefresh() {
			
			
		},
		mounted() {
			
		},
		onReachBottom() {
			this.showDown = true
			let _this = this
			uni.startPullDownRefresh({
				success() {
					console.log('刷新掩饰加载数据')
				}
			})
			setTimeout(function(){
				_this.handleData()
			},1500)
		},
		methods: {
			
			handleData(){
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				++this.page
				let obj = {
					page:this.page,
					pageSize:10,
					house:this.house,
					jzmj:this.jzmj,
					jiag:this.jiag,
					fege:this.fege,
				}
				
				this.$http.Get('gallery/getlist',obj).then(res=>{
					console.log('案例列表',res.data.data)
					let data = res.data.data.data
					
					if(this.page!=1){
						this.list = this.list.concat(data)
					}else{
						this.list = data
					}
					this.showDown = false
					setTimeout(function(){
						uni.stopPullDownRefresh()
					},500)
				})
				
			},
			
			titleClick(e,i){
				console.log(i)
				if(this.isActive == i){
					this.isActive = -1
					this.popupShow = false
					return
				}
				this.isActive = i
				this.popupShow = true
				this.isChildActive = -1
				this.childrenTitleList = e.data
				// this.data[this.isActive] = ''
			},
			
			childClick(e,i){
				console.log(e,i)
				if(this.isActive==0){
					this.house = e
				}
				if(this.isActive==1){
					this.jzmj = e
				}
				if(this.isActive==2){
					this.jiag = e
				}
				if(this.isActive==3){
					this.fege = e
				}
				this.isChildActive = i
				this.popupShow = false
				this.data[this.isActive] = this.childrenTitleList[i].name
				this.list = []
				this.page = 0
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				this.handleData()
			},
			
			detailClick(id){
				uni.setStorage({
					key:'caseDetailId',
					data:id,
					success() {
						console.log('装修案列的详情id已经存入成功')
						uni.navigateTo({
							url:'detail'
						})
					}
				})
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
		margin: 22rpx 20rpx 24rpx 20rpx;
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
	
	.img-box-down {
		margin-left: 20rpx;
		font-size: 24rpx;
		line-height: 36rpx;
	}
	
	
	.img-box-down-left {
		color: #999999;
	}
	
	.img-box-down-right {
		position: absolute;
		right: 20rpx;
		font-size: 26rpx;
		color: #A1BDE6;
	}
	
	/* 头部 */
	.top{
		 position: fixed;
		 z-index: 188;
		 width: 100%;
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
	.center-title-col{
		padding: 0!important;
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
		width: 750rpx;
		margin: 26rpx 0;
		margin-top: 100rpx;
		
	}
	.titleActive{
		/* font-size: 32rpx; */
		font-weight: bold;
	}
	
	.dataTitle{
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}
	.centerTitleView{
		text-align: center;
	}
	.centerTitleViewText{
		color: #000000;
		font-size: 26rpx;
	}

	
	/* 子类别样式 */
	.childButton{
		width: 100%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 24rpx;
		margin: 20rpx 0;
		/* padding-top: 10rpx; */
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
