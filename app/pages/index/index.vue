<template>
	<view>
		<!-- <swiper-image v-model="indexShow" :images="flowOneList" ></swiper-image> -->
		<view>
			<!-- 顶部搜索框 -->
			<view class="top-search">
				<!-- 跳转到城市页面 -->
				<view @click="navigateClick()">
					<view class="top-search-text" :key="cityKey">
						{{cityPosition}}{{'&nbsp;'}}
						<u-icon name="arrow-down"></u-icon>
					</view>

				</view>
				<!-- 跳转到搜索页面 -->
				<!-- <navigator url="index-children/search/search" hover-class="none">
					<input disabled type="text" 	 placeholder="10秒计算报价" class="index-top-search-input" />
					<image class="iconSearch" src="../../common/image/index/icon/md-search.png" mode=""></image>
				</navigator> -->
			</view>
			<view style="height: 88rpx;"></view>

			<!-- 轮播图 -->
			<view id="index-top" class="index-swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in imgData" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.thumb" :alt="item.alt" mode=""></image>
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>

			<!-- 按钮图标 -->
			<view class="index-top-button">
				<u-row gutter="12">
					<u-col span="3" v-for="(item,index) in buttonData" :key="index">
						<navigator :url="item.url" hover-class="none">
							<view class="i-t-b-button">
								<image class="button-img" :src="item.image" mode=""></image>
								<br>
								<text>{{item.text}}</text>
							</view>
						</navigator>
					</u-col>
				</u-row>
			</view>


			<!-- 中部背景图 -->
			<view id="index-tabs" class="index-center-img">
				<image src="../../common/image/index/icon/bbbb.png" mode=""></image>
				<view class="index-center-view"></view>
				<text class="index-center-text">
					恭喜业主王先生与
					<text style="color:#FF794A;">鲁公大宅装饰</text>
					签约！
				</text>
			</view>

			<!-- 底部样式分类导航 -->
			<view class="index-tabs">
				<u-row>
					<u-col text-align="center" style="padding: 0;" span="2" v-for="(item,index) in tabList" :key="index">
						<view @click="tabClick(item,index)" :hair-line="false" :class="{tabActive:index==isTabActive,indexTabButton:true}">{{item.name}}
							<view class="" style="height: 6rpx;">

							</view>
							<view v-if="index==isTabActive" class="tabActiveIcon">

							</view>
						</view>
					</u-col>
				</u-row>

				<u-row gutter="12" class="index-tabs-row" v-if="current==1">
					<u-col :span="index==1?3:(index==0||index==3)?2.5:2" v-for="(item,index) in listChild[0]" :key="index">
						<view @click="oneClick(item,index)" :class="{active:index==isActive,indexBottomButton1:true}" size="mini" shape="square"
						 :hair-line="false">{{item.name}}</view>
					</u-col>
				</u-row>

				<u-row gutter="12" class="index-tabs-row" v-if="current==4">
					<u-col :span="index==1?3.6:2.8" v-for="(item,index) in listChild[1]" :key="index">
						<view @click="twoClick(item.dir_b,index)" :class="{active:index==isTwoActive,indexBottomButton2:true,button2:true}">{{item.name}}</view>
					</u-col>
				</u-row>

				<view class="index-tabs-row5" v-show="current==5">
					<view class="index-tabs-row5-two">
						<u-row>
							<u-col>
								<view v-for="(item,index) in xueListData" :key="index" @click="threeClick(item,index)" :class="{active:index==isThreeActive,indexBottomButton:true,button3:true}"
								 size="mini" shape="square" :hair-line="false">{{item.title}}</view>
							</u-col>
						</u-row>
					</view>
				</view>

			</view>

			<view class="index-body">
				<!-- 图片 -->
				<view class="index-bottom-img">
					<view>
						<u-loading mode="flower" :show="show" style="margin-left: 300rpx;" size="88"></u-loading>
					</view>
					<!-- 推荐的图片 -->
					<view class="img-0" v-show="current==0">
						<u-waterfall v-model="flowOneList" ref="uWaterfall0">
							<template v-slot:left="{leftList}">

								<view class="water-left" v-for="(item, index) in leftList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.filepath"
									 :index="index"></u-lazy-load>
									<view class="demo-title">
										{{item.title}}
									</view>
									<view :class="{colorActive:imgList0.indexOf(item.id)>-1,demoIconNum:true}" @click="imgClick0(item,index)">
										<image :src="require('../../common/image/index/icon/'+(imgList0.indexOf(item.id)>-1?'fagratipay':'gratipay')+'.png')">
										</image>
										<view :class="{textActive:imgList0.indexOf(item.id)>-1}">
											{{'&nbsp;'}}{{imgList0.indexOf(item.id)>-1?item.hits+1:item.hits}}
										</view>
									</view>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="water-right" v-for="(item, index) in rightList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.filepath"
									 :index="index"></u-lazy-load>
									<view class="demo-title m-10">
										{{item.title}}
									</view>

									<view :class="{colorActive:imgList0.indexOf(item.id)>-1,demoIconNum:true}" @click="imgClick0(item,index)">
										<image :src="require('../../common/image/index/icon/'+(imgList0.indexOf(item.id)>-1?'fagratipay':'gratipay')+'.png')">
										</image>
										<view :class="{textActive:imgList0.indexOf(item.id)>-1}">
											{{'&nbsp;'}}{{imgList0.indexOf(item.id)>-1?item.hits+1:item.hits}}
										</view>
									</view>

								</view>
							</template>
						</u-waterfall>
						<u-loadmore status="nomore" v-if="xueListShow" />
					</view>

					<!-- 案列 -->
					<view class="img-1" v-show="current==1">
						<u-waterfall v-model="flowTwoList" ref="uWaterfall1">
							<template v-slot:left="{leftList}">
								<view class="water-left" v-for="(item, index) in leftList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="450" class="imgBorderRadius" :image="item.filepath"
									 :index="index"></u-lazy-load>
									<view class="demo-title m-10">
										{{item.mtitle}}
									</view>
									<view class="demo-style1">
										{{item.jzmj+'/'+item.jtzxcj+'/'+item.zxfg}}
									</view>
									<view class="demo-company">
										{{item.companyname_s}}
									</view>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="water-right" v-for="(item, index) in rightList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.filepath"
									 :index="index"></u-lazy-load>
									<view class="demo-title m-10">
										{{item.mtitle}}
									</view>
									<view class="demo-style1">
										{{item.jzmj+'/'+item.jtzxcj+'/'+item.zxfg}}
									</view>
									<view class="demo-company">
										{{item.companyname_s}}
									</view>
								</view>
							</template>
						</u-waterfall>
					</view>

					<!-- 设计师 -->
					<view class="img-2" v-show="current==2">
						<u-waterfall v-model="flowThreeList" ref="uWaterfall2">
							<template v-slot:left="{leftList}">
								<view class="water-left" v-for="(item, index) in leftList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.logo" :index="index"></u-lazy-load>
									<u-row>
										<u-col span="7">
											<view class="demo-title-name m-10">
												{{item.company_fzr||'&emsp;'}}
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-title-img">
												<image src="../../common/image/index/icon/antFill-fire.png" mode=""></image>
												{{item.hits}}
											</view>
										</u-col>
									</u-row>
									<view class="demo-style m-10">
										{{item.company_zw}}
									</view>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="water-right" v-for="(item, index) in rightList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.logo" :index="index"></u-lazy-load>
									<u-row>
										<u-col span="7">
											<view class="demo-title-name m-10">
												{{item.company_fzr||'&emsp;'}}
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-title-img">
												<image src="../../common/image/index/icon/antFill-fire.png" mode=""></image>
												{{item.hits}}
											</view>
										</u-col>
									</u-row>
									<view class="demo-style">
										{{item.company_zw}}
									</view>
								</view>
							</template>
						</u-waterfall>

					</view>

					<!-- 工地 -->
					<view class="img-3" v-show="current==3">
						<u-waterfall v-model="flowFourList" ref="uWaterfall3">
							<template v-slot:left="{leftList}">
								<view class="water-left" v-for="(item, index) in leftList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<view class="posi-img">
										<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.thumb" :index="index"></u-lazy-load>
										<view class="solu-img">
											<view class="demo-title-img address-img">
												<image src="../../common/image/index/icon/md-my_location.png" mode=""></image>
												{{'&emsp;&nbsp;&nbsp;'}}{{item.stage}}
											</view>
										</view>
									</view>
									<view class="demo-title m-10">
										{{item.title}}
									</view>
									<view class="demo-size">
										{{item.area}}㎡/{{item.style}}
									</view>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="water-right" v-for="(item, index) in rightList" :key="index">
									<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
									<view class="posi-img">
										<u-lazy-load @click="indexClick(item.url)" threshold="300" class="imgBorderRadius" :image="item.thumb" :index="index"></u-lazy-load>
										<view class="solu-img">
											<view class="demo-title-img address-img">
												<image src="../../common/image/index/icon/md-my_location.png" mode=""></image>
												{{'&emsp;&nbsp;&nbsp;'}}{{item.stage}}
											</view>
										</view>
									</view>

									<view class="demo-title m-10">
										{{item.title}}
									</view>
									<view class="demo-size">
										{{item.area}}㎡/{{item.style}}
									</view>
								</view>
							</template>
						</u-waterfall>
					</view>

					<!-- 资讯 -->
					<view class="img-4" v-show="current==4">
						<view v-for="(item,index) in list" :key="index" @click="indexClick(item.pageurl)">
							<view class="information" v-if="index!=2">
								<view class="info-text">{{item.title}}</view>
								<view class="info-title">{{item.catname}}</view>
								<view class="info-num">
									<view class="demo-title-img">
										<u-icon name="eye" color="#EEEEF1"></u-icon>
										{{'&nbsp;'}}{{item.hits}}
									</view>
								</view>
								<image class="info-img" :src="item.thumb" mode=""></image>
							</view>


							<view class="information-two" v-if="index==2" @click="indexClick(item.url)">
								<view class="info-text-two">{{item.title}}</view>
								<image class="info-img-two" :src="item.thumb" mode=""></image>
								<view style="height: 60rpx;"></view>
								<view class="info-title-two">{{item.catname}}</view>
								<view class="info-num-two">
									<view class="demo-title-img">
										<u-icon name="eye" color="#EEEEF1"></u-icon>
										{{item.hits}}
									</view>
								</view>

							</view>
						</view>

					</view>

					<!-- 学装修 -->
					<view class="img-5" v-show="current==5">
						<view v-for="(item,index) in xueList" :key="index" @click="indexClick(item.pageurl)">
							<view class="information">
								<view class="info-text">{{item.title}}</view>
								<view class="info-title">
									<view class="demo-title-img">
										<u-icon name="eye" color="#EEEEF1"></u-icon>
										{{'&nbsp;&nbsp;'}}{{isThreeActive==0?item.readcount:item.hits}}
									</view>
								</view>

								<image class="info-img" :src="isThreeActive==0?item.img:item.thumb" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<u-loading mode="circle" color="#18B566" :show="showDown" style="margin-left: 300rpx;" size="88"></u-loading>
					<u-loadmore status="nomore" v-if="xueListShow" />
				</view>
				<u-modal v-model="showModal" width="560" :show-title="false" :show-confirm-button="false">
					<view class="slot-content">
						<view class="modalImage">
							<image src="../../common/image/index/icon/index/update.jpg" mode=""></image>
						</view>
						<view class="modalButton">
							<view class="down-button" @click="doUpData()">
								马上更新
							</view>
							<view class="down-button-down" @click="showModal = false">
								以后再说
							</view>
						</view>

					</view>
				</u-modal>
			</view>
		</view>
	</view>
