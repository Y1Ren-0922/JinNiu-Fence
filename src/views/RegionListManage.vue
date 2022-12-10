<template>

    <div class="container">
        <div class="row">
            <div class="col-9">
                <div class="card select-box">
                    <div class="card-body">
                        <div class="query-input-box">
                            <el-input style="width: 18%" class="select-text-box" v-model="queryName"
                                placeholder="请输入严管街名称" clearable size="large">
                            </el-input>

                            <el-input style="width: 18%" class="select-text-box" v-model="queryAgency"
                                placeholder="请输入部门名称" clearable size="large">
                            </el-input>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <el-table :data="regionList" style="width: 100%; font-size: 1.1rem;" size="large">

                            <el-table-column prop="name" label="名称" width="300" header-align="center" align="center"
                                :show-overflow-tooltip="true" />
                            <el-table-column prop="agency" label="所属办事处" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="createTime" label="生成时间" width="200" header-align="center"
                                align="center" :show-overflow-tooltip="true" />
                            <el-table-column prop="creator" label="操作人" width="120" header-align="center"
                                align="center" />
                            <el-table-column fixed="right" label="操作" width="150" header-align="center" align="center">
                                <template #default="scope">
                                    <el-button link size="small" type="primary" plain text style="font-size:1rem;">
                                        详情
                                    </el-button>

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
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { Location } from '@element-plus/icons-vue';
import router from '@/router'

const store = useStore();
const regionList = reactive([]);
const current_page = ref(1);
const total_records = ref(0);
const queryName = ref('');
const queryAgency = ref('');

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
                item.createTime = switchTime(item.createTime);
                regionList.push(item);
            }
        }
    })
}
getRegionList(1);

const switchTime = time => {
    return time.replace('T', ' ');
}

const regionLocation = row => {
    router.push({ name: 'fench_index', query: { 'region_id': row.id } })
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
</style>