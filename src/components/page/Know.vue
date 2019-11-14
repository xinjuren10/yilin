<template>
    <div class="index">
        <p class="titles">应知应会</p>
        <div class="know">
            <div class="knowLeft">
              <p class="smallTitle">科室</p>
              <ul>
                  <li class="list" v-for="(item,index) in list" @click="goAddInstitution(index)"><span>{{item.organName}}</span><i>+</i></li>
              </ul>
            </div>
            <div class="knowRight">
                <div class="search">
                    <p class="smallTitle">应知应会</p>
                    <span class="demonstration">更新时间段</span>
                    <!--<el-date-picker-->
                            <!--size="medimu"-->
                            <!--v-model="values"-->
                            <!--type="datetime"-->
                            <!--placeholder="选择时间段"-->
                            <!--align="right"-->
                            <!--:picker-options="pickerOptions">-->
                    <!--</el-date-picker>-->
                    <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="medimu"
                            v-model="values"
                            type="datetimerange"
                            start-placeholder="选择开始日期"
                            end-placeholder="选择结束日期">
                    </el-date-picker>
                    <el-input v-model="keyword" placeholder="请输入标题" class="searchKey" size="medimu"></el-input>
                    <el-button type="primary" icon="el-icon-search"  size="medimu" @click="getKnowList">搜索</el-button>
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
                            prop="title"
                            label="标题">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="文档内容">
                    </el-table-column>
                    <el-table-column
                            prop="management"
                            label="所属科室">
                    </el-table-column>
                    <el-table-column
                            prop="creater"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop="modefider"
                            label="最后更新人">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="160">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="current"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="total"  style="text-align: center;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Institution',
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                loading:true,
                values:['',''],//更新时间段
                value:'',
                keyword:'',//搜索关键字
                options: [],
                tableData: [],
                pageSize:10,
                current:1,
                total:0,
                list:[],//医院列表
                system:''//当前用户医院id
            }
        },
        methods:{
            goAddInstitution (index){
                this.$router.push({name:'addknow',params:{index:this.list[index].id}})
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.getRoomList()
            },
            handleCurrentChange(val) {
                this.current=val
                this.getRoomList()
            },
            getKnowList(){
              const param={
                "dept":"",
                "endTime":this.values[1],
                "keyword":this.keyword,
                "startTime":this.values[0],
                "system":this.system
            }
            this.$api.system.getKnowList(param).then(res=>{
                this.loading=false
                if(res.code===200){
                    this.tableData=res.data.records
                    this.total=+res.data.total
                }

              })
            },
        },
        mounted(){
            this.$api.system.getUserInfo().then(res=>{
                if(res.code===200){
                    this.system=res.data.tbUser.system
                }
            })
            this.$api.system.getRoomList().then(res=>{
                if(res.code===200){
                    this.list=res.data
                }
            })
            this.getKnowList()
        }
    }
</script>
<style scoped>
    .list{
        display: flex;
        justify-content:space-between;
        align-items:center;
        line-height:30px;
        height:30px;
        font-size:14px;
        width:200px;
        cursor:pointer;
     }
    .list span{
        flex:1;
        text-indent:10px;
    }
    .list i{
        width:16px;
        height:16px;
        border:1px solid #d3d4d6;
        border-radius:8px;
        background:#fff;
        text-align: center;
        line-height:16px;
        margin-right:10px;
    }
    .know{
        display:flex;
        border:1px solid #DCDFE6;
    }
    .knowLeft{
        width:200px;
        border-right:1px solid #DCDFE6;
    }
    .knowRight{
        flex:1;
    }
    .titles{
        line-height:50px;
        font-size:20px;
        color:#000;
    }
    .searchKey{
        width:300px;
        height:40px;
    }
    .smallTitle{
        line-height:50px;
        font-size:18px;
        color:#000;
        text-indent:10px;
    }
    .tableIndex{
        margin:20px auto 0 0;
    }
    .demonstration{
        margin:0 10px 0 30px;
    }
    .institutionTable{
        margin:30px 0  0 0;
    }
</style>
