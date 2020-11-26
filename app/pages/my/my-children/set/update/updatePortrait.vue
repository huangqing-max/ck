<template>
	<view>
		<view>
			<view class="top">
				<view class="top-title">
					<navigator url="../set" hover-class="none">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">修改头像</text>
				</view>
			</view>
			<u-toast ref="uToast" position="top" />
			<view style="height: 100rpx;"></view>
			
			<view class="content">
				<view>
					<view class="formUpload">
						<u-upload width="260" height="170" upload-text="上传头像" 
						@on-choose-complete="Err1" max-count="1" :action="action" 
						:file-list="fileList" @on-change="onChange1" @on-remove="onRemove1" ></u-upload>
					</view>
					<!-- <view class="formError" v-if="sidError_1" >请选择图片</view> -->
				</view>
				
				<view>
					<button :disabled="disabled" class="button" @click="submit()" >确认提交</button>
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
				sid_1:'',
				sidError_1:false,
				disabled:true,
			}
		},
		watch:{
			sid_1(value){
				if(value.length>0){
					// this.sidError_1 = false
					this.disabled = false
				}
			},
		},
		computed:{},
		created(){
		},
		mounted(){},
		onShow() {
			
		},
		methods:{
			
			onChange1(res, index, lists, name){
				this.sid_1 = lists[0].response.data.file_path
				console.log(this.sid_1)
			},
			Err1(){
				this.sidError_1 = false
			},
			
			// 删除图片的回调
			onRemove1(index, lists, name){
				this.sid_1 = ''
			},
			
			submit() {
				if(this.sid_1.length==0){
					this.sidError_1 = true
				}
				
				if(this.sidError_1){
					return
				}
				let obj = {
					headPic:this.sid_1,
				}
				this.$http.MyPost('member/modifyHeadPic',obj).then(res=>{
					console.log('成功',res)
					if(res.data.code==0){
						this.$refs.uToast.show({
							title: res.data.msg,
							position:'top',
							type: 'success',
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'../set'
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
		text-align: center;
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
		width: 130px;
		margin: 0 auto;
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
