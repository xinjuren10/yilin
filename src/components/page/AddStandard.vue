<template>
    <div class="index">
        <p class="titles">添加国家/行业标准</p>
        <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="标题:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属类型:">
                <el-select v-model="form.type" placeholder="请选择所属类型">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文件:">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="责任修订科室:">
                <el-select v-model="form.room" placeholder="请选择科室">
                    <el-option
                            v-for="(item,index) in room"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-button type="primary" class="saveBtn">保存</el-button>
            <el-button type="primary">保存并提醒院方有更新</el-button>
            <el-button >取消返回</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addInstitution',
        data() {
            return {
                form:{name:"",type:0,room:"",desc:""},
                value:'',
                keyword:'',//搜索关键字
                options: [
                    { value: 0, label: '制度' },
                    { value: 1, label: '流程' },
                    { value: 2, label: '规范' },
                    { value: 3, label: '应急预案' },
                    { value: 4, label: '岗位职责' }
                ],
                room:[],
                fileList: []
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<style scoped>
   .index   .el-upload{
        text-align:left;
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
</style>
