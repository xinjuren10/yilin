<template>
    <div class="index">
        <p class="titles">医院管理</p>
        <div class="search">
            <el-button type="primary" size="medimu" @click="dialogFormVisible=true">添加</el-button>
            <el-input v-model="keyword" placeholder="请输入医院名称" class="searchKey" size="medimu"></el-input>
            <el-button type="primary" icon="el-icon-search"  size="medimu" @click.enter="getHospital">搜索</el-button>
        </div>
        <el-table ref=""
                v-loading = "pictLoading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                class="institutionTable"
                fixed border stripe
                :data="tableData"
                style="width:100%">
            <el-table-column
                    prop="organName"
                    label="医院名称">
            </el-table-column>
            <el-table-column
                    prop="contact"
                    label="联系人">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="有效期">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="80">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogFormVisible" width="700px" top="70px" center title="医院管理" :modal-append-to-body="false">
             <el-form  :model="form" :rules="rule" ref="addHospital" label-width="120px">
                <el-form-item label="医院名称" prop="organName" required>
                    <el-input v-model="form.organName" class="statusForm"></el-input>
                    <el-checkbox v-model="form.status">禁用</el-checkbox>
                </el-form-item>
                <el-form-item label="医院域名" prop="loginUrl" required>
                    <!--<el-select v-model="form.url">
                        <el-option  value="https://"></el-option>
                        <el-option  value="http://"></el-option>
                    </el-select>-->
                    <el-input v-model="form.loginUrl" placeholder="请输入完整的域名,带https"></el-input>
                </el-form-item>
            <el-form-item label="登录页地址" prop="organIp" required>
                <el-input v-model="form.organIp" placeholder="用户登录的关联域名"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact" required>
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="phone" required>
                <el-input v-model.number="form.phone" placeholder="密码会发送到手机上，请保证手机号输入正确"></el-input>
            </el-form-item>
            <el-form-item label="有效期"  required>
                <el-date-picker
                        format="yyyy-MM-dd hh:mm:ss"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="选择开始日期">
                </el-date-picker>
                <el-date-picker
                        format="yyyy-MM-dd hh:mm:ss"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="选择结束日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="备注">
                 <el-input v-model="form.remark"></el-input>
             </el-form-item>
             <el-form-item label="登陆账号">
                 <el-input v-model="form.phone" disabled placeholder="登录账号为手机号"></el-input>
             </el-form-item>
            <el-form-item label="登录密码" >
                 <el-input v-model="form.password" disabled placeholder="密码会直接发送到手机上，请注意查收"></el-input>
             </el-form-item>
             <!--<el-form-item label="角色" prop="roleId" required>
                 <el-select v-model="form.roleId">
                     <el-option
                             v-for="(item,index) in roles"
                             :key="index"
                             :label="item.roleName"
                             :value="item.roleId">
                     </el-option>
                 </el-select>
             </el-form-item>-->
          </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="medimu" @click="saveHospital">确 定</el-button>
                <el-button @click="dialogFormVisible = false" size="medimu">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'Hospital',
        data() {
            const checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            // const organIp = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('请输入登录页地址'));
            //     } else {
            //         const reg = /^https?:\/\/[^\/\?#:]+/
            //         if (reg.test(value)) {
            //             callback();
            //         } else {
            //             return callback(new Error('请输入登录页地址'));
            //         }
            //     }
            // };
            const loginUrl = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入医院域名'));
                } else {
                    const reg =/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入医院域名'));
                    }
                }
            };
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                pictLoading:true,
                rule:{
                    organName: [
                        { required: true, message: '请输入活动名称', trigger:'blur'},
                        { min: 3, max:20, message: '长度在 3 到 20 个字符', trigger: ['blur','change']}
                    ],
                    phone:[{validator:checkPhone,trigger:['blur','change']}],
                    organIp: [ { required: true, message: '请输入登录页地址', trigger:'blur'},
                        { min: 5, max:150, message: '长度在5 到 150 个字符', trigger: ['blur','change']}],
                    loginUrl: [{validator:loginUrl, trigger:['blur','change']}],
                    contact: [{ required: true, message: '联系人信息不能为空', trigger:['blur','change']}]
                },
                addMode:true, //判断是添加模式还是编辑模式
                startTime:'',
                endTime:'',
                form:{id:'',name:'',region:'',loginUrl:'',phone:'',startTime:'',endTime:'',organIp:'',status:false},
                roles:[],//角色列表
                dialogFormVisible:false,
                keyword:'',//搜索关键字
                tableData:[ ],//后台返回的数据
            }
        },
        methods: {
            // getRole(){
            //    this.$api.system.roleList().then(res=>{
            //        this.roles=res.data
            //    })
            // },
            handleClick(row) {
                this.dialogFormVisible=true
                this.addMode=false
                this.form=row
            },
            saveHospital(){
                this.$refs['addHospital'].validate((valid) => {
                    if (valid ) {
                        if (this.addMode) {
                            const data = {
                                "contact": this.form.contact,
                                "endTime": this.form.endTime,
                                "loginName": this.form.loginName,
                                "loginUrl": this.form.loginUrl,
                                "organIp": this.form.organIp,
                                "organName": this.form.organName,
                                "phone": this.form.phone,
                                "remark": this.form.remark,
                                "startTime": this.form.startTime,
                                "status": this.form.status === true ? "closed" : "open"
                            }
                            this.$api.system.addHospital(data).then(res => {
                                if (res.code === 200) {
                                    this.dialogFormVisible = false
                                    this.addMode = true
                                    this.getRoomList()
                                }
                                this.$message({
                                    type: res.code === 200 ? "success" : "error",
                                    message: res.data
                                })
                            })
                        } else{  //编辑模式
                            const data = {
                                "id":this.form.id,
                                "contact": this.form.contact,
                                "endTime": this.form.endTime,
                                "loginName": this.form.loginName,
                                "loginUrl": this.form.url,
                                "organIp": this.form.organIp,
                                "organName": this.form.organName,
                                "phone": this.form.phone,
                                "remark": this.form.remark,
                                "roleId": this.form.roleId,
                                "startTime": this.form.startTime,
                                "status": this.form.status == true ? "closed" : "open"
                            }
                            this.$api.system.updateHospital(data).then(res => {
                                if (res.code === 200) {
                                    this.dialogFormVisible = false
                                    this.addMode = true
                                    this.getRoomList()
                                }
                                this.$message({
                                    type: res.code === 200 ? "success" : "error",
                                    message: res.msg
                                })
                            })
                        }
                    }
                })
            },
            getHospital(){
              this.pictLoading=true;
              this.tableData=[];
              const data={ organName:this.keyword }
              this.$api.system.getHospital(data).then(res=>{
                   this.pictLoading=false;
                   this.tableData=res.data
                })
            },
            goAddInstitution (){
                this.$router.push({name:"addInstitution"})
            },
            getRoomList (){
                this.$api.system.getRoomList().then(res=>{
                     this.pictLoading=false;
                     this.tableData=res.data;
                })
            }
        },
        mounted() {
            this.getRoomList();
           // this.getRole();
        }
    }
</script>
<style scoped>
    .acountItem{
        display: flex;
        justify-content:flex-start;
        align-items: center;
    }
    .statusForm{
        width:450px;
        margin-right:20px;
    }
    .el-form-item__content{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .acount{
        width:225px;
    }
    .index .el-dialog{
        z-index:99999;
    }
    .urlItem{
        width:330px;
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
