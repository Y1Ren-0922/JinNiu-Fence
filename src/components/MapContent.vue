<template>


    <div class="content-l">
        <div class="content-l-top">
            <div class="container">
                <!-- <div class="card text-white bg-primary mb-3 " style="max-width: 18rem; min-width: 18vw;"
                    @click="lawEnforceOfficers">
                    <div class="card-header">执法人员实时情况</div>
                    <div class="card-body">
                        <div>在编：1人</div>
                        <div>抽调：1人</div>
                        <p></p>
                        <div>补休：1人</div>
                        <div>在岗在位：1人</div>
                        <div>未按时打卡人员：1人</div>
                    </div>
                </div> -->
                <border-box-7 style="height: 27vh; margin-bottom: 2vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="law-enforce-officers" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>



                <!-- <div class="card text-dark bg-info mb-3 " style="max-width: 18rem; min-width: 18vw;"
                    @click="wardenOfficers">
                    <div class="card-header">协管人员实时情况(含服务外包人员)</div>
                    <div class="card-body">
                        <div>在编：1人</div>
                        <div>抽调：1人</div>
                        <p></p>
                        <div>补休：1人</div>
                        <div>在岗在位：1人</div>
                        <div>未按时打卡人员：1人</div>
                    </div>

                </div> -->
                <border-box-7 style="height: 27vh; margin-bottom: 2vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="warden-officers" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>

                <!-- <div class="card text-white bg-success mb-3 " style="max-width: 18rem; min-width: 18vw;">
                    <div class="card-header">共享单车人员</div>
                    <div class="card-body">
                        <div>美团</div>
                        <div>应到：10人, 实到：5人</div>
                        <br>
                        <div>青桔</div>
                        <div>应到：10人, 实到：5人</div>
                        <br>
                        <div>哈罗</div>
                        <div>应到：10人, 实到：5人</div>
                    </div>


                </div> -->
                <border-box-7 style="height: 30vh; margin-bottom: 1vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="bicycle-data" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>

            </div>
        </div>
    </div>
    <div class="content-mid">

        <div class="card text-white bg-primary mb-3 person-box " v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">编制总数</h5>
                <DigitalFlop :config="memberNumber" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box " v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">抽调</h5>
                <DigitalFlop :config="deployed" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box" v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">补休</h5>
                <DigitalFlop :config="digitConfig" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box" v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">请假</h5>
                <DigitalFlop :config="excused" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box" v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">在岗在位</h5>
                <DigitalFlop :config="situ" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box" v-if="$route.path == '/map/'">
            <div class="card-body">
                <h5 class="card-title">定位异常</h5>
                <DigitalFlop :config="positionException" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 bicycle-box" v-if="$route.path == '/bicycle-map/'">
            <div class="card-body">
                <h5 class="card-title">美团</h5>
                <DigitalFlop :config="meituanConfig" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 bicycle-box" v-if="$route.path == '/bicycle-map/'">
            <div class="card-body">
                <h5 class="card-title">哈罗</h5>
                <DigitalFlop :config="haluoConfig" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 bicycle-box" v-if="$route.path == '/bicycle-map/'">
            <div class="card-body">
                <h5 class="card-title">青桔</h5>
                <DigitalFlop :config="qingjuConfig" />
            </div>
        </div>


    </div>
    <div class="content-mid-bottom">
        <div id="case-data" style="height: 27vh; width: 56vw;"></div>
    </div>
    <div class="content-r">
        <div class="container">
            <!-- <div class="card text-white bg-primary mb-3 " style="max-width: 18rem; margin-left: auto;">
                <div class="card-header">综合执法指令发布
                    <el-badge :value="12" class="item float-end">
                        <button type="button" class="btn btn-outline-warning float-end"
                            @click="issueDirective">指令发布</button>
                    </el-badge>

                </div>
                <div class="card-body">
                    <div style="color: red">中队长/副队长</div>
                    <div>已查收7 未查收6 查收率90%</div>
                    <div style="color: red">执法人员</div>
                    <div>已查收7 未查收6 查收率90%</div>
                    <div style="color: red">协管人员</div>
                    <div>已查收7 未查收6 查收率90%</div>
                </div>
            </div>



            <div class="card text-dark bg-light mb-3 " style="max-width: 18rem;margin-left: auto;">
                <div class="card-header">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="park-tab" data-bs-toggle="tab" data-bs-target="#park"
                                type="button" role="tab" aria-controls="park" aria-selected="true"
                                @click="parkClick">公园办人员</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="bicycle-tab" data-bs-toggle="tab" data-bs-target="#bicycle"
                                type="button" role="tab" aria-controls="bicycle" aria-selected="false"
                                @click="bicycleClick">共享单车人员</button>
                        </li>
                    </ul>
                </div>
                <div class="card-body">

                    <div class="tab-pane fade show active" id="park" role="tabpanel" aria-labelledby="park-tab"
                        v-if="isShowParkSituation == true">
                        <div>在编：1人</div>
                        <div>补休：1人</div>
                        <div>请假：1人</div>
                        <div>越线人员：1人</div>
                    </div>
                    <div class="tab-pane fade show" id="bicycle" role="tabpanel" aria-labelledby="bicycle-tab" v-else>
                        <div>美团：1人</div>
                        <div>青桔：1人</div>
                        <div>哈罗：1人</div>
                    </div>

                </div>
            </div> -->

            <!-- <div class="card text-white bg-secondary mb-3 " style="max-width: 18rem;margin-left: auto;"
                v-if="$route.path == '/bicycle-map/'">
                <div class="card-header">共享单车运维人员调度
                </div>
                <div class="card-body">
                    <div>美团：1人</div>
                    <div>青桔：1人</div>
                    <div>哈罗：1人</div>
                </div>
            </div> -->
            <div class="leave-map">
                <router-link :to="{ name: 'person_index' }"><img src="../assets/img/leave.png" alt=""></router-link>
            </div>
            <div class="card text-white bg-primary mb-3 ">
                <div class="card-header">市容秩序严管街</div>
                <div class="card-body">
                    <div>严管街</div>
                    <div>数量: 77条 人数: 243人</div>
                    <div>人员达标 数量：1条</div>
                    <div>人员不达标 数量：1条</div>
                    <p></p>
                    <!-- <ScrollBoard :config="problemCount" style="width:20vw;height: 25vh;" @click="scrollBoardClick" /> -->
                    <div>不达标路段报警提示：</div>
                    <div>xx街道xx路：应到10人，实到10人</div>
                    <div>xx街道xx路：应到10人，实到10人</div>
                    <div>xx街道xx路：应到10人，实到10人</div>
                </div>

            </div>
            <border-box-7 style="height: 27vh; margin-bottom: 1vh;">
                <div>
                    <div class="problem-title">事件办理</div>
                    <capsule-chart :config="problemConfig" style="height: 25vh;" />
                </div>
            </border-box-7>

            <div class="card text-white bg-primary mb-3 " style="max-width: 18rem; margin-left: auto; min-width: 22vw;">
                <div class="card-header">综合执法指令发布
                    <el-badge :value="12" class="item float-end">
                        <button type="button" class="btn btn-outline-warning float-end"
                            @click="issueDirective">指令发布</button>
                    </el-badge>

                </div>
                <div class="card-body">
                    <div style="color: red">中队长/副队长</div>
                    <div>已查收7 未查收6 查收率90%</div>
                    <div style="color: red">执法人员</div>
                    <div>已查收7 未查收6 查收率90%</div>
                    <div style="color: red">协管人员</div>
                    <div>已查收7 未查收6 查收率90%</div>
                </div>
            </div>

        </div>

    </div>

    <el-dialog v-model="lawEnforceOfficerVisiable" :title="personnelDetailsTitle" :center="isPersonnelCenter"
        width="60%">
        <el-table :data="peopleData" @cell-dblclick="streetDetails" class="dialog-table">
            <el-table-column property="street" label="街道" width="200" header-align="center" align="center" />
            <el-table-column property="regularPayroll" label="在编" header-align="center" align="center" />
            <el-table-column property="transfer" label="抽调" header-align="center" align="center" />
            <el-table-column property="deferHoliday" label="补休" header-align="center" align="center" />
            <el-table-column property="onHoliday" label="请假" header-align="center" align="center" />
            <el-table-column property="onWork" width="130" label="在岗在位" header-align="center" align="center" />
            <el-table-column property="notOnTime" label="未按时打卡" width="130" header-align="center" align="center" />
            <el-table-column property="onWorkRate" label="在岗在位率" header-align="center" align="center" />
        </el-table>
    </el-dialog>

    <el-dialog v-model="streetDetailInfoVisiable" :title="streetDetailsTitle" :center="isStreetCenter" width="30%">
        <el-table :data="streetDetailData" @cell-dblclick="streetDetails" class="dialog-table">
            <el-table-column property="id" label="序号" header-align="center" align="center" />
            <el-table-column property="name" label="姓名" header-align="center" align="center" />
            <el-table-column property="telephone" label="电话" header-align="center" align="center" />
        </el-table>
    </el-dialog>

    <el-dialog v-model="derectiveIssueVisiable" :center="isStreetCenter" width="50%">
        <el-tabs v-model="derectiveSelect" class="demo-tabs">
            <el-tab-pane label="指令发布" name="first">
                <div>
                    <div class="dialog-title-content">指令输入</div>
                    <el-input v-model="derectiveInfo" autosize type="textarea" placeholder="请输入指令" />
                </div>

                <div style="margin-top: 5vh;">
                    <div class="dialog-title-content">选择接收人员</div>
                    <hr>
                    <div>
                        <div class="check-title">按街道选择</div>
                        <el-checkbox v-model="streetCheckAll" :indeterminate="isStreetIndeterminate"
                            @change="handleCheckStreetAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="streetCheckList" @change="handleStreetChange">
                            <!-- <el-checkbox label="街道1" />
                            <el-checkbox label="街道2" />
                            <el-checkbox label="街道3" /> -->
                            <el-checkbox v-for="(agency, idx) in agencyList" :key="idx" :label="agency" />
                        </el-checkbox-group>
                    </div>

                    <div>
                        <div class="check-title">按人员类型选择</div>
                        <el-checkbox v-model="peopleCheckAll" :indeterminate="isPeopleIndeterminate"
                            @change="handleCheckPeopleAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="peopleCheckList" @change="handlePeopleChange">
                            <el-checkbox label="执法人员" />
                            <el-checkbox label="协管人员" />

                        </el-checkbox-group>
                    </div>

                </div>

                <div style="margin-top: 5vh; margin-bottom: 5vh;">
                    <button type="button" class="btn btn-outline-primary float-end" @click="sendDerective">发布</button>
                </div>

                <div style="width: 100%; height: 5vh;"></div>
            </el-tab-pane>
            <el-tab-pane label="确认消息" name="second">
                <el-button type="danger" plain>删除全部消息</el-button>
                <hr>
                <el-scrollbar max-height="450px">
                    <div v-for="(backMessage, idx) in getBackMessage.data" :key="idx" @mouseenter="is_read(idx)">
                        <div v-if="backMessage.isRead == false" class="is-read-word">[未读]</div>
                        <div v-if="backMessage.isRead == true">[已读]</div>
                        <el-descriptions>
                            <el-descriptions-item label="姓名">{{ backMessage.name }}</el-descriptions-item>
                            <el-descriptions-item label="电话号码">{{ backMessage.telephone }}</el-descriptions-item>
                            <el-descriptions-item>
                                <el-button type="danger" :icon="Delete" circle />
                            </el-descriptions-item>

                            <el-descriptions-item label="消息" :span="3" class-name="read-message"
                                style="font-weight:900;">{{
                                        backMessage.message
                                }}</el-descriptions-item>

                            <el-descriptions-item label="回复时间">{{ backMessage.backTime }}</el-descriptions-item>
                        </el-descriptions>
                        <hr>
                    </div>
                </el-scrollbar>


            </el-tab-pane>
        </el-tabs>

    </el-dialog>

    <el-dialog v-model="streetsClockInfoVisiable" :title="streetsClockInfoTitle" :center="isPersonnelCenter"
        width="40%">
        <el-table :data="streetClockData" class="dialog-table">
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <div class="check-title">当月累计3次不按时打卡人员</div>
                        <el-table :data="props.row.people">
                            <el-table-column label="姓名" prop="name" header-align="center" align="center" />
                            <el-table-column label="电话" prop="telephone" header-align="center" align="center" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="id" label="序号" header-align="center" align="center" />
            <el-table-column property="street" label="街道" header-align="center" align="center" />
            <el-table-column property="onWorkCheckRate" label="按时打卡率" header-align="center" align="center" />
            <el-table-column property="threeTimesDelayCheckNum" label="当月累计3次不按时打卡人员数量" header-align="center"
                align="center" />
        </el-table>
    </el-dialog>

    <el-dialog v-model="locationExceptionInfoVisiable" :title="locationExceptionInfoTitle" :center="isPersonnelCenter"
        width="40%">
        <el-table :data="locationExceptionData" class="dialog-table">
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <div class="check-title">定位异常人员</div>
                        <el-table :data="props.row.people">
                            <el-table-column label="姓名" prop="name" header-align="center" align="center" />
                            <el-table-column label="电话" prop="telephone" header-align="center" align="center" />
                            <el-table-column prop="exceptionTime" label="异常时段" header-align="center" align="center" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="id" label="序号" header-align="center" align="center" />
            <el-table-column property="street" label="街道" header-align="center" align="center" />
            <el-table-column property="locationExceptionNum" label="人数" header-align="center" align="center" />

        </el-table>
    </el-dialog>

