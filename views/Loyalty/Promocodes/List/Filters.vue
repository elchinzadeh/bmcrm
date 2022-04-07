<template>
    <div class="filters">
        <el-tabs v-model="activeTab" @tab-click="tabOnChange">
            <el-tab-pane label="All" name="all" />
            <el-tab-pane label="Active" name="active" />
            <el-tab-pane label="Not active" name="deactive" />
        </el-tabs>

        <Select
            :value="label"
            @optionChange="label = $event"
            :options="labels"
            placeholder="Label"
            labelKey="name"
            valueKey="id"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Filters",
    data() {
        return {
            activeTab: "all",
        };
    },
    mounted() {
        this.label = [this.labels[0].id];
    },
    computed: {
        ...mapGetters("General", ["labels"]),
        ...mapGetters("Promocodes", ["filter"]),
        label: {
            get() {
                return [this.filter.headers.tenantId];
            },
            set(val) {
                this.setFilter({
                    headers: {
                        tenantId: val,
                    },
                });
            },
        },
    },
    methods: {
        ...mapActions("Promocodes", ["setFilter"]),
        tabOnChange() {},
    },
};
</script>

<style lang="scss" scoped>
.filters {
    margin-top: 65px;
    display: flex;
    justify-content: space-between;
}
</style>
