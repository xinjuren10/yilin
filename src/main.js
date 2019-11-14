import Vue from 'vue';
import App from './App.vue';
import api from './api';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(api)
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from ,next) => {
    document.title = `${to.meta.title}`
    const token = localStorage.getItem("sessionId")
    if(token){//判断用户是否登录
            if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
                next()
            }else{
                let redirect = from.query.redirect//如果来源路由有query
                if(to.path === redirect){ //这行是解决next无限循环的问题
                    next()
                }else{
                    next({path:redirect})//跳转到目的路由
                }
            }
        }else{
            if(to.path==="/login"){
                next()
            }else{
                next({
                    path:"/login",
                    query: {redirect: to.fullPath}//将目的路由地址存入login的query中
                })
            }
        }
    return
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
