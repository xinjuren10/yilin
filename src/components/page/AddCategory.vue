<template>
    <div class="index">
        <p class="titles">科室管理</p>
        <p class="subTitle">科室分类</p>
        <el-form ref="form" :model="form" label-width="120px" class="roomForm">
            <el-form-item label=" 科室名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="科室类型">
                <el-select v-model="form.type">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-button type="primary" class="saveBtn" :loading="flag" @click="addDepartment">确定</el-button>
            <el-button @click="goBack">取消</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addInstitution',
        data() {
            return {
                form:{name:"",type:"",desc:""},
                value:'',
                flag:false,
                keyword:'',//搜索关键字
                options: [
                    { value:'职能科室',label:'职能科室' },
                    { value:'医技科室',label:'医技科室' },
                    { value:'临床科室',label:'临床科室' },
                ]
            }
        },
        methods: {
            addDepartment(){
                const data={
                    "depName":this.form.name,
                    "remark":this.form.desc,
                    "status":"open",
                    "type":this.form.type,
                    "typeName":this.form.type
                }
                this.flag=true
                this.$api.system.addDep(data).then(res=>{
                    this.flag=false
                    this.form.name=""
                    this.form.desc=""
                    this.form.type=""
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.msg
                    })
                    this.$router.push({name:"room"})
                })
            },
            goBack(){
                this.$router.push({name:"room"})
            }
        }
    }
</script>
<style scoped>
    .subTitle{
        font-size:16px;
        line-height:40px;
        height:40px;
        background:rgba(255,255,255,0.6);
        text-indent:20px;
    }
    .saveBtn{
        margin-left:100px;
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
    .roomForm{
        margin:10px auto 0 0;
        width:800px;
    }
</style>
