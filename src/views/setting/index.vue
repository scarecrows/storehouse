<template>
    <div class="setting">
        <el-container>
            <el-aside width="200px">
                <el-menu
                        :default-active="activeIndex"
                        class="elMenu"
                        background-color="#333"
                        text-color="#B0B0B2"
                        active-text-color="#fff"
                        :unique-opened="true"
                        router
                        ref="elMenu"
                >

                    <!-- 递归动态菜单 -->
                    <my-menu :data="menuArr"/>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="setting-content">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import myMenu from "./mymenu";
    export default {
        name: "index",
        components: {
            myMenu, // 注册一下
        },
        data() {
            return {
                activeIndex: this.$route.path,
                menuArr: [
                    {
                        name:'钢管',
                        path:'/setting/tube'
                    },
                    {
                        name:'扣件',
                        path:'/setting/fastening'
                    },
                    {
                        name:'接头',
                        path:'/setting/splice'
                    },
                    {
                        name:'顶托',
                        path:'/setting/jacking'
                    },
                    {
                        name:'单位',
                        path:'/setting/unit'
                    },
                ]
            };
        }
    }
</script>

<style scoped lang="scss">
.setting{
    display: block;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    ::v-deep{
        .el-container{
            height: 100%;
        }
        .el-menu{
            height: 100%;
        }
    }
    .setting-content{
        height: 100%;
    }
}
</style>