</template>


<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';
import { DigitalFlop, CapsuleChart, BorderBox7 } from '@kjgl77/datav-vue3'
import { useStore } from 'vuex';
import {
    Delete,
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
// import router from '@/router';
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const store = useStore();
let derectiveSelect = ref("first");
let problemConfig = reactive({
    data: [
        {
            name: '市容',
            value: 167
        },
        {
            name: '单车',
            value: 123
        },
        {
            name: '扬尘',
            value: 98
        },
        {
            name: '违建',
            value: 75
        },
        {
            name: '占道',
            value: 66
        },
    ],

    unit: '件',
    showValue: true
})

// let config = reactive({
//     header: ['街道', '应到', '实到'],
//     headerHeight: 25,
//     data: [
//         ['抚琴', '1', '1'],
//         ['西华', '1', '1'],
//         ['街道1', '1', '1'],
//         ['街道2', '1', '1'],
//         ['街道3', '1', '1'],
//         ['街道4', '1', '1'],
//         ['街道5', '1', '1'],
//         ['街道6', '1', '1'],
//         ['街道7', '1', '1'],
//         ['街道8', '1', '1'],
//     ],
//     align: ['center'],
//     rowNum: 3,
//     columnWidth: [140, 60, 60],
//     headerBGC: '#006400',
//     oddRowBGC: '#3CB371',
//     evenRowBGC: '#8FBC8F',
// });

// let problemCount = reactive({
//     header: ['街道', '打卡问题', '严管街道到位问题', '定位异常', '信息接收'],
//     data: [
//         ['抚琴', '1', '1', '问题', '问题'],
//         ['西华', '1', '1', '问题', '问题'],
//         ['街道1', '1', '1', '问题', '问题'],
//         ['街道2', '1', '1', '问题', '问题'],
//         ['街道3', '1', '1', '问题', '问题'],
//         ['街道4', '1', '1', '问题', '问题'],
//         ['街道5', '1', '1', '问题', '问题'],
//         ['街道6', '1', '1', '问题', '问题'],
//         ['街道7', '1', '1', '问题', '问题'],
//         ['街道8', '1', '1', '问题', '问题'],
//     ],
//     align: ['center'],
//     headerBGC: '#006400',
//     oddRowBGC: '#3CB371',
//     evenRowBGC: '#8FBC8F',
// })

// const tableHeader = ({ column }) => {
//     console.log(column);
//     column.minWith
// }


let peopleData = reactive([{
    street: "抚琴",
    regularPayroll: 100,
    transfer: 5,
    deferHoliday: 10,
    onHoliday: 3,
    onWork: 80,
    notOnTime: 6,
    onWorkRate: '80%'
}])

let streetDetailData = reactive([
    {
        id: 1,
        name: "张三",
        telephone: "12345678912",
    }
])

let streetClockData = reactive([
    {
        id: 1,
        street: "抚琴",
        onWorkCheckRate: "95%",
        threeTimesDelayCheckNum: 2,
        people: [
            {
                name: "李四",
                telephone: "12345678998",
            }
        ],
    },
    {
        id: 2,
        street: "九里堤",
        onWorkCheckRate: "95%",
        threeTimesDelayCheckNum: 2,
        people: [
            {
                name: "王五",
                telephone: "12345678998",
            }
        ],
    }

])

let locationExceptionData = reactive([
    {
        id: 1,
        street: "抚琴",
        locationExceptionNum: 1,
        people: [
            {
                name: "测试员1",
                telephone: "12345678998",
                exceptionTime: "14:20-14:50"
            }
        ]
    },
    {
        id: 2,
        street: "茶店子",
        locationExceptionNum: 2,
        people: [
            {
                name: "测试员1",
                telephone: "12345678998",
                exceptionTime: "14:20-14:50"
            },
            {
                name: "测试员2",
                telephone: "12345678998",
                exceptionTime: "14:20-14:50"
            }
        ]
    }
])

let digitConfig = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
    }
});

