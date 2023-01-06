<template>


    <div class="content-l" v-show="$route.path != '/map-mode/'">
        <div class="content-l-top">
            <div class="container">

                <border-box-7 v-show="$route.path != '/bicycle-map/'"
                    style="height: 27vh; margin-bottom: 2vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="law-enforce-officers" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>

                <border-box-7 v-show="$route.path != '/bicycle-map/'"
                    style="height: 27vh; margin-bottom: 2vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="warden-officers" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>

                <border-box-7 style="height: 30vh; margin-bottom: 1vh; width: 21vw; padding-top: 1vh;">
                    <div>
                        <div id="bicycle-data" style="height: 27vh; width: 20vw;"></div>
                    </div>
                </border-box-7>

            </div>
        </div>
    </div>
    <div class="content-mid">
        <border-box-7 class="mid-head-show" v-if="$route.path != '/bicycle-map/' && isSelectRegionMode === 'false'">
            <div class="mid-box">
                <div class="mid-head-left">
                    <h4>在岗在位</h4>
                    <div class="mid-head-left-num" @click="toOnWorkDetail('')" style="cursor:pointer;">{{
                        patrolOnWorkTotal
                    }}人
                    </div>
                </div>
                <div class="mid-head-left-right">
                    <div class="mid-head-left-right-top">
                        <div class="mid-head-left-right-title">执法人员</div>
                        <div class="mid-head-left-right-num" @click="toOnWorkDetail('执法人员')" style="cursor:pointer;">{{
                            lawEnforceOnWork
                        }}人</div>
                    </div>
                    <div class="mid-head-left-right-bottom">
                        <div class="mid-head-left-right-title">协管人员</div>
                        <div class="mid-head-left-right-num" @click="toOnWorkDetail('协管人员')" style="cursor:pointer;"> {{
                            wardenOnWork
                        }}人</div>
                    </div>
                </div>

            </div>

        </border-box-7>
        <!-- <el-button type="primary" plain v-if="isSelectRegionMode == 'true'">开始选择</el-button>
        <el-button type="primary" plain v-if="isSelectRegionMode == 'true'">选择结束</el-button> -->

        <border-box-7 class="mid-head-show" style="margin-left: 2vw;"
            v-if="$route.path != '/bicycle-map/' && isSelectRegionMode === 'false'">
            <div class="mid-box">
                <div class="mid-head-left">
                    <el-tooltip class="box-item" effect="dark" content="连续20分钟不移动且未回复工作状态" placement="bottom">
                        <h4>定位异常</h4>
                    </el-tooltip>

                    <div class="mid-head-left-num" style="color: #E95547;">{{ locationException }}人</div>
                </div>
                <div class="mid-head-left-right">
                    <div class="mid-head-left-right-top">
                        <div class="mid-head-left-right-title">执法人员</div>
                        <div class="mid-head-left-right-num" style="color: #E95547;">{{ law_enforce_le }}人</div>
                    </div>
                    <div class="mid-head-left-right-bottom">
                        <div class="mid-head-left-right-title">协管人员</div>
                        <div class="mid-head-left-right-num" style="color: #E95547;">{{ warden_le }}人</div>
                    </div>
                </div>

            </div>

        </border-box-7>

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
    <!-- <border-box-7 class="content-mid-bottom" v-show="$route.path != '/bicycle-map/'"> -->
    <div class="content-mid-bottom" v-show="$route.path == '/map/'">
        <div id="case-data" style="width: 50vw;height: 25vh;"></div>

    </div>
    <!-- </border-box-7> -->

    <div class="content-r" v-show="$route.path != '/map-mode/'">
        <div class="container">
            <div class="leave-map">
                <router-link :to="{ name: 'person_index' }"><img src="../assets/img/leave.png" alt=""></router-link>
            </div>

            <border-box-7 style="height: 33vh; width: 22vw;   margin-bottom: 1vh;"
                v-show="$route.path != '/bicycle-map/'">
                <div class="card text-white bg-primary bg-opacity-10 mb-3 "
                    style="width: 22vw; font-size:2rem; height: 33vh;">
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
            </border-box-7>
            <border-box-7 style="height: 27vh; width: 22vw; margin-bottom: 1vh;"
                v-show="$route.path != '/bicycle-map/'">
                <div id="problem-disposal" style="height: 27vh; width: 22vw; ">
                    <!-- <div class="problem-title">事件办理</div>
                    <capsule-chart :config="problemConfig" style="height: 25vh;" /> -->
                </div>
            </border-box-7>

            <border-box-7 style="height: 28.5vh; width: 22vw; margin-bottom: 1vh;"
                v-show="$route.path != '/bicycle-map/'">
                <div class="card text-white bg-primary mb-3 "
                    style=" margin-left: auto;  width: 22vw; height: 28.5vh; --bs-bg-opacity: .15;">
                    <div class="card-header">综合执法指令发布
                        <el-badge :value="unReadNum" class="item float-end" :hidden="isShowBadge">
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
            </border-box-7>
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
                    <div class="select-recieve">
                        <div class="check-title">按街道选择</div>
                        <!-- <el-checkbox v-model="streetCheckAll" :indeterminate="isStreetIndeterminate"
                            @change="handleCheckStreetAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="streetCheckList" @change="handleStreetChange">
                    
                            <el-checkbox v-for="(agency, idx) in agencyList" :key="idx" :label="agency" />
                        </el-checkbox-group> -->
                        <el-radio-group v-model="streetSelected">
                            <el-radio label="全部">全部</el-radio>
                            <el-radio v-for="(agency, idx) in agencyList" :key="idx" :label="agency">{{
                                agency
                            }}</el-radio>

                        </el-radio-group>
                    </div>

                    <div class="select-recieve">
                        <div class="check-title">按人员类型选择</div>
                        <!-- <el-checkbox v-model="peopleCheckAll" :indeterminate="isPeopleIndeterminate"
                            @change="handleCheckPeopleAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="peopleCheckList" @change="handlePeopleChange">
                            <el-checkbox label="执法人员" />
                            <el-checkbox label="协管人员" />

                        </el-checkbox-group> -->
                        <el-radio-group v-model="identitySelected">
                            <el-radio label="全部">全部</el-radio>
                            <el-radio label="执法人员">执法人员</el-radio>
                            <el-radio label="协管人员">协管人员</el-radio>
                        </el-radio-group>
                    </div>

                    <div>
                        <div class="check-title">按划分区域选择</div>
                        <el-button type="primary" plain @click="selectRegion">选择区域</el-button>
                    </div>

                </div>

                <div style="margin-top: 5vh; margin-bottom: 5vh;">
                    <button type="button" class="btn btn-outline-primary float-end" @click="sendDerective">发布</button>
                </div>

                <div style="width: 100%; height: 5vh;"></div>
            </el-tab-pane>
            <el-tab-pane label="未读消息" name="second">
                <!-- <el-button type="danger" plain>删除全部消息</el-button> -->
                <hr>
                <el-scrollbar max-height="450px">
                    <div v-for="(backMessage, idx) in getBackMessage.data" :key="idx" @mouseenter="is_read(idx)">
                        <div v-if="backMessage.isRead == false" class="is-read-word">[未读]</div>
                        <div v-if="backMessage.isRead == true">[已读]</div>
                        <el-descriptions>
                            <el-descriptions-item label="姓名">{{ backMessage.name }}</el-descriptions-item>
                            <el-descriptions-item label="电话号码">{{ backMessage.telephone }}</el-descriptions-item>
                            <!-- <el-descriptions-item>
                                <el-button type="danger" :icon="Delete" circle />
                            </el-descriptions-item> -->

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
            <el-tab-pane label="已读消息" name="third">
                <el-button type="danger" plain @click="deleteAllReaded">删除全部消息</el-button>
                <hr>
                <el-scrollbar max-height="450px">
                    <div v-for="(backMessage, idx) in readedMessage.data" :key="idx">
                        <div>[已读]</div>
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
import { BorderBox7, DigitalFlop } from '@kjgl77/datav-vue3'
import { useStore } from 'vuex';
import {
    Delete,
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
// import router from '@/router';
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import router from '@/router';

const store = useStore();
let derectiveSelect = ref("first");
const locationException = ref('100');
const law_enforce_le = ref('75');
const warden_le = ref('25');

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
// let streetCheckList = ref([]);
// let streetCheckAll = ref(false);
// let isStreetIndeterminate = ref(true);
// let peopleCheckList = ref([]);
// let peopleCheckAll = ref(false);
// let isPeopleIndeterminate = ref(true);
// let peoples = ["执法人员", "协管人员"];
let streetsClockInfoVisiable = ref(false);
let streetsClockInfoTitle = ref("");
let locationExceptionInfoVisiable = ref(false);
let locationExceptionInfoTitle = ref("");

let socket = null;
let getBackMessage = reactive({
    data: []
})
let readedMessage = reactive({
    data: []
})

const unReadNum = ref(0);
const isShowBadge = ref(false);
const websocketConnect = () => {
    if (store.state.user.socket == null) {
        const socketUrl = `ws://101.37.246.72:9090/websocket/admin${store.state.user.telephone}`;
        socket = new WebSocket(socketUrl);
        socket.onopen = () => {

            store.commit("updateSocket", socket);
        }

        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            console.log(data);
            getBackMessage.data.splice(0, getBackMessage.data.length);
            for (let i = 0; i <= data.msgs.length - 1; i++) {
                if (data.msgs[i].message != "Heartbeat") {

                    let newBackMessage = {
                        id: data.msgs[i].id,
                        name: data.msgs[i].patrolTelephone,
                        telephone: data.msgs[i].patrolTelephone,
                        message: data.msgs[i].message,
                        backTime: parseTime(data.msgs[i].createTime),
                        isRead: data.msgs[i].isRead,
                    }
                    if (data.msgs[i].isRead == false) {
                        getBackMessage.data.unshift(newBackMessage);
                    } else {
                        readedMessage.data.unshift(newBackMessage);
                    }
                }
            }
            unReadNum.value = getBackMessage.data.length;
            if (getBackMessage.data.length == 0) {
                isShowBadge.value = true;
            }
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

const getAllUnReadMessage = () => {

    axios({
        url: '/api/ws-message/get_stranded_web',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            phone: 'admin' + store.state.user.telephone
        })
    }).then(function (resp) {
        console.log(resp);
        getBackMessage.data.splice(0, getBackMessage.data.length);
        readedMessage.data.splice(0, readedMessage.data.length);
        for (const item of resp.data.data) {
            let newBackMessage = {
                id: item.id,
                name: item.patrolTelephone,
                telephone: item.patrolTelephone,
                message: item.message,
                backTime: parseTime(item.createTime),
                isRead: item.isRead,
            }
            if (item.isRead == false) {
                getBackMessage.data.unshift(newBackMessage);
            } else {
                readedMessage.data.unshift(newBackMessage);
            }
        }
        unReadNum.value = getBackMessage.data.length;
        if (getBackMessage.data.length == 0) {
            isShowBadge.value = true;
        }
    })
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

const streetDetails = (row, column) => {
    if (column.label != "街道" && column.label != "在岗在位率") {
        streetDetailsTitle.value = row.street + "街道" + column.label + "人员明细表";
        streetDetailInfoVisiable.value = true;
    } else if (column.label == "街道") {
        streetsClockInfoVisiable.value = true;
        streetsClockInfoTitle.value = "各街道" + personnelDetailsTitle.value.substring(0, 2) + "人员打卡情况统计表";
    }
}

// const handleCheckStreetAllChange = (val) => {
//     streetCheckList.value = val ? agencyList : [];
//     isStreetIndeterminate.value = false;
// }

// const handleStreetChange = (val) => {
//     const checkedCount = val.length;
//     streetCheckAll.value = checkedCount == agencyList.length;
//     isStreetIndeterminate.value = checkedCount > 0 && checkedCount < agencyList.length;
// }

// const handleCheckPeopleAllChange = (val) => {
//     peopleCheckList.value = val ? peoples : [];
//     isPeopleIndeterminate.value = false;
// }

// const handlePeopleChange = (val) => {
//     const checkedCount = val.length;
//     peopleCheckAll.value = checkedCount == peoples.length;
//     isPeopleIndeterminate.value = checkedCount > 0 && checkedCount < peoples.length;
// }

const issueDirective = () => {
    derectiveIssueVisiable.value = true;
    if (socket == null) {
        websocketConnect();
    }
    getAllUnReadMessage();
}


const streetSelected = ref('');
const identitySelected = ref('');
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
        let agency;
        let identity;
        if (streetSelected.value == '全部' || streetSelected.value == '') {
            agency = '';
        } else {
            agency = streetSelected.value;
        }

        if (identitySelected.value == '全部' || identitySelected.value == '') {
            identity = '';
        } else {
            identity = identitySelected.value;
        }

        socket.send(JSON.stringify({
            type: 2,
            // identity: Object.values(peopleCheckList.value)[0],
            // agency: Object.values(streetCheckList.value)[0],
            identity: identity,
            agency: agency,
            message: derectiveInfo.value,
        }))
        ElMessage({
            message: '指令已发布！',
            type: 'success',
        })
        derectiveInfo.value = "";
        streetSelected.value = "";
        identitySelected.value = "";

    } else if (derectiveInfo.value == "") {
        ElMessage({
            message: "指令为空",
            type: 'warning'
        })
    }


    // Object.keys(peopleCheckList.value).map(key => {
    //     delete peopleCheckList.value[key]
    // });
    // Object.keys(streetCheckList.value).map(key => {
    //     delete streetCheckList.value[key]
    // });

}

