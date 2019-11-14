// 导入所有接口
import WebApi from './web-api';
//安装并注册全局
const install = Vue => {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    // 注意，此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get() {
        return WebApi;
      }
    }
  });
};
export default install;
