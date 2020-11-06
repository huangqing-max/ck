
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="render" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">家装效果图</text>
			</view>
			
			<view class="center">
				<view class="center-title">
					<u-row>
						<u-col class="center-title-col" span="3" v-for="(item,index) in titleData" :key="index" >
							<view :class="{titleActive:isTitleClick.indexOf(index)>-1,centerTitleView:true}" >
							<text @click="titleClick(item,index)">{{isTitleClick.indexOf(index)>-1?data[index]:item.title}}</text>
							</view>
						</u-col>
					</u-row>
				
				</view>
				<!-- <view  class="child-title" v-show="isActive!=-1">
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
				<view  class="child-title" v-show="isActive!=-1">
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
			<view class="wrap">
				<u-waterfall v-model="flowList" ref="uWaterfall">
					<template v-slot:left="{leftList}">
						<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index" >
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.filepath" :index="index"></u-lazy-load>
							<view class="demo-title M10">
								{{item.title}}
							</view>
							<view  @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
								<u-icon name="thumb-up"  size="36"></u-icon>{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index" >
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.filepath" :index="index"></u-lazy-load>
							<view class="demo-title M10">
								{{item.title}}
							</view>
							<view  @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
								<u-icon name="thumb-up"  size="36"></u-icon>{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				flowList:[],
				titleData:[],
				titleDataTwo:[],
				list:[],
				isImgId:[],
				childrenTitleList:[],
				isChildActive:-1,
				isActive:-1,
				data:[],
				isTitleClick:[],
				page:0,
				isFirst:true,
				popupShow:false,
				areaname:'',
				cityPosition:'',
				style:'',
				space:'',
				part:'',
				housetype:'',
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
			
			this.$http.Get('xgt/getJzFilterData').then(res=>{
				console.log('家装标题',res.data.data)
				this.titleData = res.data.data
				this.titleDataTwo = res.data.data
				this.handleStart()
			})
			
			
			
		},
		onShow() {
			uni.startPullDownRefresh({
				success() {
					console.log('进入页面的刷新掩饰加载数据')
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		mounted() {
			// this.handleData()
			
		},
		onReachBottom() {
			this.isFirst = false
			this.handleData()
		},
		methods: {
			
			// 点击图片跳转详情页面
			urlClick(url){
				uni.setStorage({
					key:'3DimgUrl',
					data:url,
					success() {
						console.log('存入3D跳转路径成功')
						uni.navigateTo({
							url:'webView'
						})
					}
				})
			},
			
			handleStart(){
				let _this = this
				uni.getStorage({
					key:'renderAndTab',
					success(res){
						console.log('传过来的家装数据参数',res.data)
						_this.childrenTitleList = _this.titleData[res.data.tabKey].data
						_this.data[res.data.tabKey] = _this.childrenTitleList[res.data.childKey].name
						_this.isActive = res.data.tabKey
						_this.isChildActive = res.data.childKey
						_this.isActive = -1
						if(res.data.tab=='style'){
							_this.style = res.data.child
							_this.isTitleClick.push(1)
						}
						if(res.data.tab=='space'){
							_this.space = res.data.child
							_this.isTitleClick.push(0)
						}
						if(res.data.tab=='part'){
							_this.part = res.data.child
							_this.isTitleClick.push(2)
						}
						if(res.data.tab=='housetype'){
							_this.housetype = res.data.child
							_this.isTitleClick.push(3)
						}
					}
				})
				let obj = {
					page:1,
					pageSize:10,
					style:this.style,
					space:this.space,
					part:this.part,
					housetype:this.housetype,
				}
				this.$http.Get('xgt/getlist',obj).then(res=>{
					console.log('效果图列表',res.data.data.data[0])
					let listData = res.data.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						item.id = this.$u.guid();
						data.push(item)
					}
					this.flowList = data
				})
			},
			
			handleData(){
				++this.page
				let obj = {
					page:this.page,
					pageSize:10,
					style:this.style,
					space:this.space,
					part:this.part,
					housetype:this.housetype,
				}
				
				this.$http.Get('xgt/getlist',obj).then(res=>{
					console.log('效果图列表',res.data.data.data[0])
					let listData = res.data.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						item.id = this.$u.guid();
						data.push(item)
					}
					console.log('当前事第一页',this.isFirst)
					if(!this.isFirst){
						this.flowList = this.flowList.concat(data)
					}else{
						this.flowList = []
						this.$refs.uWaterfall.clear()
						this.flowList = data
					}
				})
				
			},
			
			titleClick(e,i){
				console.log(e.req,i)
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
			
			iconClick(e,i){
				this.isColor = 1
				if(this.isImgId.indexOf(e.id)==-1){
					this.isImgId.push(e.id)
					for (let i = 0; i < this.flowList.length; i++) {
						if(this.flowList[i].id==e.id){
							this.flowList[i].price += 1
						}
					}
				}
			},
			
			childClick(e,i){
				console.log(e,i)
				if(this.isActive==0){
					this.space = e
				}
				if(this.isActive==1){
					this.style = e
				}
				if(this.isActive==2){
					this.part = e
				}
				if(this.isActive==3){
					this.housetype = e
				}
				
				this.isFirst = true
				if(this.isChildActive == i){
					this.isChildActive = -1
					if(this.isTitleClick.indexOf(this.isActive)!=-1){
						this.isTitleClick.splice(this.isTitleClick.indexOf(this.isActive),1)
					}
				}else{
					this.isChildActive = i
					this.popupShow = false
					this.data[this.isActive] = this.childrenTitleList[i].name
					if(this.isTitleClick.indexOf(this.isActive)==-1){
						this.isTitleClick.push(this.isActive)
					}
				}
				
				
				this.page = 0
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				this.flowList = []
				this.$refs.uWaterfall.clear()
				let _this = this
				setTimeout(function(){
					_this.$refs.uWaterfall.clear()
				},500)
				setTimeout(function(){
					_this.$refs.uWaterfall.clear()
				},1000)
				setTimeout(function(){
					_this.$refs.uWaterfall.clear()
				},1500)
				setTimeout(function(){
					_this.handleData()
				},1500)
			},
			
			detailClick(id){
				uni.setStorage({
					key:'caseDetailId',
					data:id,
					success() {
						console.log('装修案列的详情id已经存入成功')
					}
				})
			}
		}
	}
</script>

<style scoped>
	
	.color{
		color: #2979ff!important;
	}
	
	/* 图片	 */
	.render-imgs{
		margin-top: 60rpx;
	}
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
		margin: 30rpx 0;
		margin-top: 118rpx;
		
	}
	.titleActive{
		/* font-size: 32rpx; */
		font-weight: bold;
		color: #FF3D3D;
	}
	
	.dataTitle{
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}
	.centerTitleView{
		text-align: center;
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
