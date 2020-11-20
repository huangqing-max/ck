<template>
	<view>
		<view>
			<view>
				<navigator url="my-children/set/set" hover-class="none">
					<image class="set-icon" src="../../common/image/index/icon/mb-cog.png"  mode=""></image>
				</navigator>
				
			</view>
			<view class="personal-introduction">
				
				<view  class="">
					<navigator v-if="!isLogin" url="my-children/userinfo/user-detail" hover-class="none">
					    <image :src="info.logo||'my-children/userinfo/userinfo'" mode=""></image>
						<text class="text-up">{{info.username||'暂时未取名'}}</text>
						<text class="text-down">项目ID：{{info.contentid||'暂无资料'}}</text>
						<u-icon :bold="true" class="personal-icon" name="arrow-right"></u-icon>
					</navigator>
					
					<navigator v-if="isLogin" url="login" hover-class="none">
						<image src="../../common/image/index/icon/my/head_default.gif" mode=""></image>
						<view class="login-button">
							登录装信通
						</view>
					</navigator>
					
				</view>
			</view>
			<view style="background-color: #F4F4F6;height: 16rpx;"></view>
			<view>
				<view class="my-list" v-for="(item,index) in myData" :key="index" @click="myClick(item.url)" >
						<image class="my-img" :src="item.img" mode=""></image>
						<text>{{item.title}}</text>
						<u-icon :bold="true" class="icon-right" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				isLogin:false,
				info:{},
				myData: [{
						title: '我的招标',
						url: 'my-children/my-bidding/my-bidding',
						img: require('../../common/image/index/icon/my/md-assignment_turned_in.png')
					},
					// {
					// 	title: '联系客服',	
					// 	url: '',
					// 	img: require('../../common/image/index/icon/my/antFill-customer-service.png')
					// },
					{
						title: '关于我们',
						url: 'my-children/about-us/about-us',
						img: require('../../common/image/index/icon/my/md-perm_contact_calendar.png')
					},
					{
						title: '站内信息',
						url: 'my-children/station-infomation/station-infomation',
						img: require('../../common/image/index/icon/my/md-email.png')
					},
					{
						title: '合同列表',
						url: 'my-children/contract-list/contract-list',
						img: require('../../common/image/index/icon/my/md-library_books.png')
					},
					{
						title: '上传合同',
						url: 'my-children/upload-contract/upload-contract',
						img: require('../../common/image/index/icon/my/antFill-file-add.png')
					}
				],
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onShow() {
			let _this = this
			console.log('onshow')
			
			// try {
			//     const value = uni.getStorageSync('token');
			// 	if(value.length>0){
			// 		console.log('value--------------',JSON.parse(value))
			// 		_this.info = JSON.parse(value)
			// 		_this.isLogin = false
			// 	}else{
			// 		console.log('token取出错误----没有token')
			// 		_this.isLogin = true
			// 	}
			// } catch (err) {
			// 	console.log('token取出错误----没有token')
			// 	_this.isLogin = true
			// }
			uni.getStorage({
				key:'token',
				success(res){
					console.log('token成功取出',res.data)
					_this.info = res.data
					_this.isLogin = false
					if(!res.data.token){
						_this.isLogin = true
					}
					
				},
				fail(err) {
					console.log('token取出错误----没有token',err)
					_this.isLogin = true
				}
			})
		},
		methods: {
			myClick(url){
				uni.navigateTo({
					url:url
				})
				if(url == ''){
					uni.navigateTo({
						url:url
					})
				}else{
					if(this.isLogin){
						uni.navigateTo({
							url:'login'
						})
					}else{
						uni.navigateTo({
							url:url
						})
					}
				}
			}
		}
	}
</script>

<style scoped>
	
	
		
	
	.my-list {
		position: relative;
		margin: 60rpx 30rpx;
	}

	.my-img {
		width: 48rpx;
		height: 48rpx;
	}

	.icon-right {
		position: absolute;
		right: 0;
		top: 12rpx;
	}

	.my-list text {
		position: absolute;
		color: #101010;
		left: 100rpx;
		top: 6rpx;
	}

	/* 头部 */
	.personal-introduction {
		position: relative;
	}

	.personal-introduction image {
		width: 160rpx;
		height: 160rpx;
		margin: 40rpx 30rpx;
		border-radius: 80rpx;
	}

	.text-up {
		position: absolute;
		left: 220rpx;
		top: 70rpx;
		font-size: 32rpx;
		color: rgba(16, 16, 16, 100);
		line-height: 46rpx;
		font-weight: bold;
	}
	
	.login-button{
		position: absolute;
		left: 220rpx;
		top: 90rpx;
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: bold;
	}

	.text-down {
		position: absolute;
		color: rgba(16, 16, 16, 100);
		left: 220rpx;
		top: 134rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.personal-icon {
		position: absolute;
		right: 30rpx;
		top: 100rpx;
	}

	/* 设置的图标 */
	.set-icon {
		margin: 30rpx 30rpx 24rpx 680rpx;
		color: #101010;
		width: 40rpx;
		height: 40rpx;
	}
</style>
