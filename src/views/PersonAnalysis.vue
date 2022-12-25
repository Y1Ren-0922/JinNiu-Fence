<template>
    <div class="container">
        <div class="row">

            <div class="card select-box">
                <div class="card-body">
                    <div class="col-12">
                        <el-row :gutter="12">
                            <el-col v-for="(item, idx) in identityList" :key="idx" :span="2.5" class="select-state-box">
                                <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectIdentity(item)"
                                    :body-style="identitySelected == item ? identitySelectedStyle : identityNoneSelectedStyle">
                                    <span>{{ item }}</span>
                                    <div class="state-number">{{ identityNumMap[item] }}</div>
                                </el-card>
                            </el-col>

                        </el-row>
                        <hr>
                        <el-row :gutter="12">
                            <el-col v-for="(item, idx) in banshichu_list" :key="idx" :span="2.5"
                                class="select-state-box">
                                <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectAgency(item)"
                                    :body-style="agencySelected == item ? agencySelectedStyle : identityNoneSelectedStyle">
                                    <span>{{ item }}</span>
                                    <div class="state-number" v-if="item != '全部'">{{ departmentNumMap[item + "执法中队"] }}
                                    </div>
                                    <div class="state-number" v-else>{{ departmentNumMap[item] }}</div>
                                </el-card>
                            </el-col>

                        </el-row>
                        <hr>
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
const identityList = ["全部", "执法人员", "协管人员"];
const identityNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const identitySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const agencySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, #1E90FF); color: white;");
const identitySelected = ref('全部');
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
let person_age_option = {
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
                { value: 0, name: '30岁及以下' },
                { value: 0, name: '30-35岁' },
                { value: 0, name: '35-40岁' },
                { value: 0, name: '40-45岁' },
                { value: 0, name: '45-50岁' },
                { value: 0, name: '50岁及以上' },
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
const create_person_age_data = () => {
    let chartDom = document.getElementById("age-diagram");
    person_age_chart = echarts.init(chartDom);

    getPatrolData();
    window.addEventListener("resize", person_age_chart.resize);
}

let person_sex_chart = null;
let personSexOption = {
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
                { value: 0, name: '男性' },
                { value: 0, name: '女性' },
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
const create_sex_age_data = () => {
    let chartDom = document.getElementById("sex-diagram");
    person_sex_chart = echarts.init(chartDom);

    getPatrolData();
    window.addEventListener("resize", person_sex_chart.resize);
}

const selectIdentity = identity => {
    identitySelected.value = identity;
    getPatrolData();
}

const agencySelected = ref('全部');
const selectAgency = agency => {
    agencySelected.value = agency;
    getPatrolData();
}

const getPatrolData = () => {
    let agency;
    let identity;

    if (agencySelected.value == '全部') {
        agency = '';
    } else {
        agency = agencySelected.value + '执法中队'
    }

    if (identitySelected.value == '全部') {
        identity = '';
    } else {
        identity = identitySelected.value;
    }
    axios({
        url: '/api/patrol/stat/age_gender',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            department: agency,
            identity: identity,
        })
    }).then(function (resp) {
        let data = resp.data.data;

        person_age_option.series[0].data[0].value = data.age25;
        person_age_option.series[0].data[1].value = data.age30;
        person_age_option.series[0].data[2].value = data.age35;
        person_age_option.series[0].data[3].value = data.age40;
        person_age_option.series[0].data[4].value = data.age45;
        person_age_option.series[0].data[5].value = data.age50;
        person_age_chart.setOption(person_age_option);

        personSexOption.series[0].data[0].value = data.male;
        personSexOption.series[0].data[1].value = data.female;
        person_sex_chart.setOption(personSexOption);
    })
}

const banshichu_list = reactive([]);
const getAgencyRegionRelation = () => {
    axios({
        url: '/api/region/get_relation',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.status == 200) {

            for (let key of resp.data.data) {
                banshichu_list.push(key.agency);


            }
            banshichu_list.unshift('全部');
        }
    })
}
getAgencyRegionRelation();

const departmentNumMap = reactive({});
const identityNumMap = reactive({});
const getNum = num => {
    axios({
        url: '/api/patrol/stat/num',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            param: num
        })
    }).then(function (resp) {

        if (resp.data.code == 2000) {
            if (num == 1) {
                let total = 0;
                for (const item of resp.data.data) {
                    departmentNumMap[item.department] = item.num;
                    total += item.num;
                }
                departmentNumMap['全部'] = total;
            } else if (num == 2) {
                let total = 0;

                for (const item of resp.data.data) {
                    identityNumMap[item.identity] = item.num;
                    total += item.num;
                }
                identityNumMap['全部'] = total;
            }

        }
    })
}

const getPatrolNum = () => {
    getNum(1);
    getNum(2);
}
getPatrolNum();

onMounted(() => {
    create_person_age_data();
    create_sex_age_data();
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', person_age_chart.resize);
    window.removeEventListener('resize', person_sex_chart.resize);
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

.select-state-box {
    cursor: pointer;
}
</style>