<template>
	<view>
		<view>
			<view class="top">
				<view class="top-title">
					<navigator url="../../my" open-type="switchTab">
						<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
					</navigator>
				    <text class="top-title-text">上传合同</text>
				</view>
			</view>
			
			<view style="height: 100rpx;"></view>
			<u-toast ref="uToast" position="top" />
			<view class="content">
				<view>
					<view class="formLabel" >合同标题</view>
					<u-input placeholder="请输入合同标题" placeholderStyle="line-height:80rpx;color: rgba(102, 102, 102, 100);font-size: 26rpx;" height="80" v-model="title"  class="formInput"  type="text" ></u-input>
					<view class="formError" v-if="titleError" >请输入标题</view>
				</view>
				
				<view>
					<view class="formLabel" >上传合同照片</view>
					
					<view >
						<u-upload ref="uUpload" width="260" height="170" :action="action" :file-list="fileList"
						 @on-change="onChange" @on-remove="onRemove" ></u-upload>
					</view>
					<view class="formError" v-if="imgError" >请选择图片</view>
				</view>
				
				<view class="formLabelTwo" >请保证图片清晰有效无涂改,否则可能审核不通过哦</view>
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
				imgs:[],
				title:'',
				titleError:false,
				imgError:false,
			}
		},
		watch:{
			title(value){
				if(value.length>0){
					this.titleError = false
					this.imgError = false
				}
			}
		},
		computed:{},
		created(){
			// this.$http.MyGet('my_center/getUserInfo').then(res=>{
			// 	console.log('个人中心首页获取是否已经完善了身份证信息',res.data.data.isperfect)
			// 	if(res.data.data.isperfect!=1){
			// 		uni.navigateTo({
			// 			url:'../userinfo/userinfo'
			// 		})
			// 	}
				
			// })
		},
		mounted(){},
		methods:{
			
			// 上传图片的回调
			onChange(res, index, lists, name){
				this.handleImgs(lists)
			},
			handleImgs(lists){
				let data = []
				for (var i = 0; i < lists.length; i++) {
					data.push(lists[i].response.data.file_path)
				}
				this.imgs = data
				console.log('/////////////////',data)
			},
			// 删除图片的回调
			onRemove(index, lists, name){
				this.handleImgs(lists)
			},
			
			submit() {
				if(this.title.length==0){
					this.titleError = true
				}
				if(this.imgs.length==0){
					this.imgError = true
				}else{
					this.imgError = false
				}
				let obj = {
					title:this.title,
					imgs:this.imgs
				}
				this.$http.MyPost('my_center/addContract',obj).then(res=>{
					console.log('成功',res)
					if(res.data.code==0){
						this.$refs.uToast.show({
							title: res.data.msg,
							position:'top',
							type: 'success',
						})
						uni.switchTab({
							url:'../../my'
						})
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
				})
			},
		},
		
	}
</script>

<style scoped>
	
	.formInput{
		margin:30rpx 20rpx;
		padding-left: 30rpx!important;
		height: 80rpx;
		background-color: #F7F7F8;
		border-radius: 16rpx;
	}
	
	.formLabel{
		margin:100rpx 20rpx 20rpx 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(16, 16, 16, 1);
	}
	.formError{
		margin:30rpx 20rpx;
		font-size: 28rpx;
		color: #FF674A;
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
