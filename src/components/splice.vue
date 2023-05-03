<template>
    <div>
        <div class="rent">
            <div>接头：</div>
            <div>
                <el-input v-model="input" placeholder="请输入租金" @keyup.native="checkInputData()">
                    <template slot="prepend">租金：</template>
                    <template slot="append">元</template>
                </el-input>
            </div>
        </div>
        <div class="splice-table">
            <div class="table-left">
                <div class="table-item">规格</div>
                <div class="table-item">个数</div>
            </div>
            <div class="table-center">
                <div class="table-item">
                    <div v-for="(item,index) in fasteningType" :key="index">{{item.name}}</div>
                </div>
                <div class="table-item">
                    <div v-for="(item,index) in fasteningType" :key="index">
                        <el-input placeholder="请输入个数" v-model="values['value'+index]"
                                  @keyup.native="changeValue(index,item)"></el-input>
                    </div>
                </div>
            </div>
            <div class="table-right">
                <div class="table-item">合计</div>
                <div class="table-item">{{totalData}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {checkInput,add} from '../utils/method'
    export default {
        name: "splice",
        props:['dataList'],
        data() {
            return {
                input: '',
                fasteningType: this.dataList,
                values: {},
                totalData: '',
                detailData:{}
            }
        },
        methods:{
            checkInputData(){
                this.input=checkInput(this.input)
            },
            changeValue(index,item) {
                if(this.values['value' + index].replace(/\D/gi, '')-0>item.inventory-0){
                    this.$message.warning('输入数量已超过库存数量，请重新输入');
                    this.values['value'+index]='';
                    this.detailData[item.id]={
                        id:item.id,
                        num:this.values['value'+index],
                        inventory:item.inventory
                    };
                    let all=0;
                    for(let key in this.values){
                        if(this.values[key]){
                            all=add(all,this.values[key])
                        }
                    }
                    this.totalData=all;
                    this.$emit('statisitics','spliceData',all,this.detailData);
                    this.$forceUpdate()
                }else{
                    this.values['value' + index] = this.values['value' + index].replace(/\D/gi, '');
                    this.detailData[item.id]={
                        id:item.id,
                        num:this.values['value'+index],
                        inventory:item.inventory
                    };
                    let all=0;
                    for(let key in this.values){
                        if(this.values[key]){
                            all=add(all,this.values[key])
                        }
                    }
                    this.totalData=all;
                    this.$emit('statisitics','spliceData',all,this.detailData);
                    this.$forceUpdate()
                }
            },
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
    .splice-table {
        width: 90%;
        border: 1px solid #000;
        margin: 20px auto 10px;
        > div {
            display: inline-block;
            vertical-align: top;
        }

        .table-left {
            width: 50px;
            border-right: 1px solid #000;

            .table-item {
                text-align: center;
            }
        }

        .table-center {
            width: calc(100% - 252px);
            border-right: 1px solid #000;

            .table-item {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        }

        .table-right {
            width: 200px;
        }

        .table-item {
            height: 30px;
            line-height: 30px;
            text-align: center;
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
                    text-align: center;
                }
            }
        }

        .table-item:first-of-type {
            border-bottom: 1px solid #000;
        }
    }
</style>