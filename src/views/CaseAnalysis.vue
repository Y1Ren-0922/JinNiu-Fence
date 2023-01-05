<template>
    <div class="container">
        <div class="row">
            <div class=" select-box">
                <div class="card-header" style="background-color: white;">
                    <el-tabs v-model="analysis_date" class="demo-tabs">
                        <el-tab-pane label="月统计" name="month">
                            <div class="card card-body">
                                <el-row :gutter="12">
                                    <el-col v-for="(item, idx) in case_category" :key="idx" :span="3.1"
                                        class="select-state-box" style="height:8vh;" @click="selectCategory(item)">
                                        <el-card shadow="always" class="select-card"
                                            :body-style="categorySelected == item ? categorySelectedStyle : squadronNoneSelectedStyle">
                                            <span>{{ item }}</span>
                                            <div class="state-number">20</div>
                                        </el-card>
                                    </el-col>
                                </el-row>

                                <hr>
                                <el-row :gutter="12">
                                    <el-col v-for="(item, idx) in street_list" :key="idx" :span="2.5"
                                        class="select-state-box">
                                        <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectStreet(item)"
                                            :body-style="streetSelected == item ? streetSelectedStyle : squadronNoneSelectedStyle">
                                            <span>{{ item }}</span>
                                            <div class="state-number">20</div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <hr>
                                <div class="col-12" style="margin-right:30px; display: flex;">
                                    <el-input style="width: 22%" class="select-text-box" v-model="queryDepartment"
                                        placeholder="请输入中队名称" clearable size="large">
                                    </el-input>

                                    <el-date-picker class="select-text-box" v-model="record_date" type="date"
                                        placeholder="默认查询当天" size="large" :disabled-date="disabledDate"
                                        style="width: 15%; margin-right: 1vw;" />
                                    <el-button type="primary" :icon="Search" size="large"
                                        @click="queryRecord">搜索</el-button>
                                </div>
                            </div>

                            <div class="card card-up ">
                                <div class="card-body">

                                    <el-table class="data-table" :data="issueList" style="width: 100%">
                                        <el-table-column fixed prop="region" label="办案单位" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column prop="disposaledNum" label="办案人员" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column prop="disposalingNum" label="被处罚单位" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column prop="averagePeriod" label="处罚结果" min-width="180"
                                            header-align="center" align="center" />
                                        <el-table-column fixed="right" label="操作" min-width="120" header-align="center"
                                            align="center">
                                            <template #default>
                                                <el-button link type="primary" size="small"
                                                    style="font-size:1rem;">详情</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <div class="float-end" style="margin-top: 1vh">
                                        <el-pagination background layout="total, prev, pager, next, jumper"
                                            :total="total_records" :current-page="current_page"
                                            @current-change="getIssueList" />
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="年统计" name="year">
                            <div class="card card-body">
                                <el-row :gutter="12">

                                    <el-col v-for="(item, idx) in case_category" :key="idx" :span="3.1"
                                        class="select-state-box" style="height:8vh;" @click="selectCategory(item)">
                                        <el-card shadow="always" class="select-card"
                                            :body-style="categorySelected == item ? categorySelectedStyle : squadronNoneSelectedStyle">
                                            <span>{{ item }}</span>
                                            <div class="state-number">20</div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <hr>
                                <el-row :gutter="12">
                                    <el-col v-for="(item, idx) in street_list" :key="idx" :span="2.5"
                                        class="select-state-box">
                                        <el-card shadow="always" style="margin-bottom: 1vh;" @click="selectStreet(item)"
                                            :body-style="streetSelected == item ? streetSelectedStyle : squadronNoneSelectedStyle">
                                            <span>{{ item }}</span>
                                            <div class="state-number">20</div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <hr>
                                <div class="col-12" style="margin-right:30px; display: flex;">
                                    <el-input style="width: 22%" class="select-text-box" v-model="queryDepartment"
                                        placeholder="请输入中队名称" clearable size="large">
                                    </el-input>
                                    <el-date-picker class="select-text-box" v-model="record_date" type="date"
                                        placeholder="默认查询当天" size="large" :disabled-date="disabledDate"
                                        style="width: 15%; margin-right: 1vw;" />
                                    <el-button type="primary" :icon="Search" size="large"
                                        @click="queryRecord">搜索</el-button>
                                </div>
                            </div>
                            <div class="card card-up ">
                                <div class="card-body">
                                    <el-table class="data-table" :data="issueList" style="width: 100%">
                                        <el-table-column fixed prop="region" label="中队名称" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column prop="disposaledNum" label="执法人员" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column prop="disposalingNum" label="办案数量" min-width="150"
                                            header-align="center" align="center" />
                                        <el-table-column fixed="right" label="操作" min-width="120" header-align="center"
                                            align="center">
                                            <template #default>
                                                <el-button link type="primary" size="small"
                                                    style="font-size:1rem;">详情</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
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
const analysis_date = ref('month');
const street_list = reactive([]);

const categorySelected = ref('巡查中队');

const squadronNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const categorySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const streetSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, 	#00BFFF); color: white;");

const streetSelected = ref("执法中队");
const case_category = ["巡查中队", "大队一中队", "大队二中队", "大队三中队", "大队四中队", "大队五中队"];

const issueList = reactive([
    {
        region: '茶店子',
        disposaledNum: '99',
        disposalingNum: '45',
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
                if (item.endsWith("执法中队")) {
                    let street = item.substring(0, item.length - 4);
                    street_list.push(street);
                }
            }
            street_list.unshift("执法中队");
        }
    })
}
get_department();



const selectStreet = street => {
    streetSelected.value = street;
}

const selectCategory = category => {
    categorySelected.value = category;
}
const get_now_date = () => {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
let record_date = ref(get_now_date());

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

.card-up {
    margin-top: 2vh;
}

.select-state-box {
    cursor: pointer;
}

.select-text-box {
    margin-right: 1vw;
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