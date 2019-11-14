<template>
    <div class="index">
        <p class="titles">添加应知应会</p>
        <el-form ref="form" :model="form" label-width="120px" class="clauseForm">
            <el-form-item label="科室名称">
                <el-select v-model="form.organName">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>



            <el-button type="primary" class="saveBtn">保存</el-button>
            <el-button type="primary">保存并提醒院方有更新</el-button>
            <el-button >取消返回</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addClause',
        data() {
            return {
                radio:1,
                form:{organName:''},
                value:'',
                keyword:'',//搜索关键字
                checkedValue:[],
                isIndeterminate: true,
                options: [],
            }
        },
        methods: {
            handleCheckedCitiesChange(value) {
                this.checkedValue=value;
            }
        },
        mounted() {
            this.$api.system.getRoomList().then(res=>{
                if(res.code===200){
                    this.options=res.data
                    this.form.organName=this.$route.params.index
                }
            })
        }
    }
</script>
<style scoped>
    .saveBtn{margin:10px  0 0 120px;}
    .codeItem{
        width:200px;
    }
    .codeItem + span{
        margin:0 20px;
    }
    .clauseForm{
        width:800px;
        margin-top:10px;
        padding-bottom:20px;
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
