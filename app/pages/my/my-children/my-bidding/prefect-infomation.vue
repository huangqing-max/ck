
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="bidding-detail">
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">完善信息</text>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>
		
		<view class="content-up">
			<view class="iconView">
				<view class="icon">
					<u-icon  name="checkbox-mark" size="40" color="#FFFFFF" ></u-icon>
				</view>
				<view class="view-text">完善的信息可优先审核</view>
			</view>
			<view class="text">
				项目编号：{{info.contentid}}
			</view>
			<view class="text">
				地&emsp;&emsp;区：{{info.areaname}}
			</view>
			<view class="text">
				更新时间：{{info.updatetime}}
			</view>
			
		</view>
		<view class="backgrund"></view>
		
		
		<view class="data">
		<view class="content">
			<u-form :model="infoForm" :border-bottom="false" :rules="rules" ref="uForm" :errorType="errorType">
				
				
				
				<u-row>
					<u-col span="12">
						<text class="formLabel">个人信息</text>
					</u-col>
					<u-col span="12">
						<u-form-item :border-bottom="false"  :required="true"  prop="lianxiren">
							<u-input    class="formInput"  height="80" placeholderStyle="line-height:80rpx"   placeholder="您的姓名" v-model="infoForm.lianxiren" type="text"></u-input>
						</u-form-item>
					</u-col>
					<!-- <u-col span="6">
						<u-form-item :border-bottom="false"   prop="mianji" >
							<u-input  class="formInput"  height="80"  placeholderStyle="line-height:80rpx;color:#101010"   placeholder="您的电话" v-model="infoForm.mianji" type="number"></u-input>
						</u-form-item>
					</u-col> -->
					<u-col span="12">
						<u-form-item :border-bottom="false"   prop="title">
							<u-input   class="formInput"  height="80" placeholderStyle="line-height:80rpx"   placeholder="详细地址" v-model="infoForm.title" type="text"></u-input>
						</u-form-item>
					</u-col>
				
				    <u-col span="12">
						<view class="formLabel">&emsp;</view>
						<text class="formLabel">招标信息</text>
					</u-col>
				
					<u-col span="6">
						<u-form-item :border-bottom="false"  prop="zblx">
							<u-input disabled   class="formInput"  height="80" placeholderStyle="line-height:80rpx"   type="select" :select-open="actionSheetShow"
							 v-model="infoForm.zblx" placeholder="招标类型" @click="typeClick()" :right-icon-style="rightIconStyle" ></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"   prop="dgsj" >
							<u-input  class="formInput"  height="80" placeholderStyle="line-height:80rpx" type="select"   placeholder="动工时间" v-model="infoForm.dgsj"  @click="dgsjClick()" ></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"   prop="mianji" >
							<u-input   class="formInput"  height="80" placeholderStyle="line-height:80rpx"    placeholder="装修面积" v-model="infoForm.area" type="number"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"   prop="lfsj" >
							<u-input  class="formInput"  height="80" placeholderStyle="line-height:80rpx"    placeholder="量房时间" v-model="infoForm.lfsj"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"  prop="sctypeid">
							<u-input   class="formInput"  height="80" placeholderStyle="line-height:80rpx"   type="select" :select-open="actionSheetShow" 
							v-model="infoForm.sctypeid" placeholder="装修空间" @click="sctypeidClick()" :right-icon-style="rightIconStyle"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"  prop="hxjg">
							<u-input    class="formInput"  height="80" placeholderStyle="line-height:80rpx"   type="select" :select-open="actionSheetShow" 
							v-model="infoForm.hxjg" placeholder="户型结构" @click="hxjgClick()" :right-icon-style="rightIconStyle"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"  prop="fwzt">
							<u-input  class="formInput"  height="80" placeholderStyle="line-height:80rpx"   type="select" :select-open="actionSheetShow" 
							v-model="infoForm.fwzt" placeholder="房屋状态" @click="fwztClick()" :right-icon-style="rightIconStyle"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="6">
						<u-form-item :border-bottom="false"  prop="yushuan">
							<u-input  class="formInput"  height="80" placeholderStyle="line-height:80rpx"   type="select" :select-open="actionSheetShow" 
							v-model="infoForm.yushuan" placeholder="装修预算" @click="yushuanClick()" :right-icon-style="rightIconStyle"></u-input>
						</u-form-item>
					</u-col>
					<u-col span="12">
						<u-form-item :border-bottom="false"   prop="requirement">
							<u-input class="formInput"  height="80" placeholderStyle="line-height:80rpx"   placeholder="装修要求" v-model="infoForm.requirement" type="text"></u-input>
						</u-form-item>
					</u-col>
				</u-row>
				
				
				
			</u-form>
			
			<button class="button" @click="submit()" >提交</button>
			
		</view>
		</view>
		<u-select v-model="typeShow" label-name="name" :list="zblxList" @confirm="typeConfirm" mode="mutil-column-auto"></u-select>
		<u-select v-model="yushuanShow" label-name="name" :list="yushuanList" @confirm="yushuanConfirm" mode="mutil-column-auto"></u-select>
		<u-select v-model="fwztShow" label-name="name" :list="fwztList" @confirm="fwztConfirm" mode="mutil-column-auto"></u-select>
		<u-select v-model="hxjgShow" label-name="name" :list="hxjgList" @confirm="hxjgConfirm" mode="mutil-column-auto"></u-select>
		<u-select v-model="sctypeidShow" label-name="name" :list="sctypeidList" @confirm="sctypeidConfirm" mode="mutil-column-auto"></u-select>
		<!-- <u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet> -->
		<u-calendar max-date="2050-01-01" v-model="show" :mode="mode" @change="change"></u-calendar>
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				info:{},
				typeShow:false,
				sctypeidShow:false,
				yushuanShow:false,
				fwztShow:false,
				hxjgShow:false,
				rightIconStyle:{
					width:'32rpx',
					height:'32rpx',
					marginRight:'10rpx',
					backgroundColor:'#101010',
				},
				infoForm:{
					lianxiren:'',
					mianji:'',
					zblx:'', //招标类型
					dgsj:'',
					lfsj:'',
					title:'',//详细地址
					fwzt:'',  //房屋状态
					hxjg:'',   //户型结构
					yushuan:'',  //装修预算
					sctypeid:'',  //装修空间
					requirement:'',  //装修要求
				},
				rules:{
					lianxiren:[
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur' ,
						},
						{
							min: 2,
							max: 10,
							message: '姓名长度在2到10个字符',
							trigger: ['change','blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						},
					],
				},
				errorType:['message'],
				border: false,
				show: false,
				mode: 'date',	
				actionSheetShow: false,
				actionSheetList: [],
				sctypeidList: [],
				yushuanList: [],
				hxjgList: [],
				fwztList: [],
				zblxList:[],
				sctypeidList:[],
				fwztList:[],
				hxjgList:[],
				yushuanList:[],
			}
		},
		
		mounted() {
			this.handleData()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			
			handleData(){
				
				this.$http.Get('my_center/orderConfig').then(res=>{
					console.log('获取 完善资料页面的配置信息例如：户型结构，空间，预算等等',res.data.data)
					// 招标类型
					this.zblxList = res.data.data.zblx
					// 户型结构
					this.hxjgList = res.data.data.hxjg
					// 空间
					this.sctypeidList = res.data.data.sctypeid
					// 房屋状态
					this.fwztList = res.data.data.fwzt
					// 预算
					this.yushuanList = res.data.data.yushuan
				})
				let _this = this
				uni.getStorage({
					key:'',
					success(res){
						_this.info = res.data
					}
				})
			},
			
			// 点击选中项之后的回调
			typeConfirm(e) {
				console.log(e);
				// 显示在input框上的值
				this.infoForm.zblx = e[0].label
			},
			
			sctypeidConfirm(e) {
				console.log(e);
				// 显示在input框上的值
				this.infoForm.sctypeid = e[0].label
				// 存入表单的值
				this.infoForm.sctypeidValue = e[0].value
			},
			
			fwztConfirm(e) {
				console.log(e);
				// 显示在input框上的值
				this.infoForm.fwzt = e[0].label
				// 存入表单的值
				this.infoForm.fwztValue = e[0].value
			},
			
			hxjgConfirm(e) {
				console.log(e);
				// 显示在input框上的值
				this.infoForm.hxjg = e[0].label
				// 存入表单的值
				this.infoForm.thxjgValue = e[0].value
			},
			
			yushuanConfirm(e) {
				console.log(e);
				// 显示在input框上的值
				this.infoForm.yushuan = e[0].label
				// 存入表单的值
				this.infoForm.yushuanValue = e[0].value
			},
			
			
			
			// 点击招标类型选择框
			typeClick(){
				this.typeShow = true
			},
			
			sctypeidClick(){
				this.sctypeidShow = true
			},
			fwztClick(){
				this.fwztShow = true
			},
			hxjgClick(){
				this.hxjgShow = true
			},
			yushuanClick(){
				this.yushuanShow = true
			},
			
			//动工时间
			dgsjClick(){
				this.show = true
			},
			
			// 点击 时间选择 回调
			change(e) {
				console.log('时间选择',e);
				this.infoForm.dgsj = e.result
			},
			
			submit(){
				
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过')
						this.$http.MyPost('my_center/perfectOrder',this.infoForm).then(res=>{
							console.log('提交表单的返回值',res.data)
							if(res.data.code==0){
								this.$refs.uToast.show({
									title: res.data.msg,
									position:'top',
									type: 'success',
								})
							}
							if(res.data.code==1){
								this.$refs.uToast.show({
									title: res.data.msg,
									position:'top',
									type: 'success',
								})
							}
							if(res.data.code==401){
								this.$refs.uToast.show({
									title: res.data.msg,
									position:'top',
									type: 'success',
								})
							}
						})
					} else {
						console.log('验证失败')
					}
				})
			}
			
			
		}
	}