const is_read = idx => {
    getBackMessage.data[idx].isRead = true
    axios({
        url: "/api/ws-message/update_read",
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            id: getBackMessage.data[idx].id
        })
    }).then(function (resp) {
        console.log(resp);
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

const fontSizeSwitch = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1707);
    return res * fontSize;
}

let law_enforce_chart = null;
let law_enforce_option = {
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
            type: 'pie',
            radius: '50%',
            data: [
                { value: 0, name: '在岗' },
                { value: 0, name: '补休' },
                { value: 0, name: '请假' },
            ],
            label: {
                color: "white",
                formatter: '{b}: {c}',
                fontSize: fontSizeSwitch(0.15),
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

const create_law_enforce_data = () => {
    let chartDom = document.getElementById("law-enforce-officers");
    law_enforce_chart = echarts.init(chartDom);


    //law_enforce_option && law_enforce_chart.setOption(law_enforce_option);
    law_enforce_chart.on('click', (params) => {

        router.push({ name: 'person_index', query: { status: parseInt(patrolStatusMap[params.data.name]) + 1, range: '执法人员' } })
    })
    window.addEventListener("resize", law_enforce_chart.resize);
}

let warden_chart = null;
let warden_option = reactive({
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
            type: 'pie',
            radius: '50%',
            data: [
                { value: 0, name: '在岗' },
                { value: 0, name: '补休' },
                { value: 0, name: '请假' },

            ],
            label: {
                color: "white",
                formatter: '{b}: {c}',
                fontSize: fontSizeSwitch(0.15),
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
})
const create_warden_data = () => {
    let chartDom = document.getElementById("warden-officers");
    warden_chart = echarts.init(chartDom);

    // warden_chart.setOption(warden_option);
    warden_chart.on('click', (params) => {

        router.push({ name: 'warden_index', query: { status: parseInt(patrolStatusMap[params.data.name]) + 1, range: '协管人员' } })
    })
    getPatrolStatusCount();
    window.addEventListener("resize", warden_chart.resize);
}

let bicycle_chart = null;
let bicycle_option = {
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

        axisLabel: {
            fontSize: fontSizeSwitch(0.15),
        },
        axisLine: {
            lineStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['美团', '青桔', '哈罗'],

        axisLabel: {
            fontSize: fontSizeSwitch(0.15),
        },
        axisLine: {
            lineStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        },

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
}
const show_bicycle_data = () => {

    var chartDom = document.getElementById('bicycle-data');
    bicycle_chart = echarts.init(chartDom);

    bicycle_option && bicycle_chart.setOption(bicycle_option);
    bicycle_chart.on('click', () => {
        router.push({ name: 'bicycle_person_manage' })
    })
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

        xAxis: [
            {
                type: 'category',
                // prettier-ignore
                data: ['大队', '抚琴', '西安路', '驷马桥', '茶店子', '凤凰山', '天回镇', '营门口', '五块石', '金泉', '西华', '九里堤', '沙河源', '荷花池'],
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                    }
                },
                axisLabel: {
                    fontSize: fontSizeSwitch(0.12),
                },
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
                },
                axisLabel: {
                    fontSize: fontSizeSwitch(0.12),
                },
            },
            {
                type: 'value',
                name: "金额",
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                    }
                },
                axisLabel: {
                    fontSize: fontSizeSwitch(0.12),
                },
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
                    show: true,
                    fontSize: fontSizeSwitch(0.12),
                }

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
                    fontSize: fontSizeSwitch(0.12),
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

let getPatrolStatusCountInterval = null;
let getProblemCountInterval = null;
onMounted(() => {
    create_law_enforce_data();
    show_bicycle_data();
    create_warden_data();

    //setInterval(getPatrolStatusCount, 5000)
    create_case_data();
    create_problem_data();
    getPatrolStatusCountInterval = setInterval(getPatrolStatusCount, 60000);
    getProblemCountInterval = setInterval(getProblemCount, 60000);
})


onBeforeUnmount(() => {
    window.removeEventListener('resize', law_enforce_chart.resize);
    window.removeEventListener('resize', warden_chart.resize);
    window.removeEventListener('resize', bicycle_chart.resize);
    window.removeEventListener('resize', case_chart.resize);
    window.removeEventListener('resize', problem_chart.resize);
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
    if (problem_chart != null) {
        problem_chart.dispose();
        problem_chart = null;
    }

    clearInterval(getPatrolStatusCountInterval);
    getPatrolStatusCountInterval = null;

    clearInterval(getProblemCountInterval);
    getProblemCountInterval = null;
})



let problemConfig = reactive({
    data: [
        {
            name: '市容',
            value: 0,
        },
        {
            name: '占道',
            value: 0,
        },
        {
            name: '扬尘',
            value: 0,
        },
        {
            name: '违建',
            value: 0,
        },
        {
            name: '单车',
            value: 0,
        },
    ],

    unit: '件',
    showValue: true
})

const problemConfigMap = {
    '市容秩序': { idx: 0 },
    '占用城市道路': { idx: 1 },
    '扬尘': { idx: 2 },
    '违建': { idx: 3 },
    '共享单车': { idx: 4 },
}

const patrolStatusMap = {
    '在岗': 0,
    '补休': 1,
    '请假': 2,

}

const patrolOnWorkTotal = ref(0);
const lawEnforceOnWork = ref(0);
const wardenOnWork = ref(0);
const getPatrolStatusCount = () => {
    axios({
        url: '/api/patrol/stat/status',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            param: 1
        })
    }).then(function (resp) {
        if (resp.status == 200) {

            for (const item of warden_option.series[0].data) {
                item.value = 0;
            }

            for (const item of resp.data.data) {

                if (item.identity == '协管人员' && item.status != '未打卡' && item.status != '下班') {
                    warden_option.series[0].data[patrolStatusMap[item.status]].value = item.num;
                    if (item.status == '在岗') {
                        wardenOnWork.value = item.num;
                    }
                }
                if (item.identity == '执法人员' && item.status != '未打卡' && item.status != '下班') {
                    law_enforce_option.series[0].data[patrolStatusMap[item.status]].value = item.num;
                    if (item.status == '在岗') {
                        lawEnforceOnWork.value = item.num;
                    }
                }
            }

            patrolOnWorkTotal.value = wardenOnWork.value + lawEnforceOnWork.value;
            law_enforce_chart.setOption(law_enforce_option);
            warden_chart.setOption(warden_option);
        }
    })
}