let memberNumber = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#5CA1D8',
    }
});

let deployed = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#708090',
    }
});

let excused = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#E1B95A',
    }
});

let situ = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#97C151',
    }
});

let positionException = reactive({
    number: [1000],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#E95547',
    }
})

let meituanConfig = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#E1B95A',
    }
})

let haluoConfig = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
        fill: '#5CA1D8',
    }
})

let qingjuConfig = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 32,
    }
})

let lawEnforceOfficerVisiable = ref(false);
let personnelDetailsTitle = ref("");
let isPersonnelCenter = ref(true);
let streetDetailInfoVisiable = ref(false);
let streetDetailsTitle = ref("");
let isStreetCenter = ref(true);
let derectiveIssueVisiable = ref(false);
let derectiveInfo = ref("");
let streetCheckList = ref([]);
let streetCheckAll = ref(false);
let isStreetIndeterminate = ref(true);
let peopleCheckList = ref([]);
let peopleCheckAll = ref(false);
let isPeopleIndeterminate = ref(true);
let peoples = ["执法人员", "协管人员"];
let streetsClockInfoVisiable = ref(false);
let streetsClockInfoTitle = ref("");
let locationExceptionInfoVisiable = ref(false);
let locationExceptionInfoTitle = ref("");

let socket = null;
let getBackMessage = reactive({
    data: [
        {
            name: "张三",
            telephone: "12345678912",
            message: "已确认收到",
            backTime: "2022-11-06 08:43",
            isRead: false,
        },
        {
            name: "李四",
            telephone: "12345678912",
            message: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
            backTime: "2022-11-06 08:43",
            isRead: false,
        },
    ]
})

