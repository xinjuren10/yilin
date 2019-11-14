import Axios from 'axios';
import Cookies from 'js-cookie';
import Router from '@/router';
let Config = {
	method: 'GET',
	// 基础url前缀
	//baseUrl: 'http://218.70.106.202:49011/business',
	baseUrl: 'http://211.149.197.170:9012/business',
	// baseUrl: '/business',
	// 请求头信息
	headers: {
		'Content-Type': 'application/json'
	},
	// 参数
	data: {},
	// 设置超时时间
	timeout: 100000,
	// 携带凭证
	withCredentials: true,
	// 返回数据类型
	responseType: 'json'
}
export default function $axios(options) {
	return new Promise((resolve, reject) => {
		const instance = Axios.create({
			baseURL: Config.baseUrl,
			headers: Config.headers,
			timeout: Config.timeout,
			withCredentials: Config.withCredentials
		});
		// request 拦截器
		instance.interceptors.request.use(
			config => {
				let token = localStorage.getItem('sessionId');
				// 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
				// console.log(store.state.loading)
				// console.log('准备发送请求...')
				// 2. 带上token
				if (token) {
					config.headers.token = token;
				} else {
					// 重定向到登录页面
					Router.push('/login');
				}
				return config;
			},
			error => {
				// 请求错误时
				// 2. 需要重定向到错误页面
				const errorInfo = error.response;
				if (errorInfo) {
					error = errorInfo.data; // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
					const errorStatus = errorInfo.status; // 404 403 500 ...
					Router.push({
						path: `/error/${errorStatus}`
					});
				}
				return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
			}
		);
		// response 拦截器
		instance.interceptors.response.use(
			response => {
				let data;
				// IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
				if (response.data == undefined) {
					data = JSON.parse(response.request.responseText);
				} else {
					data = response.data;
				}
				// 若不是正确的返回code，且已经登录，就抛出错误
				// const err = new Error(data.desc)
				// err.data = data
				// err.response = response
				// throw err
				if(data.code==500 && location.href.indexOf("login")==-1 && data.msg=="请先登录"){
					localStorage.removeItem('sessionId')
					Router.push({path:'/login'})
				}
				return data;
			},
			err => {
				if (err && err.response) {
					switch (err.response.status) {
						case 400:
							err.message = '请求错误';
							break;
						case 401:
							err.message = '未授权，请登录';
							break;
						case 403:
							err.message = '拒绝访问';
							break;
						case 404:
							err.message = '请求地址出错';
							break;
						case 408:
							err.message = '请求超时';
							break;
						case 500:
							err.message = '登录已失效';
							break;
						case 501:
							err.message = '服务未实现';
							break;
						case 502:
							err.message = '网关错误';
							break;
						case 503:
							err.message = '服务不可用';
							break;
						case 504:
							err.message = '网关超时';
							break;
						case 505:
							err.message = 'HTTP版本不受支持';
							break;
						default:
					}
				}
				return Promise.reject(err); // 返回接口返回的错误信息
			}
		);
		// 请求处理
		instance(options).then(res => {
			resolve(res);
			return false;
		}).catch(error => {
			reject(error);
		});
	});
}
