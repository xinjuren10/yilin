<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">TQMS全面质量管理系统登录</div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="密码登录" name="first">
                    <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                        <el-form-item prop="username">
                            <el-input v-model="param.username" placeholder="请输入用户名">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="url">
                            <el-input v-model="param.url" placeholder="请输入关联域名">
                                <el-button slot="prepend" icon="el-icon-lx-info"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    placeholder="请输入密码"
                                    v-model="param.password">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="短信验证码登录" name="second">
                  <el-form :model="code" :rules="rule" ref="codeLogin" label-width="0px" class="ms-content">
                    <el-form-item prop="phone" class="phone">
                        <el-input v-model.number="code.phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                                  maxlength="11">
                            <el-button slot="prepend" icon="el-icon-lx-calendar"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="code">
                        <el-input v-model="code.code" placeholder="请输入验证码">
                            <el-button slot="prepend" icon="el-icon-lx-warn"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="codeBtn">
                        <el-button type="primary" @click="sendCode" :disabled="disabled" v-if="disabled==false">点击发送验证码</el-button>
                        <el-button type="primary"  :disabled="disabled" v-if="disabled==true">{{text}}</el-button>
                    </div>
                  </el-form>
                </el-tab-pane>
            </el-tabs>
        <div class="login-btn">
            <el-button type="primary" :loading="loadingFlag" @click.enter="submitForm()">进入管理中心</el-button>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            param:{ username: '',password: '',url:''},
            code:{phone:'',code:''},
            disabled:false,
            text:'验证码已发送',
            activeName: 'first',
            loadingFlag:false,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                url: [{ required: true, message: '请输入关联域名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            rule: {
                phone: [{ type: 'number', required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1(3|4|5|6|7|8)\d{9}$/,message: '手机号格式不对', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
        };
    },
    methods: {
        sendCode() {
            let data= { "phone":this.code.phone}
            let newExg=/^[1][3,4,5,7,8][0-9]{9}$/
            if(newExg.test(this.code.phone)){
                this.disabled=true;
                this.$api.system.sendCode(data).then(res=>{
                    if(res.code===200){
                        this.$message.success('验证码已发送,五分钟内有效');
                    }
                  })
            }else{this.$message.error('手机号码输入不正确') }
           },
        submitForm (){
            if( this.activeName =='first'){
                const param={
                    "loginName":this.param.username,
                    "password":this.param.password,
                    "organIp":this.param.url
                   }
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.loadingFlag=true;
                        this.$api.system.loginIn(param).then(res=>{
                            if(res.code===200){
                                localStorage.setItem('sessionId', res.data.sessionId);
                                this.$router.push({name:'clause'});
                            }else{
                                this.$message.error(res.msg);
                                this.loadingFlag=false;
                            }
                        })
                    }
                })
            }else{
                const param={
                    "phone":this.code.phone,
                    "validCode":this.code.code,
                    "organIp":"qq.com"
                }
                this.$refs.codeLogin.validate(valid => {
                    if (valid) {
                        this.loadingFlag=true;
                        this.$api.system.loginByCode(param).then(res=>{
                            if(res.code===200){
                               // localStorage.setItem('sessionId', res.data.sessionId);
                                this.$router.push({name:'clause'});
                            }else{
                                this.$message.error(res.msg);
                                this.loadingFlag=false;
                            }
                        })
                    }
                })
            }
         }
    },
    mounted() {
        document.title="TQMS全面质量管理系统登录"
    }
};
</script>
<style scoped>
.login-wrap .el-tabs__nav-scroll {
     overflow: hidden;
     margin: 10px auto 0;
     display: flex;
     justify-content: center;
     align-items: center;
 }
.code{position: relative;}
.phone .el-input__inner{width:152px;}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login.jpg);
    background-size: 100%;
}
.codeBtn{
    position: absolute;
    right:30px;
    top:10px;
    z-index:99;
    width:122px;
    height:32px;
    display: flex;
    justify-content: flex-end;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color:#409EFF;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    overflow: hidden;
}
.ms-content {
    padding:10px 30px 10px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width:300px;
    height: 36px;
    margin:0 auto 20px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
