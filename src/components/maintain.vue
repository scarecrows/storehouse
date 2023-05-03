<template>
    <div class="maintain">
        <div class="rent">
            <div>维修费</div>
        </div>
        <div class="lift-table">
            <div class="table-item table-head">
                <div class="table-left">种类</div>
                <div class="table-center">标准</div>
                <div class="table-center">个数</div>
                <div class="table-center">小计</div>
            </div>
            <div v-for="(item,index) in allData" :key="index">
                <div class="table-item">
                    <div class="table-left">{{item.name}}</div>
                    <div class="table-center">
                        <el-input placeholder="请输入标准" v-model="item.norm" @keyup.native="changeValue(index)">
                            <template slot="append">/个</template>
                        </el-input>
                    </div>
                    <div class="table-center">
                        <el-input placeholder="请输入个数" v-if="index==2" v-model="item.ploidy" @keyup.native="changeValue(index)">
                            <template slot="append">/个</template>
                        </el-input>
                        <div v-else>{{item.ploidy}}</div>
                    </div>
                    <div class="table-center">{{item.subtotal}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {checkInput,accMul} from '../utils/method'
    export default {
        name: "maintain",
        data(){
            return{
                input:'',
                allData: [
                    {
                        name: '扣件维修费',
                        norm: '',
                        ploidy: '',
                        subtotal: ''
                    }, {
                        name: '顶托维修费',
                        norm: '',
                        ploidy: '',
                        subtotal: ''
                    }, {
                        name: '缺螺杆',
                        norm: '',
                        ploidy: '',
                        subtotal: ''
                    }
                ],
            }
        },
        methods: {
            checkInputData() {
                this.input = checkInput(this.input);
            },
            changeValue(index){
                if(index==2){
                    if(this.allData[index].ploidy!=''&&this.allData[index].norm!=''){
                        this.allData[index].subtotal=accMul(this.allData[index].ploidy,this.allData[index].norm)
                    }
                }else{
                    if(this.allData[index].ploidy!=''){
                        this.allData[index].subtotal=accMul(this.allData[index].ploidy,this.allData[index].norm)
                    }
                }
            },
            changeData(data){
                console.log(data);
                for (let item in data) {
                    switch (item) {
                        case 'fasteningData':
                            this.allData[0].ploidy = data[item];
                            this.changeValue(0);
                            break;
                        case 'jackingData':
                            this.allData[1].ploidy = data[item];
                            this.changeValue(1);
                            break;
                    }
                }
                this.$forceUpdate()
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
                width: calc(33% - 26px);
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
    }
</style>