const websocketConnect = () => {
    if (store.state.user.socket == null) {
        const socketUrl = `ws://101.37.246.72:9090/websocket/admin${store.state.user.telephone}`;
        console.log(socketUrl);
        socket = new WebSocket(socketUrl);
        socket.onopen = () => {
            console.log("websocket connected!");
            store.commit("updateSocket", socket);
        }

        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            let li = getBackMessage.data

            if (data instanceof Array) {

                for (let i = 0; i <= data.length - 1; i++) {
                    if (data[i].message != "Heartbeat") {
                        let newBackMessage = {
                            id: data[i].id,
                            name: data[i].patrolTelephone,
                            telephone: data[i].patrolTelephone,
                            message: data[i].message,
                            backTime: parseTime(data[i].createTime),
                            isRead: data[i].isRead,
                        }
                        li.unshift(newBackMessage)
                    }

                }

            } else if (data instanceof Object) {
                let newBackMessage = {
                    id: data.id,
                    name: data.patrolTelephone,
                    telephone: data.patrolTelephone,
                    message: data.message,
                    backTime: parseTime(data.createTime),
                    isRead: data.isRead,
                }
                li.unshift(newBackMessage)
            }

            getBackMessage.data = li
        }

        socket.onclose = () => {
            console.log("websocket disconnected!");
            store.commit("updateSocket", null);
        }

        // socket.onerror = () => {
        //     ElMessage({
        //         message: '连接出错请重试！',
        //         type: 'error',
        //     })
        // }
    }
}

