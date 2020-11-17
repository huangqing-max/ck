<template>
	<view>
		<view>
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">用户基本信息</text>
				</view>
			</view>
			<u-toast ref="uToast" position="top" />
			<view style="height: 100rpx;"></view>
			
			<view class="content">
				<view>
					<view class="formLabel" >完善基本信息</view>
					<u-input class="formInput" height="80" placeholderStyle="line-height:80rpx" v-model="name"  placeholder="请输入您的真实姓名" type="text" ></u-input>
					<view class="formError" v-if="nameError" >请输入您的真实姓名</view>
				</view>
				
				<view>
					<u-input class="formInput" height="80" placeholderStyle="line-height:80rpx" v-model="sid" placeholder="请输入您的身份证号"   ></u-input>
					<view class="formError" v-if="sidError" >请输入您的身份证号</view>
				</view>
				
				<view>
					<view class="formLabel" >上传身份证照片</view>
					
					<u-row>
						<u-col span="6">
							<view class="formUpload">
								<u-upload width="260" height="170" upload-text="上传身份证正面" 
								@on-choose-complete="Err1" max-count="1" :action="action" 
								:file-list="fileList" @on-change="onChange1" @on-remove="onRemove1" ></u-upload>
							</view>
							<view class="formError" v-if="sidError_1" >请选择身份证正面</view>
						</u-col>
						<u-col span="6">
							<view class="formUpload">
								<u-upload width="260" height="170" upload-text="上传身份证背面" 
								@on-choose-complete="Err2" max-count="1" :action="action" 
								:file-list="fileList2" @on-change="onChange2" @on-remove="onRemove2" ></u-upload>
							</view>
							<view class="formError" v-if="sidError_2" >请选择身份证背面</view>
						</u-col>
					</u-row>
					
					
					
					<view class="formLabelTwo" >请保证图片清晰有效无涂改,否则可能审核不通过哦</view>
				</view>
				
				<view>
					<button class="button" @click="submit()" >确认提交</button>
				</view>
				 
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action:'https://mapi.zx123.cn/upload/uploadthumb',
				fileList:[],
				fileList2:[],
				name:'',
				sid:'',
				sid_1:'',
				sid_2:'',
				nameError:false,
				sidError:false,
				sidError_1:false,
				sidError_2:false,
			}
		},
		watch:{
			name(value){
				if(value.length>0){
					this.nameError = false
				}
			},
			sid(value){
				if(value.length>0){
					this.sidError = false
				}
			},
			sid_1(value){
				if(value.length>0){
					this.sidError_1 = false
				}
			},
			sid_2(value){
				if(value.length>0){
					this.sidError_2 = false
				}
			}
		},
		computed:{},
		created(){
			this.handleData()
		},
		mounted(){},
		onShow() {
			
		},
		methods:{
			
			handleData(){
				let _this = this
				this.$http.MyGet('my_center/getUserDataStatus').then(res=>{
					console.log('个人信息',res.data)
					if(res.data.code==0){
						this.name = res.data.data.name
						this.sid = res.data.data.sid
						this.sid_1 = res.data.data.sid_1
						this.sid_2 = res.data.data.sid_2
						_this.fileList.push(JSON.parse(JSON.stringify({url:'https:'+ res.data.data.sid_1})))
						_this.fileList2.push(JSON.parse(JSON.stringify({url:'https:'+ res.data.data.sid_2})))
						console.log('----',_this.fileList)
						console.log('--++++--',_this.fileList2)
					}
				})
			},
			onChange1(res, index, lists, name){
				this.sid_1 = lists[0].response.data.file_path
				console.log(this.sid_1)
			},
			Err1(){
				this.sidError_1 = false
			},
			Err2(){
				this.sidError_2 = false
			},
			// 删除图片的回调
			onRemove1(index, lists, name){
				this.sid_1 = ''
			},
			
			onChange2(res, index, lists, name){
				this.sid_2 = lists[0].response.data.file_path
				console.log(this.sid_2)
			},
			
			// 删除图片的回调
			onRemove2(index, lists, name){
				this.sid_2 = ''
			},
			
			submit() {
				if(this.name.length==0){
					this.nameError = true
				}
				if(this.sid.length==0){
					this.sidError = true
				}
				if(this.sid_1.length==0){
					this.sidError_1 = true
				}
				if(this.sid_2.length==0){
					this.sidError_2 = true
				}
				if(this.sidError||this.nameError||this.sidError_1||this.sidError_2){
					return
				}
				let obj = {
					name:this.name,
					sid:this.sid,
					sid_1:this.sid_1,
					sid_2:this.sid_2,
				}
				this.$http.MyPost('my_center/perfectUser',obj).then(res=>{
					console.log('成功',res)
					if(res.data.code==0){
						this.$refs.uToast.show({
							title: res.data.msg,
							position:'top',
							type: 'success',
						})
						setTimeout(function(){
							uni.switchTab({
								url:'../../my'
							})
						},1000)
					}
					if(res.data.code==1){
						this.$refs.uToast.show({
							title: res.data.msg,
							position:'top',
							type: 'error',
						})
					}
					if(res.data.code==401){
						this.$refs.uToast.show({
							title: res.data.msg,
							position:'top',
							type: 'warning',
						})
					}
					
					
				}).catch(err=>{
					console.log('错误')
					this.$refs.uToast.show({
						title: '提交失败',
						type: 'error',
					})
				})
			},
		},
		
	}
</script>

<style scoped>
	.formError{
		margin:30rpx 20rpx;
		font-size: 28rpx;
		color: #FF674A;
	}
	.formInput{
		margin:30rpx 20rpx;
		padding-left: 30rpx!important;
		height: 80rpx;
		background-color: #F7F7F8;
		border-radius: 16rpx;
	}
	
	.formLabel{
		margin:40rpx 20rpx 14rpx 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(16, 16, 16, 1);
	}
	
	.formLabelTwo{
		margin:30rpx 20rpx;
		font-size: 24rpx;
		color: rgba(102, 102, 102, 1);
	}
	
	.formUpload{
		font-size: 26rpx;
		color: #666666;
	}
	
	.button{
		background-color: rgba(255, 103, 74, 100);
		font-family: PingFangSC-regular;
		border-radius: 16rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		margin: 30rpx 20rpx;
		margin-top: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.content{
		margin: 130rpx 76rpx;
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
		color: #101010;
		line-height: 40rpx;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
