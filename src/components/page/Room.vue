<template>
    <div class="index">
        <p class="titles">平台科室分类管理</p>
        <div class="search">
            <el-button type="primary" size="small" @click="goCategory">添加分类</el-button>
            <el-input v-model="keyword" placeholder="请输入科室名称" class="searchKey" size="small"></el-input>
            <el-button type="primary" icon="el-icon-search"  size="small" @click="findList">搜索</el-button>
        </div>
        <el-table
                v-loading = "loading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="depName"
                    label="科室名称">
            </el-table-column>
            <el-table-column
                    prop="typeName"
                    label="科室类型">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="80">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"  style="margin:0 auto;">
        </el-pagination>
        <el-dialog :visible.sync="dialogFormVisible" width="700px" top="70px" center title="医院管理" :modal-append-to-body="false">
            <el-form  :model="form" label-width="100px">
                <el-form-item label="医院名称" >
                    <el-input v-model="form.depName"></el-input>
                </el-form-item>
                <el-form-item label="医院类型:">
                    <el-select v-model="form.type">
                        <el-option
                                v-for="(item,index) in options"
                                :key="index"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="updateRoom">确 定</el-button>
                <el-button @click="dialogFormVisible=false" size="small">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'room',
        data() {
            return {
                dialogFormVisible:false,
                form: {
                    depName: '',
                    type: '',
                },
                loading:true,//开启loading
                total:0, //总数
                pageSize:10,//每页数量
                current:1, //当前页
                id:'',
                keyword:'',//搜索关键字
                options: [{
                    label:'职能医室',
                    value:'职能医室'
                },{
                    label:'医技医室',
                    value:'医技医室'
                },{
                    label:'临床科室',
                    value:'临床科室'
                }],
                tableData: []
            }
        },
        methods: {
            updateRoom(){
                const data={
                    "depName":this.form.depName,
                    "id":this.id,
                    "remark":"",
                    "status":"open",
                    "type":this.form.type,
                    "typeName":this.form.type
                }
                this.dialogFormVisible=false
                this.$api.system.editRoom(data).then(res=>{
                    this.getRoomList()
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.msg
                    })
                })
            },
            edit(row) {
                this.form=row;
                this.dialogFormVisible=true;
                this.id=row.id
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.getRoomList()
            },
            handleCurrentChange(val) {
                this.current=val
                this.getRoomList()
            },
            goCategory (){
                this.$router.push({name:"addCategory"})
            },
            //获取科室列表
            getRoomList (){
                this.loading=true;
                const data={
                    "current":this.current,
                    "keyword":this.keyword,
                    "size":this.pageSize
                }
              this.$api.system.getDepList(data).then(res=>{
                  this.loading=false;
                  if(res.code==200){
                      this.tableData=res.data.records
                      this.total=+res.data.total
                  }
              })
            },
            findList(){
                this.loading=true;
                const param={
                    "deptName":this.keyword,
                }
                this.$api.system.findList(param).then(res=>{
                    this.loading=false;
                    if(res.code==200) this.tableData=res.data
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.msg
                    })
                })
            }
        },
        mounted() {
            this.getRoomList()
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
