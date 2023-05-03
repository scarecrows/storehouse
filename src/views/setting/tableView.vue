<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(item,index) in tableList" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
            <el-table-column v-if="tableButtons&&tableButtons.length!==0" label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in tableButtons" :key="index" @click="handleClick(item.key,scope.row)">{{item.label}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "tableView",
        props:['tableData','tableList','tableButtons'],
        data(){
            return{}
        },
        methods:{
            handleClick(key,row) {
                this.$emit(key,row)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>