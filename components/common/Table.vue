<template>
    <div
        :class="{
            'custom-table': true,
            [`custom-table--header-${headerStyle}`]: true,
            'custom-table--header-hidden': !header,
        }"
    >
        <el-table
            v-loading="loading"
            :data="rows"
            @selection-change="handleSelectionChange"
            @sort-change="handleSort"
            @row-click="$emit('rowClick', $event)"
        >
            <el-table-column v-if="selectable" type="selection" width="55" />

            <el-table-column
                v-for="col in columns"
                :key="col.prop"
                :prop="col.prop"
                :label="col.label"
                :width="col.width"
                :sortable="col.sortable"
            >
                <template slot-scope="scope">
                    <div
                        v-if="col.render"
                        v-html="
                            col.render(scope.row, scope.column, scope.$index)
                        "
                        :class="col.class"
                    />
                    <component
                        v-else-if="col.component"
                        :is="col.component"
                        v-bind="
                            col.props(scope.row, scope.column, scope.$index)
                        "
                        :class="col.class"
                    />
                    <div v-else :class="col.class">
                        {{ scope.row[col.prop] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column width="55" class-name="actions" v-if="showActions">
                <template slot-scope="scope">
                    <slot name="menu" v-bind="scope" />
                </template>
            </el-table-column>

            <template slot="empty">
                <slot name="empty" />
            </template>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
        selectable: {
            type: Boolean,
            required: false,
            default: true,
        },
        headerStyle: {
            type: String,
            required: false,
            default: "black",
            validator(val) {
                return ["black", "gray"].includes(val);
            },
        },
        header: {
            type: Boolean,
            required: false,
            default: true,
        },
        showActions: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        handleSelectionChange() {},
        handleSort(e) {
            this.$emit("sortChange", e);
        },
    },
};
</script>
