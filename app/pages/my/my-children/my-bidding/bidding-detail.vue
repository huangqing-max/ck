
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="my-bidding" >
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">招标详情</text>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>
		
		<view>
			<u-row >
				<u-col text-align="center" span="6" v-for="(item,index) in tabList"  :key="index"  >
					<view :class="{active:index==isTabActive,tab:true}" @click="tabClick(index)" >{{item}}</view>
				</u-col>
			</u-row>
		</view>
		
		<view class="content">
			<view  v-if="isTabActive==0">
				<view class="content-view1">
					项目编号：{{info.contentid}}
					<view class="examine" v-if="info.status_text" >{{info.status_text}}</view>
				</view>
				<view class="content-view">户　　型：{{info.hxjg}} </view>
				<view class="content-view">现　　状：{{info.fwzt}} </view>
				<view class="content-view">面　　积： {{info.mianji}}平米</view>
				<view class="content-view">预　　算： {{info.yushuan}}</view>
				<view class="content-view">类　　型： {{info.zblx}}</view>
				<view class="content-view">开工时间：{{info.dgsj}}</view>
				<view>
					<button class="button" v-if="info.status_text!='审核通过'"  @click="buttonClick()" >继续完善资料</button>
					<button disabled type="default" v-if="info.status_text=='审核通过'" >继续完善资料</button>
				</view>
			</view>
			<view v-if="isTabActive==1">
			     <view class="content-text">
					 暂无资料
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				tabList:['招标详情','公司投标'],
				isTabActive:0,
				info:{},
				data:[],
			}
		},
		created() {
			this.handleData()
		},
		mounted() {
			
		},
		methods: {
			
			handleData(){
				let _this = this
				uni.getStorage({
					key:'myBiddingContentid',
					success(res){
						console.log(res.data)
						let obj = {
							contentid:res.data
						}
						_this.$http.MyGet('my_center/orderShow',obj).then(res=>{
							console.log('返回的详细信息',res.data)
							_this.info = res.data.data
						})
						_this.$http.MyGet('my_center/zbCompany',obj).then(res=>{
							console.log('返回的投标公司列表',res.data.data)
							_this.data = res.data.data
						})
					}
				})
			},
			
			tabClick(i){
				this.isTabActive = i
			},
			
			buttonClick(){
				let data = {
					contentid:this.info.contentid,
					areaname:this.info.areaname,
					updatetime:this.info.updatetime,
				}
				uni.setStorage({
					key:'',
					data:data,
					success() {
						uni.navigateTo({
							url:'prefect-infomation'
						})
					},
				})
				
			}
			
		}
	}
</script>

<style scoped>
	
	
	
	.content-text{
		text-align: center;
		margin: 100rpx;
		padding: 100rpx;
		color: #666666;
	}
	
	.active{
		font-weight: bold;
	}
	.content{
		margin: 30rpx 90rpx;
	}
	
	.content-view{
		margin: 30rpx 0;
		font-size: 28rpx;
		color: #101010;
	}
	
	.content-view1{
		margin: 30rpx 0;
		padding-bottom: 30rpx;
		font-size: 28rpx;
		color: #101010;
		position: relative;
	}
	.examine{
		position: absolute;
		text-align: center;
		left: 76%;
		top: -10rpx;
		height: 50rpx;
		padding: 0 10rpx;
		line-height: 50rpx;
		border-radius: 40rpx;
		background-color: #EE5858;
		color: #FFFFFF;
	}
	
	
		
	.button{
		background-color:#FF674A;
		color: #FFFFFF;
		border-radius: 16rpx;
		margin-top: 96rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	
	.tab{
		margin: 30rpx 0;
		font-size: 28rpx;
	}
	
/* 头部 */
	.top-title{
		position: fixed;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
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
</style>
