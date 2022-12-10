<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 col-md-3">
                <div class="card person-basic-img">
                    <div class="card-body">
                        <img class="img-responsive" src="@/assets/img/default-person.png" alt="">
                    </div>
                </div>
            </div>
            <div class="col-sm-7 col-md-8">
                <div class="card person-basic-info">
                    <div class="card-header">个人信息</div>
                    <div class="card-body info-box">
                        <el-form :model="detail_info" label-position="right" label-width="6vw" id="info-form"
                            :disabled="true" size="large">
                            <el-form-item label="姓名">
                                <el-input style="cursor: text;" class="info-input" v-model="detail_info.name">
                                </el-input>
                            </el-form-item>

                            <el-form-item label="性别">
                                <el-input v-model="detail_info.sex"></el-input>
                            </el-form-item>

                            <el-form-item label="年龄">
                                <el-input v-model="detail_info.age"></el-input>
                            </el-form-item>

                            <el-form-item label="电话号码">
                                <el-input v-model="detail_info.telephone" />
                            </el-form-item>

                            <el-form-item label="部门">
                                <el-input v-model="detail_info.department" />
                            </el-form-item>

                            <el-form-item label="职务">
                                <el-input v-model="detail_info.title" />
                            </el-form-item>

                            <el-form-item label="执法证编号">
                                <el-input v-model="detail_info.administrationCardId" />
                            </el-form-item>

                        </el-form>
                    </div>
                </div>

                <div class="card person-issue-box">
                    <div class="card-body">
                        <div class="case-box">
                            <div class="case-box-header">
                                <span>巡查交办（累计巡查交办的问题数量）</span>
                                <div class="case-box-header-search">
                                    <el-select v-model="patrol_problem_select_way" class="m-2" placeholder="选择查询方式"
                                        clearable>
                                        <el-option v-for="item in patrol_problem_option" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                    <el-date-picker v-if="patrol_problem_select_way == 'week'"
                                        v-model="patrol_problem_select_value" type="week" format="[Week] ww"
                                        placeholder="请选择某一周" />
                                    <el-date-picker v-if="patrol_problem_select_way == 'month'"
                                        v-model="patrol_problem_select_value" type="month" placeholder="请选择某个月" />
                                    <el-date-picker v-if="patrol_problem_select_way == 'year'"
                                        v-model="patrol_problem_select_value" type="year" placeholder="请选择某一年" />
                                    <el-date-picker v-if="patrol_problem_select_way == 'day'"
                                        v-model="patrol_problem_select_value" type="dates" placeholder="请选择日期" />

                                    <el-button v-if="patrol_problem_select_way != ''" type="primary" :icon="Search"
                                        @click="search_patrol_problem">搜索
                                    </el-button>
                                </div>
                            </div>
                            <div class="case-box-body">
                                <el-input :disabled="true" v-model="detail_info.patrol_problem_num" />
                            </div>
                        </div>

                        <br />
                        <div class="case-box">
                            <div class="case-box-header">
                                <span>执法办案（累计的办案数量）</span>
                                <div class="case-box-header-search">
                                    <el-select v-model="law_enforce_select_way" class="m-2" placeholder="选择查询方式"
                                        clearable>
                                        <el-option v-for="item in patrol_problem_option" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                    <el-date-picker v-if="law_enforce_select_way == 'week'"
                                        v-model="law_enforce_select_value" type="week" format="[Week] ww"
                                        placeholder="请选择某一周" />
                                    <el-date-picker v-if="law_enforce_select_way == 'month'"
                                        v-model="law_enforce_select_value" type="month" placeholder="请选择某个月" />
                                    <el-date-picker v-if="law_enforce_select_way == 'year'"
                                        v-model="law_enforce_select_value" type="year" placeholder="请选择某一年" />
                                    <el-date-picker v-if="law_enforce_select_way == 'day'"
                                        v-model="law_enforce_select_value" type="dates" placeholder="请选择日期" />

                                    <el-button v-if="law_enforce_select_way != ''" type="primary" :icon="Search"
                                        @click="search_law_enforce_handle_case">搜索
                                    </el-button>
                                </div>
                            </div>
                            <div class="case-box-body">
                                <el-input :disabled="true" v-model="detail_info.law_enforcement_case_num" />
                            </div>
                        </div>
                        <br />
                        <div class="case-box">
                            <div class="case-box-header">
                                <span>在岗天数(天)</span>
                            </div>
                            <div class="case-box-body">
                                <el-input :disabled="true" v-model="detail_info.onWork_num" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { reactive, ref } from 'vue'
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';

const store = useStore();
let patrol_problem_select_way = ref('');
let patrol_problem_select_value = ref('');

let law_enforce_select_way = ref('');
let law_enforce_select_value = ref('');
const patrol_problem_option = [
    {
        value: 'day',
        label: '按天查询',
    },
    {
        value: 'week',
        label: '按周查询',
    },
    {
        value: 'month',
        label: '按月查询',
    },
    {
        value: 'year',
        label: '按年查询',
    },
]

let detail_info = reactive({
    name: '',
    sex: '',
    age: '',
    department: '',
    telephone: '',
    title: '',
    administrationCardId: '',
    patrol_problem_num: '',
    law_enforcement_case_num: '',
    onWork_num: '',
})

const getPersonInfo = () => {

    if (router.currentRoute.value.query.patrol) {
        axios({
            url: '/api/patrol/' + router.currentRoute.value.query.patrol,
            method: 'get',
            params: {
                id: router.currentRoute.value.query.patrol
            },
            headers: {
                Authorization: store.state.user.tokenHeader + store.state.user.token,
            },
        }).then(function (response) {
            if (response.status === 200) {
                let patrol = response.data.data;
                detail_info.name = patrol.name;
                detail_info.department = patrol.department;
                detail_info.telephone = patrol.telephone;
                detail_info.title = patrol.title;
                detail_info.sex = '男';
                detail_info.age = '30';
                detail_info.administrationCardId = '123456789';
                detail_info.patrol_problem_num = '60';
                detail_info.law_enforcement_case_num = '70';
                detail_info.onWork_num = '300';
            }
        })
    }
}

const search_patrol_problem = () => {
    if (patrol_problem_select_value.value == '') {
        ElMessage({
            message: '请选择相应日期',
            type: 'error',
        })
    } else {
        ElMessage({
            message: '查询成功',
            type: 'success',
        })
        patrol_problem_select_way.value = '';
    }

}

const search_law_enforce_handle_case = () => {
    if (law_enforce_select_value.value == '') {
        ElMessage({
            message: '请选择相应日期',
            type: 'error',
        })
    } else {
        ElMessage({
            message: '查询成功',
            type: 'success',
        })
        law_enforce_select_value.value = '';
    }
}

getPersonInfo();

</script>


<style scoped>
.container {
    margin-left: 16vw;
}

.person-basic-info {
    margin-top: 8vh;
}

.person-basic-img {
    margin-top: 8vh;
}

.info-box {
    margin-left: 7vw;
    margin-right: 7vw;
}

.case-box {
    margin-left: 7vw;
}

.person-issue-box {
    margin-top: 2vh;
}

.card-header {
    font-size: 1.5rem;
}


.case-box-body {
    margin-top: 1vh;
    width: 20vw;
}

.img-responsive {
    max-width: 100%;
    height: auto;
}

:deep(.el-form-item__label) {
    font-size: 1rem;
}

:deep(.is-disabled .el-input__inner) {
    cursor: text;
}

:deep(.el-input.is-disabled) {
    cursor: text;
}
</style>