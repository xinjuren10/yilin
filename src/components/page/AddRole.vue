<template>
    <div class="index">
        <div class="link">
        <router-link to="/role"><span>角色管理</span></router-link>>><span>添加角色</span></div>
        <el-form ref="form" :model="form" label-width="100px" class="addCount" style="width:100%;">
            <el-form-item label="角色名称" required>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
   <div class="role">
           <el-form-item class="roleText" label="管理模块" required>
               <!--<el-input v-model="form.name"></el-input>-->
           </el-form-item>
            <!--<div class="roleText">管理模块</div>-->
            <el-tree
                    class="tree"
                    :data="data"
                    :show-checkbox="!flag"
                    node-key="id"
                    ref="tree"
                    :highlight-current="true"
                    @check-change="getChecked"
                    default-expand-all
                    :props="defaultProps"
                    :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
             <el-checkbox v-model="data.edit" :disabled="flag">编辑</el-checkbox>
             <el-checkbox v-model="data.delete" :disabled="flag">删除</el-checkbox>
             <el-checkbox v-model="data.add"  :disabled="flag">添加</el-checkbox>
         </span>
         </span>
       </el-tree>
  </div>
        <el-button type="primary" size="medimu" class="saveCount" @click="addRole">保存</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addcount',
        data() {
            return {
                flag:false,
                checked:false,
                data:[],
                datas: [{
                    id:1,
                    label: '条款管理',
                    url:'/',
                    edit:false,
                    delete:false,
                    add:false,
                    children: [{
                        id:10,
                        label: '编辑条款',
                        url:'/clause',
                        edit:false,
                        delete:false,
                        add:false,
                    }]
                },{
                    id:2,
                    label: '制度流程',
                    url:'/addinstitutions',
                    edit:false,
                    delete:false,
                    add:false,
                    children: [{
                        id:20,
                        label: '制度流程列表',
                        url:'/addinstitutions',
                        edit:false,
                        delete:false,
                        add:false,
                    }]
                },{
                    id:3,
                    label: '国家/行业标准',
                    url:'/standard',
                    edit:false,
                    delete:false,
                    add:false,
                    children: [{
                        id:30,
                        label: '国家/行业标准',
                        url:'/standard',
                        edit:false,
                        delete:false,
                        add:false,
                    }]
                },{
                    id:4,
                    label: '模板样例',
                    url:'/template',
                    edit:false,
                    delete:false,
                    add:false,
                    children: [{
                        id:40,
                        label: '模板样例',
                        url:'/template',
                        edit:false,
                        delete:false,
                        add:false,
                    }]
                    },{
                    id:5,
                    label: '项目管理',
                    url:'/program',
                    edit:false,
                    delete:false,
                    add:false,
                    children: [{
                        id:50,
                        label: '全部项目',
                        url:'/program',
                        edit:false,
                        delete:false,
                        add:false,
                    }]
                    },
                    {
                        id:6,
                        label: '应知应会',
                        url:'/know',
                        edit:false,
                        delete:false,
                        add:false,
                        children: [{
                            id:60,
                            label: '应知应会',
                            url:'/know',
                            edit:false,
                            delete:false,
                            add:false,
                        }]
                    },
                    {
                        id:7,
                        label: ' 医院管理',
                        url:'/hospital',
                        edit:false,
                        delete:false,
                        add:false,
                        children: [{
                            id:70,
                            label: ' 医院管理',
                            url:'/hospital',
                            edit:false,
                            delete:false,
                            add:false,
                        }]
                    },
                    {
                        id:8,
                        label: '系统管理',
                        url:'/room',
                        edit:false,
                        delete:false,
                        add:false,
                        children: [{
                            id:80,
                            label: '平台科室管理',
                            url:'/room',
                            edit:false,
                            delete:false,
                            add:false,
                        },{
                            id:81,
                            label: '账户管理',
                            url:'/count',
                            edit:false,
                            delete:false,
                            add:false,
                        },{
                            id:82,
                            label: '角色管理',
                            url:'/role',
                            edit:false,
                            delete:false,
                            add:false,
                        },{
                            id:83,
                            label: '修改密码',
                            url:'/codes',
                            edit:false,
                            delete:false,
                            add:false,
                        },{
                            id:84,
                            label: '功能菜单管理',
                            url:'/menus',
                            edit:false,
                            delete:false,
                            add:false,
                        }]
                    },
                ],
                value: '',
                keyword: '',//搜索关键字
                options: [],
                role: [],
                funcIds:[],
                system:'',//医院id
                form:{name:""},
                defaultProps:{
                    children: 'child',
                    label: 'funcName'
                }
            }
        },
        methods:{
            getMenuList(){
                this.$api.system.getMenuList().then(res=>{
                    this.data=res.data
                })
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            getChecked(){
              this.funcIds=this.$refs.tree.getCheckedNodes()
            },
            addRole(){
                const data={
                    "funcIds":this.funcIds,
                    "roleName": this.form.name,
                    "system":this.system
                }
                this.$api.system.addRole(data).then(res=>{
                    this.$message({
                        type:res.code===200?"success":"error",
                        message:res.msg
                    })
                })
            },
            getUerInfo(){
                this.$api.system.getUserInfo().then(res=>{
                    if(res.code===200){
                        this.system=res.data.tbUser.system
                    }
                })
            }
        },
        mounted() {
            this.getUerInfo()
            this.getMenuList()
        }
    }
</script>
<style scoped>
    .link{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        height:60px;
    }
    .role .tree{
        flex:1;
    }
    .role{
        display: flex;
        background:#fff;
        padding:20px 0;
    }
    .roleText{
     width:120px;
     color:#606266;
     font-size:14px;
    }
    .tips{
        text-indent:50px;
        color:#333;
        font-size:14px;
    }
    .saveCount{
        margin:0 0  0 150px;
        width:150px;
    }
    .link span{
        margin:0 10px;
    }
    .titles{
        line-height:50px;
        font-size:20px;
        color:#000;
    }
    .searchKey{
        width:400px;
        height:40px;
    }
    .tableIndex{
        margin:20px auto 0 0;
    }
    .institutionTable{
        margin:30px 0  0 0;
    }
</style>
