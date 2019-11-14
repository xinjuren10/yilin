<template>
    <div class="index">
        <p class="titles">添加项目</p>
        <el-form ref="form" :model="form" label-width="150px" class="clauseForm">
            <el-form-item label="项目名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="关联条款" required>
                <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border
                        stripe>
                    <!--<el-table-column type="selection" width="45" align="center"></el-table-column>-->
                    <el-table-column label="条款编号"  type="index" width="70" align="center"></el-table-column>
                    <el-table-column  label="条款内容" align="center">
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
            <el-form-item label="国家/行业标准" required>
                <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border
                        stripe>
                    <!--<el-table-column type="selection" width="45" align="center"></el-table-column>-->
                    <el-table-column label="标准编号"  type="index" width="70" align="center"></el-table-column>
                    <el-table-column  label="国家/行业标准内容" align="center">
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
            <div class="border">
                <p class="titles">职能科室</p>
                <div class="inlineItem">
                <el-form-item label="职能科室">
                    <el-select v-model="form.room" placeholder="请选择科室">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职能科室主管负责人" label-width="300px">
                    <el-select v-model="form.room" placeholder="请选择职能科室主管负责人">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                </div>
                <el-form-item label="规范性文件" required>
                    <el-table
                            :data="tableData"
                            ref="table"
                            tooltip-effect="dark"
                            border
                            stripe>
                        <el-table-column label="序号:"  type="index" width="70" align="center"></el-table-column>
                        <el-table-column  label="制度流程标题:" align="center">
                            <template slot-scope="scope">
                                <el-input type="textarea" autosize v-model="scope.row.title"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="160">
                            <template slot-scope="scope">
                                <el-button type="primary" @click.prevent="addRow()" v-if="scope.row.rowNum===1">添加</el-button>
                                <el-button @click.prevent="delData(scope.row)" type="danger" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
             <el-form-item label="是否需要检查表:">
                 <el-checkbox v-model="formFlag">是</el-checkbox>
             </el-form-item>
                <el-form-item label="是否需要培训:">
                    <el-checkbox v-model="train">是</el-checkbox>
                </el-form-item>
                <el-form-item label="">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传检查表模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="职能科室文件位置:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <div class="inlineItem">
                    <el-form-item label="督导检查频次:">
                        <el-select v-model="form.room" placeholder="无">
                            <el-option
                                    v-for="(item,index) in room"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最低检查频次:" label-width="300px">
                        <el-select v-model="form.room" placeholder="无">
                            <el-option
                                    v-for="(item,index) in room"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="督导模板:">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传督导模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="整改模板:">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传整改模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="定期总结频率:">
                    <el-select v-model="form.room" placeholder="无">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总结模板:">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传模版</el-button>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="border">
                <p class="titles">临床医技科室</p>
                <el-form-item label="医技临床科室">
                    <el-checkbox-group v-model="checkedValue" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="主观负责人:">
                    <el-select v-model="form.room" placeholder="无">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规范性文件" required>
                    <el-table
                            :data="tableData"
                            ref="table"
                            tooltip-effect="dark"
                            border
                            stripe>
                        <!--<el-table-column type="selection" width="45" align="center"></el-table-column>-->
                        <el-table-column label="序号:"  type="index" width="70" align="center"></el-table-column>
                        <el-table-column  label="制度流程标题:" align="center">
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
                <div class="inlineItem">
                    <el-form-item label="督导检查频次:">
                        <el-select v-model="form.room" placeholder="无">
                            <el-option
                                    v-for="(item,index) in room"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最低检查频次:" label-width="300px">
                        <el-select v-model="form.room" placeholder="无">
                            <el-option
                                    v-for="(item,index) in room"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传检查表模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="职能科室文件位置:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="整改模板选填:">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传整改模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="定期总结频率:">
                    <el-select v-model="form.room" placeholder="无">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总结模板:">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileList" style="text-align: left;">
                        <el-button size="small" type="primary">上传模版</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="医技或临床科室自查:">
                    <el-select v-model="form.room" placeholder="无">
                        <el-option
                                v-for="(item,index) in room"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
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
                formFlag:true,
                train:true,
                radio:1,
                form:{code:"",isKey:false,content:"",clause:0,key:{},room:"",file:"",remarks:"",title:""},
                value:'',
                keyword:'',//搜索关键字
                checkedValue:[],
                fileList:[],
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
                fileList : []
            }
        },
        methods: {
            handleCheckedCitiesChange(value) {
                this.checkedValue=value;
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
    .inlineItem{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .border{border:1px solid #d3d4d6;margin:0 0 20px 0;}
    .border .titles{
        border-bottom:1px solid #d3d4d6;
        margin:0 auto 20px;
        text-indent:20px;
    }
    .saveBtn{margin:10px  0 0 160px;}
    .codeItem{
        width:200px;
    }
    .codeItem + span{
        margin:0 20px;
    }
    .clauseForm{
        width:1000px;
        margin-top:10px;
        padding-bottom:30px;
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
