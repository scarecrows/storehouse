<template>
    <div>
        <template v-for="(item, index) in data">
            <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
                 情况一：有子集的情况：                         -->
            <el-submenu :key="index" :index="item.path" v-if="item.children&&item.children.length > 0">
                <template slot="title">
                    <span>{{ item.name }}</span>
                </template>
                <myitem :data="item.children"></myitem>
            </el-submenu>
            <!-- 情况二：没子集的情况： -->
            <el-menu-item :key="index" v-else :index="item.path">
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: "mymenu",
        props: {
            data: {
                type: Array,
                default: [],
            },
        },
    }
</script>

<style scoped>

</style>