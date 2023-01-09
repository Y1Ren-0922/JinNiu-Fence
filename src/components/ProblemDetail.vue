<template>
    <div class="container">
        <div class="row">
            <div class="card select-box">
                <div class="card-body">
                    <div style="display:flex; margin-left: 40px;">
                        <div v-for="item in timeLineList" :key="item.id"
                            style="flex:1; display:flex; flex-direction:column;">
                            <div style="flex:1; display:flex" class="timeline-content">
                                <div class="timeline-title" :class="{ 'left10': item.title === '最近30天' }">{{
                                    item.title
                                }}
                                </div>
                                <div class="dot" @click="changeActive(item.id, item.title)"
                                    :class="{ 'active-dot': item.id <= timeIndex }"></div>
                                <div class="item" v-show="item.isShow"></div>
                            </div>
                            <div class="item_bottom"></div>
                        </div>
                    </div>


                </div>
            </div>

            <div class="card ">
                <div class="card-body">
                    <div class="show-item">
                        <span class="input-title-left">发布时间</span>
                        <el-input style="width: 20vw;" v-model="stateInfoMap[selectState].postDate" disabled
                            size="large" />

                        <!-- <span class="input-title-left">当前问题状态</span>
                        <el-input style="width: 20vw;" v-model="problemState" disabled size="large" /> -->
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">发布人</span>
                        <el-input style="width: 20vw;" v-model="stateInfoMap[selectState].postPatrol" disabled
                            size="large" />

                        <span class="input-title-left">街道</span>
                        <el-input style="width: 20vw;" v-model="stateInfoMap[selectState].agency" disabled
                            size="large" />
                    </div>

                    <!-- <div class="show-item">
                        <span class="input-title-left">所属区域</span>
                        <el-input style="width: 50vw;" v-model="region" disabled size="large" />
                    </div> -->

                    <div class="show-item">
                        <span class="input-title-left">问题描述</span>
                        <el-input style="width: 50vw;" v-model="stateInfoMap[selectState].problemDescription" disabled
                            size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">处理人</span>
                        <el-input style="width: 20vw;" v-model="stateInfoMap[selectState].handler" disabled
                            size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">处理期限</span>
                        <el-input style="width: 20vw;" v-model="stateInfoMap[selectState].rectifyDate" disabled
                            size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">现场照片</span>
                        <div class="image-box">
                            <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="stateInfoMap[selectState].imageUrl"
                                    :fit="imageFit" />

                            </div>
                            <!-- <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="imageUrl" :fit="imageFit" />
                            </div>
                            <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="imageUrl1" :fit="imageFit" />
                            </div>
                            <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="imageUrl1" :fit="imageFit" />
                            </div>

                            <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="imageUrl1" :fit="imageFit" />
                            </div> -->
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
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// const postDate = ref('2022-08-11 00:00:00');
// const rectifyDate = ref('2022-09-01 00:00:00');
// const postPatrol = ref('张三');
// const agency = ref('抚琴');
// const region = ref('抚琴西路（一环路口-二环路口）');
// const problemDescription = ref('这里是问题描述');
// const problemState = ref('处理中');
// const imageUrl = ref('');
// const imageUrl1 = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg');
const imageFit = 'scale-down';
// const handler = ref('李四');