websocketConnect();
window.onbeforeunload = function () {
    socket.close();
}

// const reConnect = () => {
//     if (isConnect) return
//     setTimeout(function () {
//         websocketConnect();
//     }, 3000);
// }

// const heartcheck = {
//     timeout: 20000,

//     timeoutObj: null,

//     resetHeartBeat: function () {
//         clearTimeout(this.timeoutObj);
//         this.startHeartBeat();
//     },

//     startHeartBeat: function () {

//         this.timeoutObj = setTimeout(function () {
//             if (isConnect) {
//                 socket.send({
//                     type: "heartbeat",
//                     identity: [],
//                     regions: [],
//                     message: "",
//                 });
//                 console.log("heartbeat");
//             }
//         }, this.timeout);
//     },
// }

const parseTime = time => {
    return time.replace("T", " ");
}

// const lawEnforceOfficers = () => {
//     router.push({ name: 'person_index' });
//     // personnelDetailsTitle.value = "执法人员实时情况";
//     // lawEnforceOfficerVisiable.value = true;
// }

// const wardenOfficers = () => {
//     router.push({ name: 'person_index' });
//     // personnelDetailsTitle.value = "协管人员实时情况";
//     // lawEnforceOfficerVisiable.value = true;
// }

const streetDetails = (row, column) => {
    if (column.label != "街道" && column.label != "在岗在位率") {
        streetDetailsTitle.value = row.street + "街道" + column.label + "人员明细表";
        streetDetailInfoVisiable.value = true;
    } else if (column.label == "街道") {
        streetsClockInfoVisiable.value = true;
        streetsClockInfoTitle.value = "各街道" + personnelDetailsTitle.value.substring(0, 2) + "人员打卡情况统计表";
    }
}

