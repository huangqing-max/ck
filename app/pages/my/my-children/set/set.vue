<template>
	<view>
		<view>
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
					<view class="top-title-text">设置</view>
				</view>
			</view>

			<view style="height: 10vh;"></view>

			<view class="content">
				<view class="content-text-image" @click="handleUrl('head')">
					<text class="text-left">头像设置</text>
					<image class="image" :src="userInfo.logo||img" mode=""></image>
					<u-icon class="text-right" name="arrow-right" size="24" color="#999999"></u-icon>
				</view>
				<view class="content-text">
					<view class="text">
						<text class="text-left">用户ID</text>
						<text class="text-center">
							{{userInfo.userid||''}}{{'&emsp;'}}
						</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>
				</view>
				<view class="content-text" @click="handleUrl('username')">
					<view class="text">
						<text class="text-left">昵称设置</text>
						<text class="text-center">
							{{userInfo.truename||''}}{{'&emsp;'}}
						</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>
				</view>
				<view class="content-text" @click="handleUrl('pwd')">
					<view class="text">
						<text class="text-left">登录密码</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>
				</view>
				<view class="content-text" @click="handleUrl('phone')">
					<view class="text">
						<text class="text-left">手机号码</text>
						<text class="text-center">
							{{userInfo.loginphone||''}}{{'&emsp;'}}
						</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>
				</view>
				<view class="content-text" @click="handleUpdate()">
					<view class="text">
						<text class="text-left">版本更新</text>
						<text class="text-center">
							{{version}}{{'&emsp;'}}
						</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>

				</view>
				<view class="content-text" @click="clearCache()">
					<view class="text">
						<text class="text-left">清除缓存</text>
						<text class="text-center">
							{{fileSizeString}}{{'&emsp;'}}
						</text>
					</view>
					<view class="text-center2">
						<u-icon name="arrow-right" size="24" color="#999999"></u-icon>
					</view>


				</view>
				<u-modal v-model="showModal" width="560" :show-title="false" :show-confirm-button="false">
					<view class="slot-content">
						<view class="modalImage">
							<image src="../../../../common/image/index/icon/index/update.jpg" mode=""></image>
						</view>
						<view class="modalButton">
							<view class="down-button-up" @click="UpData()">
								马上更新
							</view>
							<view class="down-button-down" @click="showModal = false">
								以后再说
							</view>
						</view>

					</view>
				</u-modal>
			</view>

			<view>
				<view :disabled="disabled" :hair-line="false" class="down-button" @click="outLoginClick()">{{button}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				button: '退出登录',
				img:require('../../../../common/image/index/icon/my/head_default.gif'),
				disabled: false,
				showModal: false,
				version: '',
				fileSizeString: '',
				tokenInfo: {},
				userInfo:{},
				token: '',
			}
		},
		watch: {},
		computed: {},
		created() {
			this.version = plus.runtime.version
			this.formatSize()
		},
		mounted() {},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			this.handleNoLogin()
		},
		methods: {
			
			
			handleUrl(i){
				if(this.disabled){
					uni.navigateTo({
						url:'../../login'
					})
				}else{
					if(i=='phone'){
						uni.navigateTo({
							url:'update/updatePhone'
						})
					}
					if(i=='head'){
						uni.navigateTo({
							url:'update/updatePortrait'
						})
					}
					if(i=='pwd'){
						uni.navigateTo({
							url:'update/updatePwd'
						})
					}
					if(i=='username'){
						uni.navigateTo({
							url:'update/updateUsername'
						})
					}
				}
			},
			
            // 计算缓存
			formatSize() {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
            // 清除缓存
			clearCache() {
				let _this = this
				// uni.clearStorage()
				console.log('----------------------_this.tokenInfo', _this.tokenInfo)
				let that = this;
				let os = plus.os.name;
				console.log('----------==============------------_this.tokenInfo',os)
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								uni.clearStorage()
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									uni.setStorage({
										key: 'token',
										data: _this.tokenInfo,
										success(res) {
										},
										fail() {
											console.log('存入token失败')
										}
									})
									_this.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
				    uni.clearStorage()
					uni.setStorage({
						key: 'token',
						data: _this.tokenInfo,
						success(res) {
						},
						fail() {
							console.log('存入token失败')
						}
					})
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						_this.formatSize();
					});
				}
			},
            // 判断是否有新版本
			handleUpdate() {
				var _this = this;
				let version = (plus.runtime.version).split('.').join('')
				let newVersion = ''
				console.log('当前版本号version：', version)
				let os = plus.os.name
				console.log('-----------',os)
				if (os == 'Android'){
					_this.$http.VersionGet('version/getNow').then(res => {
						console.log('最新版本号version：', res.data.data.version)
						newVersion = res.data.data.version.split('.').join('')
						if (newVersion > version) {
							console.log('当前有最新版本，请更新')
							_this.showModal = true
						} else {
							console.log('当前已经是最新版本')
							uni.showToast({
								title: '已是最新版本',
								duration: 2000
							});
						}
					})
				}else if ( os == 'iOS'){
					console.log('查询ios当前有最新版号')
					_this.$http.VersionGet('version/getAppleNow').then(res => {
						console.log('ios最新版本号version：', res.data.data.version)
						newVersion = res.data.data.version.split('.').join('')
						if (newVersion > version) {
							console.log('当前有最新版本，请更新')
							_this.showModal = true
						} else {
							console.log('当前已经是最新版本')
							uni.showToast({
								title: '已是最新版本',
								duration: 2000
							});
						}
					})
				}
			},
			UpData(){
				let os = plus.os.name
				if (os == 'Android'){
					this.doUpData()
				}else if ( os == 'iOS'){
					this.doIosUp()
				}
			},
			doIosUp(){
				//在App Store Connect中的App Store下的app信息，可找到appleId
				let appleId= ''
				plus.runtime.launchApplication({
					action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
				}, function(e) {
					console.log('Open system default browser failed: ' + e.message);
				});
			},
            // 下载更新
			doUpData() {
				this.showModal = false
				uni.showLoading({
					title: '下载更新中……'
				})
				this.$http.File('https://manage.zx123.cn/zxt_app.apk').then(downloadResult => {
					uni.hideLoading()
					console.log('-------------------', downloadResult)
					if (downloadResult.statusCode == 200) {
						console.log('--------++++++++++++++++++-----------')
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
			// 检查是否安卓
			isandroid() {
				var that = this;
				uni.getSystemInfo({
					success: (res) => {
						console.log('当前手机型号', res)
						if (res.platform == "android") {
							console.log('当前是android')
							// that.AndroidCheckUpdate();  
						}
					}
				})
			},

            // 判断登录
			handleNoLogin() {
				let _this = this
				uni.getStorage({
					key: 'token',
					success(res) {
						console.log('++++++++++++++', res)
						if (!res.data.token) {
							console.log('token取出错误')
							_this.button = '未登录'
							_this.disabled = true
						}else{
							_this.token = res.data.token
							_this.tokenInfo = res.data
							console.log('_this.tokenInfo', _this.tokenInfo)
							if(res.data.contentid){
								let data = {
									contentid:res.data.contentid
								}
								_this.$http.MyGet('member/getUserInfo',data).then(res=>{
									console.log('*********************-----当前用户个人信息----------------++++++++++++',res.data)
									_this.userInfo = res.data.data
								})
							}
						}
						
					},
					fail(err) {
						console.log('token取出错误', err)
						_this.button = '未登录'
						_this.disabled = true
					}
				})
			},

			//推出登陆的按钮
			outLoginClick() {
				let _this = this
				try {
					uni.removeStorage({
						key: 'token',
						success: function(res) {
							console.log('success');
						}
					});
					uni.switchTab({
						url: '../../my'
					})
				} catch (e) {
					console.log('删除成功')
					_this.button = '已退出'
				}

			}
		},

	}
</script>

<style scoped>
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

	.down-button-up {
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

	.down-button-down {
		width: 480rpx;
		text-align: center;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		margin: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
	}

	.content {
		margin: 30rpx;
	}

	.content-text {
		margin: 68rpx 0;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
	}

	.text {
		width: 660rpx;
		float: left;
		height: 100rpx;
	}

	.text-center {
		float: right;
		color: #999999;
	}

	.text-center2 {
		float: left;
		text-align: right;
		width: 30rpx;
		color: #999999;
	}

	.text-right {
		float: right;
	}

	.content-text-image {
		position: relative;
		margin: 68rpx 0;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
	}

	.image {
		position: absolute;
		right: 56rpx;
		top: -26rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 60rpx;
	}


	.down-button {
		position: fixed;
		bottom: 80rpx;
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

	/* 头部 */
	.top-title {
		position: fixed;
		text-align: center;
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 88;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
	}

	.top-title-icon {
		position: absolute;
		top: 28rpx;
		left: 30rpx;
	}

	.top-title-text {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 500;
		margin-top: 20rpx;
	}
</style>
