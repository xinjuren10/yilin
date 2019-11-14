<template>
    <div class="index">
        <p class="titles">国家/行业标准</p>
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
            <el-input v-model="keyword" placeholder="请输入标题关键字" class="searchKey" size="medimu"></el-input>
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
    import bus from '../common/bus';
    export default {
        name: 'Institution',
        data() {
            return {
                value:'',
                keyword:'',//搜索关键字
                options: [{
                    value: '1',
                    label: '一级科室'
                }],
                tableData: [{
                    title: '《分级护理制度》',
                    name: '《分级护理制度》.doc',
                    management: '护士科',
                    updateTime: '2019-10-23'
                }]
            }
        },
        components: {

        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){

        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            goAddInstitution (){
                this.$router.push({name:"addStandard"})
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