</template>

<script>
	const buttonData = [{
			text: '装修招标',
			url: 'index-children/bidding/bidding',
			image: require('../../common/image/index/icon/index/antFill-home.png')
		},
		{
			text: '0元设计',
			url: 'index-children/zero/zero',
			image: require('../../common/image/index/icon/index/fa-pen-square.png')
		},
		{
			text: '智选公司',
			url: 'index-children/intelligent/intelligent',
			image: require('../../common/image/index/icon/index/fa-building.png')
		},
		{
			text: '装修案例',
			url: 'index-children/case/case',
			image: require('../../common/image/index/icon/index/md-book.png')
		},
		{
			text: '装修视频',
			url: 'index-children/video/video-two',
			image: require('../../common/image/index/icon/index/md-play_circle_filled.png')
		},
		{
			text: '本地小区',
			url: 'index-children/local_cell/local_cell',
			image: require('../../common/image/index/icon/index/fa-map-signs.png')
		},
		{
			text: '装修问答',
			url: 'index-children/answers/answers',
			image: require('../../common/image/index/icon/index/antFill-question-circle.png')
		},
		{
			text: '学装修',
			url: 'index-children/learn/learn',
			image: require('../../common/image/index/icon/index/md-school.png')
		},
	]
	const tabList = [{
			name: '推荐'
		},
		{
			name: '案例'
		},
		{
			name: '设计师'
		},
		{
			name: '工地'
		},
		{
			name: '资讯'
		},
		{
			name: '学装修'
		}
	]
	const listChild = [
		[{
				name: '小户型',
				house: 1
			},
			{
				name: '现代风格',
				fege: 4
			},
			{
				name: '简约',
				fege: 9
			},
			{
				name: '田园风',
				fege: 6
			},
			{
				name: '美式',
				fege: 3
			}
		],
		[{
				name: '签单快讯',
				dir_b: 'qiandankuaixun'
			},
			{
				name: '装修公司大全',
				dir_b: 'zxgsdq'
			},
			{
				name: '装修设计',
				dir_b: 'bdzxsj'
			},
			{
				name: '装修建材',
				dir_b: 'bdzxjc'
			}
		],
		[{
				name: '日记',
				dir_b: 'rj'
			},
			{
				name: '流程',
				dir_b: 'zxlc'
			},
			{
				name: '风格',
				dir_b: 'zxfg'
			},
			{
				name: '技巧',
				dir_b: 'jjzx'
			},
			{
				name: '经验',
				dir_b: 'zxjy'
			},
			{
				name: '翻新',
				dir_b: 'esfzx'
			}
		]
	]
	export default {

		components: {},
		data() {
			return {
				buttonData,
				tabList,
				listChild,
				ifFirstPage: true,
				showModal: false,
				cityPosition: '',
				cityKey: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				loadStatus: '',
				isActive: -1,
				isTwoActive: -1,
				isThreeActive: 0,
				isTabActive: 0,
				duration: 500,
				showDown: false,
				indexShow: true,
				xueListShow: false,
				fege: 0,
				house: 1,
				dir_b: 'qiandankuaixun',
				imgList0: [],
				imgData: [],
				xueListData: [],
				current: 0,
				page: 2,
				tabStyle: {
					'font-size': '32rpx',
				},
				list: [],
				xueList: [],
				flowList: [],
				flowOneList: [],
				flowTwoList: [],
				flowThreeList: [],
				flowFourList: [],
				designerList: [],
				worksiteList: [],
				isChild:false,
				isCity:false,
				show: false

			}
		},
		watch: {
			current(value) {
				this.page = 1
			},
			isCity(value){
				
			}
		},
		computed: {},
		created() {

			let time = new Date().getTime()
			console.log('当前时间', time)
			uni.getStorage({
				key: 'time',
				success(res) {
					console.log('存储的时间', res.data)
					let updata = time - res.data > 7 * 24 * 60 * 60 * 1000
					console.log('存储的时间与当前时间相比较', updata)
					if (updata) {
						uni.clearStorage()
					}
				},
				fail() {
					uni.setStorage({
						key: 'time',
						data: time,
						success() {
							console.log('第一次进入缓存的时间')
						}
					})
				}
			})
			this.handleSystemData()
		},

		onLoad() {
			this.update()
			this.page = 1
			// this.ifFirstPage = false
			this.current == 0
			console.log('onload')
		},
		onShow() {
			console.log('onshow')
			this.page = 1
			this.isChild = false
			this.handleCity()
		},
		onPullDownRefresh() {
			this.handleCity()
			console.log('onpulldownrefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1500)
		},
		onReachBottom() {
			console.log('onreachbotton')
			this.showDown = true

			// this.ifFirstPage = false
			let _this = this
			// 模拟数据加载
			setTimeout(function() {
				_this.addRandomData()
				uni.stopPullDownRefresh()
			}, 1100)
		},

		mounted() {

		},
		methods: {
			
			handleAllData(i){
				let obj = {
					'page': 1,
					'pagesize': 10,
					'dir':i
				}
				let _this = this
				_this.$http.Get('xgt/getlist',obj).then(res => {
					let listData = res.data.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						item.id = this.$u.guid();
						data.push(item)
					}
					_this.flowOneList = data
				})
				_this.$http.Get('gallery/getlist',obj).then(res => {
					let listData = res.data.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						item.id = this.$u.guid();
						data.push(item)
					}
					_this.flowTwoList = data
				})
				_this.$http.Get('designer/getList',obj).then(res => {
					let listData = res.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						// 设计师的时候名字不能超过5个字
						if (item.company_fzr && item.company_fzr.length > 5) {
							item.company_fzr = item.company_fzr.substring(0, 5)
						}
						item.id = this.$u.guid();
						data.push(item)
					}
					_this.flowThreeList = data
				})
				_this.$http.Get('worksite/getListPage',obj).then(res => {
					let listData = res.data.data
					let data = []
					for (let i = 0; i < listData.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = JSON.parse(JSON.stringify(listData[i]))
						// 工地的时候 title只留工地名
						if (item.title && (item.title.indexOf(' ') > -1)) {
							item.title = (item.title.split(' '))[0]
						}
						item.id = this.$u.guid();
						data.push(item)
					}
					console.log('--------***********----------3',data)
					_this.flowFourList = data
				})
				obj.dir_b = this.dir_b
				_this.$http.Get('xue/getList',obj).then(res => {
					
					this.list = res.data.data.data
				})
				obj[this.tabKey] = this.tabValue
				_this.$http.Get('zx_diray/getList', obj).then(res => {
					this.xueList = res.data.data
				})
			},

			handleSwiper() {
				let _this = this
				_this.$http.Get('banner/getSubsiteFlash').then(res => {
					_this.imgData = res.data.data
				})
				_this.$http.Get('xue/getTitleData').then(res => {
					console.log('学装修栏目', res.data.data)
					_this.xueListData = res.data.data
				})
			},


			update() {
				var _this = this;
				let version = (plus.runtime.version).split('.').join('')
				let newVersion = ''
				console.log('当前版本号version：', version)
				_this.$http.VersionGet('version/getNow').then(res => {
					console.log('最新版本号version：', res.data.data.version)
					newVersion = res.data.data.version.split('.').join('')
					if (newVersion>version) {
						console.log('当前有最新版本，请更新')
						_this.showModal = true
					} else {
						console.log('当前已经是最新版本')
					}
				})

			},

			doUpData() {
				this.showModal = false
				uni.showLoading({
					title: '下载更新中……'
				})
				this.$http.File('https://manage.zx123.cn/zxt_app.apk').then(downloadResult => {
					uni.hideLoading()
					if (downloadResult.statusCode == 200) {
						uni.showModal({
							title: '',
							content: '更新成功，确定现在重启吗？',
							confirmText: '重启',
							confirmColor: '#EE8F57',
							success: function(res) {
								if (res.confirm == true) {
									plus.runtime.install( //安装
										downloadResult.tempFilePath, {
											force: true
										},
										function(res) {
											utils.showToast('更新成功，重启中');
											plus.runtime.restart();
										}
									)
								}
							}
						})
					}
				})

			},

			//存入当前url
			indexClick(url) {
				uni.setStorage({
					key: 'indexUrl',
					data: url,
					success() {
						console.log('index存入当前url及名字成功')
						uni.navigateTo({
							url: 'index-children/index-detail/index-detail'
						})
					}
				})
			},

			// 存储的地理位置信息在首页取出
			handleCity() {
				let that = this
				let _this = this
				uni.getStorage({
					key: 'dirAndAreaid',
					success(res) {
						console.log('存储的地理位置信息在首页取出', res.data)
						that.cityPosition = res.data.areaname
						_this.isCity = true
						_this.$refs.uWaterfall1.clear()
						_this.$refs.uWaterfall2.clear()
						_this.$refs.uWaterfall3.clear()
						_this.xueList = []
						_this.list = []
						// _this.addRandomData(res.data.dir)
						_this.handleSwiper()
						_this.handleAllData(res.data.dir)
					},
					fail(err) {
						console.log('取出储存的城市失败', err)
						// #ifdef APP-PLUS
						//设备的国际移动设备身份码
						plus.device.getInfo({
							success: function(e) {
								console.log('这是设备的编码', e)
								let info = e
								let imei = info.imei.substring(0, 15)
								let imsi = info.imsi[0]
								let uuid = info.uuid.substring(0, 15)
								console.log('设备的国际移动设备身份码', imei, imsi, uuid)
								uni.setStorage({
									key: 'infoimsi',
									data: info,
									success() {
										console.log('首页存入设备的国际移动设备身份码成功')
									}
								})
							},
							fail: function(e) {
								console.log('getDeviceInfo failed: ' + JSON.stringify(e));
							}
						});
						//获取当前城市信息
						uni.getLocation({
							type: 'wgs84',
							geocode: true,
							success: (res) => {
								console.log('获取当前城市信息,只需要城市名字', res)
								let obj = {
									city: res.address.city
								}
								uni.setStorage({
									key: 'latitudeAndLongitude',
									data: res,
									success() {
										console.log('经纬度存储成功')
									}
								})
								//根据城市获取城市信息
								that.$http.All('area/getAreaByName', obj).then((re) => {
									console.log('根据城市名字获取当前城市的相应数据信息', re.data.data)
									uni.setStorage({
										key: 'dirAndAreaid',
										data: re.data.data,
										success() {
											console.log('首页存入当前地理信息成功', re.data.data)
											that.cityPosition = re.data.data.areaname
											_this.isCity = true
											_this.handleSwiper()
											// _this.addRandomData(re.data.data.dir)
											_this.handleAllData(re.data.data.dir)
										}
									})
								})
								getApp().globalData.city = res.address.city
							},
							fail(err) {
								console.log('获取城市失败', err)
							}
						})
						// #endif
					}
				})
				console.log('存储的城市', this.cityPosition)
			},

			change(index) {
				this.current = index;
			},
			handlePostSystem(data) {
				this.$http.Post('tool/agentInfo', data).then(res => {
					console.log('成功------------------------------------------', res)
				})
			},
			handleSystemData() {
				let systemData = []
				//获取当前城市信息
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						console.log('获取当前城市信息', res)
						systemData.push(res)
						this.handlePostSystem(systemData)
					},
					fail(err) {
						console.log('获取城市失败', err)
					}
				})
				//这是设备的编码
				plus.device.getInfo({
					success: function(e) {
						console.log('这是设备的编码', e)
						systemData.push(e)
					},
					fail: function(e) {}
				});
				let app_version = {
					app_version:(plus.runtime.version).split('.').join('')
				}
				console.log('--------------------------------------++++++++++++++++',app_version)
				systemData.push(app_version)
				//系统信息
				uni.getSystemInfo({
					success: function(res) {
						systemData.push(res)
					}
				});
				//网络状态
				uni.getNetworkType({
					success: function(res) {
						systemData.push(res)
					}
				});


				// 获取mac地址
				var net = plus.android.importClass("java.net.NetworkInterface")
				var wl0 = net.getByName('wlan0')
				var macByte = wl0.getHardwareAddress()
				var str = ''
				//下面这段代码来自网络  
				for (var i = 0; i < macByte.length; i++) {
					var tmp = "";
					var num = macByte[i];
					if (num < 0) {
						tmp = (255 + num + 1).toString(16);
					} else {
						tmp = num.toString(16);
					}
					if (tmp.length == 1) {
						tmp = "0" + tmp;
					}
					str += tmp;
				}
				let mac = {
					mac: str
				}
				console.log(mac)
				systemData.push(mac)
			},

			// 数据的获取方法
			addRandomData(i) {
				let _this = this
				console.log('page', this.page)
				let url = ''
				let obj = {
					'page': this.page,
					'pagesize': 10,
					'dir':i
				}

				if (this.current == 0) {
					url = 'xgt/getlist'
				}
				if (this.current == 1) {
					url = 'gallery/getlist'
					if (this.isActive == 0) {
						obj.house = 1
						obj.fege = 0
					} else {
						obj.house = 0
						obj.fege = this.fege
					}
				}
				if (this.current == 2) {
					url = 'designer/getList'
				}
				if (this.current == 3) {
					url = 'worksite/getListPage'
				}
				if (this.current == 4) {
					url = 'xue/getList'
					obj.dir_b = this.dir_b
				}
				if (this.current == 5) {
					url = 'xue/getList'
					obj[this.tabKey] = this.tabValue
					if (this.isThreeActive == 0) {

						this.hangleXue(obj)
						return
					}

				}

				this.$http.Get(url, obj).then((res) => {
					console.log('接口返回数据成功-----', res.data.data)
					console.log('接口返回数据成功', res.data.data.data)
					console.log('当前current---------------',this.current)

					let listData = []
					if (this.current == 4) {
						if (res.data.data.data.length == 0) {
							this.xueListShow = true
							this.showDown = false
						} else {
							this.xueListShow = false
						}
						// if (!this.ifFirstPage) {
						this.list = this.list.concat(res.data.data.data)
						// } else {
						// 	this.list = res.data.data.data
						// }
						this.show = false
						this.page += 1
						return
					}
					if (this.current == 5) {
						if (res.data.data.data.length == 0) {
							this.xueListShow = true
							this.showDown = false
						} else {
							this.xueListShow = false
						}
						// if (!this.ifFirstPage) {
						this.xueList = this.xueList.concat(res.data.data.data)
						// } else {
						// 	this.xueList = res.data.data.data
						// }
						this.show = false
						this.page += 1
						return
					}
					if (this.current == 2 || this.current == 3) {
						if (res.data.data.length == 0) {
							this.xueListShow = true
							this.showDown = false
						} else {
							this.xueListShow = false
							listData = res.data.data
						}

					}
					if (this.current == 1 || this.current == 0) {
						if (res.data.data.data.length == 0) {
							this.xueListShow = true
							this.showDown = false
						} else {
							this.xueListShow = false
							listData = res.data.data.data
						}
						// listData = res.data.data.data
					}
					let data = []
					if (listData.length != 0) {
						for (let i = 0; i < listData.length; i++) {
							// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
							let item = JSON.parse(JSON.stringify(listData[i]))
							// 设计师的时候名字不能超过5个字
							if (this.current == 2 && item.company_fzr && item.company_fzr.length > 5) {
								item.company_fzr = item.company_fzr.substring(0, 5)
							}
							// 工地的时候 title只留工地名
							if (this.current == 3 && item.title && (item.title.indexOf(' ') > -1)) {
								item.title = (item.title.split(' '))[0]
							}
							item.id = this.$u.guid();
							data.push(item)
						}
						console.log('接口里面的page', this.page)
						// if (!this.ifFirstPage) {
							if (this.current == 0) {
								_this.flowOneList = _this.flowOneList.concat(data)
								// console.log('1推荐的图片', this.flowOneList)
							}
							if (this.current == 1) {
								this.flowTwoList = this.flowTwoList.concat(data)
								// console.log('获取更多之后的案列数据', this.flowTwoList)
							}
							if (this.current == 2) {
								this.flowThreeList = this.flowThreeList.concat(data)
							}
							if (this.current == 3) {
								this.flowFourList = this.flowFourList.concat(data)
							}
						// } else {
							// if (this.current == 0) {
							// 	console.log('6++++++++++++',data)
							// 	_this.flowOneList = []
							// 	_this.flowOneList = data
							// }
							// if (this.current == 1) {
							// 	if(this.isChild){
							// 		this.flowTwoList = []
							// 		this.$refs.uWaterfall1.clear()
							// 	}
							// 	if(this.isCity){
							// 		this.flowTwoList = []
							// 		this.$refs.uWaterfall1.clear()
							// 		setTimeout(()=>{
							// 			_this.flowTwoList = data
							// 		},500)
							// 		this.show = false
							// 		this.showDown = false
							// 		this.page += 1
							// 		return
							// 	}
							// 	_this.flowTwoList = data
							// 	console.log('选择风格后重新赋值的案列数据', this.flowTwoList)
							// }
							// if (this.current == 2) {
							// 	if(this.isCity){
							// 		this.flowThreeList = []
							// 		this.$refs.uWaterfall2.clear()
							// 		setTimeout(()=>{
							// 			_this.flowThreeList = data
							// 		},500)
							// 		this.show = false
							// 		this.showDown = false
							// 		this.page += 1
							// 		return
							// 	}
							// 	this.flowThreeList = []
							// 	this.flowThreeList = data
							// }
							// if (this.current == 3) {
							// 	if(this.isCity){
							// 		this.flowFourList = []
							// 		this.$refs.uWaterfall3.clear()
							// 		setTimeout(()=>{
							// 			_this.flowFourList = data
							// 		},500)
							// 		this.show = false
							// 		this.showDown = false
							// 		this.page += 1
							// 		return
							// 	}
							// 	this.flowFourList = []
							// 	this.flowFourList = data
							// }
						// }
					}
					this.show = false
					this.showDown = false
					this.page += 1
					console.log("----------------------this.page-------------------", this.page)
				}).catch(err => {
					console.log(err)
				})
			},
			navigateClick() {
				uni.setStorage({
					key: 'navigateValue',
					data: '../../index',
					success() {
						uni.navigateTo({
							url: 'index-children/address/address'
						})
					}
				})

			},

			// 案列的子选项
			oneClick(e, i) {
				this.ifFirstPage = true
				this.isChild = true
				console.log(e, i)
				this.isActive = i
				if (i == 0) {
					this.house = 1
				} else {
					this.fege = e.fege
				}

				this.show = true
				this.page = 1
				this.flowTwoList = []
				this.addRandomData()


			},
			// 资讯的子选项
			twoClick(e, i) {
				this.ifFirstPage = true
				this.isTwoActive = i
				this.page = 1
				this.show = true
				this.dir_b = e
				this.addRandomData()
			},
			// 学装修的子选项
			threeClick(e, i) {
				this.show = true
				this.ifFirstPage = true
				this.tabKey = e.req
				this.tabValue = e.defvalue
				console.log(e, i)
				this.isThreeActive = i
				this.page = 1
				this.show = true
				this.dir_b = e.dir_b
				this.addRandomData()
			},
			//装修日记的接口返回数据
			hangleXue(obj) {
				this.$http.Get('zx_diray/getList', obj).then(res => {
					console.log('装修日记的接口返回数据', res.data.data)
					// if (!this.ifFirstPage) {
						this.show = false
						// return
						this.xueList = this.xueList.concat(res.data.data)
					// } else {
					// 	this.xueList = res.data.data
					// 	this.show = false
					// }
				})
			},
			// title导航
			tabClick(e, i) {
				this.current = i
				this.ifFirstPage = true
				this.isTabActive = i
				this.page = 1
				// // if(!this.isCity){
				// 	if (i == 0 && this.flowOneList.length != 0) {
				// 		return
				// 	}
				// 	if (i == 1 && this.flowTwoList.length != 0) {
				// 		return
				// 	}
				// 	if (i == 2 && this.flowThreeList.length != 0) {
				// 		return
				// 	}
				// 	if (i == 3 && this.flowFourList.length != 0) {
				// 		return
				// 	}
				// 	if (i == 4 && this.list.length != 0) {
				// 		return
				// 	}
				// 	if (i == 5 && this.xueList.length != 0) {
				// 		return
				// 	}
				// // }
				// console.log('-------------',this.flowOneList)
				// console.log('-------------',this.flowTwoList)
				// console.log('-------------',this.flowThreeList)
				// console.log('-------------',this.flowFourList)
				// console.log('-------------',this.list.length)
				// this.show = true
				this.current = i
				// this.addRandomData()
			},



			// 推荐的图片下面点击
			imgClick0(e, i) {
				let obj = {
					aid: e.aid
				}
				this.$http.Get('xgt/xihuan', obj).then(res => {})
				if (this.imgList0.indexOf(e.id) == -1) {
					this.imgList0.push(e.id)
					for (let i = 0; i < this.flowList.length; i++) {
						if (this.flowList[i].id == e.id) {
							this.flowList[i].price += 1
						}
					}
				} else {
					this.imgList0.splice(this.imgList0.indexOf(e.id), 1)
				}
			}

		},

	}
