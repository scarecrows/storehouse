<template>
    <div>
        <el-table :data="tableData" :summary-method="getSummaries" show-summary style="width: 100%">
            <el-table-column v-for="(item,index) in tableList" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
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
            },
            getSummaries(param) {
                console.log(param);
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '当前库存';
                    }else{
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        } else {
                            sums[index] = '';
                        }
                    }
                });
                return sums;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>