const handleCheckStreetAllChange = (val) => {
    streetCheckList.value = val ? agencyList : [];
    isStreetIndeterminate.value = false;
}

const handleStreetChange = (val) => {
    const checkedCount = val.length;
    streetCheckAll.value = checkedCount == agencyList.length;
    isStreetIndeterminate.value = checkedCount > 0 && checkedCount < agencyList.length;
}

const handleCheckPeopleAllChange = (val) => {
    peopleCheckList.value = val ? peoples : [];
    isPeopleIndeterminate.value = false;
}

const handlePeopleChange = (val) => {
    const checkedCount = val.length;
    peopleCheckAll.value = checkedCount == peoples.length;
    isPeopleIndeterminate.value = checkedCount > 0 && checkedCount < peoples.length;
}

const issueDirective = () => {
    derectiveIssueVisiable.value = true;
    if (socket == null) {
        websocketConnect();
    }
}

// const scrollBoardClick = (data) => {
//     if (data.columnIndex === 3) {
//         locationExceptionInfoVisiable.value = true;
//         locationExceptionInfoTitle.value = "当日人员定位异常统计表（当日出现连续30分钟定位未发生移动）";
//     }
// }


const sendDerective = () => {
    // console.log(streetCheckList.value)
    // console.log(Object.keys(streetCheckList.value))
    // console.log(peopleCheckList.value)
    // const socket = store.state.user.socket;
    // if (derectiveInfo.value != "" || derectiveInfo.value != null) {
    //     socket.send(JSON.stringify({
    //         patrolTelephone: "12345678912",
    //         message: derectiveInfo.value,
    //     }))
    //     ElMessage({
    //         message: '指令已发布！',
    //         type: 'success',
    //     })
    //     derectiveInfo.value = "";
    // }

    const socket = store.state.user.socket;
    if (derectiveInfo.value != "") {

        socket.send(JSON.stringify({
            type: "group",
            patrolTelephone: "",
            identity: Object.values(peopleCheckList.value),
            regions: Object.values(streetCheckList.value),
            message: derectiveInfo.value,
        }))
        ElMessage({
            message: '指令已发布！',
            type: 'success',
        })
        derectiveInfo.value = "";

    } else if (derectiveInfo.value == "") {
        ElMessage({
            message: "指令为空",
            type: 'warning'
        })
    }

    Object.keys(peopleCheckList.value).map(key => {
        delete peopleCheckList.value[key]
    });
    Object.keys(streetCheckList.value).map(key => {
        delete streetCheckList.value[key]
    });

}

