<template>
	<view>
		<view v-if="!indexTrue"  class="top-search">
			<u-input class="top-search-input" type="text" v-model="cityName" placeholder="    请输入你所在的城市名称" ></u-input>
			<text class="top-search-text-two" @click="indexTrue=true">取消</text>
		</view>
		<view v-if="indexTrue" class="index-address">
			<view class="top-search">
				<view @click="backClick()" >
					<u-icon class="top-search-icon" name="arrow-left"></u-icon>
				</view>
				<text class="top-search-text" >{{'城市选择'}}</text>
				<image class="iconSearch"  @click="indexTrue=false"  
				 src="../../../../common/image/index/icon/md-search.png" mode=""></image>
			</view>
			
			<view style="height: 100rpx;"></view>
			
			<!-- 定位 -->
			<view class="position-address">
				定位：{{cityPosition}}
			</view>
			
			<!-- 历史访问 -->
			<view class="history-address">
				<view class="history-address-title">历史访问</view>
				<view>
					<u-row>
						<u-col span="3" v-for="(item,index) in historyCityList" :key="index">
							<view   @click="tabClick(item,index)" :hair-line="false"
							:class="{tabActive:index==isTabActive,indexTabButton:true}">{{item}}</view>
						</u-col>
					</u-row>
				</view>
			</view>
			<!-- 热门城市 -->
			<view class="history-address">
				<view class="history-address-title">热门城市</view>
				<view>
					<u-row>
						<u-col span="3" v-for="(item,index) in hotCityList" :key="index">
							<view   @click="hotClick(item,index)" :hair-line="false"
							:class="{tabActive:index==isHotActive,indexTabButton:true}">{{item}}</view>
						</u-col>
					</u-row>
				</view>
			</view>
			
			<!-- 所有城市 -->
			<view class="history-address">
				<view class="history-address-title">所有城市</view>
				<view class="all-city">
					<view class="active">{{cityEnlish}}</view>
					<view>
						<ul class="addressUlRight">
							<li @click="cityEnglishClick(item,index)" :class="{addressLi:true,active:index==isCityActive}" 
							v-for="(item,index) in indexList" :key="index">{{item}}</li>
						</ul>
						
						<ul class="addressUl">
							<li @click="addressClick(item.name,index)" :class="{addressLi:true,active:index==isLiCityActive}" v-for="(item,index) in allCityList" :key="index">{{item.name}}</li>
						</ul>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {},
		data() {
			return {
				isTabActive:-1,
				isHotActive:-1,
				isCityActive:0,
				isLiCityActive:-1,
				cityEnlish:'A',
				cityName:'',
				indexTrue:true,
				historyCityList:[],
				hotCityList:[
					'成都',
					'重庆',
					'上海',
					'北京',
					'深圳',
					'广州',
					'西安',
					'乌鲁木齐'
				],
				allCityList:[],
				cityPosition:'',
				allList:{},
				scrollTop: 0,
				indexList: []
			}
		},
		onPullDownRefresh() {
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1000)
		},
		onShow() {
			let _this = this
			_this.handlearea()
		},
		created() {
			let _this = this
			uni.getStorage({
				key:'historyCity',
				success(res) {
					_this.historyCityList = res.data
				}
			})
		},
		
		methods: {
			handlearea(){
				this.$http.Get('area/getcity').then(res=>{
					console.log('获取的城市',res.data.data)
					this.allList = res.data.data.data
					this.indexList = res.data.data.key
					this.allCityList = this.allList['a']
				}).catch(error=>{
					console.log(err)
				})
			},
			
			backClick(){
				uni.getStorage({
					key:'navigateValue',
					success(res) {
						uni.switchTab({
							url:res.data
						})
					}
				})
			},
			
			// 根据城市获取城市信息
			handleAreaid(e){
				let data = {
					city:e
				}
				let _this = this
				this.$http.All('area/getAreaByName',data).then((res)=>{
					console.log('根据城市获取城市信息',res.data.data)
					uni.setStorage({
						key:'dirAndAreaid',
						data:res.data.data,
						success() {
							console.log('存入存入当前选择城市地理信息成功',res.data.data)
							_this.backClick()
						}
					})
				})
			},
			
			//历史访问选择
			tabClick(e,i){
				this.isTabActive = i
				this.cityPosition = e
				this.handleAreaid(e)
			},
			
			//热门城市选择
			hotClick(e,i){
				this.isHotActive = i
				this.cityPosition = e
				this.handleHistory(e)
				
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			
			// 所有城市下面的选择
			addressClick(e,i){
				// this.handleAreaid(e)
				this.cityPosition = e
				this.isLiCityActive = i
				this.handleHistory(e)
				
			},
			
			handleHistory(city){
				let _this = this
				if(this.historyCityList&&this.historyCityList.length>=8){
					this.historyCityList.pop()
				}
				if(!(this.historyCityList.indexOf(city)>-1)){
					this.historyCityList.unshift(city)
				}
				uni.setStorage({
					key:'historyCity',
					data:_this.historyCityList,
					success() {
						console.log('历史访问 储存成功了')
						// _this.backClick()
						_this.handleAreaid(city)
					},
					fail() {
						console.log('失败了')
					}
				})
			},
			
			// 城市首字母的选择
			cityEnglishClick(e,i){
				this.isCityActive = i
				this.cityEnlish = e
				this.allCityList = this.allList[e.toLowerCase()]
			},
			
			
		}
	}
</script>

<style scoped>
	.index-address{
		margin: 0 30rpx;
	}
	
	.active{
		color:#FF794A ;
	}
	
	 /* 所有城市 */
	.list-cell {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 24rpx;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}
		.addressLi{
			list-style: none;
			margin: 30rpx 0;
		}
		.addressUl{
			padding-left: 0;
		}
		.all-city{
			position: relative;
		}
		.addressUlRight{
			position: absolute;
			right: 10rpx;
			top: -24rpx;
		}
	/* 历史访问 */
	.history-address{
		margin:20rpx 0;
	}
	.history-address-title{
		font-size: 32rpx;
		font-weight: bold;
		margin: 30rpx 0;
	}
	.indexTabButton{
		margin: 20rpx 0;
		border-radius: 40rpx;
		font-size: 24rpx;
		line-height: 56rpx;
		height: 56rpx;
		width: 150rpx;
		text-align: center;
		background-color: #F7F7F8;
	}
	
	.tabActive{
		background-color: #FFEEE8;
		color:#FF794A;
	}
	
	/* 定位 */
	.position-address{
		font-size: 32rpx;
	}
	
	/* 头部 */
	.top-search{
		position: fixed;
		height: 80rpx;
		width: 690rpx;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	.top-search .iconSearch{
		position: absolute;
		right: 2rpx;
		top: 14rpx;
		width: 48rpx;
		height: 48rpx;
	}
	.top-search-text{
		position: absolute;
		 left: 300rpx;
		 top: 20rpx;
		 font-weight: bold;
		 font-size: 32rpx;
	}
	.top-search-icon{
		position: absolute;
		 left: 2rpx;
		 top: 30rpx;
	}

	.top-search-text-two{
		position: absolute;
		 right: -20rpx;
		 top: 20rpx;
		 font-weight: bold;
		 font-size: 28rpx;
	}

	.top-search-input {
		position: absolute;
		padding-left: 40rpx!important;
		left: 30rpx;
		top: 14rpx;
		background-color: #F7F7F8;
		width: 546rpx;
		height: 60rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
		line-height: 36rpx;
		color: #FFFFFF;
	}
	.uni-input-placeholder{
		top:10rpx!important;	
	}
</style>
