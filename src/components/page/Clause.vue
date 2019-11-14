<template>
    <div class="index">
        <p class="titles">全部条款</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddClause">添加</el-button>
            <el-button type="primary" size="medimu" @click="goAddClause">导入</el-button>
            <el-select  v-model="value" size="medimu" placeholder="请选择科室">
                <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="keyword" placeholder="按条款标题" class="searchKey" size="medimu"></el-input>
            <el-button type="primary" icon="el-icon-search"  size="medimu">搜索</el-button>
        </div>

        <div class="allStaff">
            <div class="leftMenu">
                <div class="SearchBar">
                    <div class="PublicTitle"><span></span>目录</div>
                </div>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="rightTab">
                <!--表格-->
                <div class="DeviceTable">
                    <el-table
                            fixed
                            class="tableIndex"
                            :data="tableData"
                            style="width: 100%" border stripe>
                        <el-table-column
                                prop="category"
                                label="条款项" width="200">
                        </el-table-column>
                        <el-table-column
                                prop="key"
                                label="评审要点"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="item"
                                label="查阅资料"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="key1"
                                label="访谈追踪" width="200">
                        </el-table-column>
                        <el-table-column
                                prop="key1"
                                label="实地查看与考评">
                        </el-table-column>
                        <el-table-column
                                prop="key2"
                                label="责任科室" >
                        </el-table-column>
                        <el-table-column
                                prop="key3"
                                label="配合科室">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                value:'',
                data: [{
                    label: '开展健康教育、健康咨询等健康咨询等多种形式的公益性社会活动多种形式的公益性社会活动。',
                    children: [{
                        label: '开展健康教育、健康咨询等多种形式的公益性社会活动。',
                        children: [{
                            label: '开展健康教育、健康咨询等多种形式的公益性社会活动。'
                        }]
                    }]
                }, {
                    label: '开展健康教育、',
                    children: [{
                        label: '开展健康教育、',
                        children: [{
                            label: '开展健康教育、'
                        }]
                    }, {
                        label: '开展健康教育、',
                        children: [{
                            label: '开展健康教育、'
                        }]
                    }]
                }, {
                    label: '开展健康教育、',
                    children: [{
                        label: '开展健康教育、',
                        children: [{
                            label: '开展健康教育、'
                        }]
                    }, {
                        label: '开展健康教育、',
                        children: [{
                            label: '开展健康教育、'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                keyword:'',//搜索关键字
                options: [{
                    value: '1',
                    label: '一级科室'
                }],
                tableData: [{
                    category:[],
                    item:'1.3.3承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养。',
                    key:'【A】或承担医学院校医学生的临床教学和实习任务，有可追溯的记【B】或承担医学院校医学生的临床教学和实习任务，有可追溯的记  【C】或承担医学院校医学生的临床教学和实习任务，有可追溯的记     ',
                    key2:'',
                    key3:'',
                    key4:'',
                    key5:'',
                    key6:'',
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
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
            goAddClause (){
                this.$router.push({name:"addClause"})
            },
            handleNodeClick (){

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
    .allStaff {
        overflow:  hidden;
        background:  white;
        margin-top: 20px;
    }
    .leftMenu >>> .el-tree{
        margin-left: 10%;
    }
    .leftMenu {
        float:  left;
        width: 20%;
        background:  white;

    }
    >>>span.el-tree-node__label {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rightTab {
        float: left;
        width: 80%;
    }
    .addButs {
        float: right;
        margin-top: 10px;
    }
</style>
