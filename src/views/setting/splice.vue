<template>
    <div>
        <div>
            <router-link :to="{path:'/home'}">
                <el-button class="setting-back">返回</el-button>
            </router-link>
            <el-button @click="added">新增</el-button>
        </div>
        <table-view :tableList="tableList" :tableData="tableData" :tableButtons="tableButtons" @editRow="editRow"
                    @deleteRow="deleteRow" @addAll="addAll"/>
        <dialog-view ref="dialogChild" @submitForm="submitForm" :title="dialogTitle" :formList="formList"/>
    </div>
</template>

<script>
    import tableView from './tableView'
    import dialogView from './dialogView'
    import {getList,addList,changeList,deleteList,changeNum} from '@/axios/api'
    import {getUUId,add,subtract} from '@/utils/method'
    let list1=[
        {
            label: '规格',
            key: 'name',
            type:'text'
        },{
            label: '总根数',
            key: 'num',
            type:'num'
        }
    ];
    let list2=[
        {
            label: '增加根数',
            key: 'allSize',
            type:'text'
        }
    ];
    export default {
        name: "splice",
        components: {
            tableView,
            dialogView
        },
        data() {
            return {
                tableData: [],
                tableList: [
                    {
                        label: '规格',
                        prop: 'name'
                    },
                    {
                        label: '总个数',
                        prop: 'num'
                    }
                ],
                tableButtons: [
                    {
                        label: '编辑',
                        key: 'editRow'
                    }, {
                        label: '删除',
                        key: 'deleteRow'
                    },{
                        label: '增加个数',
                        key: 'addAll'
                    }
                ],
                dialogTitle:'',
                formList:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods: {
            //请求数据
            getData(){
                getList({type:3}).then(res=>{
                    this.tableData=res
                })
            },
            //编辑
            editRow(row) {
                let data={...row};
                this.dialogTitle='编辑';
                this.$refs.dialogChild.changeDialog(data);
                this.formList=list1
            },
            //删除
            deleteRow(row) {
                this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteList({id:row.id}).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('删除成功');
                            this.getData()
                        }
                    })
                })
            },
            //弹窗提交
            submitForm(item){
                //新增
                if(this.dialogTitle=='新增'){
                    let data={
                        id:getUUId(),
                        name:item.name,
                        num:item.num-0,
                        type:3,
                        state:1,
                        useNum:0,
                        inventory:item.num-0
                    };
                    addList(data).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('新增成功');
                            this.$refs.dialogChild.changeDialog();
                            this.getData()
                        }
                    })
                    //编辑
                }else if(this.dialogTitle=='编辑'){
                    item.inventory=subtract(item.num,item.useNum);
                    changeList(item).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('修改成功');
                            this.$refs.dialogChild.changeDialog();
                            this.getData()
                        }
                    })
                    //增加个数
                }else if(this.dialogTitle=='增加个数'){
                    let data={
                        id:item.id,
                        num:add(item.lastSize,item.allSize),
                        inventory:add(item.inventory,item.allSize),
                    };
                    changeNum(data).then(res=>{
                        if(res.affectedRows>0){
                            this.$message.success('修改成功');
                            this.$refs.dialogChild.changeDialog();
                            this.getData()
                        }
                    })
                }
            },
            //新增
            added(){
                this.dialogTitle='新增';
                this.$refs.dialogChild.changeDialog();
                this.formList=list1
            },
            //增加根数
            addAll(row){
                this.dialogTitle='增加个数';
                this.$refs.dialogChild.changeDialog({id:row.id,lastSize:row.num,inventory:row.inventory});
                this.formList=list2
            }
        }
    }
</script>

<style scoped lang="scss">
    .setting-back{
        margin-right: 10px;
    }
</style>