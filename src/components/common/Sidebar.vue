<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                { icon: 'el-icon-lx-home',
                 index: '1',
                 title: '条款管理',
                 subs: [{index: 'clause', title: '条款编辑'}]
                },
                { icon: 'el-icon-lx-cascades',
                  index: '2',
                  title: '制度流程',
                  subs:[
                      {index:'institution',title: '制度流程列表'}]
                },
                { icon: 'el-icon-lx-copy',
                    index: '3',
                    title: '国家/行业标准',
                    subs:[
                        {index:'standard',title: '国家/行业标准'}]
                },
                { icon: 'el-icon-lx-calendar',
                    index: '4',
                    title: '模板样例',
                    subs:[
                        {index:'template',title: '模板样例'}]
                },
                { icon: 'el-icon-lx-time',
                    index: '5',
                    title: '项目管理',
                    subs:[
                        {index:'program',title: '全部项目'}]
                },
                { icon: 'el-icon-lx-share',
                    index: '6',
                    title: '应知应会',
                    subs:[{index:'know',title: '应知应会'}]
                },
                { icon: 'el-icon-lx-info',
                    index: '7',
                    title: '医院管理',
                    subs:[
                        {index:'hospital',title: '医院管理'}]
                },
                { icon: 'el-icon-lx-edit',
                    index: '8',
                    title: '系统管理',
                    subs:[
                        {index:'room',title: '平台科室管理'},
                        {index:'count',title: '账户管理'},
                        {index:'role',title: '角色管理'},
                        {index:'codes',title: '修改密码'},
                        {index:'menus',title: '功能菜单管理'}
                        ]
                },
                ]
           };
     },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>
<style scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    background:rgba(33,44,49,1.0);
}
.sidebar::-webkit-scrollbar {width: 0;}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {height: 100%;}
</style>
