<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../set" hover-class="none">
					<u-icon  :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">修改手机号</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<u-toast ref="uToast" />
		<view class="">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item class="mobile-label" label="手机号:" label-width="160" prop="mobile">
					<u-input  v-model="form.mobile" maxlength="20"  class="mobile-input" border-color="#f8f8f8" placeholder="请输入新的手机号" />
				</u-form-item>
				<u-form-item class="mobile-label" label="验证码:" label-width="160" prop="code">
					<u-input right="true" :clearable="false" v-model="form.code" maxlength="20"  class="mobile-input" border-color="#f8f8f8" placeholder="请输入验证码" />
					<view v-if="show" class="code-button"  @click="codeClick()">
						获取验证码
					</view>
					<view v-if="!show" class="code-button"  >{{count}}{{'&emsp;S'}}</view>
				</u-form-item>
			</u-form>
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
				form:{
					mobile:'',
					code:'',
				},
				show: true,
				count: '',
				errorType: ['message'],
				rules1: {
					mobile: [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
				},
				rules: {
					mobile: [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					code: [
						{
							required: true,
							message: '请输入验证码',
							trigger: ['blur', 'change']
						}
					]
				}
			}
		},
		created() {
			
		},
		onReady() {
			// this.$refs.uForm.setRules(this.rules1);
		},
		onShow() {
			this.handleToken()
		},
		methods:{
			// 获取验证码的点击
			codeClick(){
				let _this = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// _this.$refs.uForm.setRules(_this.rules);
						console.log('验证通过');
						//验证码的倒计时
						const TIME_COUNT = 60;
						 if (!_this.timer) {
						   _this.count = TIME_COUNT;
						   _this.show = false;
						   _this.timer = setInterval(() => {
						   if (_this.count > 0 && _this.count <= TIME_COUNT) {
							 _this.count--;
							} else {
							 _this.show = true;
							 clearInterval(_this.timer);
							 _this.timer = null;
							}
						   }, 1000)
						  }
						let data = {
							mobile:_this.form.mobile,
							imsi:_this.imsi
						}
						_this.$http.Post('login/getCode',data).then(res=>{
							console.log('登录页面的验证码获取',res)
							if(res.data.code == 0){
								_this.$refs.uToast.show({
									title: '获取验证码成功',
									type: 'success',
								})
							}else{
								_this.$refs.uToast.show({
									title: res.data.msg,
									type: 'error',
								})
							}
						})
					} else {
						console.log('验证失败');
						return
					}
				});
				
			},
			
			// 判断登录
			handleToken() {
				let _this = this
				uni.getStorage({
					key: 'token',
					success(res) {
						console.log('+++++---------------+++++++++', res.data.phone)
						if(res.data.mobile){
							_this.form.mobile = res.data.phone || ''
						}
					},
					fail(err) {
						console.log('token取出错误', err)
					}
				})
			},
			
			oKClick(){
				console.log('**************', this.form.mobile)
				console.log('**************', this.form.code)
				let _this = this
				this.$refs.uForm.validate(valid => {
					console.log('------',valid)
					if (valid) {
						console.log('验证通过');
						let data = {
							mobile:this.form.mobile,
							code:this.form.code,
						}
						_this.$http.Post('',data).then(res=>{
							console.log('修改手机号',res)
							if(res.data.code == 0){
								_this.$refs.uToast.show({
									title: '修改手机号成功',
									type: 'success',
								})
							}else{
								_this.$refs.uToast.show({
									title: res.data.msg,
									type: 'error',
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		}
		
	}
</script>

<style scoped>
	.code-button{
		width: 200rpx;
		border: 1rpx solid rgb(135,167,222);
		color:rgb(135,167,222) ;
		text-align: center;
		border-radius: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.mobile-label{
		margin:0 30rpx;
	}
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
