http://211.149.197.170:9012/business/swagger-ui.html# 
http://211.149.197.170:8080/distOne
http://211.149.197.170:8080/distTwo
http://211.149.197.170:9012/business/swagger-ui.html#/
## 安装步骤
```
git clone https://github.com/lin-xin/vue-manage-system.git      // 把模板下载到本地
cd vue-manage-system    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn
// 开启服务器，浏览器访问 http://localhost:8080
npm run serve
// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```
## 组件使用说明与演示
## 其他注意事项
### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？
举个栗子，我不想用 Vue-Quill-Editor 这个组件，那我需要分四步走。
第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。
```JavaScript
{
// 富文本编辑器组件
path: '/editor',
component: resolve => require(['../components/page/VueEditor.vue'], resolve)
}
```
第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueEditor.vue 文件。
```
第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。
{
	index: 'editor',
	title: '富文本编辑器'
},
第四步：卸载该组件。执行以下命令：
npm un vue-quill-editor -S
完成。


