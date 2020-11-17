<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="../set" hover-class="none">
					<u-icon  :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">修改密码</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<u-toast ref="uToast" />
		<view class="">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item class="mobile-label" label="新密码:" label-width="160" prop="oldPwd">
					<u-input type="password"  v-model="form.oldPwd" maxlength="20"  class="mobile-input" border-color="#f8f8f8" placeholder="请输入当前登录密码" />
				</u-form-item>
				<u-form-item class="mobile-label" label="确认新密码:" label-width	="160" prop="newPwd">
					<u-input right="true" type="password"  v-model="form.newPwd" maxlength="20"  class="mobile-input" border-color="#f8f8f8" placeholder="确认新密码" />
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
				// 文字提示
				errorType: ['message'],
				form:{
					oldPwd:'',
					newPwd:'',
				},
				rules: {
					oldPwd: [
						{
							required: true,
							message: '请输入当前登录密码',
							// 可以单个或者同时写两个触发验证方式
							trigger: ['change']
						}
					],
					newPwd: [
						{
							required: true,
							message: '新密码不能为空',
							// 可以单个或者同时写两个触发验证方式
							trigger: ['change']
						},
						// 6-8个字符之间的判断
						{
							min: 4,
							max: 20,
							message: '长度在6-8个字符之间'
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								let oldPwd = this.form.oldPwd
								if(value != oldPwd){
									return false;
								}
							},
							message: '两次密码不一致',
							// 触发器可以同时用blur和change
							trigger: ['change'],
						}
					]
				}
			}
		},
		created() {
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
		},
		methods:{
			
			oKClick(){
				let _this = this
				console.log('**************', this.form.oldPwd)
				console.log('**************', this.form.newPwd)
				if(this.form.oldPwd==this.form.newPwd && this.form.oldPwd.length>0 && this.form.newPwd.length>0){
					let data = {
						new_password:this.form.newPwd,
					}
					_this.$http.MyPost('member/updatePassword',data).then(res=>{
						console.log('修改密码',res)
						if(res.data.code == 0){
							_this.$refs.uToast.show({
								title: '修改密码成功',
								type: 'success',
							})
							uni.navigateTo({
								url:'../set'
							})
						}else{
							_this.$refs.uToast.show({
								title: res.data.msg,
								type: 'error',
							})
						}
					})
				}
				// this.$refs.uForm.validate(valid => {
				// 	console.log('--+++++++----',valid)
				// 	if (valid) {
				// 		console.log('验证通过');
				// 		let data = {
				// 			new_password:this.form.newPwd,
				// 		}
				// 		_this.$http.MyPost('member/updatePassword',data).then(res=>{
				// 			console.log('修改密码',res)
				// 			if(res.data.code == 0){
				// 				_this.$refs.uToast.show({
				// 					title: '修改密码成功',
				// 					type: 'success',
				// 				})
				// 			}else{
				// 				_this.$refs.uToast.show({
				// 					title: res.data.msg,
				// 					type: 'error',
				// 				})
				// 			}
				// 		})
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			}
		}
		
	}
</script>

<style scoped>
	
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
