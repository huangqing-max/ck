<template>
	<view>
		<view>
			<view class="top-search">
				<input type="text" v-model="selectInput" placeholder="免费报价" 
				class="index-top-search-input" />
				<text class="top-search-icon" @click="searchClick()">搜索</text>
				<!-- <navigator url="../../index" open-type="navigateBack">
					<text class="top-search-icon">{{'取消'}}</text>
				</navigator> -->
			</view>
			<view style="height: 120rpx;"></view>
			
			<!-- 热门搜索 -->
			<view class="history-address">
				<view class="history-address-title">热门搜索</view>
				<view class="button-box">
					<u-row>
						<u-col span="3" v-for="(item,index) in historyCityList" :key="index" @click="historyClick(item.name)" >
							<view   @click="tabClick(item,index)" :hair-line="false"
							:class="{tabActive:index==isTabActive,indexTabButton:true}">{{item.name}}</view>
						</u-col>
					</u-row>
				</view>
			</view>
			
			
			<!-- 热门装修攻略 -->
			<view class="history-address">
				<view class="history-address-title">热门装修攻略</view>
				<view>
					<u-row v-for="(item,index) in data" :key="index">
						<view class="img-box">
							<view class="img-left">
								<image :src="item.thumb" mode=""></image>
							</view>
							<view class="text-right">
								{{item.title}} 
								<image src="../../../../common/image/index/icon/antFill-fire.png" mode=""></image>
							</view>
							<view class="text-bottom">
							    <u-icon name="eye"></u-icon>	{{'&emsp;'}}{{item.hits}}
							</view>
						</view>
					</u-row>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isTabActive:-1,
				selectInput:'',
				data:[],
				historyCityList:[
					{name:'现代风格'},
					{name:'小户型'},
					{name:'简约现代'},
					{name:'免费设计'},
					{name:'客厅装修'},
					{name:'儿童房'},
				],
			}
		},
		watch:{
			selectInput(value){
				console.log('value:'+value)
			}
		},
		computed:{},
		created(){},
		mounted(){},
		methods:{
			//热门搜索选择
			tabClick(e,i){
				this.isTabActive = i
			},
			
			historyClick(name){
				
			},
			
			searchClick(){
				let obj = {
					ekeyword:this.selectInput
				}
				this.$http.Get('index/search',obj).then(res=>{
					console.log('搜索数据',res.data)
					this.historyCityList = res.data.data.xgt_tag
					this.data = res.data.data.article
				})
			}
		},
		
	}
</script>

<style scoped>
	
	.img-box{
		height: 200rpx;
		width: 690rpx;
		margin: 30rpx;
		position: relative;
		box-shadow:1px 1px 1px 1px rgba(0,0,0,0.05);
	}
	.img-left image{
		margin-top: 20rpx;
		margin-left: 20rpx;
		height: 160rpx;
		width: 160rpx;
	}
	.text-right{
		position: absolute;
		top: 20rpx;
		left: 200rpx;
	}
	.text-right image{
		width: 24rpx;
		height: 24rpx;
	}
	.text-bottom{
		position: absolute;
		top: 120rpx;
		left: 200rpx;
		color: #999999;
	}
	
	
	/* 历史访问 */
	.history-address{
		/* margin:0rpx 20rpx; */
	}
	.history-address-title{
		font-size: 32rpx;
		font-weight: bold;
		margin: 20rpx 30rpx;
	}
	.indexTabButton{
		text-align: center;
		padding: 10rpx 20rpx;
		margin: 20rpx 0;
		border-radius: 40rpx;
		background-color: #F3F4F6;
		border: 0;
		font-weight: 500;
	}
	.tabActive{
		background-color: #FFEEE8;
		color: #FF794A;
	}
	.button-box{
		margin: 0 20rpx;
	}
	
	/* 头部 */
	.top-search{
		position: fixed;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	.uni-input-placeholder{
		top:10rpx!important;	
	}
	.index-top-search-input {
		padding-left: 30rpx!important;
		position: absolute;
		left: 40rpx;
		top: 14rpx;
		background-color: #F7F7F8;
		width: 546rpx;
		height: 60rpx;
		border-radius: 40rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #999999;
	}
	.top-search-icon{
		position: absolute;
		right: 30rpx;
		top: 24rpx;
		font-weight: bold;
	}
</style>
