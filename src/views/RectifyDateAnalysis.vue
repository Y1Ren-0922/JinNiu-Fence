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

                        <el-col v-for="(item, idx) in case_category" :key="idx" :span="3.1" class="select-state-box"
                            style="height:8vh;" @click="selectCategory(item)">
                            <el-card shadow="always" class="select-card"
                                :body-style="categorySelected == item ? categorySelectedStyle : squadronNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>
                    <hr>
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
                                :body-style="streetSelected == item ? streetSelectedStyle : squadronNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>
                </div>
            </div>

            <div class="card ">
                <div class="card-body">

                    <el-table class="data-table" :data="issueList" style="width: 100%">
                        <el-table-column fixed prop="region" label="区域" min-width="150" header-align="center"
                            align="center" />
                        <el-table-column prop="disposaledNum" label="已办结问题总数" min-width="150" header-align="center"
                            align="center" />
                        <el-table-column prop="disposalingNum" label="在办数量" min-width="150" header-align="center"
                            align="center" />
                        <el-table-column prop="averagePeriod" label="平均办结周期" min-width="180" header-align="center"
                            align="center" />

                        <el-table-column fixed="right" label="操作" min-width="120" header-align="center" align="center">
                            <template #default>
                                <el-button link type="primary" size="small" style="font-size:1rem;">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';


const store = useStore();
const analysis_date = ref('day');
const squadron_list = reactive([]);
const street_list = reactive([]);

const categorySelected = ref('全部');

const squadronSelected = ref("全部");
const squadronNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const categorySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const squadronSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, #1E90FF); color: white;");
const streetSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, 	#00BFFF); color: white;");

const streetSelected = ref("全部");

const issueList = reactive([
    {
        region: '抚琴',
        disposaledNum: '100',
        disposalingNum: '85',
        averagePeriod: '3',
    }
]);
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

const case_category = reactive(['全部']);
const getCategory = () => {
    axios({
        url: '/api/problem-category/get_category',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.data.code == 2000) {
            for (const item of resp.data.data) {
                case_category.push(item.type);
            }
        }
    })
}
getCategory();

const selectSquadron = squadron => {
    squadronSelected.value = squadron;
}

const selectStreet = street => {
    streetSelected.value = street;
}

const selectCategory = category => {
    categorySelected.value = category;
}

onMounted(() => {
    if (window.screen.width > 2000 && window.devicePixelRatio == 1) {
        document.getElementsByClassName('container')[1].style.marginLeft = "750px";
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