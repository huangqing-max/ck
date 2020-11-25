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
		<u-toast ref="uToast" />
		<view class="">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item class="mobile-label" label="新昵称" label-width="160" prop="username">
					<u-input  v-model="form.username" maxlength="20"  class="mobile-input" border-color="#f8f8f8" placeholder="请输入新的昵称" />
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
				errorType: ['message'],
				form:{
					username:'',
				},
				rules: {
					username: [
						{
							required: true, 
							message: '请输入昵称',
							trigger: ['change','blur'],
						},
					],
					
				}
			}
		},
		created() {
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
						_this.form.username = res.data.username
					},
					fail(err) {
						console.log('token取出错误', err)
					}
				})
			},
			
			oKClick(){
				console.log('**************', this.form.username)
				let _this = this
				this.$refs.uForm.validate(valid => {
					console.log('------',valid)
					if (valid) {
						console.log('验证通过');
						let data = {
							mobile:this.form.username,
						}
						_this.$http.MyPost('member/modifyTrueName',data).then(res=>{
							console.log('修改昵称',res)
							if(res.data.code == 0){
								_this.$refs.uToast.show({
									title: '修改昵称成功',
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
	
	.mobile-label{
		margin:0 30rpx;
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
