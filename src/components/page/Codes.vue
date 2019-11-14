<template>
    <div class="index">
        <p class="titles">修改密码</p>
        <div class="link">
            <router-link to="/count"><span>账号管理</span></router-link>>><span>修改密码</span></div>
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="psdForm">
            <el-form-item label="新密码" prop="pass" required>
                <el-input type="password" v-model="ruleForm.pass"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checkPass" required>
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button type="primary" size="midemu" class="codeBtn" @click="updatePwd()">保存</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'codes',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value==='') {
                    callback(new Error('请输入密码,长度至少六位'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                value:'',
                ruleForm:{pass:'',checkPass:''},
                options: [],
                rules: {
                    pass: [{ validator: validatePass, trigger: 'blur' }],
                    checkPass: [{ validator: validatePass2, trigger: 'blur' }]
                },
                userId:'' //用户id
            }
        },
        mounted(){
         this.getUserInfo();
        },
        methods: {
            updatePwd(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                    const data={ "confirmPwd":this.ruleForm.pass,"id":this.userId,"newPwd":this.ruleForm.checkPass}
                    this.$api.system.updatePwd(data).then(res=>{
                        if(res.code==200){
                            localStorage.removeItem('sessionId');
                            this.$router.push('/login');
                        }
                        this.$message({
                            type:res.code==200?"success":"error",
                            message:res.data
                        })
                    })
                    }
                })
            },
            handleClick(row) {
                console.log(row);
            },
            getUserInfo(){
              this.$api.system.getUserInfo().then(res=>{
                  if(res.code==200){
                      this.userId=res.data.tbUser.id
                  }else{
                      this.$message({
                          type:"error",
                          message:res.data
                      })
                  }
              })
            },
            goAddInstitution (){
                this.$router.push({name:"addInstitution"})
            }
        }
    }
</script>
<style scoped>
    .psdForm{
        width:600px;
    }
    .codeBtn{
        margin-left:100px;
        width:100px;
    }
    .link{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        height:40px;
        font-size:16px;
        margin:0 0 20px 0;
    }
    .link span{
        margin:0 10px;
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
