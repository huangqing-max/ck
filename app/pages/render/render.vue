<template>
	<view>
		<view class="top-search">
			<navigator url="search/search" hover-class="none">
				<input disabled placeholder-style="line-height:64rpx" type="text" class="inputText" v-model="searchImg" placeholder="海量高清效果图任你搜">
				<image class="searchIcon" src="../../common/image/index/icon/md-search.png" mode=""></image>
				</input>
			</navigator>
		</view>

		<view style="height: 88rpx;"></view>

		<view class="center-class">

			<view class="center-class-name">
				<u-row>
					<u-col :class="{active:index==isActive,titleClass:true}" span="2.4" v-for="(item,index) in list" :key="index"
					 @click="titleClick(item,index)">
						<view class="centerClassTitle">{{item.title}}</view>
					</u-col>
				</u-row>
				<u-row>
					<u-col :class="{childActive:index==isChildActive,childClass:true}" span="2.4" v-for="(item,index) in childrenList"
					 :key="index" @click="childClick(item,index)">
						<view class="centerClassTitle">{{item.name}}</view>
					</u-col>
				</u-row>
			</view>

		</view>

		<!-- 风格头部 -->
		<view class="all-imgs">
			<view :class="{styleActive:index==isStyleActive,styleClass:true}" v-for="(item,index) in tabList" :key="index"
			 @click="styleClick(item,index)">{{item}}
			</view>


			<!-- 侧边弹窗		 -->
			<view>
				<image @click="rightShow = true" class="styleIconClass" src="../../common/image/index/icon/iconxx.png" mode=""></image>
				<u-popup v-model="rightShow" mode="right" width="40%" :closeable="true">
					<view style="height: 100rpx;"></view>
					<view v-for="(item,index) in imgStyleList" :key="index" class="pupup-img" @click="urlClick(item.url)" >
						<view>{{item.text}}</view>
						<image class="right-class" :src="item.img" mode=""></image>
					</view>
				</u-popup>
			</view>

		</view>


		<!-- 图片 -->
		<view class="render-imgs">
			<view>
				<u-loading mode="flower" :show="show" style="margin-left: 340rpx;" size="88"></u-loading>
			</view>
			<view v-show="isStyleActive == 0">
				<view class="wrap">
					<u-waterfall v-model="flowList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.imgurl" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
									<u-icon name="thumb-up" size="36"></u-icon>{{'&nbsp;'}}{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.imgurl" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
									<u-icon name="thumb-up" size="36"></u-icon>{{'&nbsp;'}}{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
								</view>
							</view>
						</template>
					</u-waterfall>
				</view>
			</view>

			<view v-show="isStyleActive==1">
				<view class="wrap">
					<u-waterfall v-model="flowOneList" ref="uWaterfall1">
						<template v-slot:left="{leftList}">
							<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.imgurl" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
									<u-icon name="thumb-up" size="36"></u-icon>{{'&nbsp;'}}{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<u-lazy-load @click="urlClick(item.url)" threshold="300" border-radius="10" :image="item.imgurl" :index="index"></u-lazy-load>
								<view class="demo-title M10">
									{{item.title}}
								</view>
								<view @click="iconClick(item,index)" :class="{color:isImgId.indexOf(item.id)>-1,M10T:true}">
									<u-icon name="thumb-up" size="36"></u-icon>{{'&nbsp;'}}{{isImgId.indexOf(item.id)>-1?item.hits+1:item.hits}}
								</view>
							</view>
						</template>
					</u-waterfall>
				</view>
			</view>

			<view v-show="isStyleActive == 2">
				<view class="render-imgs-bottom">
					<view class="ribBorder" v-for="(item, index) in imgList" :key="index" @click="urlClick(item.url)">
						<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
						<view class="lazyImg">
							<!-- <image :src="item.image" mode=""></image> -->
							<u-lazy-load threshold="300" :image="item.filepath" :index="index" imgMode="scaleToFill"></u-lazy-load>
						</view>

						<view class="demo-description">
							{{item.title}}
						</view>
						<view class="demo-size">
							<text>{{item.jtzxcj}}/{{item.jzmj}}/{{item.zxfg}}{{'&emsp;'}}</text>
							<text class="text-color">{{item.companyname}}</text>
						</view>
					</view>
				</view>
			</view>

			<view v-show="isStyleActive==3">
				<view class="render-imgs-bottom">
					<view class="ribBorder" v-for="(item, index) in imgDList" :key="index">
						<view @click="urlClick(item.url)">
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<view class="lazyImg">
								<u-lazy-load threshold="300" :image="item.pano_thumb" :index="index" imgMode="scaleToFill"></u-lazy-load>
							</view>
							<view class="d3-img" v-if="isStyleActive==3">
							</view>
							<view class="d3-img-two" v-if="isStyleActive==3">
								{{'&emsp;3D全景图&nbsp;'}}
								<u-icon class="arrow-right" name="arrow-right"></u-icon>{{'&emsp;'}}
							</view>

							<view class="demo-description">
								{{item.title}}
							</view>
							<view class="demo-size">
								<text>{{item.mianji}}/{{item.zxfg}}/{{item.hxjg}}/{{item.sctypeid}}{{'&emsp;'}}</text>
								<text class="text-color"></text>
							</view>
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
		data() {
			return {
				searchImg: '',
				isActive: 0,
				isChildActive: -1,
				isStyleActive: 0,
				isColor: 0,
				isImgId: [],
				show: false,
				rightShow: false,
				showDown: false,
				tabList: ['最新美图', '猜您喜欢', '案例', '3D全景图'],
				list: [],
				childrenList: ['客厅', '餐厅', '卧室', '厨房', '卫生间',
					'书房', '玄关', '阳台', '阁楼'
				],
				imgStyleList: [{
						text: '精选案例',
						url:'//m.zx123.cn/hz/zxsj/',
						img: require('../../common/image/render/xgt_item_1.jpg')
					},
					{
						text: '最新美图',
						url:'//m.zx123.cn/xiaoguotu/jingpin/new/',
						img: require('../../common/image/render/xgt_item_2.jpg')
					},
					{
						text: '最热美图',
						url:'//m.zx123.cn/xiaoguotu/jingpin/',
						img: require('../../common/image/render/xgt_item_3.jpg')
					},
					{
						text: '3D全景图',
						url:'//m.zx123.cn/quanjing/',
						img: require('../../common/image/render/xgt_item_4.jpg')
					}
				],
				loadStatus: 'loadmore',
				imei: '', //设备的国际移动设备身份码
				imsi: '', //设备的国际移动用户识别码
				uuid: '', //设备的唯一标识
				flowList: [],
				flowOneList: [],
				imgList: [],
				imgDList: [],
				page: 0,
				isFirst: true,
				filist: [],
				tabKey: '',
				childValue: ''
			}
		},
		watch:{
			isFirst(value){
				if(!value){
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 3000)
				}
			},
			showDown(value){
				let _this = this
				if(value){
					setTimeout(function() {
						_this.showDown = false
					}, 2000)
				}
			}
		},

		onShow() {
			uni.startPullDownRefresh({
				success(res) {
					console.log('刷新成功', res)
				},
				fail(err) {
					console.log(err)
				}
			})
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1500)
			this.page = 0
			this.isStyleActive == 0
			this.addRandomData()
		},
		created() {
			let that = this
			this.$http.Get('xgt/getIndexFilterData').then(res => {
				console.log('效果图的标题', res.data.data)
				that.list = res.data.data
				that.childrenList = res.data.data[0].data
			})
		},
		onReachBottom() {
			this.isFirst = false
			this.showDown = true
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		onPullDownRefresh() {
			this.isFirst = false
			this.page = 0
			this.addRandomData();
		},
		methods: {

			urlClick(url) {
				uni.setStorage({
					key: '3DimgUrl',
					data: url,
					success() {
						console.log('存入3D跳转路径成功')
						uni.navigateTo({
							url: 'webView'
						})
					}
				})
			},

			//父类别点击
			titleClick(e, i) {
				console.log(e, i)
				this.isActive = i
				this.childrenList = e.data
				this.isChildActive = -1
				this.tabKey = e.req

			},
			// 子类点击
			childClick(e, i) {
				console.log(e, i)
				this.isChildActive = i
				this.childValue = e.value
				let obj = {
					tab: this.tabKey || "space",
					child: e.value,
					tabKey: this.isActive,
					childKey: i
				}
				uni.setStorage({
					key: 'renderAndTab',
					data: obj,
					success() {
						console.log('点击的子类已经存入')
					}
				})
				if (this.isActive == 4) {
					uni.navigateTo({
						url: 'render-construction'
					})
				} else {
					uni.navigateTo({
						url: 'render-list'
					})
				}
			},
			//tab标签的点击
			styleClick(e, i) {
				this.isStyleActive = i
				this.page = 0
				if (i == 0 && this.flowList.length != 0) {
					return
				}
				if (i == 1 && this.flowOneList.length != 0) {
					return
				}
				if (i == 2 && this.imgList.length != 0) {
					return
				}
				if (i == 3 && this.imgDList.length != 0) {
					return
				}
				
				this.isFirst = true
				this.page = 0
				this.show = true
				if (i == 0) {
					this.flowList = []
					this.$refs.uWaterfall.clear()
				}
				if (i == 1) {
					this.flowOneList = []
					this.$refs.uWaterfall1.clear()
				}
				this.addRandomData()
			},
			addRandomData() {
				++this.page
				console.log('page---------------------', this.page)
				let url = ''
				let obj = {
					'page': this.page,
					'pagesize': 10,
				}
				if (this.isStyleActive == 0) {
					url = 'xgt/xgtRecode'
					obj.kind = 1
				}
				if (this.isStyleActive == 1) {
					url = 'xgt/xgtRecode'
					obj.kind = 2
				}
				if (this.isStyleActive == 2) {
					url = 'gallery/getlist'
				}
				if (this.isStyleActive == 3) {
					url = 'pano/getlist'
				}
				
				this.$http.Get(url, obj).then(res => {
					
					let data = res.data.data.data

					if (this.isStyleActive == 3) {
						console.log('3d-----美图数据', res.data.data.data)
						if (!this.isFirst) {
							this.imgDList = this.imgDList.concat(data)
						} else {
							this.imgDList = data
						}
						this.showDown = false
						let _this = this

						setTimeout(function() {
							_this.show = false
						}, 1000)
						return
					}
					if (this.isStyleActive == 2) {
						console.log('效果图案列----美图数据', res.data.data.data)
						if (!this.isFirst) {
							this.imgList = this.imgList.concat(data)
						} else {
							this.imgList = data
						}
						this.showDown = false
						let _this = this
						setTimeout(function() {
							_this.show = false
						}, 1000)
						return
					}
					let list = []
					for (let i = 0; i < data.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(data[i]))
						item.id = this.$u.guid()
						list.push(item);
					}
					if (list.length == 0) {
						this.loadStatus = 'nomore'
						this.showDown = false
						return
					}
					console.log('处理后的page', this.page)
					if (this.isStyleActive == 0) {
						console.log('最新美图------数据')
						if (!this.isFirst) {
							this.flowList = this.flowList.concat(list)
						} else {
							this.flowList = list
						}
					}
					if (this.isStyleActive == 1) {
						console.log('猜你喜欢---------数据', res.data.data.data)
						if (!this.isFirst) {
							this.flowOneList = this.flowOneList.concat(list)
						} else {
							this.flowOneList = list
						}
					}
					this.showDown = false
					let _this = this
					setTimeout(function() {
						_this.show = false
					}, 1000)
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 1500)
				})


			},
			iconClick(e, i) {
				this.isColor = 1
				let obj = {
					aid: e.aid
				}
				this.$http.Get('xgt/xihuan', obj).then(res => {})
				if (this.isImgId.indexOf(e.id) == -1) {
					this.isImgId.push(e.id)
					for (let i = 0; i < this.flowList.length; i++) {
						if (this.flowList[i].id == e.id) {
							this.flowList[i].price += 1
						}
					}
				}
			},

		}
	}
