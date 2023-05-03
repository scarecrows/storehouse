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
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
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
                <el-col :span="7" class="shipment-top-checkbox">
                    <el-checkbox-group v-model="value1" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in typeOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="submitData">确定</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="shipment-bottom">
            <steel v-if="value1.indexOf(1)!==-1" :dataList="allData.steel" @statisitics="changeStatistics"/>
            <fastening v-if="value1.indexOf(2)!==-1" :dataList="allData.fastening" @statisitics="changeStatistics"/>
            <spliceDom v-if="value1.indexOf(3)!==-1" :dataList="allData.spliceDom" @statisitics="changeStatistics"/>
            <jacking v-if="value1.indexOf(4)!==-1" :dataList="allData.jacking" @statisitics="changeStatistics"/>
            <lift v-if="value1.indexOf(5)!==-1" ref="liftChild"/>
        </div>
    </div>
</template>

<script>
    import steel from '../../components/steel'
    import fastening from '../../components/fastening'
    import jacking from '../../components/jacking'
    import lift from '../../components/lift'
    import spliceDom from '../../components/splice'
    import {getTypeData,getUnit} from '@/axios/api'
    import {subtract} from '@/utils/method'
    export default {
        name: "index",
        data() {
            return {
                allData:{
                    steel:[],
                    fastening:[],
                    spliceDom:[],
                    jacking:{}
                },
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
                        label:'上车费',
                        value:5
                    },
                ],
                statistics:{
                    steelData:'',
                    fasteningData:'',
                    spliceData:'',
                    jackingData:'',
                },
                dataList:[],
                allDatas:{}
            }
        },
        components:{
            steel,
            fastening,
            jacking,
            lift,
            spliceDom
        },
        mounted(){
            this.getData()
        },
        methods:{
            //请求数据
            getData(){
                getTypeData().then(res=>{
                    console.log(res);
                    let steel=[],fastening=[],spliceDom=[],jacking={};
                    res.forEach(item=>{
                        switch (item.type) {
                            case 1:
                                steel.push(item);
                                break;
                            case 2:
                                fastening.push(item);
                                break;
                            case 3:
                                spliceDom.push(item);
                                break;
                            case 4:
                                jacking=item;
                                break;
                        }
                    });
                    this.allData={
                        steel:steel,
                        fastening:fastening,
                        spliceDom:spliceDom,
                        jacking:jacking
                    }
                });
                getUnit().then(res=>{
                    this.options=res
                })
            },
            handleCheckedCitiesChange(){
                if(this.value1.indexOf(5)!==-1){
                    this.$refs.liftChild.changeData('上车费',this.statistics);
                }
            },
            //修改上车费
            changeStatistics(type,data,item){
                this.statistics[type]=data;
                if(this.$refs.liftChild){
                    this.$refs.liftChild.changeData('上车费',this.statistics);
                }
                let dataList=[],allData={};
                if(type=='jackingData'){
                    dataList.push({
                        id:this.allData.jacking.id,
                        useNum:data,
                        inventory:subtract(this.allData.jacking.inventory,data)
                    });
                    allData[type]=data
                }else{
                    let data={};
                    for(let key in item){
                        dataList.push({
                            id:item[key].id,
                            useNum:item[key].num-0,
                            inventory:subtract(item[key].inventory,item[key].num)
                        });
                        data[item[key].id]=item[key].num
                    }
                    allData[type]=data
                }
                let forData = [],arr=[...this.dataList,...dataList];
                for (let i = 0; i < arr.length; i++) {
                    if (!forData.some(e => e.id == arr[i].id)) forData.push(arr[i]);
                }
                this.dataList=forData;
                this.allDatas={...this.allDatas,...allData}
            },
            //提交
            submitData(){
               console.log(this.dataList,"||||||",this.allDatas)
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