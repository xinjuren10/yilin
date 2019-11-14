<template>
    <div class="index">
        <p class="titles">角色管理</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddRole">添加</el-button>
        </div>
        <el-table
                v-loading = "pictLoading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width:98%;margin:30px auto;">
            <el-table-column
                    prop="roleName"
                    label="角色名称">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="240">
                <template slot-scope="scope">
                    <el-button @click="editRole(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteRole(scope.row)" type="danger" size="small">删除</el-button>
                    <el-button @click="showRole(scope.row)" type="success" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'count',
        data() {
            return {
                value:'',
                keyword:'',//搜索关键字
                options: [],
                tableData: [],
                loading:true,
                pictLoading:true
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            goAddRole (){
                this.$router.push({name:"addRole"})
            },
            getRoleList(){
               this.$api.system.roleList().then(res=>{
                   this.pictLoading=false
                   this.tableData=res.data
               })
            },
            deleteRole(row){
                this.pictLoading=true
                const data={"id":row.roleId}
                this.$api.system.deleteRole(data).then(res=>{
                    this.pictLoading=false
                    if(res.code==200) this.getRoleList()
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.msg
                    })
                })
            },
            editRole(row){

            },
            showRole(row){

            }
        },
        mounted() {
            this.getRoleList()
        }
    }
</script>
<style scoped>
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
