<template>
    <div class="index">
        <p class="titles">系统菜单管理</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="openMenu">添加菜单</el-button>
            <el-input v-model="keyword" placeholder="输入员工姓名" class="searchKey" size="medimu"></el-input>
            <el-button type="primary" icon="el-icon-search"  size="medimu">搜索</el-button>
        </div>
        <el-table
                v-loading = "loading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width:100%">
            <el-table-column
                    label="菜单名称"
                    prop="funcName">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="URL">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="是否禁用">
                <template slot-scope="scope">
                    <span>{{scope.row.status==="open"?"启用":"禁用"}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="显示到">
                <template slot-scope="scope">
                   <span>平台、医院后台</span>
                </template>
            </el-table-column>
        <!--    <el-table-column
                    prop="showIndex"
                    label="显示顺序">
            </el-table-column>-->
            <el-table-column
                    label="备注">
                <template slot-scope="scope">
                    <span>{{scope.row.type==="button"?"按钮权限":"菜单"}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="290">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="editMenu(scope.row)"  type="primary" size="small">编辑</el-button>
                    <el-button @click.native.prevent="deleteMenu(scope.row)" type="danger" size="small">删除</el-button>
                    <el-button @click.native.prevent="setPid(scope.row)" type="primary" size="small" v-if="scope.row.type !=='button'">设置页面功能权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogFormVisible" width="800px" top="70px" center :modal-append-to-body="false">
            <el-form  :model="form" label-width="120px">
                <el-form-item label="菜单名称" >
                    <el-input v-model="form.funcName" class="nameForm"></el-input>
                    <el-checkbox v-model="form.status">禁用</el-checkbox>
                </el-form-item>
                <el-form-item label="菜单图标" >
                    <el-input v-model="form.icon" class="nameForm"></el-input>
                </el-form-item>
                <el-form-item label="URL" >
                    <el-input v-model="form.url" class="nameForm"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型" >
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="平台后台" value="平台后台"></el-checkbox>
                        <el-checkbox label="医院后台" value="医院后台"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="菜单目录(不选默认一级菜单)" style="font-size:12px;">
                    <el-tree
                            :check-strictly="checkOne"
                            accordion
                            :data="data"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            :default-checked-keys="checkKey"
                            :highlight-current="true"
                            :expand-on-click-node="true"
                            @check-change="getCheckNode"
                            highlight-current
                            :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input  type="textarea" v-model="form.remarks" class="nameForm"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="medimu" :load="flag" @click="saveMenu">保存</el-button>
                <el-button @click="dialogFormVisible=false" size="medimu">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="menuVisible" title="菜单权限" width="800px" top="70px" center :modal-append-to-body="false">
            <el-form  :model="menu" label-width="120px">
                <el-form-item label="权限名称" >
                    <el-input v-model="menu.funcName" class="nameForm"></el-input>
                    <el-checkbox v-model="menu.status">禁用</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="medimu" :load="flags" @click="setMenu">保存</el-button>
                <el-button @click="menuVisible=false" size="medimu">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'menus',
        data() {
            return {
                menuVisible:false,
                menu:{funcName:"",status:""},
                checkKey:[],//默认选中的key
                pid:'',
                dialogFormVisible:false,
                form:{funcName:"",status:"",remarks:"",type:["平台后台","医院后台"],url:"",icon:""},
                value:'',
                flags:false,
                checkOne:true,
                addFlag:true, //默认添加，添加编辑模式
                loading:true,
                keyword:'',//搜索关键字
                options: [{
                    value: '职能科室',
                    label: '职能科室'
                },{
                    value: '临床科室',
                    label: '临床科室'
                },{
                    value: '医技科室',
                    label: '医技科室'
                }],
                flag:false,
                tableData:[],
                data:[],
                defaultProps: {
                    children:'child',
                    label: 'funcName'
                },
                checkedNode:[],
                pageSize:10,
                current:1,
                total:0,
                id:''
            }
        },
        methods:{
            openMenu(){
               this.dialogFormVisible=true
               this.addFlag=true
            },
            setPid(row){
                this.addFlag=true
                this.menuVisible=true;
                this.pid=row.id
                this.menu.funcName=""
            },
            setMenu(row){
              this.flags=true
                if(this.addFlag){
                if(this.menu.funcName.length>1){
                    const data={
                        "id":this.addFlag===true?"":row.id,
                        "funcName": this.menu.funcName,
                        "pid": this.pid,
                        "status":this.form.status==true?"closed":"open"
                    }
                    this.$api.system.addFunction(data).then(res=>{
                        this.flags=false
                        this.menuVisible=false
                        this.$message({
                            type:res.code===200?"success":"error",
                            message:res.msg
                        })
                    })
                }else{
                    this.$message.error("请输入权限名称")
                }}else{
                    const data={
                        "id":this.id,
                        "funcName": this.menu.funcName,
                        "pid": this.pid,
                        "status":this.form.status==true?"closed":"open"
                    }
                    this.$api.system.updateFunction(data).then(res=>{
                        this.flags=false
                        this.menuVisible=false
                        this.$message({
                            type:res.code===200?"success":"error",
                            message:res.msg
                        })
                    })
            }
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.getRoomList()
            },
            editMenu(row){
                this.id=row.id
                if(row.type==="button"){
                    this.addFlag=false
                    this.menuVisible=true;
                    this.menu=row
                }else{
                    this.addFlag=false
                    this.dialogFormVisible=true;
                    this.form=row
                }
            },
            deleteMenu(row){
                this.loading=true
                const data={id:row.id}
                this.$api.system.deleteFunction(data).then(res=>{
                    this.loading=false
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.code==200?res.msg:'当前菜单或按钮存在子级,不能同时删除,'+res.msg
                    })
                    this.getMenuList()
                })
            },
            handleCurrentChange(val) {
                this.current=val
                this.getRoomList()
            },
            goAddMenu(){
                this.$router.push({name:"addMenu"})
            },
            getMenuList(){
             this.$api.system.getMenuList().then(res=>{
                 this.loading=false
                 this.$message({
                     type:res.code==200?"success":"error",
                     message:res.msg
                 })
                 if(res.code===200 && res.data){
                     const listData=[];
                     res.data.forEach(function(item,index){
                         listData.push(item)
                         if(item.child && item.child.length>0){
                             for (let i=0;i<item.child.length;i++){
                                 listData.push(item.child[i])
                             }
                         }
                     })
                     this.tableData=listData
                     this.data=res.data
                 }else {
                     this.tableData=[]
                 }
             })
            },
            getCheckNode(){
                this.checkedNode=this.$refs.tree.getCheckedNodes()
                if(this.checkedNode.length>1){
                    this.$message({
                        type:"error",
                        message:"新增菜单只有选择一个父级节点"
                    })
                }
            },
            saveMenu(){
                if(this.addFlag){
                    const data={
                        "child":[],
                        "funcId":"string",
                        "isDelete":"no",
                        "icon":this.form.icon,
                        "level":"",
                        "funcName":this.form.funcName,
                        "serialNo": "",
                        "parientId": this.checkedNode.length>0?this.checkedNode[0].id:0,
                        "status":this.form.status==true?"closed":"open",
                        "type": "func",
                        "url":this.form.url
                    }
                    this.flag=true
                    this.$api.system.addFunction(data).then(res=>{
                        this.dialogFormVisible=false
                        this.flag=false
                        this.$message({
                            type:res.code===200?"success":"error",
                            message:res.msg
                        })
                        this.getMenuList()
                    })
                }else{
                    const data={
                        "child":[],
                        "id":this.id,
                        "funcId":"string",
                        "isDelete":"no",
                        "icon":this.form.icon,
                        "level":"",
                        "funcName":this.form.funcName,
                        "serialNo": "",
                        "parientId": this.checkedNode.length>0?this.checkedNode[0].id:0,
                        "status":this.form.status==true?"closed":"open",
                        "type":"func",
                        "url":this.form.url
                    }
                    this.flag=true
                    this.$api.system.updateFunction(data).then(res=>{
                        this.dialogFormVisible=false
                        this.flag=false
                        this.$message({
                            type:res.code===200?"success":"error",
                            message:res.msg
                        })
                        this.getMenuList()
                    })
                }
            }
        },
        mounted() {
            this.getMenuList()
        }
    }
</script>
<style scoped>
    .nameForm{
        width:400px;
        margin-right:50px;
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
