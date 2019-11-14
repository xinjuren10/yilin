<template>
    <div class="index">
        <p class="titles">添加条款</p>
        <el-form ref="form" :model="form" label-width="120px" class="clauseForm">
            <el-form-item label="条款编号" required>
                <el-input v-model="form.code" class="codeItem"></el-input>
                <span>参考格式1.1.1</span>
                <el-checkbox v-model="form.isKey">核心条款  （勾选条款会加🌟显示）</el-checkbox>
            </el-form-item>
            <el-form-item label="条款内容" required>
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入条款内容"
                        v-model="form.content"  maxlength="1000">
                </el-input>
            </el-form-item>
            <el-form-item label="选择上级条款">
                <el-select v-model="form.clause" placeholder="请选择所属类型">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评审要点:">
             <div class="keyCon">
                <div class="keyItem">A</div>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="dynamicForm">
                    <el-form-item
                            v-for="(domain, index) in dynamicValidateForm.domains"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :rules="{ required: true, message: '内容不能为空', trigger: 'blur'}">
                        <el-input v-model="domain.value" type="textarea" autosize></el-input>
                        <el-button @click.prevent="removeDomain(domain)" type="text">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
                        <el-button @click="addDomain">添加</el-button>
                    </el-form-item>
                </el-form>
                </div>
                <div class="keyCon keyCons">
                    <div class="keyItem">B</div>
                    <el-form :model="secondForm" ref="dynamicValidateForm"  class="dynamicForm">
                        <el-form-item
                                v-for="(domain, index) in secondForm.domains"
                                :key="domain.key"
                                :prop="'domains.' + index + '.value'"
                                :rules="{ required: true, message: '内容不能为空', trigger: 'blur'}">
                            <el-input v-model="domain.value" type="textarea" autosize></el-input>
                            <el-button @click.prevent="removeDomains(domain)" type="text">删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
                            <el-button @click="addDomains">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="keyCon keyCons">
                    <div class="keyItem">C</div>
                    <el-form :model="dynamicValidateForms" ref="dynamicValidateForm"  class="dynamicForm">
                        <el-form-item
                                v-for="(domain, index) in dynamicValidateForms.domains"
                                :key="domain.key"
                                :prop="'domains.' + index + '.value'"
                                :rules="{ required: true, message: '内容不能为空', trigger: 'blur'}">
                            <el-input v-model="domain.value" type="textarea" autosize></el-input>
                            <el-button @click.prevent="remove(domain)" type="text">删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
                            <el-button @click="add">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-form-item>

            <el-form-item label="责任科室">
                <el-select v-model="form.room" placeholder="请选择科室">
                    <el-option
                            v-for="(item,index) in rooms"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="相关配合科室">
                <el-checkbox-group v-model="checkedValue" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="规范性文件:">
                <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border
                        stripe>
                    <!--<el-table-column type="selection" width="45" align="center"></el-table-column>-->
                    <el-table-column label="条款ID"  type="index" width="60" align="center"></el-table-column>
                    <el-table-column  label="制度流程标题" align="center">
                        <template slot-scope="scope">
                            <el-input type="textarea" autosize v-model="scope.row.title"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="160">
                        <template slot-scope="scope">
                            <!--<el-button @click.prevent="addRow()" type="text" size="small">编辑</el-button>-->
                            <el-button type="primary" @click.prevent="addRow()" v-if="scope.row.rowNum===1">添加</el-button>
                            <el-button @click.prevent="delData(scope.row)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="查阅资料">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="查阅资料"
                        v-model="form.file">
                </el-input>
            </el-form-item>
            <el-form-item label="访谈追踪">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="访谈追踪内容"
                        v-model="form.track">
                </el-input>
            </el-form-item>
            <el-form-item label="实地查看与考评">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="实地查看与考评内容"
                        v-model="form.content">
                </el-input>
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
                form:{code:"",isKey:false,content:"",clause:0,key:{},room:"",file:"",track:""},
                value:'',
                keyword:'',//搜索关键字
                checkedValue:[],
                cities:['护理室', '办公室', '财务室', '行政办公室'],
                isIndeterminate: true,
                options: [
                    { value: 0, label: '无上级' }
                ],
                rooms: [
                    { value: 0, label: '一级科室' }
                ],
                room:[],
                tableData: [{ rowNum: 1, title: '承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养。'},
                    { rowNum:2, title: '开展继续医学教育工作。'},
                ],
                gradeA:[],
                gradeB:[],
                gradeC:[],
                fileList : [],
                dynamicValidateForm: {
                    domains: [{ value: '承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养' },
                        { value: '222承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养2222' }
                    ],
                },
                secondForm: {
                    domains: [{ value: '承担地区全科医师培养' },
                        { value: '2222000担本地区全科医师培养2222' }
                    ],
                },
                dynamicValidateForms: {
                    domains: [{ value: '承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养' },
                        { value: '222承担医学院校医学生的临床教学和实习任务或承担本地区全科医师培养2222' }
                    ],
                },
            }
        },
        methods: {
                submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                          //  alert('submit!');
                        } else {
                           // console.log('error submit!!');
                            return false;
                        }
                    });
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                },
                removeDomain(item) {
                    var index = this.dynamicValidateForm.domains.indexOf(item)
                    if (index !== -1) {
                        this.dynamicValidateForm.domains.splice(index, 1)
                    }
                },
                addDomain() {
                    this.dynamicValidateForm.domains.push({
                        value: '',
                        key: Date.now()
                    });
                },
            removeDomains(item) {
                var index = this.secondForm.domains.indexOf(item)
                if (index !== -1) {
                    this.secondForm.domains.splice(index, 1)
                }
            },
            addDomains() {
                this.secondForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            remove(item) {
                var index = this.dynamicValidateForms.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForms.domains.splice(index, 1)
                }
            },
            add() {
                this.dynamicValidateForms.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            handleCheckedCitiesChange(value) {
                this.checkedValue=value;
            },
            addRow () {
                var list = {rowNum:this.tableData.length+1,title: this.title}
                this.tableData.push(list)
            },
            delData (index) {
                this.tableData.splice(index.rowNum-1,1)
            }
        }
    }
</script>
<style scoped>
    .keyCon{
          border:1px solid #d3d4d6;
          display: flex;
          justify-content: flex-start;
          align-items: center;
      }
    .keyCons{
        border:1px solid #d3d4d6;
        border-top:none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .keyItem{
        width:60px;
        text-align: center;
        color:#333;
        height:100%;
    }
    .keyCon .dynamicForm{
        border-left:1px solid #d3d4d6;
        width:600px;
        padding:10px;
    }
    .dynamicForm .el-input--small{
       max-width:540px;
    }
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