const toOnWorkDetail = identity => {
    if (identity == "协管人员") {
        router.push({ name: 'warden_index', query: { status: '1', range: identity } })
    } else {
        router.push({ name: 'person_index', query: { status: '1', range: identity } })
    }

}

const problem_option = reactive({
    title: {
        text: '事件办理',
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
    grid: {

        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['市容', '占道', '扬尘', '违建', '单车'],
            // axisTick: {
            //     alignWithLabel: true
            // },
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 1)"
                }
            },
            axisLabel: {
                fontSize: fontSizeSwitch(0.12),
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 1)"
                }
            },
            axisLabel: {
                fontSize: fontSizeSwitch(0.12),
            },
            minInterval: 1
        }
    ],
    series: [
        {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: [0, 0, 0, 0, 0]
        }
    ]
})

let problem_chart = null;
const create_problem_data = () => {
    let chartDom = document.getElementById("problem-disposal");
    problem_chart = echarts.init(chartDom);

    problem_chart.on('click', (params) => {
        router.push({ name: 'issue_index', query: { name: params.name } })
    })


    getProblemCount();


    window.addEventListener("resize", problem_chart.resize);
}

const getProblemCount = () => {
    axios({
        url: '/api/problem/count_by_category',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.status == 200) {
            for (const item of problemConfig.data) {
                item.value = 0;
            }

            for (const item of resp.data.data) {
                if (item.category != '') {
                    problem_option.series[0].data[problemConfigMap[item.category].idx] = item.count;
                }
            }

            problem_chart.setOption(problem_option);


        }
    })
}

