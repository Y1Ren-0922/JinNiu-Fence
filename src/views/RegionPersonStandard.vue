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
                    <el-row :gutter="12">
                        <el-col v-for="(item, idx) in agency_list" :key="idx" :span="2.5" class="select-state-box">
                            <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectAgency(item)"
                                :body-style="agencySelected == item ? agencySelectedStyle : agencyNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>
                </div>

            </div>

            <div class="card">
                <div class="card-body" style="display: flex;">
                    <div id="alert-diagram"></div>
                    <div id="unReachStandard-diagram"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';

const store = useStore();
const analysis_date = ref('day');

const agencyNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const agencySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");

const agencySelected = ref('全部');
const agency_list = reactive([]);
const getAgency = () => {
    axios({
        url: '/api/region/get_agency',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.data.code == 2000) {
            for (const item of resp.data.data) {
                agency_list.push(item);
            }
            agency_list.unshift("全部");
        }
    })
}
getAgency();

const selectAgency = agency => {
    agencySelected.value = agency;
}

const fontSizeSwitch = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1707);
    return res * fontSize;
}

let alert_chart = null;
let alertOption = {
    title: {
        text: '人员预警次数',
        left: 'center',
        textStyle: {
            fontSize: fontSizeSwitch(0.20),
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['12.10', '12.11', '12.12', '12.13', '12.14'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontSize: fontSizeSwitch(0.15),
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                fontSize: fontSizeSwitch(0.15),
            },
        }
    ],
    series: [
        {
            name: '次数',
            type: 'bar',
            barWidth: '40%',
            label: {
                show: true,
                position: 'top',
                fontSize: fontSizeSwitch(0.15),
            },
            data: [11, 6, 1, 16, 7]
        }
    ]
};

const create_alert_data = () => {
    let chartDom = document.getElementById("alert-diagram");
    alert_chart = echarts.init(chartDom);

    alert_chart.setOption(alertOption);
    window.addEventListener("resize", alert_chart.resize);
}

let unReachStandard_chart = null;
let unReachStandardOption = {
    title: {
        text: '人员不达标次数',
        left: 'center',
        textStyle: {
            fontSize: fontSizeSwitch(0.20),
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['12.10', '12.11', '12.12', '12.13', '12.14'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontSize: fontSizeSwitch(0.15),
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                fontSize: fontSizeSwitch(0.15),
            },
        }
    ],
    series: [
        {
            name: '次数',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
                color: '#1E90FF'
            },
            label: {
                show: true,
                position: 'top',
                fontSize: fontSizeSwitch(0.15),
            },
            data: [7, 3, 1, 11, 5]
        }
    ]
};

const create_unReachStandard_data = () => {
    let chartDom = document.getElementById("unReachStandard-diagram");
    unReachStandard_chart = echarts.init(chartDom);

    unReachStandard_chart.setOption(unReachStandardOption);
    window.addEventListener("resize", unReachStandard_chart.resize);
}

onMounted(() => {
    if (window.screen.width > 2000 && window.devicePixelRatio == 1) {
        document.getElementsByClassName('container')[1].style.marginLeft = "750px";
    }

    create_alert_data();
    create_unReachStandard_data();
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', alert_chart.resize);
    window.removeEventListener('resize', unReachStandard_chart.resize);

    if (alert_chart) {
        alert_chart.dispose();
        alert_chart = null;
    }

    if (unReachStandard_chart) {
        unReachStandard_chart.dispose();
        unReachStandard_chart = null;
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

.select-state-box {
    cursor: pointer;
}

#alert-diagram {
    width: 50%;
    height: 50vh;
}

#unReachStandard-diagram {
    width: 50%;
    height: 50vh;
}

@media (min-width: 1600px) {
    .container {
        width: 1500px;
        margin-left: 350px;
        font-size: 16px;
    }

    .data-table {
        font-size: 16px;
    }
}

@media (min-width: 2000px) {
    .container {
        max-width: 1800px;
        margin-left: 500px;
        font-size: 18px;
    }

    .data-table {
        font-size: 20px;
    }
}
</style>