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
                                    <span>{{ item }}</span>
                                    <div class="state-number">20</div>
                                </el-card>
                            </el-col>

                        </el-row>

                        <el-row :gutter="12" class="text-select">
                            <el-input style="width: 20%" id="select-street-box" class="select-text-box"
                                ref="selectStreetInput" v-model="queryRegion" placeholder="请选择区域" clearable size="large"
                                @click="selectStreet">

                            </el-input>

                            <el-select v-model="stateSelected" class="select-text-box " placeholder="请选择问题状态"
                                size="large" style="margin-right: 1vw; width: 15%;" clearable>
                                <el-option v-for="item in stateOption" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>

                            <!-- <el-date-picker v-model="record_date" type="date" placeholder="默认查询当天" size="large"
                                :disabled-date="disabledDate" style=" width: 20%; margin-right: 1vw;" /> -->
                            <el-date-picker v-model="record_date" type="datetimerange" :shortcuts="date_shortcuts"
                                range-separator="-" start-placeholder="请选择时间区间" size="large"
                                value-format="YYYY-MM-DD HH:mm:ss" style="margin-right: 1vw;" />

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
                            <!-- <el-table-column prop="term" label="流程期限" width="120" header-align="center"
                                align="center" /> -->
                            <el-table-column prop="createTime" label="生成时间" width="150" header-align="center"
                                align="center" :show-overflow-tooltip="true" />
                            <el-table-column prop="deadline" label="时限" width="150" header-align="center" align="center"
                                :show-overflow-tooltip="true" />

                            <el-table-column prop="handler" label="发布人" width="120" header-align="center"
                                align="center" />
                            <el-table-column fixed="right" label="操作" width="150" header-align="center" align="center">
                                <template #default="scope">
                                    <el-button link size="small" type="primary" plain text style="font-size:1rem;"
                                        @click="checkDetail(scope.row)">
                                        详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="float-end" style="margin-top: 1vh">
                            <el-pagination background layout="total, prev, pager, next, jumper" :total="total_records"
                                :current-page="current_page" @current-change="getIssueList" />
                        </div>
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
            <el-option v-for="item in regionList" :key="item" :label="item" :value="item" />
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
import axios from 'axios';
import { useStore } from 'vuex';
import { Search } from "@element-plus/icons-vue";
import router from '@/router';

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
const current_page = ref(1);
const total_records = ref(0);
const case_category = reactive(['全部'])

const stateOption = [
    {
        value: '未接收',
        label: '未接收',
    },
    {
        value: '未处理',
        label: '未处理',
    },
    {
        value: '处理中',
        label: '处理中',
    },
    {
        value: '整改完成',
        label: '整改完成',
    },

]

const date_shortcuts = [
    {
        text: '当天',
        value: () => {
            const end = get_now_date() + ' 23:59:59';
            const start = get_now_date() + ' 00:00:00';
            return [start, end]
        }
    },
    {
        text: '过去一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '过去一月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '过去三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]

let issueInfoList = reactive([
]);

const switchTime = time => {
    return time.replace('T', ' ')
}

const issueList = reactive({});
let record_date = ref(['', '']);
const getIssueList = page => {
    issueInfoList.splice(0, issueInfoList.length);
    Object.keys(issueList).map(key => {
        delete issueList[key]
    });

    let agency = banshichuSelected.value;
    let region = queryStreet.value;
    let category = categorySelected.value;
    if (region != '') {
        agency = '';
    }

    if (category == '全部') {
        category = '';
    }
    if (record_date.value == null) {
        record_date.value = ['', '']
    }
    let issue_request = {
        patrol: '',
        category: category,
        subCategory: '',
        region: region,
        agency: agency,
        rectifyStatus: stateSelected.value,
        startRectifyDate: '',
        endRectifyDate: '',
        startPostDate: record_date.value[0],
        endPostDate: record_date.value[1],
        pageSize: 10,
        pageNum: page,
    }
    axios({
        url: '/api/problem/select/conditions',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify(issue_request)
    }).then(function (resp) {
        if (resp.status == 200) {
            issueInfoList.splice(0, issueInfoList.length);
            Object.keys(issueList).map(key => {
                delete issueList[key]
            });

            total_records.value = resp.data.data.total;

            for (const item of resp.data.data.records) {
                let issue = {
                    id: item.id,
                    region: item.agency,
                    category: item.category,
                    handler: item.patrolName,
                    state: item.rectifyStatus,
                    createTime: switchTime(item.postDate),
                    deadline: switchTime(item.rectifyDate),
                }

                issueList[item.id] = issue;
                issueInfoList.push(issue);
            }
        }
    })
}

const isRoutePushHere = () => {
    if (router.currentRoute.value.query.name) {
        let category = router.currentRoute.value.query.name;
        if (category == '市容') {
            category = '市容秩序';
        } else if (category == '占道') {
            category = '占用城市道路';
        } else if (category == '单车') {
            category = '共享单车';
        }
        categorySelected.value = category;
    }
    getIssueList(1);
}
isRoutePushHere();


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
            for (const item of resp.data.data) {

                banshichu_list.push(item.agency);
                agency_region_relation[item.agency] = item.regions;

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
    getIssueList(1);
}

const get_now_date = () => {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}


// const disabledDate = time => {
//     return time.getTime() > Date.now()
// }

const queryRecord = () => {
    getIssueList(1);
}

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

const checkDetail = row => {
    router.push({ name: 'problem_detail_index', query: { 'problem_id': row.id } })
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

.text-select {
    margin-top: 2vh;
}

:deep(.el-date-editor.el-input__wrapper) {
    flex-grow: 0;
}
</style>