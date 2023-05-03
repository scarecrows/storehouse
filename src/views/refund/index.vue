<template>
    <div class="shipment">
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
                <el-col :span="2" class="shipment-top-left">类型：</el-col>
                <el-col :span="9" class="shipment-top-checkbox">
                    <el-checkbox-group v-model="value1" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in typeOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </div>
        <div class="shipment-bottom">
            <steel v-if="value1.indexOf(1)!==-1" @statisitics="changeStatistics"/>
            <fastening v-if="value1.indexOf(2)!==-1" @statisitics="changeStatistics" @maintaimCost="maintaimCost"/>
            <spliceDom v-if="value1.indexOf(3)!==-1" @statisitics="changeStatistics"/>
            <jacking v-if="value1.indexOf(4)!==-1" @statisitics="changeStatistics" @maintaimCost="maintaimCost"/>
            <lift v-if="value1.indexOf(5)!==-1" ref="liftChild"/>
            <maintain v-if="value1.indexOf(6)!==-1" ref="maintainChild"/>
        </div>
    </div>
</template>

<script>
    import steel from '../../components/steel'
    import fastening from '../../components/fastening'
    import jacking from '../../components/jacking'
    import lift from '../../components/lift'
    import spliceDom from '../../components/splice'
    import maintain from '../../components/maintain'
    export default {
        name: "index",
        data() {
            return {
                options:[],
                value:'',
                value1:[],
                value2:'',
                typeOptions:[
                    {
                        label:'钢管',
                        value:1
                    },
                    {
                        label:'扣件',
                        value:2
                    },
                    {
                        label:'接头',
                        value:3
                    },
                    {
                        label:'顶托',
                        value:4
                    },
                    {
                        label:'下车费',
                        value:5
                    },
                    {
                        label:'维修费',
                        value:6
                    },
                ],
                statistics:{
                    steelData:'',
                    fasteningData:'',
                    spliceData:'',
                    jackingData:'',
                },
                maintaimData:{
                    fasteningData:'',
                    jackingData:'',
                }
            }
        },
        components:{
            steel,
            fastening,
            jacking,
            lift,
            spliceDom,
            maintain
        },
        methods:{
            handleCheckedCitiesChange(){
                if(this.value1.indexOf(5)!==-1){
                    if(this.$refs.liftChild)this.$refs.liftChild.changeData('下车费',this.statistics);
                }
            },
            changeStatistics(type,data){
                this.statistics[type]=data;
                if(this.$refs.liftChild)this.$refs.liftChild.changeData('下车费',this.statistics);
            },
            maintaimCost(type,data){
                this.maintaimData[type]=data;
                if(this.$refs.maintainChild)this.$refs.maintainChild.changeData(this.maintaimData)
            }
        },
    }
</script>

<style scoped lang="scss">
    .shipment{
        padding: 20px;
        height: 100%;
        box-sizing: border-box;
        /*.shipment-top{*/
        /*    margin-top: 40px;*/
        /*}*/
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
    }
</style>