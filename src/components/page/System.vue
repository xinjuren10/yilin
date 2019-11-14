<template>
    <div class="index">
        <p class="titles">平台科室分类管理</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddInstitution">添加分类</el-button>
            <el-input v-model="keyword" placeholder="请输入科室名称" class="searchKey" size="medimu"></el-input>
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
                    label="科室名称">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="科室类型">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="160">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'room',
        data() {
            return {
                value:'',
                keyword:'',//搜索关键字
                options: [{
                    value: '0',
                    label: '职能科室'
                },{
                    value: '1',
                    label: '临床科室'
                },{
                    value: '2',
                    label: '医技科室'
                }
                ],
                tableData: [{
                    title: '办公室',
                    name: '职能科室',
                }]
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            goAddInstitution (){
                this.$router.push({name:"addInstitution"})
            }
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
