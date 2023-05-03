<template>
    <div class="home">
        <div class="home-item">
            <router-link :to="{path:'/shipment'}">
                <div>出货</div>
            </router-link>
            <router-link :to="{path:'/refund'}">
                <div>退货</div>
            </router-link>
        </div>
        <div class="home-item">
            <router-link :to="{path:'/close'}">
                <div>结算</div>
            </router-link>
            <router-link :to="{path:'/inventory'}">
                <div>盘存</div>
            </router-link>
        </div>
        <div class="setting">
            <router-link :to="{path:'/setting/tube'}">
                <el-button icon="el-icon-setting" circle></el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
            }
        },
        methods:{
        }
    }
</script>
<style lang="scss">
    .home{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
    }
    .home-item{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        height: 30%;
        a{
            text-align: center;
            border: 1px solid #409eff;
            border-radius: 10px;
            width: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 40px;
            color: #409eff;
        }
        a:hover{
            background: #409eff;
            color: #fff;
        }
    }
    .setting{
        position: fixed;
        top: 20px;
        right: 20px;
    }
</style>