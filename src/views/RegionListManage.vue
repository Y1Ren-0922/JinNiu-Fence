<template>

    <div class="container">
        <div class="row">
            <div class="col-11">
                <div class="card select-box">
                    <div class="card-body">
                        <el-row :gutter="12">
                            <el-col v-for="(item, idx) in banshichu_list" :key="idx" :span="2.5"
                                class="select-state-box">
                                <el-card shadow="always" style="margin-bottom: 1vh;" @click="agencySelect(item)"
                                    :body-style="banshichuSelected == item ? banshichuSelectedStyle : banshichuNoneSelectedStyle">
                                    <span>{{ item }}</span>
                                    <div class="state-number">20</div>
                                </el-card>
                            </el-col>

                        </el-row>

                        <hr>
                        <div class="query-input-box">
                            <el-input style="width: 18%" class="select-text-box" v-model="queryName"
                                placeholder="请输入严管街名称" clearable size="large">
                            </el-input>

                            <!-- <el-input style="width: 18%" class="select-text-box" v-model="queryAgency"
                                placeholder="请输入部门名称" clearable size="large">
                            </el-input> -->
                            <el-button type="primary" :icon="Search" size="large"
                                @click="getRegionListByName">搜索</el-button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <el-table :data="regionList" style="width: 100%; font-size: 1.1rem;" size="large"
                            @cell-dblclick="changeShouldArrive">

                            <el-table-column prop="name" label="名称" width="350" header-align="center" align="center"
                                :show-overflow-tooltip="true" />
                            <el-table-column prop="agency" label="办事处" width="140" header-align="center"
                                align="center" />
                            <el-table-column prop="regionLength" label="街道长度" width="120" header-align="center"
                                align="center" :show-overflow-tooltip="true" />
                            <el-table-column label="定岗人数" width="120" header-align="center" align="center">
                                <template #default="scope">
                                    <el-input ref="shouldArriveInput" @blur="changeFinished"
                                        v-model="scope.row.shouldArrive"
                                        v-if="scope.row.name === rowName && scope.column.label === '应到'" />
                                    <span v-else>{{ scope.row.shouldArrive }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="actualArrive" label="实到人数" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="arriveRate" label="实时到岗率" width="120" header-align="center"
                                align="center" :show-overflow-tooltip="true" />
                            <!-- <el-table-column prop="creator" label="操作人" width="120" header-align="center"
                                align="center" /> -->
                            <el-table-column fixed="right" label="操作" width="150" header-align="center" align="center">
                                <template #default="scope">
                                    <!-- <el-button link size="small" type="primary" plain text style="font-size:1rem;">
                                        详情
                                    </el-button> -->

                                    <el-tooltip class="box-item" effect="dark" content="位置跳转" placement="top"
                                        :show-after="500">
                                        <el-button link size="small" type="primary" plain text
                                            style="font-size: 1.2rem;" @click="regionLocation(scope.row)">
                                            <el-icon style="vertical-align: middle">
                                                <Location />
                                            </el-icon>
                                        </el-button>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="float-end" style="margin-top: 1vh">
                            <el-pagination background layout="total, prev, pager, next, jumper" :total="total_records"
                                :current-page="current_page" @current-change="getRegionList" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { Location, Search } from '@element-plus/icons-vue';
import router from '@/router'

const store = useStore();
const regionList = reactive([]);
const current_page = ref(1);
const total_records = ref(0);
const queryName = ref('');
// const queryAgency = ref('');
const banshichuSelected = ref('全部');

const banshichuNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; ");
const banshichuSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");

const getRegionList = page => {
    axios({
        url: '/api/region/page',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        params: {
            pageNum: page,
            pageSize: 10
        }
    }).then(function (resp) {
        if (resp.status == 200) {
            regionList.splice(0, regionList.length);
            total_records.value = resp.data.data.total;
            current_page.value = page;

            for (const item of resp.data.data.records) {
                item.shouldArrive = 10;
                item.actualArrive = 10;
                item.regionLength = 200;
                item.arriveRate = '90%';
                regionList.push(item);
            }
        }
    })
}
getRegionList(1);

// const switchTime = time => {
//     return time.replace('T', ' ');
// }

const regionLocation = row => {
    router.push({ name: 'fench_index', query: { 'region_id': row.id } })
}

const rowName = ref(-1);
const shouldArriveInput = ref(null);
const changeShouldArrive = (row, column) => {
    if (column.label == '应到') {
        rowName.value = row.name;
        nextTick(() => {
            shouldArriveInput.value.focus();
        })
    }
}
const changeFinished = () => {
    rowName.value = -1;
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

const record_agency = ref('');
const agencySelect = agency => {
    banshichuSelected.value = agency;
    if (agency == '全部') {
        record_agency.value = '';

    } else {
        record_agency.value = agency;
    }

}

const getRegionListByAgency = agency => {
    if (agency == '全部') {
        agency = '';
    }

    axios({
        url: '/api/region/select/by_agency',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            agency: agency
        })
    }).then(function (resp) {
        console.log(resp);
    })
}
getRegionListByAgency('抚琴');

const getRegionListByName = () => {
    if (queryName.value == '') {
        getRegionList(1);
    } else {
        axios({
            url: '/api/region/select/by_name',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: store.state.user.tokenHeader + store.state.user.token,
            },
            data: JSON.stringify({
                name: queryName.value
            })
        }).then(function (resp) {
            if (resp.status == 200) {
                queryName.value = '';
                regionList.splice(0, regionList.length);
                total_records.value = resp.data.data.length;
                current_page.value = 1;

                for (const item of resp.data.data) {
                    item.shouldArrive = 10;
                    item.actualArrive = 10;
                    item.regionLength = 200;
                    item.arriveRate = '90%';
                    regionList.push(item);
                }
            }
        })
    }

}

</script>

<style scoped>
.container {
    margin-left: 20vw;
}

.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.query-input-box {
    display: flex;
}


.select-text-box {
    margin-right: 1vw;
}

.select-state-box {
    cursor: pointer;
}
</style>