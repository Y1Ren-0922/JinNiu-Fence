<template>
    <div class="container">
        <div class="row">

            <div class="card select-box">
                <div class="card-body">
                    <div class="col-12">

                        <el-input ref="selectDepartmentInput" style="width: 22%" class="select-text-box"
                            v-model="queryDepartment" placeholder="请输入部门名称" clearable size="large"
                            @click="selectDepartment">

                        </el-input>
                        <el-button type="primary" :icon="Search" size="large">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header diagram-header">人员性别与年龄图</div>
                <div class="card-body" style="display: flex;">
                    <div id="age-diagram"></div>
                    <div id="sex-diagram"></div>
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
            console.log(department_list);
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

let person_age_chart = null;
const create_person_age_data = () => {
    let chartDom = document.getElementById("age-diagram");
    person_age_chart = echarts.init(chartDom);
    let option = {
        title: {
            text: '人员年龄占比图',
            left: 'center',
            // textStyle: {
            //     color: 'white',
            // }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '30岁及以下' },
                    { value: 735, name: '30-35岁' },
                    { value: 580, name: '40-45岁' },
                    { value: 484, name: '45-50岁' },
                    { value: 484, name: '50岁及以上' },
                ],
                label: {

                    formatter: '{b}: {c}人',
                    fontSize: fontSizeSwitch(0.15),
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }
            }
        ]
    }

    option && person_age_chart.setOption(option);
    window.addEventListener("resize", person_age_chart.resize);
}

let person_sex_chart = null;
const create_sex_age_data = () => {
    let chartDom = document.getElementById("sex-diagram");
    person_sex_chart = echarts.init(chartDom);
    let option = {
        title: {
            text: '人员性别占比图',
            left: 'center',
            // textStyle: {
            //     color: 'white',
            // }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '男性' },
                    { value: 735, name: '女性' },
                ],
                label: {

                    formatter: '{b}: {c}人',
                    fontSize: fontSizeSwitch(0.15),
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }
            }
        ]
    }

    option && person_sex_chart.setOption(option);
    window.addEventListener("resize", person_sex_chart.resize);
}

onMounted(() => {
    create_person_age_data();
    create_sex_age_data();
})

onBeforeUnmount(() => {
    if (person_age_chart) {
        person_age_chart.dispose();
        person_age_chart = null;
    }

    if (person_sex_chart) {
        person_sex_chart.dispose();
        person_sex_chart = null;
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

#age-diagram {
    width: 50%;
    height: 50vh;
}

#sex-diagram {
    width: 50%;
    height: 50vh;
}
</style>