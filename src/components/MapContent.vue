<template>


    <div class="content-l">
        <div class="content-l-top">
            <div class="container">
                <div class="card text-white bg-primary mb-3 " style="max-width: 18rem;" @click="lawEnforceOfficers">
                    <div class="card-header">执法人员实时情况</div>
                    <div class="card-body">
                        <div>在编：1人</div>
                        <div>抽调：1人</div>
                        <p></p>
                        <div>补休：1人</div>
                        <div>在岗在位：1人</div>
                        <div>未按时打卡人员：1人</div>
                    </div>
                </div>

                <div class="card text-dark bg-info mb-3 " style="max-width: 18rem;" @click="wardenOfficers">
                    <div class="card-header">协管人员实时情况(含服务外包人员)</div>
                    <div class="card-body">
                        <div>在编：1人</div>
                        <div>抽调：1人</div>
                        <p></p>
                        <div>补休：1人</div>
                        <div>在岗在位：1人</div>
                        <div>未按时打卡人员：1人</div>
                    </div>

                </div>

                <div class="card text-white bg-success mb-3 " style="max-width: 18rem;">
                    <div class="card-header">市容严管街人员情况</div>
                    <div class="card-body">
                        <div>严管街 数量：1条</div>
                        <div>人员达标 数量：1条</div>
                        <div>人员不达标 数量：1条</div>
                        <p></p>
                        <div>人员不达标路段报警提醒</div>
                        <ScrollBoard :config="config" style="width:14vw;height: 13vh;" />

                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="content-mid">

        <div class="card text-white bg-primary mb-3 person-box ">
            <div class="card-body">
                <h5 class="card-title">队员编制总数</h5>
                <DigitalFlop :config="memberNumber" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box ">
            <div class="card-body">
                <h5 class="card-title">抽调</h5>
                <DigitalFlop :config="deployed" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box">
            <div class="card-body">
                <h5 class="card-title">补休</h5>
                <DigitalFlop :config="digitConfig" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box">
            <div class="card-body">
                <h5 class="card-title">请假</h5>
                <DigitalFlop :config="excused" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box">
            <div class="card-body">
                <h5 class="card-title">在岗在位</h5>
                <DigitalFlop :config="situ" />
            </div>
        </div>

        <div class="card text-white bg-primary mb-3 person-box">
            <div class="card-body">
                <h5 class="card-title">定位异常</h5>
                <DigitalFlop :config="positionException" />
            </div>
        </div>
    </div>
    <div class="content-r">
        <div class="container">
            <div class="card text-white bg-primary mb-3 " style="max-width: 18rem; margin-left: auto;">
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
            </div>

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

            <div class="card text-white bg-success mb-3 ">
                <div class="card-header">市容严管街人员情况</div>
                <div class="card-body">

                    <ScrollBoard :config="problemCount" style="width:20vw;height: 25vh;" @click="scrollBoardClick" />

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
import { reactive, ref } from 'vue';
import { ScrollBoard, DigitalFlop } from '@kjgl77/datav-vue3'
import { useStore } from 'vuex';
import {
    Delete,
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';

const store = useStore();
let derectiveSelect = ref("first");

let config = reactive({
    header: ['街道', '应到', '实到'],
    headerHeight: 25,
    data: [
        ['抚琴', '1', '1'],
        ['西华', '1', '1'],
        ['街道1', '1', '1'],
        ['街道2', '1', '1'],
        ['街道3', '1', '1'],
        ['街道4', '1', '1'],
        ['街道5', '1', '1'],
        ['街道6', '1', '1'],
        ['街道7', '1', '1'],
        ['街道8', '1', '1'],
    ],
    align: ['center'],
    rowNum: 3,
    columnWidth: [140, 60, 60],
    headerBGC: '#006400',
    oddRowBGC: '#3CB371',
    evenRowBGC: '#8FBC8F',
});

let problemCount = reactive({
    header: ['街道', '打卡问题', '严管街道到位问题', '定位异常', '信息接收'],
    data: [
        ['抚琴', '1', '1', '问题', '问题'],
        ['西华', '1', '1', '问题', '问题'],
        ['街道1', '1', '1', '问题', '问题'],
        ['街道2', '1', '1', '问题', '问题'],
        ['街道3', '1', '1', '问题', '问题'],
        ['街道4', '1', '1', '问题', '问题'],
        ['街道5', '1', '1', '问题', '问题'],
        ['街道6', '1', '1', '问题', '问题'],
        ['街道7', '1', '1', '问题', '问题'],
        ['街道8', '1', '1', '问题', '问题'],
    ],
    align: ['center'],
})

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
        fontSize: 40,
    }
});

let memberNumber = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 40,
        fill: '#5CA1D8',
    }
});

let deployed = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 40,
        fill: '#708090',
    }
});

let excused = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 40,
        fill: '#E1B95A',
    }
});

let situ = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 40,
        fill: '#97C151',
    }
});

let positionException = reactive({
    number: [100],
    content: '{nt}人',
    style: {
        fontSize: 40,
        fill: '#E95547',
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
            console.log(data);

            let li = getBackMessage.data

            if (data instanceof Array) {
                for (let i = 0; i <= data.length - 1; i++) {
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

const lawEnforceOfficers = () => {
    personnelDetailsTitle.value = "执法人员实时情况";
    lawEnforceOfficerVisiable.value = true;
}

const wardenOfficers = () => {
    personnelDetailsTitle.value = "协管人员实时情况";
    lawEnforceOfficerVisiable.value = true;
}

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

const scrollBoardClick = (data) => {
    if (data.columnIndex === 3) {
        locationExceptionInfoVisiable.value = true;
        locationExceptionInfoTitle.value = "当日人员定位异常统计表（当日出现连续30分钟定位未发生移动）";
    }
}


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

let isShowParkSituation = ref(true)
const parkClick = () => {
    isShowParkSituation.value = true;
}

const bicycleClick = () => {
    isShowParkSituation.value = false;
}

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

.content-l {
    left: 0;
    width: 25vw;
    background-color: rgba(0, 11, 61, 0.2);
    padding: 3vh;
    display: flex;
    flex-direction: column;
    height: 93vh;
    position: absolute;
    top: 7vh;
    z-index: 20;
    user-select: none;
}

.content-l-top {
    height: 150px;

}

.content-mid {
    left: 25vw;
    width: 50vw;
    height: 40vh;
    padding: 3vh;
    background-color: rgba(0, 11, 61, 0.2);
    position: absolute;
    top: 7vh;
    z-index: 20;
    display: flex;
    flex-flow: wrap;
    user-select: none;
}

.content-r {
    right: 0;
    width: 25vw;
    background-color: rgba(0, 11, 61, 0.2);
    padding-left: 3vh;
    padding-top: 3vh;
    padding-bottom: 3vh;
    padding-right: 1vh;
    display: flex;
    flex-direction: column;
    height: 93vh;
    position: absolute;
    top: 7vh;
    z-index: 20;
    user-select: none;
}

.person-box {
    margin-right: 10px;
    width: 10vw;
    height: 15vh;
    --bs-bg-opacity: .2;
}

.person-title {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-right: 30px;
    text-align: center;
}

.person-number {
    font-size: 30px;
    text-align: center;
}
</style>