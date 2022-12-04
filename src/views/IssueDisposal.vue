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
                            <el-col v-for="(item, idx) in case_category" :key="idx" :span="3.1" class="select-state-box"
                                style="height:8vh;" @click="selectCategory(item)">
                                <el-card shadow="always" class="select-card"
                                    :body-style="categorySelected == item ? categorySelectedStyle : categoryNoneSelectedStyle">
                                    {{ item }}</el-card>
                            </el-col>

                        </el-row>

                        <el-row :gutter="12">
                            <el-input style="width: 20%" id="select-street-box" class="select-text-box"
                                ref="selectStreetInput" v-model="queryRegion" placeholder="请选择区域" clearable size="large"
                                @click="selectStreet">

                            </el-input>

                            <el-select v-model="stateSelected" class="select-text-box " placeholder="请选择问题状态"
                                size="large" style="margin-right: 1vw; width: 15%;">
                                <el-option v-for="item in stateOption" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>

                            <el-date-picker v-model="record_date" type="date" placeholder="默认查询当天" size="large"
                                :disabled-date="disabledDate" style=" width: 20%; margin-right: 1vw;" />

                            <el-button type="primary" :icon="Search" size="large" @click="queryRecord">搜索</el-button>
                        </el-row>
                    </div>
                </div>
                <div class="card issue-box">
                    <div class="card-body">
                        <el-table :data="issueInfoList" style="width: 100%; font-size: 1.1rem;" size="large">

                            <el-table-column prop="id" label="问题编号" width="120" header-align="center" align="center" />
                            <el-table-column prop="region" label="区域" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="category" label="问题类别" width="120" header-align="center"
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

    <el-dialog v-model="selectStreetVisiable" title="选择街道" width="30%" :before-close="selectStreethandleClose">
        <el-select v-model="banshichuSelected" class="m-2" placeholder="请选择办事处" size="large" @change="agencySelected"
            clearable>
            <el-option v-for="item in banshichu_list" :key="item" :label="item" :value="item" />
        </el-select>

        <el-select v-model="queryStreet" class="m-2" placeholder="请选择严管街" size="large" clearable>
            <el-option v-for="item in regionList" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
        <template #footer>
            <span class="dialog-footer">

                <el-button type="primary" @click="selectStreetConfirm">
                    确定
                </el-button>
                <el-button @click="selectStreethandleClose">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, nextTick, watch } from 'vue'
import { case_category } from '@/scripts/constant';
import axios from 'axios';
import { useStore } from 'vuex';
import { Search } from "@element-plus/icons-vue";

const store = useStore();
const categorySelected = ref('全部');
const categoryNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px;  vertical-align:center;");
const categorySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const selectStreetVisiable = ref(false);
const banshichuSelected = ref('');
const queryStreet = ref('');
const queryRegion = ref('');
const selectStreetInput = ref(null);
const stateSelected = ref('');
const stateOption = [
    {
        value: '执法查处',
        label: '执法查处',
    },
    {
        value: '首次整改',
        label: '首次整改',
    },
    {
        value: '二次整改',
        label: '二次整改',
    },

]

let issueInfoList = reactive([
    {
        id: 1,
        region: "抚琴",
        category: '市容秩序',
        state: '现场核查',
        term: 15,
        countdown: '剩余10天',
        createTime: '2022-11-30',
        handler: '机器人1'
    }
]);

const selectStreethandleClose = () => {
    banshichuSelected.value = '';
    queryStreet.value = '';
    selectStreetVisiable.value = false;
    nextTick(() => {
        selectStreetInput.value.blur();
    })
}

const selectStreet = () => {
    banshichuSelected.value = '';
    regionList.splice(0, regionList.length);
    queryStreet.value = '';
    selectStreetVisiable.value = true;
}

const selectStreetConfirm = () => {
    if (queryStreet.value == '' && banshichuSelected.value != '') {
        queryRegion.value = banshichuSelected.value;
    } else if (queryStreet.value != '') {
        queryRegion.value = queryStreet.value;
    } else if (banshichuSelected.value == '') {
        queryRegion.value = '';
    }

    nextTick(() => {
        selectStreetInput.value.blur();
    })
    selectStreetVisiable.value = false;
}

const agency_region_relation = reactive({});
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
            for (let key in resp.data.data) {
                banshichu_list.push(key);
                agency_region_relation[key] = resp.data.data[key];

            }
        }
    })
}

getAgencyRegionRelation();

const regionList = reactive([]);
const agencySelected = () => {
    regionList.splice(0, regionList.length);
    if (banshichuSelected.value != '') {
        regionList.push(...agency_region_relation[banshichuSelected.value])
    }

}

const selectCategory = category => {
    categorySelected.value = category;
}

const get_now_date = () => {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
let record_date = ref(get_now_date());

const disabledDate = time => {
    return time.getTime() > Date.now()
}

const queryRecord = () => {

}

watch(queryRegion, (newValue) => {
    if (newValue == '') {
        banshichuSelected.value = '';
        queryStreet.value = '';
    }
})
</script>

<style scoped>
.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.select-state-box {
    cursor: pointer;
}

.select-text-box {
    margin-right: 1vw;
}
</style>