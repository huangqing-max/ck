<template>
	<view class="container">
		<transition name="fade">
			<view v-if="show" class="kd-shadow" @click="shadowClick">
				<!-- <view class="show-page"> -->
					<swiper  class="swiper" :duration="1000">
						<swiper-item v-for="(item,index) in images" :key="index">
								<view class="key-text">
									{{item.title}}
								</view>
								<movable-view class="movable-view" id="movable-view" >
									<image class="image" :src="item.filepath" alt="" mode="widthFix"></image>
								</movable-view>
								<view class="key-text-down">
									{{item.title}}
								</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item"></view>
						</swiper-item>
					</swiper>
					
					
			</view>
		</transition>
	</view>
</template>

<script>
export default {
	props: {
		images : {
			type: Array,
			default(){
				return []
			}
		},
		value : {
			type: Boolean,
			default : false
		},
		current: {
			type : Number,
			default : 0
		}
	},
	watch:{
		value(val){
			this.show = val
			if(val){
				this.$nextTick(function(){
					this.imagePositionY()
				})
			}
		},
		current(val){
			this.index = val
			this.$nextTick(function(){
				this.imagePositionY()
			})
		}
	},
	mounted(){
		this.handleData()
	},
	created() {
		let _this = this
		uni.getSystemInfo({
			success: (res) => {
				console.log('当前屏幕的',res.windowHeight)
				_this.windowHeight = res.windowHeight
			}
		})
		// uniapp的方法
		
		
	},
	data(){
		return {
			show : this.value,
			index : this.current,
			initY : 0,
			windowHeight:0,
			imageHeight:0,
		}
	},
	methods:{
		
		handleData(){
			let _this = this
			uni.getSystemInfo({
			  success: function (res) { // res - 各种参数
			    let obj = uni.createSelectorQuery().select('#movable-view')
			    obj.boundingClientRect(function (data) { // data - 各种参数
			      console.log('data',data)
				  // _this.imageHeight = data.height
			    }).exec()
			  }
			})
		},
		
		shadowClick(){
			this.show = false
			this.$emit('input',false)
		},
		scrollImgClick(i){
			this.index = i
			this.imagePositionY()
		},
		//计算当前图片的Y值
		async imagePositionY(){
			
			let query = uni.createSelectorQuery().in(this)
			let container = query.select('#movable-area')
			let image = query.select('#movable-view')
			let data = await this.elementPosition(container)
			let info = await this.elementPosition(image)
			console.log(data,info)
			let boxHeight = data.height ? data.height : 0
			let imgHeight = info.height ? info.height : 0
			
			if(imgHeight > boxHeight){
				this.initY = 0
			}else{
				this.initY = (boxHeight - imgHeight)/2
				console.log('</movable-area>',this.initY)
			}
		},
		elementPosition(ele){
			return new Promise((r,j)=>{
				ele.boundingClientRect(data=>{
					if(data){
						r(data)
					}else{
						j(null)
					}
				}).exec()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$bgColor: rgba(#000000,.8);
$white : #ffffff;
$black : #000000;
.swiper{
	height: 100vh;
}
.image{
	width: 100%;
}
.key-text{
	position: absolute;
	top: 20rpx;
	color: $white;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.key-text-down{
	position: absolute;
	bottom: 20rpx;
	color: $white;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.movable-view{
	width: fit-content;
	height: fit-content;
	image{
		width: 750rpx;
		object-fit: initial;
	}
}
.movable-area{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container{
	.fade-enter-active, .fade-leave-active {
		opacity: 1;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.kd-shadow{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $bgColor;
		z-index: 999;
		transition: all .5s;
		display: flex;
		flex-direction: column;
		
		
	}
}
</style>
