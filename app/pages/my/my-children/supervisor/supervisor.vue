<template>
	<view>
		<view>
			
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <view class="top-title-text">装修监理</view>
				</view>
			</view>
			
			<view style="height: 120rpx;"></view>
			
			<view v-if="show" class="content1">
				<view class="content1-top-text">
					您还没有购买质检服务~
				</view>
				<view class="content1-down">
					<view class="content1-down-text1">
						<text class="text-left">装修质检</text>
						<view class="text-right mr10" >
							了解更多
							<u-icon size="24" class="" name="arrow-right"></u-icon>
						</view>
						<view class="clear"></view>
					</view>
					<view class="content1-down-text2">
						广告语XXXXXXXXXXXXXXXXXXXXXX
					</view>
				</view>
			</view>
			
			<view v-if="!show" class="content2">
				<view class="text-url1">
					<view class="text-right">
						订单详情
						<u-icon size="24" class="" name="arrow-right"></u-icon>
					</view>
					<view class="clear"></view>
				</view>
				<view class="content2-box">
					<view class="content2-box-top">
						<text class="text2-left">最近更新：水电施工验收</text>
						<view class="text2-right mr10" >
							2020.11.02
						</view>
						<view class="clear"></view>
					</view>
					<view class="content2-box-down">
						<view class="content2-box-left">
							<view class="left-top">
								<text class="text-sum">178</text>
								<text class="text">天</text>
							</view>
							<view class="left-down">
								<text class="text">开工至今</text>
							</view>
						</view>
						<view class="content2-box-center">
							<view class="left-top">
								<text class="text-sum">18</text>
								<text class="text">项</text>
							</view>
							<view class="left-down">
								<text class="text">隐患项</text>
							</view>
						</view>
						<view class="content2-box-right">
							<view class="left-top">
								<text class="text-sum">35</text>
								<text class="text">项</text>
							</view>
							<view class="left-down">
								<text class="text">符合标准</text>
							</view>
						</view>
					</view>
				</view>
				<view class="content2-down">
					<view class="text-url" v-for="(item,index) in data" :key="index">
						<text class="text3-left">{{item.left}}</text>
						<!-- <view v-if="index<4" class="text-right">
							隐患项({{right1}}) &emsp; 符合标准({{right2}})
							<u-icon size="24" class="" name="arrow-right"></u-icon>
						</view> -->
						<view  class="text3-right">
							{{item.right}}
							<u-icon size="24" class="" name="arrow-right"></u-icon>
						</view>
						<view class="clear"></view>
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
				show:false,
				data:[
					{left:'开工准备与施工交底',right:'隐患项(6)符合标准(23)'},
					{left:'水电施工巡检',right:'隐患项(6)符合标准(23)'},
					{left:'水电施工验收',right:'隐患项(6)符合标准(23)'},
					{left:'阶段4',right:'预约成功，正在分配监理'},
					{left:'阶段5',right:'等待监理上门'},
					{left:'阶段6',right:'详情'},
					{left:'阶段7',right:'详情'},
					{left:'阶段8',right:'详情'},
					{left:'阶段9',right:'详情'},
					{left:'阶段10',right:'详情'},
				],
			}
		},
		watch:{},
		computed:{},
		created(){},
		onShow() {
		},
		mounted(){
		},
		onPullDownRefresh() {
		},
		methods:{
			
			
			
		},
		
	}
</script>

<style scoped>
	
	.clear{
		clear: both;
	}
	.text-sum{
		font-size: 44rpx;
	}
	.text3-left{
		float: left;
		font-size: 28rpx;
		color: #101010;
	}
	.text3-right{
		float: right;
		font-size: 28rpx;
		color: #101010;
	}
	.text{
		font-size: 28rpx;
	}
	.text-url{
		height: 88rpx;
		line-height: 88rpx;
		border-bottom: 1rpx solid #BBBBBB;
	}
	.text-url1{
		height: 88rpx;
		line-height: 88rpx;
	}
	.content2-down{
		margin-top: 70rpx;
	}
	.content2-box-down{
		display: flex;
		margin-top: 80rpx;
	}
	.content2-box-left{
		text-align: right;
		margin-left: 60rpx;
	}
	.content2-box-center{
		text-align: right;
		margin-left: 120rpx;
	}
	.content2-box-right{
		text-align: right;
		margin-left: 160rpx;
	}
	.content2-box-top{
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.content2-box{
		width: 690rpx;
		height: 360rpx;
		border: 1rpx solid #BBBBBB;
	}
	.content2{
		width: 690rpx;
		margin: 0 auto;
	}
	
	.mr10{
		margin-right: 20rpx;
	}
	.content1-down-text2{
		text-align: center;
		line-height: 100rpx;
		height: 120rpx;
	}
	.text2-left{
		margin-left: 24rpx;
		font-size: 28rpx;
		color: #101010;
		float: left;
	}
	.text2-right{
		float: right;
		margin-bottom: 28rpx;
		font-size: 28rpx;
		color: #101010;
	}
	.text-left{
		margin-left: 24rpx;
		font-size: 32rpx;
		color: #101010;
		float: left;
	}
	.text-right{
		float: right;
		margin-bottom: 28rpx;
		font-size: 28rpx;
		color: #101010;
	}
	.content1-down-text1{
		height: 80rpx;
		line-height: 80rpx;
	}
	
	
	
	.content1-down{
		width: 690rpx;
		height: 200rpx;
		border: 1rpx solid #BBBBBB;
		margin: 20rpx auto;
	}
	
	.content1-top-text{
		height: 300rpx;
		text-align: center;
		line-height: 300rpx;
		font-size: 28rpx;
		color: #101010;
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
		text-align: center;
		color: #101010;
		font-size: 28rpx;
		line-height: 80rpx;
	}
</style>
