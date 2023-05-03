<template>
    <div class="template">
        <div class="template-top">
            <router-link :to="{path:'/home'}">
                <el-button type="primary">返回</el-button>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "template"
    }
</script>

<style scoped lang="scss">
    .template{
        height: 100%;
        overflow-y: auto;
        .template-top{
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
        }
    }
</style>