const deleteAllReaded = () => {
    axios({
        url: '/api/ws-message/delete_web',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify({
            phone: "admin" + store.state.user.telephone
        })
    }).then(function (resp) {
        console.log(resp);
        readedMessage.data.splice(0, readedMessage.data.length);
    })

}

const isSelectRegionMode = ref("false");
const selectRegion = () => {
    if (derectiveInfo.value == '') {
        ElMessage({
            message: "请输入指令内容",
            type: 'error'
        })
    } else {
        isSelectRegionMode.value = "true";
        store.commit("updateMsg", derectiveInfo.value);
        router.push({ name: 'map_mode_index', query: { param: 'selectRegion' } })
    }

}

const judgeMode = () => {
    if (router.currentRoute.value.query.param) {
        isSelectRegionMode.value = "true";
    }
}
judgeMode();
// getProblemCount();
// setInterval(getProblemCount, 60000);


// watch(() => warden_option.series, () => {
//     warden_chart.setOption(warden_option);
// })


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

.select-recieve {
    margin-bottom: 2vh;
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
    left: 25vw;
    bottom: 2vh;
    height: 25vh;
    width: 50vw;
    position: absolute;
    z-index: 20;
    /* background: linear-gradient(to top right, rgba(26, 16, 51, 0.6), rgba(42, 48, 127, 0.6)); */
}

.case-data {
    width: 40vw;
    height: 24vh;
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

.mid-head-show {
    height: 12vh;
    width: 24vw;
}

.mid-head-left {
    width: 10vw;
    height: 100%;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    padding-top: 1.2vh;
}

.mid-head-left-num {
    margin: auto;
    color: #5CA1D8;
}

.mid-head-left-right-top {
    width: 15vw;
    height: 4vh;
    margin-top: 1vh;
    color: white;
    display: flex;
}

.mid-head-left-right {
    display: flex;
    flex-direction: column;
}

.mid-box {
    display: flex;
}

.mid-head-left-right-title {
    color: white;
    font-size: 1.3rem;
    width: 6vw;
    height: 4vh;
}

.mid-head-left-right-bottom {
    width: 15vw;
    height: 4vh;
    display: flex;
    margin-top: 1vh;
}

.mid-head-left-right-num {
    color: #5CA1D8;
    font-size: 1.3rem;

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