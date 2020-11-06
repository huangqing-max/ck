<template>
	<view>
		<view class="back">
			<navigator url="../../index" hover-class="none" open-type="switchTab">
				<u-icon class="backIcon" name="arrow-left"></u-icon>
				<text class="backName">0元设计</text>
			</navigator>
		</view>
		<web-view style="height: 80rpx;" :webview-styles="webviewStyles" src="//m.zx123.cn/zxt/sheji.html?utm_source=app"></web-view>
		
<!-- 		<view>
			<view>
				
				<view class="top-text">
					<navigator url="../../index" open-type="switchTab">
					<u-icon class="top-icon"  size="48" name="arrow-left"></u-icon>
					</navigator>
					<text>0元装修</text>
				</view>
				
				<view style="height: 80rpx;"></view>
				
				<view  class="top-img">
					<image src="../../../../common/image/index/swiper/001.jpg" mode=""></image>
					<view class="text1">抢领免费设计</view>
					<view class="text2">只需3秒&emsp;免费体验领到手&emsp;装修不用愁</view>
				</view>
				
				<u-picker 
				@columnchange="columnchange"
				mode="multiSelector" 
				v-model="show"   
				@confirm="confirm" 
				:defaultSelector="defaultSelector"
				:range="range" 
				range-key="name" ></u-picker>
				
				<view class="form">
					<u-row>
						<u-col span="6" @click="show=true">
							<u-icon class="form-icon" color="#999999"  name="play-right-fill"></u-icon>
							<input v-model="addressCity"  class="form-input" type="text" value="" placeholder="请选择你所在的城市" />
						</u-col>
						<u-col span="6">
							<input v-model="size" class="form-input" type="text" value="" placeholder="房屋面积" />
						</u-col>
					</u-row>
					<u-row>
						<u-col>
							<input v-model="mobile" class="form-input" type="text" value="" placeholder="你的电话" />
						</u-col>
					</u-row>
					<u-row>
						<u-col>
							<u-checkbox active-color="#FF794A" label-size="28"  size="28" 
							v-model="checked" :disabled="false">
							<text style="color: #999999;line-height: 80rpx;">我已阅读并同意《服务条款》</text>
							</u-checkbox>
						</u-col>
					</u-row>
					<u-row>
						<u-col>
							<button :disabled="!checked" type="default" class="form-button" @click="submit()">马上申请</button>
						</u-col>
					</u-row>
					
				</view>
			</view>
			
			<view style="height: 16rpx;background-color: #F7F7F8;"></view>
			
			<view>
				<view  class="top-img">
					<view class="text1">专业设计师一对一服务</view>
					<view class="text2">80万合作设计师</view>
				</view>
				
			</view>
		</view>
	 -->
	</view>
</template>

<script>
	import cityData from '../../../../data/city_code.js'
	export default{
		data(){
			return{
				webviewStyles: {
					progress: {
						color: '#FF3333',
					}
				},
				url:'',
				checked:false,
				show:false,
				list:cityData.data,
				range:[[],[],[]],
				addressCity:'',
				size:'',
				defaultSelector: [0],
				mobile:null,
				params:{
					province: true,
					city: true,
					area: true
				},
				imgList: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],
			}
		},
		watch:{},
		computed:{},
		created(){
			
			
			
			for (let i = 0; i < this.list.length; i++) {
				this.range[0].push(this.list[i].name)
			}
			for (let i = 0; i < this.list[0].city.length; i++) {
				this.range[1].push(this.list[0].city[i].name)
			}
			for (let i = 0; i < this.list[0].city[0].area.length; i++) {
				this.range[2].push(this.list[0].city[0].area[i].name)
			}
		},
		mounted(){},
		methods:{
			submit(){
				let data = {}
				data.address = this.addressCity
				data.size = this.size
				data.mobile = this.mobile
			},
			
			// 更改地址的数据源
			columnchange(e){
				let column = e.column, index = e.index;
				this.defaultSelector[column] = index;
				let index1;
				let index2;
				
				if(e.column==0){
				    index1 = e.index
					let range2 = []
					for (let i = 0; i < this.list[index1].city.length; i++) {
						range2.push(this.list[index1].city[i].name)
					}
					this.range[1] = range2
					this.defaultSelector.splice(1, 1, index1)
					this.defaultSelector.splice(2, 1, 0)
				}else{
					index2 = e.index
					let range3 = []
					for (let i = 0; i < this.list[this.defaultSelector[0]].city[this.defaultSelector[1]].area.length; i++) {
						range3.push(this.list[this.defaultSelector[0]].city[this.defaultSelector[1]].area[i].name)
					}
					this.range[2] = range3
					this.defaultSelector.splice(2, 1, index2)
				}
			},
			
			// 点击获取的
			confirm(data){
				console.log('点击获取的'+this.defaultSelector)
				
				let province = this.range[0][this.defaultSelector[0]]
				let city = this.range[1][this.defaultSelector[1]]
				let area = this.range[2][this.defaultSelector[2]]
				this.addressCity = province+city+area
			}
			
		},
		
	}
</script>

<style scoped>
	
	.back{
		z-index: 9999;
		position: fixed;
		width: 100%;
		height: 80rpx;
		line-height: 88rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
		text-align: center;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.05);
	}
	.backIcon{
		position: absolute;
		left: 30rpx;
		top: 30rpx;
	}
	
	/* 轮播照片墙 */
	.width3{
		width: 33%;
		height: 200rpx;
	}
	
	.width3 image{
		width: 33%;
		height: 200rpx;
	}



	
	/* 表单 */
	.form{
		width: 690rpx;
		margin: 30rpx;
		position: relative;
	}
	.form-icon{
		position: absolute;
		left: 280rpx;
		top: 38rpx;
	}
	.form-input{
		border: 2rpx solid #EEEEF1;
		margin: 8rpx 0;
		border-radius: 20rpx;
		height: 80rpx;
		padding-left: 20rpx;
	}
	.input-placeholder{
		font-size: 24rpx;
		color: #999999;
	}
	.form-button{
		background-color: #FF794A;
		color: #FFFFFF;
	}
	.form-check{
		border: 1rpx solid #000000;
	}
	
	
	
    /* 头部 */
	.top-text{
		text-align: center;
		width: 100%;
		position: fixed;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow:0 1px 0 0 rgba(0,0,0,0.1) ;
	}
	.top-text text{
		position: absolute;
		top: 24rpx;
		left: 324rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.top-icon{
		float: left;
		margin: 20rpx 14rpx;
	}
	
	/* 图片及下面文字 */
	.top-img{
		text-align: center;
	}
	.top-img image{
		width: 750rpx;
		height: 320rpx;
	}
	.text1{
		font-size: 32rpx;
		font-weight: bold;
		margin: 60rpx 0 20rpx 0;
	}
	.text2{
		color: #999999;
		font-size: 28rpx;
	}
</style>
