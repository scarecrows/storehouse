<template>
    <div>
        <el-table :span-method="arraySpanMethod" :data="tableData" :summary-method="getSummaries" show-summary border style="width: 100%">
            <el-table-column v-for="(item,index) in tableList" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "tableView",
        props:['tableList','tableData','tableTime'],
        methods: {
            arraySpanMethod(){
                const that = this;
                setTimeout(()=>{
                    let current = that.$el.querySelector('.el-table__footer-wrapper')
                        .querySelector('.el-table__footer');
                    let cell = current.rows[0].cells;
                    cell[1].style.display = 'none';
                    cell[2].style.display = 'none';
                    cell[3].colSpan = '3';
                },50)
            },
            getSummaries(param) {
                console.log(param);
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '未归还数量';
                    }else if(index === 1||index === 2||index ===3){
                        sums[index] = this.tableTime;
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