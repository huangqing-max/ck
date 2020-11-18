
<template>
	<view>
		<view>
			<view class="close-icon" @click="switchTabClick()" >
				<u-icon class="close-up"  name="close" size="48"></u-icon>
			</view>
			<u-toast ref="uToast" position="top" />
			<view class="form">
				<view class="form-text">
					<text>{{pwdOrCode?'验证码登录':'账号密码登录'}}</text>
				</view>
				<view class="">
					<form >
						<view v-if="!pwdOrCode" class="">
							<u-input  v-model="username" maxlength="20"  class="mobile-input" border-color="#EEEEF1" placeholder="请输入账号" ></u-input>
							<view  class="mobile-req">{{usernameError}}{{'&emsp;'}}</view>	
							
							<u-input v-model="password" maxlength="18" class="mobile-input" type="password" order-color="#EEEEF1" :password-icon="true"
							placeholder="请输入密码"  ></u-input>
							<view class="mobile-req"  >{{pwdError}}{{'&emsp;'}}</view>
						</view>
					<view v-if="pwdOrCode" class="">
						<u-input  v-model="mobile" maxlength="11" class="mobile-input" order-color="#EEEEF1" placeholder="请输入手机号" ></u-input>
						<view class="mobile-req">{{mobileError}}{{'&emsp;'}}</view>
						
						<u-input v-model="code" maxlength="6" class="mobile-input" placeholder="输入验证码" order-color="#EEEEF1" v-if="pwdOrCode"></u-input>
						<view class="form-input" >
							<view v-if="show" class="form-code" @click="codeClick()" >获取验证码</view>
							<view v-if="!show" class="form-code"  >{{count}}{{'&emsp;S'}}</view>
						</view>
						<view class="mobile-req"  >{{codeError}}{{'&emsp;'}}</view>
					</view>
					
					</form>
				</view>
				<view>
					<button @click="loginClick()" class="form-button" >{{pwdOrCode?'登录/注册':'登录'}}</button>
				</view>
				<view class="form-down" @click="pwdOrCode=!pwdOrCode">
					<text>{{!pwdOrCode?'验证码登录':'账号密码登录'}}</text>
				</view>
			</view>
			<view class="form-text">
				<text>其他方式登录</text>
			</view>
			<view class="icon-positin">
				<view class="wx wh60" @click="weixinLogin()">
					<u-icon class="icon-30" name="weixin-fill" size="60"  color="#36C474"></u-icon>
				</view>
				<!-- <view class="qq wh60">
					<u-icon class="icon-30" name="qq-fill" size="60" color="#4CBCF1"></u-icon>
				</view> -->
			</view>
			<!-- <view>
				<view class="form-text">
					<text>其他方式登录</text>
				</view>
				<view class="icon-positin">
					<view class="wx wh60">
						<u-icon class="icon-30" name="weixin-fill" size="60"  color="#36C474"></u-icon>
					</view>
					<view class="qq wh60">
						<u-icon class="icon-30" name="qq-fill" size="60" color="#4CBCF1"></u-icon>
					</view>
				</view>
				<view>
					<view class="down-text">
						<view class="line"></view>
						<text>关注我们</text>
						<view class="line2"></view>
					</view>
					<view class="icon-down">
						<u-icon color="rgba(16, 16, 16, 0.45)" class="icon-down-left" name="weixin-fill" size="48" ></u-icon>
						<u-icon color="rgba(16, 16, 16, 0.45)" class="icon-down-center" name="weibo" size="48" ></u-icon>
						<image class="up-img" src="../../common/image/index/icon/login/up_info.png" mode=""></image>
					</view>
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				mobile:null,
				username:'',
				usernameError:'',
				mobileError:'',
				codeError:'',
				pwdError:'',
				password:'',
				imsi:'', // 国际移动用户识别码
				code:null,
				timeCount:60,
				show: true,
				token:'',
			    count: '',
			    timer: null,
				pwdOrCode:true,	//默认账号密码登陆
			}
		},
		onShow() {
			//这是设备的编码
			plus.device.getInfo({
				success: function(e) {
					console.log('这是设备的编码', e)
					this.imsi = e.uuid.substring(0, 15)
				},
				fail: function(e) {}
			});
		},
	
		created() {
			
		},
		methods: {
			
			// 跳转到my页面
			switchTabClick(){
				uni.switchTab({
					url:'my'
				})
			},
			weixinLogin(){
				let _this = this
				uni.showToast({
				    title: '正在登录中...',
					icon:'none',
					duration:5000
				});
				// uni.getProvider（）获取服务商信息判断手机端是否安装了app
				uni.getProvider({
					// oauth  代表授权登录
					service: 'oauth',
					success: function (res) {
						console.log('----------------',res.provider.indexOf('weixin')>-1)
						//支持微信、qq和微博等
						if (res.provider.indexOf('weixin')>-1) {
							console.log('----------------********')
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----',loginRes);
									// 获取用户信息
									uni.request({
									    url: 'https://api.weixin.qq.com/sns/userinfo', 
										data:{
											access_token:loginRes.authResult.access_token,
											openid:loginRes.authResult.openid,
										},
									    success: (res) => {
									        console.log('-------获取微信用户所有-----',res);
									        _this.wxLogin(res.data)
									    }
									});
								},
								fail(err) {
									console.log('err',err)
								}
							});
						}
					}
				});
			},
			wxLogin(infoRes){
				let _this = this
				_this.$http.Post('login/wxlogin',infoRes).then(res=>{
					console.log('登录成功',res.data)
					if(res.data.code==0){
						
						uni.setStorage({
							key:'token',
							data:res.data.data,
							success(res) {							
								uni.hideToast();
								uni.switchTab({
									url:'my',
								})
							},
							fail() {
								console.log('存入token失败')
							}
						})
					}
					if(res.data.code==1){
						this.$refs.uToast.show({
							title:res.data.msg,
							type: 'warning',
						})
					}
				})
			},
			//登录按钮点击
			loginClick(){
				
				let data = {}
				if(this.pwdOrCode){
					var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
					if(!this.mobile){
						this.mobileError = "请输入手机号码"
						return
					}
					if(!TEL_REGEXP.test(this.mobile)){
						this.mobileError =	"请输入正确格式的手机号码"
						return
					}else{
						this.mobileError = ''
					}
					var TEL_CODE = /^\d{4}$/
					if(!this.code){
						this.codeError = "请输入验证码"
						return
					}
					if(!TEL_CODE.test(this.code)){
						this.codeError =	"请输入正确格式的验证码"
						return
					}else{
						this.codeError = ''
					}
					data.mobile = this.mobile
					data.imsi = this.imsi
					data.captcha = this.code
					console.log('这是验证码登录')
				}else{
					if(this.username.length==0){
						this.usernameError = "请输入账号"
						return
					}
					if(this.password.length==0){
						this.pwdError = "请输入密码"
						return
					}
					data.username = this.username
					data.password = this.password
					
					console.log('这是密码登录')
				}
				console.log('登录数据',data)
				this.$http.Post('login/index',data).then((res)=>{
					console.log('登录成功后的数据',res)
					if(res.data.code==0){
						uni.setStorage({
							key:'token',
							data:res.data.data,
							success(res) {
								uni.switchTab({
									url:'my',
								})
							},
							fail() {
								console.log('存入token失败')
							}
						})
					}else{
						if(this.pwdOrCode){
							this.codeError = "验证码有误"
						}else{
							this.pwdError = res.data.msg
						}
					}
				})
			},
			// 获取验证码的点击
			codeClick(){
				var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(!this.mobile){
					this.mobileError = "请输入手机号码"
					return
				}
				if(!TEL_REGEXP.test(this.mobile)){
					this.mobileError =	"请输入正确格式的手机号码"
					return
				}else{
					this.mobileError = ''
				}
				//验证码的倒计时
				const TIME_COUNT = 60;
				 if (!this.timer) {
				   this.count = TIME_COUNT;
				   this.show = false;
				   this.timer = setInterval(() => {
				   if (this.count > 0 && this.count <= TIME_COUNT) {
					 this.count--;
					} else {
					 this.show = true;
					 clearInterval(this.timer);
					 this.timer = null;
					}
				   }, 1000)
				  }
				
				let data = {
					mobile:this.mobile,
					imsi:this.imsi
				}
				this.$http.Post('login/getCode',data).then(res=>{
					console.log('登录页面的验证码获取',res)
				})
			}
		},
	}
	
