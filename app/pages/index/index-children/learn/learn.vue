<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
				<text class="top-title-text">{{'学装修'}}</text>
			</view>

			<view class="center-title" >
				<v-tabstwo  :tabs="titleData" v-model="current"  field="title"  activeColor="#101010" 
				 @change="changeTab">
				</v-tabstwo>
			</view>
			
		</view>

		<view style="height: 220rpx;"></view>
		
		<!-- 搜索弹出层 -->
		<u-popup  z-index="66" v-model="isShow" mode="top">
			<view style="height: 220rpx;"></view>
			<view  class="child-title">
				<u-row>
					<u-col span="3" v-for="(item,index) in childrenTitleList" :key="index">
						<view :class="{childActive:index==isChildActive,childButton:true}" @click="childClick(item.value,index)">{{item.name}}</view>
					</u-col>
				</u-row>
			</view>
		</u-popup>


		<!-- 下部图片 -->
		<view class="bottom-img">

			<view v-if="!(current==9||current==10)">
				<view v-for="(item,index) in imgList" :key="index">
					<view @click="webViewClick(item.pageurl)" hover-class="none">
						<view class="info-imgs">
							<view class="info-imgs-text">{{item.title}}</view>
							<view class="info-imgs-title">
								<view class="info-imgs-icon">
									<u-icon name="eye" color="#EEEEF1"></u-icon>
									{{'&nbsp;'}}{{item.hits}}
								</view>
							</view>
							<image class="info-img" :src="item.thumb" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<!-- 装修 日记 -->
			<view v-if="current==9">
				<view v-for="(item,index) in imgList" :key="index">

					<view class="info-imgs-two">

						<view class="info-imgs-two-text" @click="webViewClick(item.url)">
							{{item.title}}({{item.ask_list?item.ask_list.length:0}}篇）
						</view>

						<view>
							<image class="info-two-img" :src="i" v-for="(i,index) in item.imgs" :key="index">
							</image>
						</view>

						<view class="info-imgs-two-title">
							<view :class="{nodeActive:(nodeList.indexOf(item.rizhi_id)>-1),infoImgsTwoIcon:true}" @click="nodeClick(item.rizhi_id)">
								<u-icon name="eye"></u-icon>
								{{'&nbsp;'}}
								<text>
									{{nodeList.indexOf(item.rizhi_id)>-1?item.readcount+1:item.readcount}}
								</text>

							</view>
						</view>
					</view>

				</view>
			</view>

			<view v-if="current==10">
				<view v-for="(item,index) in imgList" :key="index">
					<view @click="webViewClick(item.pageurl)" hover-class="none">
						<view class="info-imgs">
							<view class="info-imgs-three-text">{{item.title}}</view>
							<view class="info-imgs-three-title">
								{{item.description}}
							</view>
							<image class="info-img" :src="item.thumb" mode=""></image>
						</view>
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
		components: {},
		data() {
			return {
				titleData: [],
				childrenTitleList: [],
				imgList: [],
				nodeList: [],
				isChildActive: -1,
				current: 0,
				tabKey: 'pg',
				showDown:false,
				isShow:false,
				tabValue: 'xuezhuangxiu',
				page: 0,
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
			this.$http.Get('xue/getTitleData').then(res => {
				console.log('学装修栏目', res.data.data)
				this.titleData = res.data.data
			})
			let obj = {
				page: 1,
				pageSize: 10,
				pg: 'xuezhuangxiu',
			}
			this.$http.Get('xue/getList', obj).then(res => {
				this.imgList = res.data.data.data
			})
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 500)

		},
		computed: {},

		onShow() {
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
			setTimeout(function(){
				_this.handleData()
			},1500)
		},
		methods: {

			// 数据接口
			handleData() {
				++this.page
				let obj = {
					page: this.page,
					pageSize: 10
				}
				if (this.current == 0) {
					obj.pg = 'xuezhuangxiu'
					if (this.page == 1) {
						obj.page = 2
					}
				}
				obj[this.tabKey] = this.tabValue
				console.log('每次进来的传参', obj)
				this.$http.Get('xue/getList', obj).then(res => {
					console.log('学装修的分类数据', res.data.data.data)
					let data = res.data.data.data
					this.showDown = false
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 500)
					if (data.length == 0) {
						this.page--
						return
					}
					if (this.page != 1) {
						this.imgList = this.imgList.concat(data)
					} else {
						this.imgList = data
					}
				})
			},
			handleStyle() {
				++this.page
				let obj = {
					page: this.page,
					pagesize: 10
				}
				obj.style = this.tabValue
				this.$http.Get('zx_diray/getListPage', obj).then(res => {
					console.log('学装修的日记+分类数据', res.data.data)
					let data = []
					data = res.data.data
					this.showDown = false
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 500)
					if (data.length == 0) {
						this.page--
						return
					}
					if (this.page != 1) {
						this.imgList = this.imgList.concat(data)
					} else {
						this.imgList = data
					}

				})
			},
			
			
			tabClick(){
				this.isShow = false
			},


			//tab标签点击
			changeTab(index) {
				this.page = 0
				
				
				console.log('当前选中索引：' + index)
				this.tabKey = this.titleData[index].req
				this.tabValue = this.titleData[index].defvalue
				console.log('点击标题的取值参数', this.tabKey, this.tabValue)
				this.current = index
				this.childrenTitleList = this.titleData[index].data
				if (this.tabKey == 'style') {
					this.handleStyle()
					return
				}
				if(this.childrenTitleList.length!=0){
					this.isShow = true
				}else{
					this.isShow = false
				}
				this.isChildActive = -1
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				
				this.handleData()
			},
			// 子类别点击
			childClick(e, i) {
				console.log(e, i)
				this.page = 0
				this.imgList = []
				this.tabValue = e
				this.isShow = false
				this.isChildActive = i
				uni.startPullDownRefresh({
					success() {
						console.log('刷新掩饰加载数据')
					}
				})
				if (this.tabKey == 'style') {
					this.handleStyle()
					return
				}
				this.handleData()
			},

			// 日记点赞
			nodeClick(id) {
				// 将点击的评论数存入数组用来验证是否点击
				this.nodeList.push(id)
				let obj = {
					opt: 1,
					rizhi_id: id
				}
				this.$http.Post('zx_diray/support', obj).then(res => {
					console.log('给这篇日志点赞了', res.data)
				})
			},

			// 跳转当前文章的外部链接
			webViewClick(url) {
				uni.setStorage({
					key: 'learnDetail',
					data: url,
					success() {
						console.log('日记的外部页面地址已经存入成功', url)
						uni.navigateTo({
							url: 'learn-detail',
						})
					}
				})
			}

		}
	}