// let isShowParkSituation = ref(true)
// const parkClick = () => {
//     isShowParkSituation.value = true;
// }

// const bicycleClick = () => {
//     isShowParkSituation.value = false;
// }

const is_read = idx => {
    getBackMessage.data[idx].isRead = true
    axios({
        url: "/api/stranded-msg/update_read/" + getBackMessage.data[idx].id,
        method: "get",
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        params: {
            id: getBackMessage.data[idx].id
        }
    })
}

let agencyList = ["抚琴", "西安路", "荷花池", "驷马桥", "凤凰山", "天回", "五块石", "西华", "营门口", "茶店子", "金泉", "沙河源", "九里堤"]

// const getPolygonList = () => {
//     axios({
//                 url: "/api/region",
//                 method: "get",
//                 headers: {
//                     Authorization: store.state.user.tokenHeader + store.state.user.token,
//                 }
//             }).then(function (resp) {

//                 for (const item of resp.data.data) {
//                     polygonInfo[item.id] = {
//                         id: item.id,
//                         name: item.name,
//                         agency: item.agency,
//                     }
//                 }

//             })
// }
let law_enforce_chart = null;

const create_law_enforce_data = () => {
    let chartDom = document.getElementById("law-enforce-officers");
    law_enforce_chart = echarts.init(chartDom);
    let option = {
        title: {
            text: '执法人员实时监管',
            left: 'center',
            textStyle: {
                color: 'white',
            }
        },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '在岗在位' },
                    { value: 735, name: '请假' },
                    { value: 580, name: '补休' },
                    { value: 484, name: '抽调' },
                ],
                label: {
                    color: "white",
                    formatter: '{b}: {c}'
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

    option && law_enforce_chart.setOption(option);
    window.addEventListener("resize", law_enforce_chart.resize);
}

let warden_chart = null;
const create_warden_data = () => {
    let chartDom = document.getElementById("warden-officers");
    warden_chart = echarts.init(chartDom);
    let option = {
        title: {
            text: '协管人员实时监管',
            left: 'center',
            textStyle: {
                color: 'white',
            }
        },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '在岗在位' },
                    { value: 735, name: '请假' },
                    { value: 580, name: '补休' },
                    { value: 484, name: '抽调' },
                ],
                label: {
                    color: "white",
                    formatter: '{b}: {c}'
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

    option && warden_chart.setOption(option);
    window.addEventListener("resize", warden_chart.resize);
}

let bicycle_chart = null;
const show_bicycle_data = () => {

    var chartDom = document.getElementById('bicycle-data');
    bicycle_chart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '共享单车运维实时监管',
            left: 'center',
            textStyle: {
                color: 'white',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            top: '10%',
            textStyle: {
                color: 'white',
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 1)"
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['美团', '青桔', '哈罗'],
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 1)"
                }
            }
        },
        series: [
            {
                name: '应到',
                type: 'bar',
                data: [100, 90, 80],
                label: {
                    show: true,
                }
            },
            {
                name: '实到',
                type: 'bar',
                data: [70, 40, 50],
                label: {
                    show: true
                }
            }
        ]
    };

    option && bicycle_chart.setOption(option);
    window.addEventListener("resize", bicycle_chart.resize);
}

