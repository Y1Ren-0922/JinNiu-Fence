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
                        <el-col v-for="(item, idx) in squadron_list" :key="idx" :span="2.5" class="select-state-box">
                            <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectSquadron(item)"
                                :body-style="squadronSelected == item ? squadronSelectedStyle : squadronNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>

                    <hr>
                    <el-row :gutter="12">
                        <el-col v-for="(item, idx) in street_list" :key="idx" :span="2.5" class="select-state-box">
                            <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectStreet(item)"
                                :body-style="streetSelected == item ? agencySelectedStyle : squadronNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>
                </div>
            </div>

            <div class="card">
                <div class="card-header diagram-header">每类问题分布</div>
                <div class="card-body">
                    <div id="category-diagram"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import * as echarts from 'echarts';

const store = useStore();
const analysis_date = ref('day');

const squadron_list = reactive([]);
const street_list = reactive([]);

const squadronSelected = ref("全部");
const squadronNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const squadronSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const agencySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, #1E90FF); color: white;");

const streetSelected = ref("全部")
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
                if (item.substr(0, 4) == "执法大队" && item.length > 4) {
                    squadron_list.push(item);
                }
                if (item.endsWith("执法中队")) {
                    let street = item.substring(0, item.length - 4);
                    street_list.push(street);
                }
            }
            squadron_list.unshift("全部");
            street_list.unshift("全部");
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

let category_chart = null;
let categoryOption = {
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
            data: ['市容秩序', '占用城市道路', '扬尘', '违建', '共享单车'],
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
            name: '件数',
            type: 'bar',
            barWidth: '40%',
            label: {
                show: true,
                position: 'top',
                fontSize: fontSizeSwitch(0.15),
            },
            data: [76, 52, 200, 334, 390]
        }
    ]
};
const create_category_data = () => {
    let chartDom = document.getElementById("category-diagram");
    category_chart = echarts.init(chartDom);

    category_chart.setOption(categoryOption);
    window.addEventListener("resize", category_chart.resize);
}

const selectSquadron = squadron => {
    squadronSelected.value = squadron;
}

const selectStreet = street => {
    streetSelected.value = street;
}

onMounted(() => {
    if (window.screen.width > 2000 && window.devicePixelRatio == 1) {
        document.getElementsByClassName('container')[1].style.marginLeft = "750px";
    }

    create_category_data();
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', category_chart.resize);
    if (category_chart) {
        category_chart.dispose();
        category_chart = null;
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

.diagram-header {
    font-size: 1.2rem;
}

#category-diagram {
    width: 100%;
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