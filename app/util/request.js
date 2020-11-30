/**
 * get（）--api
 * @param obj 参数 url 地址
 * @returns {*}
 */

let baseUrl = 'https://mapi.zx123.cn/'
let areaid = ''
let dir = ''
let token = ''
let imsiData = {
	dir: ''
}



uni.getStorage({
	key: 'latitudeAndLongitude',
	success(res) {
		console.log('经纬度信息取出成功', res.data)
	}
})


function requestGet(url, data, resolve, reject) {
	console.log('请求在get之前参数++++++++++++++', url, data)
	uni.request({
		url: baseUrl + url,
		data: data,
		method: 'GET',
		header: {
			'Authorization': 'Bearer ' + token
		},
		success: (res) => {
			console.log('++++++++++++++++++++++++++',res)
			if (res.code == 1) {
				resolve(res);
				return
			}
			if (res.code == 401) {
				uni.removeStorage({
					key: 'token',
					success() {
						console.log('token过期删除成功')
						uni.switchTab({
							url: '../../my'
						})
					}
				})
				return
			}
			uni.setStorage({
				key: url + JSON.stringify(data),
				data: res,
				success() {
					console.log('存入成功')
				}
			})
			resolve(res)
		},
		fail(err) {
			console.log('---------请求错误------------', err)
			reject(err);
		}
	});
}

function Get(url, obj) {
	return new Promise((resolve, reject) => {
		
		uni.getStorage({
			key:'token',
			success(res){
				token = res.data.token
			},
			fail(err) {
				console.log('token取出错误----没有token',err)
			}
		})
		uni.getStorage({
			key: 'dirAndAreaid',
			success(res) {
				imsiData.dir = res.data.dir
				let data = Object.assign(obj || {}, imsiData)
				uni.getStorage({
					key: url + JSON.stringify(data),
					success(res) {
						// console.log('在缓存里面获取数据success---------------',res.data)
						resolve(res.data)
					},
					fail(err) {
						console.log('获取缓存失败')
						requestGet(url, data, resolve, reject)
					}
				})
			},
			fail() {
				uni.getStorage({
					key: url + JSON.stringify(data),
					success(res) {
						console.log('在缓存里面获取数据success---------------',res.data)
						resolve(res.data)
					},
					fail(err) {
						console.log('获取缓存失败------------dir获取出错------------')
						requestGet(url, data, resolve, reject)
					}
				})
			}
		})
		
	})
}

function All(url, obj) {
	console.log('获取城市信息的传值', obj)
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data: obj,
			method: 'GET',
			header: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err)
			}
		});
	})
}

function File(url) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: url,
			method: 'GET',
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err)
			}
		});
	})
}

function VersionGet(url, obj) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data: obj,
			method: 'GET',
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err)
			}
		});
	})
}

function MyGet(url, obj) {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'dirAndAreaid',
			success(res) {
				imsiData.dir = res.data.dir
			}
		})
		
		uni.getStorage({
			key:'token',
			success(res){
				token = res.data.token
				uni.request({
					url: baseUrl + url,
					data: obj,
					method: 'GET',
					header: {
						'Authorization': 'Bearer ' + token
					},
					success: (res) => {
						resolve(res);
					},
					fail(err) {
						reject(err)
					}
				});
				
			},
			fail(err) {
				console.log('token取出错误----没有token',err)
			}
		})
	})
}
/**
 * post（）--api
 * @param obj 
 * @returns {*}
 */
function Post(url, obj) {
	return new Promise((resolve, reject) => {
			uni.getStorage({
				key: 'token',
				success(res) {
					console.log('token在request的post请求调用成功取出', res.data.token)
					token = res.data.token
				}
			})
			uni.request({
				url: baseUrl + url,
				data: Object.assign(obj || {}, imsiData),
				method: 'POST',
				header: {
					'authorization': 'Bearer ' + token
				},
				success: (res) => {
					console.log('++++++++++++',res)
					resolve(res);
				},
				fail(err) {
					console.log('-----------',err)
					reject(err)
				}
			});
	})
}

function MyPost(url, obj) {
	console.log('上传的参数', imsiData, obj)
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'token',
			success(res) {
				console.log('token在request的post请求调用成功取出', res.data.token)
				token = res.data.token
				uni.request({
					url: baseUrl + url,
					data: Object.assign(obj || {}, imsiData),
					method: 'POST',
					header: {
						'authorization': 'Bearer ' + token
					},
					success: (res) => {
						resolve(res);

					},
					fail(err) {
						reject(err)
					}
				});
			}
		})
	})
}
export default {
	Get,
	Post,
	All,
	MyGet,
	VersionGet,
	File,
	MyPost
}
//其中 /api 为vue的代理，即为 171.**.**.765:8080