let case_chart = null;
const create_case_data = () => {
    var chartDom = document.getElementById('case-data');
    case_chart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '执法案件办理',
            left: 'center',
            textStyle: {
                color: 'white',
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['案件数量', '罚款'],
            top: '10%',
            textStyle: {
                color: 'white',
            }
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },

        xAxis: [
            {
                type: 'category',
                // prettier-ignore
                data: ['大队', '抚琴', '西安路', '驷马桥', '茶店子', '凤凰山', '天回镇', '营门口', '五块石', '金泉', '西华', '九里堤', '沙河源', '荷花池'],
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: "件数",
                position: 'left',
                alignTicks: true,
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                    }
                }
            },
            {
                type: 'value',
                name: "金额",
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                    }
                }
            }
        ],
        series: [
            {
                name: '案件数量',
                type: 'bar',
                data: [
                    231, 24, 19, 35, 26, 10, 32, 35, 26, 27, 36, 11, 14, 19
                ],
                alignTicks: true,
                label: {
                    show: true
                }
                // markPoint: {
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' }
                //     ]
                // },
                // markLine: {
                //     data: [{ type: 'average', name: 'Avg' }]
                // }
            },
            {
                name: '罚款',
                type: 'bar',
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.3, 1.6
                ],
                yAxisIndex: 1,
                label: {
                    show: true,
                    color: 'white',
                }
                // markPoint: {
                //     data: [
                //         { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                //         { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                //     ]
                // },
                // markLine: {
                //     data: [{ type: 'average', name: 'Avg' }]
                // }
            }
        ]
    };

    option && case_chart.setOption(option);
    window.addEventListener("resize", case_chart.resize);
}

onMounted(() => {
    create_law_enforce_data();
    show_bicycle_data();
    create_warden_data();
    create_case_data();
})

onBeforeUnmount(() => {
    if (law_enforce_chart) {
        law_enforce_chart.dispose();
        law_enforce_chart = null;
    }

    if (warden_chart) {
        warden_chart.dispose();
        warden_chart = null;
    }

    if (bicycle_chart) {
        bicycle_chart.dispose();
        bicycle_chart = null;
    }

    if (case_chart) {
        case_chart.dispose();
        case_chart = null;
    }
})



</script>

<style scoped>
/* .content {
    position: absolute;
    top: 7vh;

    display: flex;
    z-index: 20;
} */
.is-read-word {
    color: #FFC125;
}

.problem-title {
    color: white;
    text-align: center;
}

.label-head {
    max-width: 20px;
}

.check-title {
    font-size: 15px;
    font-weight: 600;

    margin-bottom: 1vh;
}

.dialog-title-content {
    font-size: 18px;
    font-weight: 1000;
    color: "#303133";
    margin-bottom: 1vh;

}

.dialog-table {
    cursor: pointer;
    user-select: none;
}

.card {
    cursor: pointer;
}

.card-header {
    font-size: 1rem;
}

.card-body {
    font-size: 1rem;
}

.content-l {
    left: 0;
    width: 20vw;
    /* background-color: rgba(0, 11, 61, 0.2); */
    padding: 3vh;
    display: flex;
    flex-direction: column;
    height: 93vh;
    position: absolute;
    top: 3vh;
    z-index: 20;
    user-select: none;
}

.content-l-top {
    height: 50px;

}

.content-mid {
    left: 20vw;
    width: 56vw;
    height: 30vh;
    padding: 1vh;
    padding-left: 5vw;
    /* background-color: rgba(0, 11, 61, 0.2); */
    position: absolute;
    top: 8vh;
    z-index: 20;
    display: flex;
    flex-flow: wrap;
    user-select: none;
}

.content-mid-bottom {
    left: 22vw;
    bottom: 2vh;
    height: 25vh;
    width: 56vw;
    position: absolute;
    z-index: 20;
}

.case-data {
    width: 50vw;
    height: 25vh;
}

.content-r {
    right: 0;
    width: 25vw;
    /* background-color: rgba(0, 11, 61, 0.2); */
    padding-left: 3vh;
    padding-top: 2vh;
    padding-bottom: 0vh;
    padding-right: 1vh;
    display: flex;
    flex-direction: column;
    height: 93vh;
    position: absolute;
    top: 0vh;
    z-index: 20;
    user-select: none;
}

.leave-map {
    margin-bottom: 1vh;
    padding-left: 15vw;
}

.person-box {
    margin-right: 0.6vw;
    width: 7.8vw;
    height: 12vh;
    --bs-bg-opacity: .6;
    font-size: 10px;
}

.bicycle-box {
    margin-left: 4vw;
    margin-right: 3vw;
    margin-top: 3vh;
    width: 8vw;
    height: 12vh;
    --bs-bg-opacity: .2;
}

.person-title {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-right: 30px;
    text-align: center;
}

.el-table {
    background-color: grey;
}

.person-number {
    font-size: 30px;
    text-align: center;
}
</style>