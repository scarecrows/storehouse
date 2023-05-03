<template>
    <div class="steel">
        <div class="rent">
            <div>钢管：</div>
            <div>
                <el-input v-model="input" placeholder="请输入租金" @keyup.native="checkInputData()">
                    <template slot="prepend">租金：</template>
                    <template slot="append">元</template>
                </el-input>
            </div>
        </div>
        <div class="steel-table">
            <div class="table-item table-head">
                <div class="table-left">规格</div>
                <div class="table-center">根数</div>
                <div class="table-center">小计</div>
            </div>
            <div class="table-item" v-for="(item,index) in sizeData" :key="item.id">
                <div class="table-left">
                    <div>{{item.name}}</div>
                </div>
                <div class="table-center">
                    <div class="table-item-input">
                        <el-input placeholder="请输入根数" v-model="values['value'+index]" @keyup.native="changeValue(index,item)"></el-input>
                    </div>
                </div>
                <div class="table-center">
                    <div class="table-item-total">{{changeShow(separate['separate'+index])}}</div>
                </div>
            </div>
            <div class="table-total">合计：{{changeShow(totalData)}}</div>
        </div>
    </div>
</template>

<script>
    import {checkInput,accMul,add} from '../utils/method'
    export default {
        name: "steel",
        data() {
            return {
                input: 1,
                sizeData:this.dataList,
                values:{},
                separate:{},
                totalData:'',
                detailData:{}
            }
        },
        props:['dataList'],
        methods:{
            //租金只能输入数字
            checkInputData(){
                this.input=checkInput(this.input)
            },
            //输入根数统计单根米数以及合计
            changeValue(index,item){
                if(this.values['value'+index].replace(/\D/gi,'')-0>item.inventory-0){
                    this.$message.warning('输入数量已超过库存数量，请重新输入');
                    this.values['value'+index]='';
                    this.separate['separate'+index]=accMul(this.values['value'+index],item.name.replace(/\D/gi,''));
                    this.detailData[item.id]={
                        id:item.id,
                        num:this.values['value'+index],
                        inventory:item.inventory
                    };
                    let all=0;
                    for(let key in this.separate){
                        if(this.separate[key]){
                            all=add(all,this.separate[key])
                        }
                    }
                    this.totalData=all;
                    this.$emit('statisitics','steelData',all,this.detailData);
                    this.$forceUpdate()
                }else{
                    this.values['value'+index]=this.values['value'+index].replace(/\D/gi,'');
                    this.separate['separate'+index]=accMul(this.values['value'+index],item.name.replace(/\D/gi,''));
                    this.detailData[item.id]={
                        id:item.id,
                        num:this.values['value'+index],
                        inventory:item.inventory
                    };
                    let all=0;
                    for(let key in this.separate){
                        if(this.separate[key]){
                            all=add(all,this.separate[key])
                        }
                    }
                    this.totalData=all;
                    this.$emit('statisitics','steelData',all,this.detailData);
                    this.$forceUpdate()
                }
            },
            //把过长数字加上逗号分割避免出现科学计数法显示
            changeShow(num) {
                if(num){
                    return num+'米'
                }else{
                    return ''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .rent {
        text-align: center;
        padding-top: 10px;

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
    .steel-table{
        width: 90%;
        border: 1px solid #000;
        margin: 20px auto 10px;
        .table-head{
            font-weight: bold;
        }
        .table-item{
            border-bottom: 1px solid #000;
            >div{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                vertical-align: top;
                padding-left: 15px;
                box-sizing: border-box;
            }
            .table-left{
                width: 100px;
            }
            .table-center{
                width: calc(50% - 51px);
                border-left: 1px solid #000;
            }
        }
        .table-item-input{
            ::v-deep{
                .el-input{
                    width: calc(100% - 1px);
                    vertical-align: top;
                }
                .el-input__inner {
                    -webkit-appearance: none;
                    background-color: #FFF;
                    background-image: none;
                    border-radius: 4px;
                    border: none;
                    box-sizing: border-box;
                    color: #606266;
                    display: inline-block;
                    height: 29px;
                    line-height: 29px;
                    outline: 0;
                    padding: 0 15px 0 0;
                    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                    width: 100%;
                }
            }
        }
        .table-total{
            /*font-size: 24px;*/
            /*font-weight: bold;*/
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
        }
    }
</style>