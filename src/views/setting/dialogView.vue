<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :append-to-body='true'>
            <el-form label-width="80px">
                <el-form-item v-for="(item,index) in formList" :key="index" :label="item.label">
                    <el-input v-if="item.type==='text'" v-model="formData[item.key]"></el-input>
                    <el-input v-if="item.type==='num'" v-model="formData[item.key]" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dialogView",
        props: ['title', 'formList'],
        data() {
            return {
                dialogVisible: false,
                formData: {}
            }
        },
        methods:{
            positiveInt(e) {
                let prohibitInput = ["-", "e", "+", "E", "."];
                if (prohibitInput.includes(e.key)) {
                    e.preventDefault()
                }
            },
            //关闭或打开
            changeDialog(data) {
                this.dialogVisible = !this.dialogVisible;
                if(data){
                    console.log(data)
                    this.formData=data
                }else{
                    this.formData={};
                }
            },
            //提交
            submitForm(){
                this.$emit('submitForm',this.formData)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>