</script>

<style scoped>
	
	.form-input{
		position: relative;
	}
	
	.wh60{
		width: 120rpx;
		height: 120rpx;
		border: 1rpx solid #EEEEF1;
		border-radius: 60rpx;
	}
	.icon-30{
		margin: 30rpx;
	}
	.icon-positin{
		position: relative;
		height: 160rpx;
	}
	.wx{
		position: absolute;
		left: 50%;
		margin-left: -60rpx;
	}
	.qq{
		position: absolute;
		left: 416rpx;
	}
	
	.icon-down{
		position: relative;
		height: 100rpx;
	}
	.up-img{
		position: absolute;
		left: 522rpx;
		width: 48rpx;
		height: 48rpx;
	}
	.icon-down-left{
		position: absolute;
		left: 168rpx;
	}
	.icon-down-center{
		position: absolute;
		left: 346rpx;
	}


	.down-text{
		text-align: center;
		margin-bottom: 46rpx;
		color: #999999;
		position: relative;
	}
	.line{
		position: absolute;
		width: 206rpx;
		border: 1rpx solid rgba(244, 244, 246, 100);
		left: 100rpx;
		top: 18rpx;
	}
	.line2{
		width: 206rpx;
		border: 1rpx solid rgba(244, 244, 246, 100);
		position: absolute;
		left: 448rpx;
		top: 18rpx;
	}

     
	 
	 /* 表单 */
	
	.form-text{
		text-align: center;
		margin: 100rpx 0 50rpx 0;
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: bold;
		color: #000000;
		position: relative;
	}

	.form-code{
		width: 168rpx;
		height: 80rpx;
		background-color: #F7F7F8;
		color: #101010;
		font-size: 24rpx;
		line-height: 80rpx;
		text-align: center;
		position: absolute;
		right: 72rpx;
		top: -142rpx;
		
	}
	.mobile-input{
		margin:0 72rpx 60rpx 72rpx ;
		border-bottom: 1rpx solid #EEEEF1 ;
	}
	.mobile-req{
		margin:-60rpx 72rpx 20rpx 72rpx ;
		color: #FA3534;
	}
	.input-placeholder{
		font-size: 36rpx;
		line-height: 52rpx;
		color: #B1B1B1;
		padding-bottom: 8rpx;
	}
	
	.form-button{
		width: 600rpx;
		height: 90rpx;
		background-color: #FF674A;
		border-radius: 16rpx;
		font-size: 28rpx;
		line-height: 90rpx;
		color: #FFFFFF;
	}
	
	.form-down{
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: right;
		margin: 30rpx 72rpx 0 0;
		color: #101010;
	}
	
	.close-icon{
		position: relative;
		height: 100rpx;
	}
	.close-up{
		position: absolute;
		left: 24rpx;
		top: 20rpx;
	}
</style>
