
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="./case" >
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		
		<view>
			<view class="detail-img">
				<image :src="data.filepath" mode=""></image>
			</view>
			<view>
				<view class="text-title">{{title}}</view>
				<view class="up-text">
					<text>
					{{data.fwgx}}{{'&nbsp;&nbsp;'}}|{{'&nbsp;'}}{{data.zxfg}}{{'&nbsp;'}}|{{'&nbsp;'}}{{data.jzmj}} 
					</text>
					<text>
					{{'&nbsp;'}}|{{'&nbsp;'}}{{data.jtzxcj}}{{'&nbsp;'}}{{data.qbbb}}{{'&nbsp;'}}|{{'&nbsp;'}}{{data.xmmc}}
					</text>
				</view>
				
				<view class="center-box">
					<image class="box-img" :src="data.company_logo" mode=""></image>
					<view class="box-text-one">
						{{data.companyname_s}}
					</view>
					<view class="box-text-two">
						<u-icon :name="index>data.company_score?'star':'star-fill'" v-for="index in 5" color="#FF794A" :key="index"></u-icon>
					</view>
					<button class="box-button" @click="buttonClick(data.company_url)" >预约</button>
				</view>
				
				<view class="text-title">
					设计方案
				</view>
				<view >
					<view v-for="(item,index) in attachment" :key="index" >
						<view class="bottom-img">
							<image :src="item.filepath" mode=""></image>
						</view>
						<view class="bottom-text">
							<text>
								{{item.title}}
							</text>
						</view>
					</view>
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
				data:{},
				star:'',
				starIndex:3,
				title:'',
				othercase:[],
				attachment:[],
				contentid:''
			}
		},
		onShow() {
			
			
		},
		onPullDownRefresh() {
			let _this = this
			_this.handleData()
			
			
		},
		created() {
			uni.startPullDownRefresh({
				success() {
					console.log('进入页面的刷新掩饰加载数据')
				}
			})
			let _this = this
			uni.getStorage({
				key:'caseDetailId',
				success(res) {
					console.log('详情id',res.data)
					let obj = {
						contentid:res.data
					}
					_this.contentid = res.data
					_this.$http.Get('gallery/getInfo',obj).then(re=>{
						console.log('案例详情',re.data)
						_this.title = re.data.data.title
						_this.othercase = re.data.data.othercase
						_this.attachment = re.data.data.attachment
						_this.data = re.data.data.data
						setTimeout(function(){
							uni.stopPullDownRefresh()
						},1500)
					})
				}
			})
		},
		
		methods: {
			
			handleData(){
				let obj = {
					contentid:this.contentid
				}
				this.$http.Get('gallery/getInfo',obj).then(re=>{
					console.log('案例详情的刷新之后的数据',re.data)
					this.title = re.data.data.title
					this.othercase = re.data.data.othercase
					this.attachment = re.data.data.attachment
					this.data = re.data.data.data
					setTimeout(function(){
						uni.stopPullDownRefresh()
					},1000)
				})
			},
			
			
			buttonClick(url){
				uni.setStorage({
					key:'caseDetailCompany',
					data:url,
					success() {
						console.log('公司的外部页面地址已经存入成功',url)
						uni.navigateTo({
							url:'./detailCompany',
							success() {
								console.log('跳转成功')
							},
							fail(err) {
								console.log('跳转失败',err)
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	
	
	/* 中部图片box */
	.center-box{
		width: 690rpx;
		height: 160rpx;
		background-color:#F7F7F8;
		margin: 30rpx;
		position: relative;
	}
	
	.box-img{
		margin: 30rpx;
		width: 220rpx;
		height: 100rpx;
	}
	.box-text-one{
		position: absolute;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-weight: bold;
		left: 280rpx;
		top: 30rpx;
	}
	.box-text-two{
		position: absolute;
		left: 280rpx;
		bottom: 30rpx;
	}
	.box-button{
		position: absolute;
		/* width: 100rpx; */
		height: 50rpx;
		border: 1rpx solid #101010;
		border-radius: 40rpx;
		font-size: 28rpx;
		line-height: 50rpx;
		top: 50rpx;
		right: 30rpx;
	}
	
	
	.detail-img image{
		width: 750rpx;
		height: 400rpx;
	}
	
	.up-text{
		font-size: 26rpx;
		line-height: 38rpx;
		color: #666666;
		margin: 30rpx;
	}
	
	.text-title{
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: bold;
		color: #101010;
		margin: 30rpx;
	}
	
	.bottom-img image{
		width: 690rpx;
		margin:0 30rpx;
	}
	.bottom-text{
		text-align: center;
		margin: 22rpx 0 40rpx 0;
	}
	.bottom-text text{
		font-size: 28rpx;
		line-height: 40rpx;
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
</style>
