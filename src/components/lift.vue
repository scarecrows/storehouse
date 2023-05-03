<template>
    <div>
        <div class="rent">
            <div>{{rentText}}：</div>
            <div>
                <el-input v-model="input" placeholder="请输入标准" @keyup.native="checkInputData()">
                    <template slot="prepend">标准：</template>
                    <template slot="append">吨</template>
                </el-input>
            </div>
        </div>
        <div class="lift-table">
            <div class="table-item table-head">
                <div class="table-left">种类</div>
                <div class="table-center">标准</div>
                <div class="table-center">米数/套数</div>
                <div class="table-center">换算吨数</div>
                <div class="table-center">小计</div>
            </div>
            <div v-for="(item,index) in allData" :key="index">
                <div class="table-item" v-if="item.ploidy&&item.ploidy!=0">
                    <div class="table-left">{{item.name}}</div>
                    <div class="table-center">
                        <el-input placeholder="请输入标准" v-model="item.norm" @keyup.native="changeValue(index)">
                            <template slot="append">{{index==0?'米':'套'}}/吨</template>
                        </el-input>
                    </div>
                    <div class="table-center">{{item.ploidy}}</div>
                    <div class="table-center">{{item.ton}}</div>
                    <div class="table-center">{{item.subtotal}}</div>
                </div>
            </div>
            <div class="table-total">合计：{{totalData}}</div>
        </div>
    </div>
</template>

<script>
    import {checkInput,accDiv,accMul,add} from '../utils/method'

    export default {
        name: "liftOn",
        data() {
            return {
                input: '',
                totalData: '',
                allData: [
                    {
                        name: '钢管',
                        norm: '',
                        ploidy: '',
                        ton: '',
                        subtotal: ''
                    }, {
                        name: '扣件',
                        norm: '',
                        ploidy: '',
                        ton: '',
                        subtotal: ''
                    }, {
                        name: '接头',
                        norm: '',
                        ploidy: '',
                        ton: '',
                        subtotal: ''
                    }, {
                        name: '顶托',
                        norm: '',
                        ploidy: '',
                        ton: '',
                        subtotal: ''
                    }
                ],
                rentText: ''
            }
        },
        methods: {
            checkInputData() {
                this.input = checkInput(this.input);
                this.allData.forEach((item,index)=>{
                    if(item.ton!=''){
                        console.log(this.input,this.allData[index].ton);
                        this.allData[index].subtotal=accMul(this.input,this.allData[index].ton);
                        this.statistics()
                    }
                })
            },
            changeData(text, data) {
                this.rentText = text;
                for (let item in data) {
                    switch (item) {
                        case 'steelData':
                            this.allData[0].ploidy = data[item];
                            this.changeValue(0);
                            break;
                        case 'fasteningData':
                            this.allData[1].ploidy = data[item];
                            this.changeValue(1);
                            break;
                        case 'spliceData':
                            this.allData[2].ploidy = data[item];
                            this.changeValue(2);
                            break;
                        case 'jackingData':
                            this.allData[3].ploidy = data[item];
                            this.changeValue(3);
                            break;
                    }
                }
                this.$forceUpdate()
            },
            changeValue(index){
                this.allData[index].norm=this.allData[index].norm.replace(/\D/gi, '');
                if(this.allData[index].norm!==''){
                    this.allData[index].ton=accDiv(this.allData[index].ploidy,this.allData[index].norm)
                }
                if(this.input!=''){
                    this.allData[index].subtotal=accMul(this.input,this.allData[index].ton);
                    this.statistics()
                }
            },
            statistics(){
                let all=0;
                this.allData.forEach((item,index)=>{
                    if(item.subtotal!=''){
                        all=add(all,item.subtotal)
                    }
                });
                this.totalData=all
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

    .lift-table {
        width: 90%;
        border: 1px solid #000;
        margin: 20px auto 10px;

        .table-head {
            font-weight: bold;
        }

        .table-item {
            border-bottom: 1px solid #000;

            > div {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                vertical-align: top;
                padding-left: 15px;
                box-sizing: border-box;
            }

            .table-left {
                width: 100px;
            }

            .table-center {
                width: calc(25% - 26px);
                border-left: 1px solid #000;

                ::v-deep {
                    .el-input {
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
                        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                        width: 100%;
                    }
                }
            }
        }

        .table-total {
            /*font-size: 24px;*/
            /*font-weight: bold;*/
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
        }
    }
</style>