</script>

<style scoped>
	.childActive {
		background-color: #FFEEE8 !important;
		color: #FF794A !important;
	}

	.nodeActive {
		color: #FF794A !important;
	}

	/* 图片3 */

	.info-imgs-three-text {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		font-size: 36rpx;
		width: 400rpx;
	}

	.info-imgs-three-title {
		position: absolute;
		bottom: 30rpx;
		left: 20rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 36rpx;
		width: 400rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;

	}





	/* 图片2 */
	.info-imgs-two {
		width: 690rpx;
		background-color: #FFFFFF;
		margin: 20rpx 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.info-two-img {
		width: 200rpx;
		height: 180rpx;
		margin: 20rpx 0;
		margin-right: 10rpx;

	}

	.info-imgs-two-text {
		font-size: 36rpx;
	}

	.infoImgsTwoIcon {
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}

	/* 图片 */
	.info-imgs {
		width: 690rpx;
		height: 190rpx;
		position: relative;
		background-color: #FFFFFF;
		margin: 20rpx 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.info-img {
		position: absolute;
		width: 220rpx;
		height: 150rpx;
		right: 20rpx;
		top: 20rpx;
	}

	.info-imgs-text {
		position: absolute;
		top: 28rpx;
		left: 20rpx;
		width: 400rpx;
	}

	.info-imgs-title {
		position: absolute;
		bottom: 34rpx;
		left: 20rpx;

	}

	.info-imgs-icon {
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}





	/* 中部类别 */
	.center-title {
		width: 690rpx;
		height: 100rpx;
		margin: 0 30rpx;
		margin-top: 100rpx;
	}

	.titleActive {
		font-size: 32rpx;
		font-weight: bold;
	}

	.dataTitle {
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}

	.tab-title-flex {
		display: inline-block;
		width: 690rpx;
	}

	/* 子类别样式 */
	.childButton {
		width: 100%;
		height: 60rpx;
		text-align: center;
		color: #000000;
		margin: 20rpx 0;
		font-size: 24rpx;
		line-height: 56rpx;
		border-radius: 80rpx;
		background-color: #F7F7F8;
	}

	.child-title {
		margin: 0 30rpx;
		margin-bottom: 20rpx;
	}





	/* 头部 */
	.top {
		position: fixed;
		z-index: 88;
		background-color: #FFFFFF;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
	}

	.top-title {
		position: fixed;
		height: 80rpx;
		width: 100%;
		z-index: 88;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
	}

	.top-title-icon {
		position: absolute;
		top: 28rpx;
		left: 30rpx;
	}

	.top-title-text {
		position: absolute;
		font-size: 32rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
