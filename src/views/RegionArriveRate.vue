<template>
    <div class="container">
        <div class="row">


            <div class="card select-box">
                <div class="card-header" style="background-color: white;">
                    <el-tabs v-model="analysis_date" class="demo-tabs">
                        <el-tab-pane label="日统计" name="day"></el-tab-pane>
                        <el-tab-pane label="月统计" name="month"></el-tab-pane>
                        <el-tab-pane label="年统计" name="year"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="card-body">
                    <div class="col-12">

                        <el-input ref="selectDepartmentInput" style="width: 22%" class="select-text-box"
                            v-model="queryDepartment" placeholder="请输入部门名称" clearable size="large"
                            @click="selectDepartment">

                        </el-input>

                        <el-date-picker class="select-text-box" v-model="record_date" type="date" placeholder="默认查询最近五天"
                            size="large" :disabled-date="disabledDate" style="width: 15%; margin-right: 1vw;" />
                        <el-button type="primary" :icon="Search" size="large">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header diagram-header">到岗率</div>
                <div class="card-body" style="display: flex;">
                    <div id="arrive-rate-diagram"></div>
                </div>
            </div>

        </div>
    </div>

    <el-dialog v-model="selectDepartmentVisiable" title="选择部门" width="30%" :before-close="selectDepartmenthandleClose">
        <el-select v-model="queryDepartment" class="m-2" placeholder="请选择部门" size="large" clearable>
            <el-option v-for="(item, idx) in department_list" :key="idx" :label="item" :value="item" />
        </el-select>
        <template #footer>
            <span class="dialog-footer">

                <el-button type="primary" @click="selectDepartmentConfirm">
                    确定
                </el-button>
                <el-button @click="selectDepartmenthandleClose">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import { useStore } from 'vuex'

const store = useStore();
const department_list = reactive([]);
const selectDepartmentVisiable = ref(false);
const queryDepartment = ref('');
const record_date = ref('');
const analysis_date = ref('day')

const selectDepartmentInput = ref(null);
const selectDepartment = () => {
    selectDepartmentVisiable.value = true;
}

const selectDepartmenthandleClose = () => {
    selectDepartmentVisiable.value = false;
}

const selectDepartmentConfirm = () => {
    selectDepartmentVisiable.value = false;

    nextTick(() => {
        selectDepartmentInput.value.blur();
    })
}

const get_department = () => {
    axios({
        url: '/api/patrol/select/department',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.status == 200) {
            for (const item of resp.data.data) {
                department_list.push(item);
            }
        }
    })
}

get_department();

const fontSizeSwitch = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1707);
    return res * fontSize;
}

let arrive_rate_chart = null;
let arrive_rate_option = {
    title: {
        text: '到岗率',
        left: 'center',
        // textStyle: {
        //     color: 'white',
        // }
    },
    tooltip: {
        trigger: 'item'
    },

    xAxis: {
        type: 'category',
        data: ['2022-12-09', '2022-12-10', '2022-12-11', '2022-12-12', '2022-12-13']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} %'
        }
    },
    series: [
        {
            type: 'line',
            data: [94, 98, 89, 92, 99],
            smooth: true,
            label: {
                fontSize: fontSizeSwitch(0.15),
            },

        }
    ]
}

const create_arrive_rate_data = () => {
    let chartDom = document.getElementById("arrive-rate-diagram");
    arrive_rate_chart = echarts.init(chartDom);


    arrive_rate_chart.setOption(arrive_rate_option);
    window.addEventListener("resize", arrive_rate_chart.resize);
}

const disabledDate = time => {
    return time.getTime() > Date.now()
}

onMounted(() => {
    create_arrive_rate_data();

})

onBeforeUnmount(() => {
    if (arrive_rate_chart != null) {
        arrive_rate_chart.dispose();
        arrive_rate_chart = null;
    }

})
</script>


<style scoped>
.container {
    margin-left: 16vw;
}

.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.diagram-header {
    font-size: 1.2rem;
}

.select-text-box {
    margin-right: 1vw;
}

#arrive-rate-diagram {
    width: 100%;
    height: 50vh;
}
</style>