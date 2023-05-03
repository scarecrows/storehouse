<template>
    <div class="close">
        <div class="shipment-top">
            <el-row  :gutter="20">
                <el-col :span="1"><div style="height: 10px;"></div></el-col>
                <el-col :span="2" class="shipment-top-left">单位：</el-col>
                <el-col :span="4"  class="shipment-top-right">
                    <el-select v-model="value" filterable placeholder="请选择单位">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" class="shipment-top-left">时间：</el-col>
                <el-col :span="4">
                    <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
        </div>
        <div class="tent-content">
            <div class="rent">
                <div>钢管：</div>
            </div>
            <table-view :tableList="tableList" :tableData="tableData"/>
            <div class="rent">
                <div>扣件：</div>
            </div>
            <table-view :tableList="tableList" :tableData="tableData"/>
            <div class="rent">
                <div>接头：</div>
            </div>
            <table-view :tableList="tableList" :tableData="tableData"/>
            <div class="rent">
                <div>顶托：</div>
            </div>
            <table-view :tableList="tableList" :tableData="tableData"/>
        </div>
    </div>
</template>

<script>
    import tableView from './tableView'
    export default {
        name: "index",
        data() {
            return {
                options:[],
                value:'',
                value2:'',
                tableList:[
                    {
                        prop:'name',
                        label:'name'
                    },
                    {
                        prop:'age',
                        label:'age'
                    },
                    {
                        prop:'age2',
                        label:'age2'
                    },
                    {
                        prop:'age3',
                        label:'age3'
                    },
                    {
                        prop:'age4',
                        label:'age4'
                    },
                    {
                        prop:'age5',
                        label:'age5'
                    },
                    {
                        prop:'age6',
                        label:'age6'
                    },
                ],
                tableData:[
                    {
                        name:'name1',
                        age:12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                    {
                        name:'name1',
                        age:12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                    {
                        name:'name1',
                        age:-12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                    {
                        name:'name1',
                        age:12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                    {
                        name:'name1',
                        age:12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                    {
                        name:'name1',
                        age:12,
                        age2:12,
                        age3:12,
                        age4:12,
                        age5:12,
                        age6:12,
                    },
                ]
            }
        },
        components:{tableView}
    }
</script>

<style scoped lang="scss">
.close{
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    .shipment-top-left{
        text-align: right;
        line-height: 40px;
    }
    .shipment-unit{
        margin-bottom: 20px;
    }
    .shipment-top-checkbox{
        line-height: 40px;
    }
    .shipment-bottom{
        height: calc(100% - 40px);
        overflow-y: auto;
    }
    ::v-deep{
        .shipment-top-right{
            .el-select{
                width: 100%;
            }
        }
    }
    .tent-content{
        overflow-y: auto;
        height: calc(100% - 30px);
    }
    .rent {
        text-align: left;
        padding-top: 10px;
        margin-bottom: 10px;
        > div {
            display: inline-block;
            vertical-align: top;
        }

        > div:first-of-type {
            margin-right: 50px;
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
        }
    }
}
</style>