<template>
    <div class="inventory">
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
        components:{tableView},
        data(){
            return{
                tableList:[],
                tableData:[]
            }
        }
    }
</script>

<style scoped lang="scss">
    .inventory{
        padding: 20px;
        height: 100%;
        box-sizing: border-box;
        .tent-content{
            margin-top: 30px;
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