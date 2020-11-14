<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../set" hover-class="none">
					<u-icon  :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">修改昵称</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="">
			<u-input  v-model="username" maxlength="20"  class="mobile-input" border-color="#EEEEF1" placeholder="请输入新的昵称" ></u-input>
		</view>
		
		<view>
			<view  :hair-line="false" class="down-button" @click="oKClick()">确认</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
			}
		},
		created() {
			
		},
		onShow() {
			this.handleToken()
		},
		methods:{
			// 判断登录
			handleToken() {
				let _this = this
				uni.getStorage({
					key: 'token',
					success(res) {
						console.log('+++++---------------+++++++++', res.data.username)
						_this.username = res.data.username
					},
					fail(err) {
						console.log('token取出错误', err)
					}
				})
			},
			
			oKClick(){
				
			}
		}
		
	}
</script>

<style scoped>
	.down-button {
		position: fixed;
		bottom: 180rpx;
		width: 604rpx;
		text-align: center;
		background-color: rgba(255, 103, 74, 100);
		font-family: PingFangSC-regular;
		border-radius: 16rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		margin: 30rpx 72rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.mobile-input{
		margin:0 72rpx 60rpx 72rpx ;
		border-bottom: 1rpx solid #EEEEF1 ;
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
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
