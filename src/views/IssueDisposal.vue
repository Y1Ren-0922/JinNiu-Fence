<template>
    <div class="container">
        <div class="row">

            <div class="col-1"></div>

            <div class="col-10">
                <div class="card select-box">
                    <div class="card-body">
                        <el-row :gutter="12">
                            <!-- <el-col :span="2" class="select-state-box" @click="selectBanshichu('全部')">
                            <el-card shadow="always"
                                :body-style="stateSelected == '全部' ? banshichuSelectedStyle : banshichuNoneSelectedStyle">
                                全部</el-card>
                        </el-col> -->
                            <el-col v-for="(item, idx) in case_state" :key="idx" :span="3.1" class="select-state-box"
                                style="height:8vh;" @click="selectState(item)">
                                <el-card shadow="always" class="select-card"
                                    :body-style="stateSelected == item ? stateSelectedStyle : stateNoneSelectedStyle">
                                    {{ item }}</el-card>
                            </el-col>

                        </el-row>
                    </div>
                </div>
                <div class="card issue-box">
                    <div class="card-body">
                        <el-table :data="issueInfoList" style="width: 100%; font-size: 1.1rem;" size="large">

                            <el-table-column prop="id" label="问题编号" width="120" header-align="center" align="center" />
                            <el-table-column prop="region" label="区域" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="state" label="流程状态" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="term" label="流程期限" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="countdown" label="倒计时" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="createTime" label="生成时间" width="150" header-align="center"
                                align="center" />
                            <el-table-column prop="handler" label="处理人" width="150" header-align="center"
                                align="center" />
                            <el-table-column fixed="right" label="操作" width="150" header-align="center" align="center">
                                <template #default>
                                    <el-button link size="small" type="primary" plain text style="font-size:1rem;">
                                        详情
                                    </el-button>
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
import { reactive, ref } from 'vue'
import { case_state } from '@/scripts/constant';

let stateSelected = ref('全部');
const stateNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const stateSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
let issueInfoList = reactive([
    {
        id: 1,
        region: "抚琴",
        state: '现场核查',
        term: 15,
        countdown: '剩余10天',
        createTime: '2022-11-30',
        handler: '机器人1'
    }
]);


const selectState = state => {
    stateSelected.value = state;
}
</script>

<style scoped>
.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.select-state-box {
    cursor: pointer;
}
</style>