</script>

<style scoped>
	
	.backgrund{
		height: 20rpx;
		width: 100%;
		background-color: #F7F7F8;
	}
	
	.formLabel{
		margin:30rpx 10rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(16, 16, 16, 1);
	}
	
	.formInput{
		/* margin:12rpx 20rpx; */
		padding-left: 30rpx!important;
		background-color: #F7F7F8;
		border-radius: 16rpx;
	}
	

	
	.iconView{
		position: relative;
		height: 68rpx;
	}
	.icon{
		width: 48rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		background-color: rgba(238, 88, 88, 100);
	}
	.view-text{
		position: absolute;
		top: 0rpx;
		left: 80rpx;
		line-height: 48rpx;
		color: rgba(238, 88, 88, 100);
	}
	.content-up{
		margin: 30rpx 62rpx;
		font-size: 28rpx;
		line-height: 60rpx;
	}
	.text{
		font-size: 28rpx;
		line-height: 40rpx;
		margin: 20rpx 0;
		color: #101010;
	}
	
	.data{
		/* background-color: #F6F6F6; */
	}
	.content{
		margin: 50rpx;
		
	}
	
	.button{
		color: rgba(255, 255, 255, 100);
		background-color: rgba(255, 103, 74, 100);
		margin: 30rpx;
		font-size: 28rpx;
		border-radius: 16rpx;
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
			font-weight: 500;
			top: 20rpx;
			left: 300rpx;
		}
</style>
