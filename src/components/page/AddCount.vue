<template>
    <div class="index">
        <div class="link">
        <router-link to="/count"><span>账户管理</span></router-link>>><span>添加账号</span></div>
        <el-form ref="form" :model="form" :rules="rule" label-width="120px" class="addCount">
            <el-form-item label="登录名称" prop="name" required>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="账户状态"  required>
                <el-select v-model="form.status" placeholder="请选择账户状态">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="role" required>
                <el-select v-model="form.role" placeholder="请选择角色">
                    <el-option
                            v-for="(item,index) in role"
                            :key="index"
                            :label="item.roleName"
                            :value="item.roleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人姓名" prop="names" required>
                <el-input v-model="form.names"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobil" required>
                <el-input v-model.number="form.mobil" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <p class="tips">必须填写手机号，用于接收登录密码使用，登录密码会随机生成的8位数字发到用户手机上。</p>
            <el-button type="primary" size="medium" class="saveCount" @click="addUser()">保存</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addCount',
        data(){
            const validateName = (rule, value, callback) => {
                const uPattern = /^[a-zA-Z0-9_-]{6,16}$/;
                if (value === '') {
                    callback(new Error('请输入登录名称'));
                } else if(!uPattern.test(value)) {
                    callback("登录名6到16位（字母，数字，下划线）");
                }else{
                    callback()
                }
            };
            const checkPhone = (rule, value, callback) => {
                const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
                if (!value) {
                    return callback(new Error('电话号码不能为空'))
                }
                setTimeout(() => {
                    if (!Number.isInteger(+value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (phoneReg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('电话号码格式不正确'))
                        }
                    }
                },100)
            };
            const checkNames = (rule, value, callback) => {
                const word = /^[\u4e00-\u9fa5]+$/;
                if (!word.test(value)) {
                    return callback(new Error('联系人格式不正确，请输入中文姓名'))
                }else{
                    callback()
                }
            };
            return {
                value:'',
                keyword:'',//搜索关键字
                options: [{ value:"open", label: '开启' },{ value:"closed", label: '禁用' }],
                role:[],
                rule:{
                    role: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
                    name:[{validator:validateName, trigger: 'blur'}],
                    names:[{validator:checkNames, trigger: 'blur'}],
                    mobil:[{validator:checkPhone,trigger: 'blur'}]
                },
                form:{name:"",status:"open",role:"",names:"",mobil:""},
            }
        },
        methods: {
            addUser(){
                this.$refs['form'].validate((valid) => {
               if (valid) {
                   const param={
                       "assistDep": "string",
                       "assistPosIds":[],
                       "loginName":this.form.name,
                       "mainDep": "string",
                       "mainPos": "string",
                       "phone": this.form.mobil,
                       "roleId":this.form.role,
                       "status":this.form.status,
                       "userName":this.form.names
                   }
               this.$api.system.addUser(param).then(res=>{
                 this.$message({
                     type:res.code==200?"success":"error",
                     message:res.msg
                 })
                   this.$router.push({path:"/count"})
               })
                }
                })
           },
            getRole(){
                this.$api.system.roleList().then(res=>{
                    this.role=res.data
                })
            },
        },
        mounted() {
           this.getRole()
        }
    }
</script>
<style scoped>
    .link{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        height:60px;
    }
    .tips{
        text-indent:50px;
        color:#333;
        font-size:14px;
    }
    .saveCount{
        margin:20px 0  0 120px;
        width:120px;
    }
    .link span{
        margin:0 10px;
    }
    .addCount{
        max-width:800px;
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