</script>

<style  scoped>
	body{
		width: 750rpx;
	}
	/* 跟新提示弹窗 */
	.slot-content {
		position: relative;
	}

	.modalCancel {
		text-align: center;
	}

	.modalIcon {
		position: absolute;
		top: 20rpx;
	}

	.modalImage image {
		width: 560rpx;
		height: 380rpx;
	}

	/* .modalButton{
		height: 170rpx;
		text-align: center;
	} */

	.down-button {
		width: 480rpx;
		text-align: center;
		background-color: rgba(255, 103, 74, 100);
		font-family: PingFangSC-regular;
		border-radius: 16rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		margin-top: 80rpx;
		margin-left: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.down-button-down{
		width: 480rpx;
		text-align: center;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		margin: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
	}


	/* 放大图 */
	.imageSwiper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background: $bgColor; */
		z-index: 999;
		transition: all .5s;
		display: flex;
		flex-direction: column;

	}

	.image-swiper-item {
		width: 100%;
	}

	.size-swiper-img {
		width: 100%;
	}


	.imgBorderRadius {
		border-top-left-radius: 16rpx !important;
		border-top-right-radius: 16rpx !important;
	}

	.colorActive {
		color: #333333 !important;

	}

	.textActive {
		color: #FF794A !important;
	}

	.active {
		background-color: #FFEEE8 !important;
		color: #FF794A !important;
	}

	.tabActive {
		font-size: 32rpx !important;
		font-weight: bold !important;
		color: #101010;
	}

	.tabActiveIcon {
		height: 6rpx;
		background-color: #FF794A;
		width: 32rpx;
		margin-left: 44rpx;
	}

	.m-10 {
		font-size: 26rpx;
		line-height: 36rpx;
		color: #101010;
		margin-top: 18rpx;
		margin-left: 20rpx;
	}

	/* 图片5 */

	.info-title .demo-title-img {
		background-color: #FFFFFF
	}


	/* 图片4 */
	.information {
		width: 690rpx;
		height: 200rpx;
		position: relative;
		background-color: #FFFFFF;
		margin: 20rpx 0;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.info-img {
		position: absolute;
		width: 240rpx;
		height: 160rpx;
		right: 20rpx;
		top: 20rpx;
	}

	.info-text {
		font-size: 28rpx;
		line-height: 42rpx;
		color: rgba(16, 16, 16, 100);
		width: 392rpx;
		margin: 28rpx 20rpx 20rpx 20rpx;
	}

	.info-title {
		position: absolute;
		font-size: 24rpx;
		bottom: 34rpx;
		left: 20rpx;
		color: #A1BDE6;
	}

	.info-num {
		position: absolute;
		bottom: 34rpx;
		right: 260rpx;
	}

	.info-num view {
		height: 24rpx;
		line-height: 24rpx;
		background-color: #FFFFFF;
	}


	.information-two {
		width: 690rpx;
		/* height: 500rpx; */
		position: relative;
		background-color: #FFFFFF;
		margin: 20rpx 0;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}

	.info-img-two {
		width: 650rpx;
		height: 360rpx;
		margin-left: 20rpx;
	}

	.info-text-two {
		margin: 20rpx;
	}

	.info-title-two {
		position: absolute;
		font-size: 24rpx;
		bottom: 26rpx;
		left: 20rpx;
		color: #A1BDE6;
	}

	.info-num-two {
		position: absolute;
		bottom: 26rpx;
		right: 20rpx;
	}

	.info-num-two .demo-title-img {
		width: 110rpx;
	}

	.info-num-two view {
		height: 24rpx;
		line-height: 24rpx;
		background-color: #FFFFFF;
	}

	/* 图片3 */
	.posi-img {
		position: relative;

	}

	.solu-img {
		position: absolute;
		bottom: 16rpx;
		right: 20rpx;
	}

	.address-img {
		position: relative;
		width: 160rpx !important;
		color: #101010 !important;
	}

	.address-img image {
		position: absolute;
		top: 6rpx;
		left: 4rpx;
	}

	.demo-size {
		color: #999999;
		font-size: 24rpx;
		line-height: 34rpx;
		margin-bottom: 36rpx;
		margin-top: 14rpx;
		margin-left: 20rpx;
	}


	/* 图片2 */
	.demo-title-img {
		padding-left: 10rpx;
		margin-top: 18rpx;
		width: 120rpx;
		height: 36rpx;
		background-color: #F7F7F8;
		color: #999999;
		border-radius: 20rpx;
		font-size: 24rpx;
		line-height: 34rpx;
	}

	.demo-title-img image {
		width: 24rpx;
		height: 24rpx;
		margin: 0 10rpx;
	}

	.demo-title-name {
		font-size: 28rpx;
		font-weight: bold;
		margin-left: 15rpx;
		/* word-break:break-all;
		display:-webkit-box;
		width: 138rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
	}

	.job-card {
		margin: 10rpx 0rpx;
		padding: 0;
	}

	.demo-style {
		color: #999999;
		font-size: 24rpx;
		margin: 14rpx 0 36rpx 20rpx;
		line-height: 36rpx;
	}

	.demo-style1 {
		color: #999999;
		font-size: 24rpx;
		margin: 12rpx 20rpx;
		line-height: 36rpx;
	}

	.demo-title {
		color: #101010;
		font-size: 28rpx;
		line-height: 36rpx;
		margin: 20rpx 20rpx 16rpx 20rpx;
	}



	/* 图片1 */
	.demo-company {
		color: rgba(161, 189, 230, 1);
		margin-bottom: 28rpx;
		margin-left: 20rpx;
	}

	/* 图片0 */
	.water-left {
		width: 330rpx;
		margin-bottom: 20rpx;
		margin-right: 28rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
		border-radius: 10rpx;

	}

	.water-right {
		width: 330rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0);
	}


	.demoIconNum {
		position: relative;
		text-align: right;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 28rpx;
		margin-left: 230rpx;
		margin-right: 30rpx;
		margin-top: 16rpx;
		height: 28rpx;
	}

	.demoIconNum image {
		display: inline-block;
		position: absolute;
		right: 70rpx;
		width: 28rpx;
		height: 28rpx;
	}

	.demoIconNum view {
		color: #999999;
		line-height: 28rpx;
		display: inline-block;
	}





	/* 类别分类 */

	.indexTabButton {
		background-color: #FFFFFF;
		border: 0;
		font-size: 28rpx;
		margin: 34rpx 0;
	}


	.index-tabs-row {
		margin: 0 20rpx;
		margin-bottom: 40rpx;
	}

	.index-tabs-row5 {
		margin: 0 20rpx;
		margin-bottom: 40rpx;
		overflow-x: scroll;
	}

	.index-tabs-row5-two {
		white-space: nowrap;
	}

	.indexBottomButton {
		display: inline-block;
		color: #101010;
		border-radius: 50rpx;
		padding: 10rpx 24rpx;
		font-size: 28rpx;
		margin: 0 16rpx;
		border: -1rpx;
		background-color: #F7F7F8;
	}

	.indexBottomButton1 {
		display: inline-block;
		color: #101010;
		border-radius: 50rpx;
		padding: 10rpx 24rpx;
		border: -1rpx;
		background-color: #F7F7F8;
	}

	.indexBottomButton2 {
		display: inline-block;
		color: #101010;
		border-radius: 50rpx;
		padding: 10rpx 16rpx;
		border: -1rpx;
		background-color: #F7F7F8;
	}

	.childCol1 {
		margin: 20rpx;
	}

	/* 中部图片 */
	.index-center-img {
		margin: 24rpx 30rpx 30rpx 30rpx;
		background-color: #FFF8F6;
		width: 690rpx;
		height: 100rpx;
		position: relative;
	}

	.index-center-img image {
		height: 80rpx;
		width: 80rpx;
		position: absolute;
		top: 0rpx;
		left: 20rpx;
	}

	.index-center-text {
		position: absolute;
		color: #101010;
		left: 144rpx;
		top: 28rpx;
	}

	.index-center-view {
		height: 70rpx;
		border: 2rpx solid #FFEEE9;
		position: absolute;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #101010;
		left: 110rpx;
		top: 14rpx;
	}

	/* 上部图标 */
	.index-top-button {
		margin-top: 30rpx;
	}

	.button-img {
		width: 60rpx;
		height: 60rpx;
	}

	.i-t-b-button {
		text-align: center;
		margin: 30rpx 0;
	}

	.i-t-b-button text {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #101010;
		font-weight: bold;
		text-align: center;
	}

	/* 上部轮播图 */
	.index-swiper {
		width: 690rpx;
		height: 276rpx;
		margin: 0 30rpx;
		margin-top: 4rpx;
	}

	uni-swiper {
		height: 276rpx;
	}

	.swiper-img {
		width: 690rpx;
		height: 276rpx;
	}

	/* 头部搜索框 */
	.index-body {
		margin: 0 30rpx;
		min-height: 100vh;
	}

	.top-search {
		height: 88rpx;
		width: 750rpx;
		padding-left: 30rpx;
		position: fixed;
		z-index: 88;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
		background-color: #FFFFFF;
	}

	.top-search-text {
		font-size: 28rpx;
		line-height: 60rpx;
		margin-top: 16rpx;
		color: #101010;
	}

	.top-search-icon {
		position: absolute;
		line-height: 48rpx;
		left: 140rpx;
		top: 28rpx;
	}

	.top-search .iconSearch {
		position: absolute;
		right: 40rpx;
		top: 20rpx;
		width: 48rpx;
		height: 48rpx;
	}

	.index-top-search-input {
		padding-left: 30rpx !important;
		position: absolute;
		right: 0;
		top: 14rpx;
		background-color: #F7F7F8;
		width: 480rpx;
		height: 60rpx;
		border-radius: 40rpx;
		font-size: 24rpx;
		line-height: 60rpx;
		color: #999999;
	}
</style>
