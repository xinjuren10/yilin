import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    routes: [
        { path: '/', redirect: '/clause' },
      {
        path: '/',
        name:'clause',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '条款管理' },
        children: [
            {
                path: '/clause',
                name:'addClause',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Clause.vue'),
                meta: { title: '条款管理' },
            },
            {
                path: '/addClause',
                name:'addClause',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddClause.vue'),
                meta: { title: '添加条款' },
            },
            {
                path: '/addinstitutions',
                name:'addInstitution',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddInstitution.vue'),
                meta: { title: '添加制度流程列表' }
            },
            {
                path: '/addmenu',
                name:'addMenu',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddMenu.vue'),
                meta: { title: '编辑菜单' }
            },
            {
                path: '/institution',
                name:'institution',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Institution.vue'),
                meta: { title: '制度流程' }
            },
            {
                path: '/standard',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Standard.vue'),
                meta: { title: ' 国家/行业标准' }
            },
            {
                path: '/addstandard',
                name:"addStandard",
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddStandard.vue'),
                meta: { title: ' 添加国家/行业标准' }
            },
            {
                path: '/template',
                name:'template',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Template.vue'),
                meta: { title: '模板样例' }
            },
            {
                path: '/addTemplate',
                name:"addTemplate",
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddTemplate.vue'),
                meta: { title: '添加模板样例' }
            },
            {
                path: '/program',
                name:'program',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Program.vue'),
                meta: { title: ' 项目管理' }
            },
            {
                path: '/addProgram',
                name:"addProgram",
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddProgram.vue'),
                meta: { title: '添加项目' }
            },
            {
                path: '/know',
                name:'know',
                component: () => import(/* webpackChunkName: "home" */ '../components/page/Know.vue'),
                meta: { title: '应知应会' },
            },
            {
                path: '/addKnow',
                name:"addKnow",
                component: () => import(/* webpackChunkName: "home" */ '../components/page/AddKnow.vue'),
                meta: { title: '添加应知应会' },
            },
            {
                path: '/hospital',
                name:'hospital',
                component: () => import(/* webpackChunkName: "homes" */ '../components/page/Hospital.vue'),
                meta: { title: '医院管理' }
            },
            {
                path: '/room',
                name:'room',
                component: () => import(/* webpackChunkName: "homes" */ '../components/page/Room.vue'),
                meta: { title: '平台科室管理' }
            }, {
                path: '/category',
                name:'addCategory',
                component: () => import(/* webpackChunkName: "homes" */ '../components/page/AddCategory.vue'),
                meta: { title: '添加科室分类' }
            },{
                path: '/count',
                name:'count',
                component: () => import(/* webpackChunkName: "homes" */ '../components/page/Count.vue'),
                meta: { title: '账户管理' }
                },
                {
                    path: '/addcount',
                    name:'addCount',
                    component: () => import(/* webpackChunkName: "homes" */ '../components/page/AddCount.vue'),
                    meta: { title: '添加账户' }
                },
                {
                path: '/role',
                name:'role',
                component: () => import(/* webpackChunkName: "homes" */ '../components/page/Role.vue'),
                meta: { title: '角色管理' }
                },
                {
                    path: '/addrole',
                    name:'addRole',
                    component: () => import(/* webpackChunkName: "homes" */ '../components/page/AddRole.vue'),
                    meta: { title: '添加角色' }
                },
                {
                    path: '/codes',
                    name:'codes',
                    component: () => import(/* webpackChunkName: "homes" */ '../components/page/Codes.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/menus',
                    name:'menus',
                    component: () => import(/* webpackChunkName: "homes" */ '../components/page/Menus.vue'),
                    meta: { title: '功能菜单管理' }
              },
              {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
             },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
