<template>
    <div>
        <div class="rent">
            <div>顶托：</div>
            <div>
                <el-input v-model="rent" placeholder="请输入租金" @keyup.native="checkInputData()">
                    <template slot="prepend">租金：</template>
                    <template slot="append">元</template>
                </el-input>
            </div>
<!--            <div><el-input v-model="num" placeholder="请输入个数" @keyup.native="changeValue">-->
<!--                <template slot="prepend">个数：</template>-->
<!--            </el-input></div>-->
        </div>
        <div class="splice-table">
            <div class="table-left">
                <div class="table-item">规格</div>
                <div class="table-item">个数</div>
            </div>
            <div class="table-center">
                <div class="table-item">
                    <div>顶托</div>
                </div>
                <div class="table-item">
                    <div>
                        <el-input placeholder="请输入个数" v-model="num" @keyup.native="changeValue()"></el-input>
                    </div>
                </div>
            </div>
            <div class="table-right">
                <div class="table-item">合计</div>
                <div class="table-item">{{num}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {checkInput} from '../utils/method'
    export default {
        name: "jacking",
        props:['dataList'],
        data() {
            return {
                num: '',
                rent:''
            }
        },
        methods:{
            checkInputData(){
                this.rent=checkInput(this.rent)
            },
            changeValue(){
                if (this.num.replace(/\D/gi, '')>this.dataList.inventory-0) {
                    this.$message.warning('输入数量已超过库存数量，请重新输入');
                    this.num = '';
                    this.$emit('statisitics','jackingData',this.num);
                    this.$emit('maintaimCost','jackingData',this.num);
                }else{
                    this.num = this.num.replace(/\D/gi, '');
                    this.$emit('statisitics','jackingData',this.num);
                    this.$emit('maintaimCost','jackingData',this.num);
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