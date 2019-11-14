<template>
    <div class="index">
        <p class="titles">条款管理</p>
        <div class="search">
            <el-button type="primary" size="medimu">添加</el-button>
            <el-button type="primary" size="medimu">导入</el-button>
            <el-select  v-model="value" size="medimu" placeholder="请选择科室">
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
                fixed
                class="tableIndex"
                :data="tableData"
                style="width: 100%" border stripe>
            <el-table-column
                    prop="category"
                    label="目录" width="200">
            </el-table-column>
            <el-table-column
                    prop="item"
                    label="条款项"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="key"
                    label="评审要点" width="200">
            </el-table-column>
            <el-table-column
                    prop="key1"
                    label="责任科室与配合科室">
            </el-table-column>
            <el-table-column
                    prop="key2"
                    label="规范性文件" >
            </el-table-column>
            <el-table-column
                    prop="key3"
                    label="评审要点">
            </el-table-column>
            <el-table-column
                    prop="key4"
                    label="查阅资料">
            </el-table-column>
            <el-table-column
                    prop="key5"
                    label="访谈追踪">
            </el-table-column>
            <el-table-column
                    prop="key6"
                    label="实地查看与考评">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                keyword:'',//搜索关键字
                options: [{
                    value: '1',
                    label: '一级科室'
                }],
                tableData: [{
                    category:[],
                    item:'1.3.3承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养。',
                    key:'【C】或承担医学院校医学生的临床教学和实习任务，有可追溯的记',
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
</style>
