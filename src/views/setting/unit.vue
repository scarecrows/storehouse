<template>
    <div>
        <div>
            <router-link :to="{path:'/home'}">
                <el-button class="setting-back">返回</el-button>
            </router-link>
            <el-button @click="added">新增</el-button>
        </div>
        <table-view :tableList="tableList" :tableData="tableData" :tableButtons="tableButtons" @editRow="editRow"
                    @deleteRow="deleteRow"/>
        <dialog-view ref="dialogChild" @submitForm="submitForm" :title="dialogTitle" :formList="formList"/>
    </div>
</template>

<script>
    import tableView from './tableView'
    import dialogView from './dialogView'
    import {getUnit,addUnit,changeUnit,deleteUnit} from '@/axios/api'
    import {getUUId} from '@/utils/method'
    import moment from 'moment'
    let list1=[
        {
            label: '单位名称',
            key: 'name',
            type:'text'
        },{
            label: '备注',
            key: 'remark',
            type:'text'
        }
    ];
    export default {
        name: "unit",
        components: {
            tableView,
            dialogView
        },
        data() {
            return {
                tableData: [],

                tableList: [
                    {
                        label: '单位名称',
                        prop: 'name'
                    },
                    {
                        label: '备注',
                        prop: 'remark'
                    },
                    {
                        label: '创建时间',
                        prop: 'time'
                    }
                ],
                tableButtons: [
                    {
                        label: '编辑',
                        key: 'editRow'
                    }, {
                        label: '删除',
                        key: 'deleteRow'
                    }
                ],
                dialogTitle:'',
                formList:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            //请求数据
            getData(){
                getUnit().then(res=>{
                    this.tableData=res
                })
            },
            //编辑
            editRow(row){
                let data={...row};
                this.dialogTitle='编辑';
                this.$refs.dialogChild.changeDialog(data);
                this.formList=list1
            },
            //删除
            deleteRow(row){
                this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUnit({id:row.id}).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('删除成功');
                            this.getData()
                        }
                    })
                })
            },
            //新增
            added(){
                this.dialogTitle='新增';
                this.$refs.dialogChild.changeDialog();
                this.formList=list1
            },
            //弹窗提交
            submitForm(item){
                //新增
                if(this.dialogTitle=='新增'){
                    let data={
                        id:getUUId(),
                        name:item.name,
                        remark:item.remark,
                        time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        state:1
                    };
                    addUnit(data).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('新增成功');
                            this.$refs.dialogChild.changeDialog();
                            this.getData()
                        }
                    })
                }else{
                    changeUnit(item).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('修改成功');
                            this.$refs.dialogChild.changeDialog();
                            this.getData()
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .setting-back{
        margin-right: 10px;
    }
</style>