<template>
    <div class="index">
        <p class="titles">模版样例</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddInstitution">添加</el-button>
            <el-select  v-model="value" size="medimu" placeholder="请选择科室">
                <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select  v-model="value" size="medimu" placeholder="">
                <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="keyword" placeholder="请输入条款标题" class="searchKey" size="medimu"></el-input>
            <el-button type="primary" icon="el-icon-search"  size="medimu">搜索</el-button>
        </div>
        <el-table
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width: 100%"
                height="250">
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
                    label="责任修订科室">
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
    </div>
</template>
<script>
    export default {
        name: 'Institution',
        data() {
            return {
                value:'',
                keyword:'',//搜索关键字
                options: [],
                tableData: []
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            goAddInstitution (){
                this.$router.push({name:"addTemplate"})
            },
            getKnowList(){
                const param={
                    "current": 0,
                    "dept": "string",
                    "endTime": "string",
                    "keyword": "string",
                    "name": "string",
                    "size": 0,
                    "startTime": "string",
                    "system": "string"
                }
                this.$api.system.getKnowList(data).then(res=>{

                })
            },
        },mounted() {
            this.getKnowList()
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