const stateInfoMap = reactive({});
const selectState = ref('');
const getProblemInfo = () => {
    if (router.currentRoute.value.query.problem_id) {
        let problem = {
            problemId: router.currentRoute.value.query.problem_id,
        }
        axios({
            url: '/api/problem-status/history',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: store.state.user.tokenHeader + store.state.user.token,
            },
            data: JSON.stringify(problem)
        }).then(function (resp) {
            console.log(resp);

            if (resp.data.code == 2000) {
                for (const postStateInfo of resp.data.data) {
                    let executor;
                    if (postStateInfo.executor) {
                        executor = postStateInfo.executor;
                    } else {
                        executor = "暂无"
                    }
                    stateInfoMap[postStateInfo.stage] = {
                        postDate: switchTime(postStateInfo.createTime),
                        problemDescription: postStateInfo.feedback,
                        rectifyDate: switchTime(postStateInfo.deadline),
                        postPatrol: router.currentRoute.value.query.postPatrol,
                        handler: executor,
                        agency: router.currentRoute.value.query.region,
                        imageUrl: postStateInfo.url,
                    }

                }
                timeIndex.value = timeStateMap[router.currentRoute.value.query.state];
                if ("未接收" in stateInfoMap) {
                    selectState.value = "未接收";
                } else if ("待处置" in stateInfoMap) {
                    selectState.value = "待处置";
                    stateInfoMap["未接收"] = stateInfoMap["待处置"];
                } else if ("首次整改" in stateInfoMap) {
                    selectState.value = "首次整改";
                    stateInfoMap["未接收"] = stateInfoMap["首次整改"];
                    stateInfoMap["待处置"] = stateInfoMap["首次整改"];
                } else if ("二次整改" in stateInfoMap) {
                    selectState.value = "二次整改";
                } else if ("执法查处" in stateInfoMap) {
                    selectState.value = "执法查处";
                } else if ("整改完成" in stateInfoMap) {
                    selectState.value = "整改完成";
                }
            }
        })
    }
}

getProblemInfo();

const switchTime = time => {
    return time.replace('T', ' ')
}

let timeStateMap = {
    "未接收": 0,
    "待处置": 1,
    "首次整改": 2,
    "二次整改": 3,
    "执法查处": 4,
    "整改完成": 5
}

let timeIndex = ref(0)
// let stateIndex = 3
let timeLineList = reactive([
    {
        id: 0,
        title: '未接收',
        isShow: true
    }, {
        id: 1,
        title: '待处置',
        isShow: true
    }, {
        id: 2,
        title: '首次整改',
        isShow: true
    }, {
        id: 3,
        title: '二次整改',
        isShow: true
    }, {
        id: 4,
        title: '执法查处',
        isShow: true
    }, {
        id: 5,
        title: '整改完成',
        isShow: false
    }])
// let dateValue =  ''
const changeActive = (idx, state) => {
    // timeIndex = index;
    // console.log('点击了时间点', index)
    if (idx <= timeIndex.value) {
        selectState.value = state;
    }
}



</script>

<style scoped>
.container {
    margin-left: 16vw;
}

.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.show-item {
    display: flex;
    margin-bottom: 2vh;
}

.input-title-left {
    display: flex;
    font-size: 1rem;
    cursor: default;
    width: 8vw;
    justify-content: right;
    align-items: center;
    padding-right: 1vw;
}

.image-box {
    display: flex;
    flex-flow: wrap;
    width: 50vw;
}

.image-item {
    margin-right: 5vw;
}

:deep(.el-input.is-disabled .el-input__inner) {
    cursor: text;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
    cursor: text;
}

.timeline {
    height: 100%;
    margin-left: 40px;
    margin-top: 40px;
    /* padding-top: 40px; */
}

.timeline-content {
    position: relative;
}

.timeline-title {
    position: absolute;
    left: -15px;
    top: 10px;
    /* text-align: left;
        margin-left: 50px; */
    color: #000;
    font-size: 20px;
}

.left10 {
    left: -15px;
}

.dot {
    border: 2px solid #DCDFE6;
    width: 20px;
    height: 20px;
    border-radius: 30px;
    background: white;
    margin: 37px 0;
    box-sizing: border-box;
    cursor: pointer;
}


.item {
    flex: 1;
    border-bottom: 4px solid #DCDFE6;
    margin-bottom: 45px;
    box-sizing: border-box;
}

.item_bottom {
    flex: 1;
    text-align: center;
    height: 15px;
    margin-top: 0px;
    font-size: 14px;
}

.active-dot {
    background-color: #028FFC !important;
    /*border: 5px solid #67C23A;*/
    margin-top: 34px;
    box-sizing: content-box;
    cursor: pointer;
}
</style>