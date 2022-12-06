<template>
    <div class="container">
        <div class="row">
            <div class="col-7">
                <div class="card select-box">
                    <div class="card-body">
                        <el-input style="width: 20%" class="select-text-box" v-model="queryName" placeholder="请输入人员姓名"
                            clearable size="large">
                        </el-input>

                        <el-select v-model="companySelected" class="select-text-box " placeholder="请选择所属公司" size="large"
                            style=" width: 22%;" clearable>
                            <el-option v-for="item in companyOption" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>

                        <el-button type="primary" :icon="Search" size="large">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="col-7">
                <div class="card person-list">
                    <div class="card-body">

                        <el-table :data="bicyclePersonList" style="width: 100%;">
                            <el-table-column fixed prop="name" label="姓名" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="company" label="所属公司" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="state" label="状态" width="120" header-align="center" align="center" />
                            <el-table-column prop="clockTime" label="打卡时间" width="170" header-align="center"
                                align="center" />
                            <el-table-column fixed="right" label="操作" width="120" header-align="center" align="center">
                                <template #default>
                                    <el-button link type="primary" size="small">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>


                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Search } from "@element-plus/icons-vue";

const queryName = ref('');
const companySelected = ref('');
const bicyclePersonList = reactive([
    {
        name: '张三',
        company: '美团',
        state: '已打卡',
        clockTime: '2022-12-01 08:00:00'
    }
]);

const companyOption = [
    {
        value: '美团',
        label: '美团',
    },
    {
        value: '哈罗',
        label: '哈罗',
    },
    {
        value: '青桔',
        label: '青桔',
    },
]
</script>

<style scoped>
.container {
    margin-left: 16vw;
}

.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.select-text-box {
    margin-right: 1vw;
}
</style>