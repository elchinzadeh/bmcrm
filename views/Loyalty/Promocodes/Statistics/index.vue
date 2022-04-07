<template>
    <el-row :gutter="40">
        <el-col :span="16">
            <UsageByPercentage />
        </el-col>
        <el-col :span="8">
            <UsageByDate />
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Statistics",
    components: {
        UsageByDate: () => import("./UsageByDate"),
        UsageByPercentage: () => import("./UsageByPercentage"),
    },
};
</script>

<style></style>
