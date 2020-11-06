<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="./local_cell" >
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
				<text class="top-title-text">{{navTitle}}</text>
			</view>
		</view>

		<view style="height: 80rpx;"></view>

		<view class="center">
			<view class="center-title">
				<u-row>
					<u-col span="2" v-for="(item,index) in titleData" :key="index">
							<view :class="{titleActive:index==isActive,centerTitleView:true}">
								<text class="centerTitleViewText" @click="titleClick(item,index)">
									{{item.title}}
								</text>
							</view>
						
					</u-col>
				</u-row>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>




		<view class="img-bottom">
			
			<!-- 首页 -->
			<view class="mt-20" id="village0">
				<view>
					<view class="index-img">
						<view class="noImgText" v-if="!info.thumb">
							暂无图片
						</view>
						<image :src="info.thumb" alt="当前小区的展示图" title="当前小区的展示图" ></image>
					</view>
					
					<view class="index-text" id="village1" v-if="formData" >
						<view>
							<u-row >
								<u-col class="index-row">
									<text class="index-text-title">地址：</text>
									<text class="index-text-data">{{info.address||'暂无资料'}}</text>
								</u-col>
							</u-row>
							<u-row >
								<u-col class="index-row">
									<text class="index-text-title">开发商：</text>
									<text class="index-text-data">{{info.kfs||'暂无资料'}}</text>
								</u-col>
							</u-row>
							<u-row >
								<u-col class="index-row" span="12">
									<text class="index-text-title">开盘时间：</text>
									<text class="index-text-data">{{info.openingTime||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">入住时间：</text>
									<text class="index-text-data">{{info.PayTime||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">物业类别：</text>
									<text class="index-text-data">{{info.PropertyType||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<view class="index-text-data">
										<text class="index-text-title">产权时间：</text>
										{{info.PropertyRight||'暂无资料'}}
										</view>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">建筑类别：</text>
									<text class="index-text-data">{{info.buildingType||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">装修状况：</text>
									<text class="index-text-data">{{info.decorate||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">楼盘均价：</text>
									<text class="index-text-data">{{info.price||'暂无资料'}}</text>	
								</u-col>
								<u-col class="index-row" span="12">
									<text class="index-text-title">绿化面积：</text>
									<text class="index-text-data">{{info.GreeningRate||'暂无资料'}}</text>	
								</u-col>
							</u-row>
						</view>
					</view>
					
					<view class="all-button">
						<view @click="localClick(info.href)">
							<view type="default">更多</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 设计方案 -->
			<view class="mt-20" id="village2">
				<view>
					<text class="all-title">
						设计方案
					</text>
				</view>
				<view class="noImgText" v-if="fcase.length==0">
					暂无资料
				</view>
				<view class="img-box" v-for="(item,index) in fcase" :key="index">
					<view class="img-box-up"  @click="localClick(item.href)" >
						<image :src="item.thumb" mode=""></image>
					</view>
					<view class="img-box-center">
						<text>{{item.title}}</text>
					</view>
					<view class="img-box-down-two">
						<u-icon name="eye"></u-icon>{{'&nbsp;'}}{{item.hits}}
					</view>
					<view class="img-box-down">
						<text class="img-box-down-left">{{item.jzmj}}平/{{'12万/田园风'}}</text>
						<text class="img-box-down-right">{{item.companyname_s}}</text>
					</view>
				</view>
				<view class="all-button">
					<view>
						<view type="default">更多</view>
					</view>
				</view>
			</view>
			
			<!-- 户型图 -->
			<view class="mt-20" id="village3">
				<view>
					<text class="all-title">
						户型图
					</text>
				</view>
				<view>
					<view class="noImgText" v-if="hxt.length==0">
						暂无资料
					</view>
				<u-row class="index-row">
					<u-col span="6" v-for="(item,index) in hxt" :key="index" >
						<view class="home-box" >
							<view class="home-box-up">
								<image :src="item.filepath" @click="imageSize(item.filepath)" :alt="'当前小区的户型图'+(index+1)"  mode=""></image>
								
							</view>
							<view class="home-box-down">
								<text>{{item.title}}</text>
							</view>
						</view>
						
					</u-col>
				</u-row>
				</view>
				
				<view class="all-button"  >
					<view @click="localClick(hxt.href)">
						<view type="default">更多</view>
					</view>
				</view>
			</view>
			
			<!-- 实景图 -->
			<view class="mt-20" id="village4"  >
				<view>
					<text class="all-title">
						实景图
					</text>
				</view>
				<view class="noImgText" v-if="sjt.length==0">
					暂无资料
				</view>
				<view class="scenery" v-for="(item,index) in sjt" :key="index">
						<image :src="item.filepath" @click="imageSize(item.filepath)" :alt="'当前小区的实景图'+(index+1)" mode=""></image>
				</view>
				<view class="all-button"  >
					<view @click="localClick(sjt.href)">
						<view type="default">更多</view>
					</view>
				</view>
			</view>
			
			<!-- 样板间 -->
			<view class="mt-20" id="village5">
				<view>
					<text class="all-title">
						样板间
					</text>
				</view>
				<view>
					<view class="noImgText" v-if="ybj.length==0">
						暂无资料
					</view>
				<u-row class="index-row"  >
					<u-col span="6" v-for="(item,index) in ybj" :key="index" >
						<view class="home-box" >
							<view class="home-box-up">
								<image :src="item.filepath" @click="imageSize(item.filepath)" :alt="'当前小区的样板间图'+(index+1)" mode=""></image>
							</view>
							<view class="home-box-down">
								<text>{{item.title}}</text>
							</view>
						</view>
						
					</u-col>
				</u-row>
				</view>
				
				<view class="all-button"  >
					<view @click="localClick(ybj.href)">
						<view type="default">更多</view>
					</view>
				</view>
				<kd-preview-image v-model="imageShow" :images="[urlstring]" :current="0"></kd-preview-image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				titleData: [
					{title:'首页'},
					{title:'概况'},
					{title:'方案'},
					{title:'户型'},
					{title:'实景'},
					{title:'样板'}
					],
				dirname:'',
				urlstring:'',
				imageShow:false,
				dir:'',
				info:{},
				fcase:[],
				hxt:[],
				sjt:[],
				ybj:[],
				navTitle:'',
				formData:{},
				cityPosition:'',
				isActive: 0,
			}
		},
		 onLoad: function (options) {
		      this.dirname = options.dirname
			  console.log('小区页面的dirname',this.dirname)
		  },
		  onShow() {
			  this.handleData()
			
		  },
		
		  onPullDownRefresh() {
			  this.handleData()
			  setTimeout(res=>{
				  uni.stopPullDownRefresh()
			  },1500)
		  },
		created() {
			
			
			
		},
		methods: {
			
			
			imageSize(url){
				this.urlstring = url
				this.imageShow = true
			},
			
			handleData(){
				
				let _this = this
				uni.getStorage({
					key:'villageDirname',
					success(res) {
						console.log('小区的dirname',res.data)
						_this.dirname = res.data
						let obj = {
							dirname:res.data
						}
						_this.$http.Get('village/show',obj).then(re=>{
							console.log('小区数据',re.data)
							_this.formData = re.data.data
							_this.navTitle =  re.data.nav_title
							
						})
						
						let obj2 = {
							dirname:res.data,
							pg : 2
						}
						//方案
						_this.$http.Get('village/show',obj2).then(re=>{
							console.log('小区方案数据',re.data)
							_this.fcase =  re.data.data
							console.log('小区方案数据',_this.fcase)
						})
						
						//户型图
						let obj3 = {
							dirname:res.data,
							pg : 3
						}
						_this.$http.Get('village/show',obj3).then(re=>{
							console.log('小区户型图数据',re.data)
							_this.hxt =  re.data.data
						})
						
						//实景
						let obj4 = {
							dirname:res.data,
							pg : 4
						}
						_this.$http.Get('village/show',obj4).then(re=>{
							console.log('小区实景数据',re.data)
							_this.sjt =  re.data.data
						})
						
						//样板间
						let obj5 = {
							dirname:res.data,
							pg : 5
						}
						_this.$http.Get('village/show',obj5).then(re=>{
							console.log('小区样板间数据',re.data)
							_this.ybj =  re.data.data
						})
						
						//概况
						let obj6 = {
							dirname:res.data,
							pg : 6
						}
						_this.$http.Get('village/show',obj6).then(re=>{
							console.log('小区概况数据',re.data)
							_this.info =  re.data.data
						})
					},
					fail(err) {
						console.log('2222222',err)
					}
					
				})
			},
			
			//存入当前url
			localClick(url){
				console.log(url)
				if(!url){
					return
				}
				uni.setStorage({
					key:'localUrl',
					data:url,
					success() {
						console.log('存入当前url及名字成功',url)
						uni.navigateTo({
							url:'local-case'
						})
					}
				})
			},
			
			titleClick(e, i) {
				this.isActive = i
				//从当前位置到达评论区域
				uni.createSelectorQuery().select('#village'+i).boundingClientRect(data=>{//目标位置的节点：类或者id
					  uni.createSelectorQuery().select(".img-bottom").boundingClientRect(res=>{//最外层盒子的节点：类或者id
							uni.pageScrollTo({
								  duration: 10,//过渡时间
								  scrollTop:data.top - res.top + 20 ,//到达距离顶部的top值
							})
					  }).exec()
				}).exec();
			},
			
			

		}
	}
</script>

<style scoped>
	
	.noImgText{
		text-align: center;
		padding: 100rpx 0 ;
		margin: 30rpx;
		color: #999999;
		/* background-color: #999999; */
	}

	/* 全局 */
	.mt-20{
		margin-top: 50rpx;
	}
	.all-button{
		text-align: -webkit-center;	
		margin: 40rpx 0;
	}
	.all-button view{
		width: 200rpx;
		height: 80rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background-color: #E5E5E5;
	}
	.all-button button::after{
		border: none;
	}
	.all-title{
		margin-left: 30rpx;
		font-size: 28rpx;
		font-weight: bold;
		line-height: 40rpx;
		color: #101010;
	}
	
	
	/* 实景图 */
	.scenery image{
		
		width: 100%;
		height: 100%;
	}
	.scenery{
		margin: 32rpx 30rpx;
		border: 0;
		width: 690rpx;
		height: 400rpx;
	}
	
	
	/* 户型 */
	.home-box{
	    width: 330rpx;	
		margin-left: 15rpx;
	}
	.home-box-up{
		
	}
	.home-box-up image{
		width: 330rpx;
		height: 320rpx;
		margin: 20rpx 0;
	}
	.home-box-down{
		margin: 10rpx 0 20rpx 0;
	}
	.home-box-down text{
		font-size: 28rpx;
		line-height: 40rpx;
	}
	
	/* 首页 */
	.index-img image{
		width: 750rpx;
		height: 400rpx;
	}
	.index-text{
		width: 690rpx;
		margin-left: 20rpx;
	}
	.index-text-title{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #101010;
		/* margin-left: 20rpx; */
	}
	.index-text-data{
		font-size: 24rpx;
		line-height: 40rpx;
		width: 690rpx;
		color: #999999;
		text-overflow: ellipsis;    /*用三个点表示*/
		overflow: hidden;
		white-space: nowrap;    /* 规定段落中的文本不换行*/
	}
	..index-text-data:hover{
	        overflow: visible;    /*鼠标悬浮上去时显示被隐藏的内容*/ 
	    }
	.index-row{
		margin: 10rpx 0;
	}
	
	/* 图片 */
	.img-bottom {
		margin-top: 40rpx;
	}

	.img-box {
		width: 690rpx;
		margin: 26rpx 30rpx;
		position: relative;
		border-radius: 16rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.img-box-up image {
		width: 100%;
		height: 360rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}

	.img-box-center {
		width: 500rpx;
		font-size: 28rpx;
		line-height: 36rpx;
		color: #101010;
		margin: 22rpx 20rpx 24rpx 20rpx;
	}

	.img-box-down-two {
		position: absolute;
		font-size: 26rpx;
		line-height: 36rpx;
		right: 20rpx;
		top: 390rpx;
		color: #B1B1B1;
	}

	.img-box-down {
		margin-left: 20rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		padding-bottom: 34rpx;
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
	.top-title {
		position: fixed;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 288;
		box-shadow: 0 1rpx 0  0 rgba(0, 0, 0, 0.05);
		
	}

	.top-title-text {
		position: absolute;
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 320rpx;
		box-shadow: 0 0 1rpx 0 rgba(0, 0, 0, 0.05);
	}
	.top-title-icon{
		position: absolute;
		left: 30rpx;
		top: 26rpx;
	}


	/* 中部类别 */
	.center{
		position: fixed;
		width: 100%;
		height: 90rpx;
		/* padding: 30rpx 0; */
		z-index: 66;
		background-color: #FFFFFF;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	.center-title {
		margin: 30rpx  0;
		
	}

	.titleActive {
		font-weight: bold;
	}

	.centerTitleView {
		text-align: center;
	}
	.centerTitleViewText{
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		line-height: 40rpx;
	}
</style>