</script>

<style scoped>
	.all-imgs {
		height: 60rpx;
		margin-top: 20rpx;
	}

	.color {
		color: #FF794A !important;
	}

	.active {
		background-color: #FFFFFF !important;
		font-weight: bold;
		font-size: 32rpx;
	}

	.childActive {
		font-size: 32rpx;
		font-weight: bold;
	}

	.styleActive {
		font-size: 32rpx;
		color: #101010 !important;
		font-weight: bold;
		border-bottom: 6rpx solid #FF794A;
	}



	/* 图片	 */
	.render-imgs {
		margin-top: 60rpx;
		min-height: 100vh;
	}

	.demo-warter-left {
		margin: 10rpx 10rpx 10rpx 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.demo-warter-right {
		margin: 10rpx 20rpx 10rpx 10rpx;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.M10 {
		margin: 20rpx;

	}

	.M10T {
		margin: 20rpx;
		color: #999999;
	}

	/* 图片2 */
	.text-color {
		color: #A1BDE6;
	}

	.render-imgs-bottom {
		margin: 20rpx;
	}

	.M20 {
		margin: 10rpx 20rpx;
	}

	.ribBorder {
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
		border-radius: 10rpx;
		margin: 20rpx 0;
		position: relative;
	}

	.d3-img {
		position: absolute;
		top: 36%;
		left: 36%;
		opacity: .6;
		color: #FFFFFF;
		width: 200rpx;
		height: 60rpx;
		background-color: #000;
		padding-top: 10rpx;
		border-radius: 30rpx;
	}
	.d3-img-two{
		position: absolute;
		top: 36%;
		left: 36%;
		/* line-height: 40rpx; */
		color: #FFFFFF;
		padding-top: 10rpx;
		border-radius: 30rpx;
	}

	.lazy-img {
		height: 300rpx !important;
	}

	.demo-description {
		font-size: 28rpx;
		margin: 20rpx;
		color: #444;
	}

	.demo-size {
		margin: 20rpx 20rpx 30rpx 20rpx;
		font-size: 24rpx;
		color: #999999;
	}

	/* 头部 */
	.top-search {
		position: fixed;
		height: 88rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1)
	}

	.inputText {
		margin: 14rpx 30rpx;
		height: 60rpx;
		background-color: #F6F6F6;
		font-size: 24rpx;
		line-height: 60rpx;
		padding-left: 20rpx;
		border-radius: 40rpx;
	}

	.searchIcon {
		position: absolute;
		height: 48rpx;
		width: 48rpx;
		right: 54rpx;
		top: 20rpx;
	}

	/* 中部按钮 */
	.center-class {
		/* height: 280rpx; */
		width: 750rpx;
		padding: 10rpx 0;
		background-color: #F6F6F6;
	}

	.center-class-name {
		width: 690rpx;
		/* height: 240rpx; */
		margin: 10rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.titleClass:nth-of-type(1) {
		border-top-left-radius: 20rpx;
	}

	.titleClass:nth-of-type(5) {
		border-top-right-radius: 20rpx;
	}

	.centerClassTitle {
		margin: 20rpx 0;
		text-align: center;
		font-size: 28rpx;

	}

	.titleClass {
		background-color: #fff5f5;
	}

	.childClass {
		color: #999999;
	}


	/* 风格 */
	.styleClass {
		float: left;
		margin: 20rpx;
		font-size: 32rpx;
		color: #999;
		padding-bottom: 20rpx;
	}

	.styleIconClass {
		width: 36rpx;
		height: 36rpx;
		margin-left: 70rpx;
		margin-top: 20rpx;
	}

	/* 弹出层 */
	.right-class {
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
	}

	.pupup-img {
		text-align: center;
		margin: 40rpx 0;
		position: relative;
	}

	.pupup-img view {
		position: absolute;
		left: 31%;
		top: 32%;
		font-size: 28rpx;
		z-index: 88;
		color: #FFFFFF;
	}
</style>
