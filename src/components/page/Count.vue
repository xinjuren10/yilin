<template>
    <div class="index">
        <p class="titles">账户管理</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="goAddCount">添加</el-button>
        </div>
        <el-table
                v-loading = "pictLoading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width:100%">
            <el-table-column
                    prop="loginName"
                    label="账户名称">
            </el-table-column>
            <el-table-column
                    :formatter="roleFunction"
                    prop="userCode"
                    label="角色">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="联系人姓名">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="240">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)" type="danger" size="small">删除</el-button>
                    <el-button @click="resetPwd(scope.row)" type="warning" size="small">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="管理员重置密码" center :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="600px">
            <el-form :model="form" :rules="rule" ref="resetForm">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number="form.phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                              maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" prop="newPassword">
                    <el-input v-model="form.newPassword" type="password"></el-input>
                </el-form-item>
                <div class="codeBtn">
                    <el-button type="primary" @click="sendCode" :disabled="disabled" v-if="disabled==false">点击发送验证码</el-button>
                    <el-button type="primary"  :disabled="disabled" v-if="disabled==true">{{text}}</el-button>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPassword">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" width="700px" top="70px" center title="用户信息修改" :modal-append-to-body="false">
            <el-form  :model="forms" label-width="100px">
                <el-form-item label="登录名称" >
                    <el-input v-model="forms.loginName" class="statusForm"></el-input>
                    <el-checkbox v-model="forms.status">禁用</el-checkbox>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="forms.roleId">
                        <el-option
                                v-for="(item,index) in roleList"
                                :key="index"
                                :label="item.roleName"
                                :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人姓名" >
                    <el-input v-model="forms.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" >
                    <el-input v-model="forms.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="editCount">确 定</el-button>
                <el-button @click="dialogVisible=false" size="small">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'count',
        data(){
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.newPassword !== '') {
                        this.$refs.resetForm.validateField('newPassword');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                value:'',
                keyword:'',//搜索关键字
                text:'验证码已发送',
                roleList:[],
                disabled:false,
                forms:{phone:"",userName:"",roleId:"",loginName:"",status:""},
                pictLoading:true,
                userId:"",
                roles:[],//角色数据
                form:{password:"",newPassword:"",phone:"",code:""},
                dialogFormVisible:false,
                tableData:[],
                dialogVisible:false,
                rule: {
                    password: [{ validator:validatePass,trigger:'blur'}],
                    newPassword: [{ validator: validatePass2, trigger:'blur'}],
                    phone: [{ type: 'number', required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^1(3|4|5|6|7|8)\d{9}$/,message: '手机号格式不对', trigger:'blur'}],
                    code: [{ required: true, message: '请输入验证码', trigger:['blur','change'] }]
                },
            }
        },
        methods:{
            roleFunction: function (row, column){
                // const index= this.roles.findIndex((value)=>value==row.roleId)
                //  return this.roles[2].roleName
                return "管理员"
            },
            sendCode() {
                let data= { "phone":this.form.phone}
                let newExg=/^[1][3,4,5,6,7,8][0-9]{9}$/
                if(newExg.test(this.form.phone)){
                    this.disabled=true;
                    this.$api.system.sendCode(data).then(res=>{
                        if(res.code===200){
                            this.$message.success('验证码已发送,五分钟内有效');
                        }
                    })
                }else{this.$message.error('请输入正确的手机号码') }
            },
            edit(row){
             this.dialogVisible=true;
             this.forms=row
             this.userId=row.id
            },
            resetPwd(row) {
              this.userId=row.id
              this.dialogFormVisible=true
             },
            resetPassword(){
                this.$refs['resetForm'].validate((valid) => {
                  if (valid) {
                   const data={ "newPwd":this.form.password, "confirmPwd": this.form.newPassword,"phone":this.form.phone,"validCode":this.form.code}
                   this.$api.system.resetPwd(data).then(res=>{
                   this.pictLoading=false
                   this.dialogFormVisible=false
                   this.$refs['resetForm'].resetFields()
                   this.$message({
                      type:res.code===200?"success":"error",
                      message:res.msg
                  })
                 })
                }
                })
            },
            goAddCount (){
                this.$router.push({name:"addCount"})
            },
            editCount(){
                const param={
                    "assistDep": "string",
                    "assistPosIds":[],
                    "loginName":this.forms.loginName,
                    "mainDep": "string",
                    "mainPos": "string",
                    "id": this.userId,
                    "phone": this.forms.phone,
                    "roleId":this.forms.roleId,
                    "status":this.forms.status?"open":"closed",
                    "userName":this.forms.userName
                }
                this.$api.system.updateCounts(param).then(res=>{
                    if(res.code===200){
                       this.dialogVisible=false
                       this.getCountList();
                    }
                    this.$message({
                        type:res.code==200?"success":"error",
                        message:res.msg
                    })
                })
            },
            getCountList (){
                this.$api.system.getCountList().then(res=>{
                    this.pictLoading=false
                    this.tableData=res.data
                })
            },
            getRole(){
                this.$api.system.roleList().then(res=>{
                    this.roles=res.data
                })
            },
            deleteUser(row){
             this.pictLoading=true
             const data={"id":row.id}
             this.$api.system.deleteUser(data).then(res=>{
                   this.pictLoading=false
                   if(res.code==200) this.getCountList()
                   this.$message({
                       type:res.code==200?"success":"error",
                       message:res.msg
                   })
                })
            }
        },
        mounted(){
            this.getCountList();
            this.getRole();
            this.$api.system.roleList().then(res=>{
                this.loading=false
                this.roleList=res.data
            })
        }
    }
</script>
<style scoped>
    .codeBtn{
        position:absolute;
        right:25px;
        top:111px;
        z-index:9;
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
    .statusForm{
        width:450px;
        margin-right:20px;
    }
    .tableIndex{
        margin:20px auto 0 0;
    }
    .institutionTable{
        margin:30px 0  0 0;
    }
</style>
