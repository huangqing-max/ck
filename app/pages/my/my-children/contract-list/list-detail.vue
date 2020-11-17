
<template>
	<view>
		<view class="top">
			<view class="top-title">
				<navigator url="contract-list" >
					<u-icon :bold="true" class="top-title-icon" name="arrow-left"></u-icon>
				</navigator>
			    <text class="top-title-text">合同详情</text>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>
		
		<u-toast ref="uToast" />
		
		<view class="content">
			<view  >
				<view class="content-view">姓&emsp;名：{{info.name}} </view>
				<view class="content-view">编&emsp;号：{{info.sid}} </view>
				<view class="content-view">合同名：{{info.title}}</view>
				<view class="content-view">保单号：{{info.baodan}}</view>
				<view class="content-view">状&emsp;态：{{info.status_text}}</view>
				<view class="content-view">照&emsp;片：</view>
				
				<u-upload  :custom-btn="true"   :action="action" :file-list="imgs"  @on-change="onChange" @on-remove="onRemove">
					<view slot="addBtn" style="display: flex;" hover-class="slot-btn__hover" hover-stay-time="150">
						<view  :hair-line="false" class="customBtn" >添加照片</view>
						<view  :hair-line="false" @click.stop="buttonClick()" class="customBtn" >提交</view>
					</view>
				</u-upload>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				isTabActive:0,
				action:'https://mapi.zx123.cn/upload/uploadthumb',
				info:{},
				data:[],
				imgs:[],
				fileList:[],
			}
		},
		mounted() {
			this.handleData()
		},
		methods: {
			
			// 上传图片的回调
			onChange(res, index, lists, name){
				this.handleImgs(lists)
			},
			handleImgs(lists){
				let data = []
				console.log('**************',lists)
				for (var i = 0; i < lists.length; i++) {
					if(lists[i].response){
						data.push(lists[i].response.data.file_path)
					}
				}
				console.log('+++++++++++++++++++',this.imgs)
				for (var i = 0; i < this.imgs.length; i++) {
					if(this.imgs[i].img){
						data.push(this.imgs[i].img)
					}
				}
				this.fileList = data
				console.log('+++++++++++++++++++',this.fileList)
			},
			// 删除图片的回调
			onRemove(index, lists, name){
				this.handleImgs(lists)
			},
			
			handleData(){
				let _this = this
				uni.getStorage({
					key:'contractListContentid',
					success(res){
						console.log('--------',res)
						let obj = {
							id:res.data
						}
						_this.$http.Get('my_center/contractShow',obj).then(res=>{
							console.log('返回的合同详细信息',res.data.data)
							_this.info = res.data.data
							_this.imgs = JSON.parse(JSON.stringify(res.data.data.imgs).replace(/img_path/g,'url'))
						})
					}
				})
			},
			
			buttonClick(){
				let img = {
					imgs:this.fileList,
					id:this.info.id
				}
				console.log('===================',img)
				this.$http.MyPost('my_center/editContract',img).then(res=>{
					console.log('成功',res)
					if(res.data.code == 0){
						this.$refs.uToast.show({
							title: '编辑成功',
							position:'top',
							type: 'success',
						})
						setTimeout(function(){
							uni.switchTab({
								url:'../../my'
							})
						},1000)
					}else{
						this.$refs.uToast.show({
							title: res.data.msg,
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
				
			}
			
		}
	}
</script>

<style scoped>
	.down-button {
		position: fixed;
		bottom: 80rpx;
		width: 400rpx;
		text-align: center;
		background-color: rgba(255, 103, 74, 100);
		font-family: PingFangSC-regular;
		border-radius: 16rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		margin: 30rpx 175rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.customBtn{
		margin: 52rpx 0;
		margin-right: 20rpx;
		width: 220rpx;
		height: 94rpx;
		border-radius: 16rpx;
		line-height: 94rpx;
		text-align: center;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 100);
		font-family: PingFangSC-regular;
		border-radius: 16rpx;
		background-color: rgba(255, 103, 74, 100);
	}
	
	.buttonSubmit{
		background-color:#FF674A;
		color: #FFFFFF;
		border-radius: 16rpx;
		height: 80rpx;
		margin: 40rpx 0 0 0;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	
	.imgView image{
		width: 240rpx;
		height: 160rpx;
		
	}
	.imgView{
	   position: relative;	
	   
	}
	.imgIcon{
		position: absolute;
		z-index: 88;
		right: 30rpx;
		
	}
	.content-text{
		text-align: center;
		margin: 100rpx;
		padding: 100rpx;
		color: #666666;
	}
	
	.active{
		font-weight: bold;
	}
	.content{
		margin: 30rpx 88rpx;
	}
	
	.content-view{
		margin: 20rpx 0;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #101010;
	}
	
	.content-view1{
		margin: 30rpx 0;
		padding-bottom: 30rpx;
		font-size: 28rpx;
		color: #101010;
		position: relative;
	}
	.examine{
		position: absolute;
		text-align: center;
		left: 76%;
		top: -10rpx;
		height: 50rpx;
		padding: 0 10rpx;
		line-height: 50rpx;
		border-radius: 40rpx;
		background-color: #EE5858;
		color: #FFFFFF;
	}
	
	
		
	.button{
		background-color:#FF674A;
		color: #FFFFFF;
		border-radius: 16rpx;
		width: 220rpx;
		height: 80rpx;
		margin: 40rpx 0;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	
	.tab{
		margin: 30rpx 0;
		font-size: 28rpx;
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
		color: #101010;
		font-weight: 500;
		top: 20rpx;
		left: 300rpx;
	}
</style>
