<template>
    <div class="index">
        <p class="titles">全部项目</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddProgram">添加</el-button>
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
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width: 100%"
                height="250">
            <el-table-column
                    prop="title"
                    width="100"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="name"
                    width="200"
                    label="对应条款">
            </el-table-column>
            <el-table-column
                    prop="management"
                    label="责任修订科室">
            </el-table-column>
            <el-table-column
                    label="职能科室—院级质控">
                <el-table-column
                        prop="management"
                        label="主管责任人">
                </el-table-column>
                <el-table-column
                        prop="management"
                        label="规范性文件">
                </el-table-column>
                <el-table-column
                        prop="management"
                        label="参考资料">
                </el-table-column>
                <el-table-column
                        prop="management"
                        label="参考资料">
                </el-table-column>
                <el-table-column
                        prop="management"
                        label="培训">
                </el-table-column>
                <el-table-column
                        style="padding: 0px"
                        label="检查结果">
                    <template slot-scope="scope" >
                        <div class="showTanOn">
                            <ul>
                                <li v-for="item in scope.row.management1" :style="{'height':100/scope.row.management1.length}+'%'">{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="督导资料">
                    <template slot-scope="scope" >
                        <div class="showTanOn">
                            <ul>
                                <li v-for="item in scope.row.management2" :style="{'height':100/scope.row.management2.length}+'%'">{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="整改资料">
                    <template slot-scope="scope" >
                        <div class="showTanOn">
                            <ul>
                                <li v-for="item in scope.row.management3" :style="{'height':100/scope.row.management3.length}+'%'">{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="整改资料">
                    <template slot-scope="scope" >
                        <div class="showTanOn">
                            <ul>
                                <li v-for="item in scope.row.management4" :style="{'height':100/scope.row.management4.length}+'%'">{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="定期总结">
                    <template slot-scope="scope" >
                        <div class="showTanOn">
                            <ul>
                                <li v-for="item in scope.row.management5" :style="{'height':100/scope.row.management5.length}+'%'">{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="management"
                        label="资料位置">
                </el-table-column>
            </el-table-column>

            <el-table-column
                    label="医技临床科室">
                <el-table-column
                        prop="updateTime"
                        label="规范性文件">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="相关科室">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="查看">
                </el-table-column>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
                options: [{
                    value: '1',
                    label: '一级科室'
                }],
                tableData: [{
                    title: '《分级护理制度》1.1.。有保度与流程。1.1.2遵照医',
                    name: '1.1有保障常用仪器、和抢救物品使用的制度与流程。',
                    management: '护士科',
                    updateTime: '2019-10-23',
                    management1:[{
                        name:'第一季度'
                    },{
                        name:'第二季度'
                    },{
                        name:'第三季度'
                    },{
                        name:'第四季度'
                    }],
                    management2:[{
                        name:'第一季度'
                    },{
                        name:'第二季度'
                    },{
                        name:'第三季度'
                    },{
                        name:'第四季度'
                    }],
                    management3:[{
                        name:'第一季度'
                    },{
                        name:'第二季度'
                    },{
                        name:'第三季度'
                    },{
                        name:'第四季度'
                    }],
                    management4:[{
                        name:'第一季度'
                    },{
                        name:'第二季度'
                    },{
                        name:'第三季度'
                    },{
                        name:'第四季度'
                    }],
                    management5:[{
                        name:'上半年'
                    },{
                        name:'年度总结'
                    }],
                },{
                    title: '《分级护理制度》',
                    name: '《分级护理制度》.doc',
                    management: '护士科',
                    updateTime: '2019-10-23',
                    management1:[{
                        name:'1月'
                    },{
                        name:'2月'
                    },{
                        name:'3月'
                    },{
                        name:'4月'
                    },{
                        name:'5月'
                    },{
                        name:'6月'
                    },{
                        name:'7月'
                    },{
                        name:'8月'
                    },{
                        name:'9月'
                    },{
                        name:'10月'
                    },{
                        name:'11月'
                    },{
                        name:'12月'
                    }],
                    management2:[{
                        name:'1月'
                    },{
                        name:'2月'
                    },{
                        name:'3月'
                    },{
                        name:'4月'
                    },{
                        name:'5月'
                    },{
                        name:'6月'
                    },{
                        name:'7月'
                    },{
                        name:'8月'
                    },{
                        name:'9月'
                    },{
                        name:'10月'
                    },{
                        name:'11月'
                    },{
                        name:'12月'
                    }],
                    management3:[{
                        name:'1月'
                    },{
                        name:'2月'
                    },{
                        name:'3月'
                    },{
                        name:'4月'
                    },{
                        name:'5月'
                    },{
                        name:'6月'
                    },{
                        name:'7月'
                    },{
                        name:'8月'
                    },{
                        name:'9月'
                    },{
                        name:'10月'
                    },{
                        name:'11月'
                    },{
                        name:'12月'
                    }],
                    management4:[{
                        name:'1月'
                    },{
                        name:'2月'
                    },{
                        name:'3月'
                    },{
                        name:'4月'
                    },{
                        name:'5月'
                    },{
                        name:'6月'
                    },{
                        name:'7月'
                    },{
                        name:'8月'
                    },{
                        name:'9月'
                    },{
                        name:'10月'
                    },{
                        name:'11月'
                    },{
                        name:'12月'
                    }],
                    management5:[{
                        name:'第一季度'
                    },{
                        name:'第二季度'
                    },{
                        name:'第三季度'
                    },{
                        name:'第四季度'
                    }],

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
            goAddProgram (){
                this.$router.push({name:"addProgram"})
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
    .cell .showTanOn ul li {
        border-bottom: 1px solid #ccc;
        width: 79px;
        margin-left: -11px;
        text-align: center;
        line-height: 50px;
    }
    .cell .showTanOn ul li:last-child{
        border-bottom: 0px solid #ccc;
    }
    >>>.el-table {
        height: calc(100vh - 250px) !important;
    }
</style>
