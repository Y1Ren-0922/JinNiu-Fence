<template>

    <div class="container">
        <div class="row">

            <div class="card select-box">
                <div class="card-body">
                    <!-- <el-row :gutter="12">
                        <el-col :span="2" class="select-banshichu-box" @click="selectBanshichu('全部')">
                            <el-card shadow="always"
                                :body-style="banshichuSelected == '全部' ? banshichuSelectedStyle : banshichuNoneSelectedStyle">
                                全部</el-card>
                        </el-col>
                        <el-col v-for="item in banshichu_list" :key="item" :span="2" class="select-banshichu-box"
                            @click="selectBanshichu(item)">
                            <el-card shadow="always"
                                :body-style="banshichuSelected == item ? banshichuSelectedStyle : banshichuNoneSelectedStyle">
                                <span>{{ item }}</span>

                            </el-card>
                        </el-col>

                    </el-row> -->
                    <el-row :gutter="12">
                        <el-col v-for="(item, idx) in person_state" :key="idx" :span="2.5" class="select-state-box"
                            @click="selectPersonState(item)">
                            <el-card shadow="always"
                                :body-style="personStateSelected == item ? banshichuSelectedStyle : banshichuNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>
                    <hr>

                    <el-row :gutter="12">
                        <el-col v-for="(item, idx) in banshichu_list" :key="idx" :span="2.5" class="select-state-box"
                            @click="selectAgency(item)">
                            <el-card shadow="always" style="margin-bottom: 1vh;"
                                :body-style="banshichuSelected == item ? agencySelectedStyle : banshichuNoneSelectedStyle">
                                <span>{{ item }}</span>
                                <div class="state-number">20</div>
                            </el-card>
                        </el-col>

                    </el-row>

                    <hr>

                    <div class="col-12" style="margin-right:30px; display: flex;">
                        <el-input style="width: 18%" class="select-text-box" v-model="queryName" placeholder="请输入人员姓名"
                            clearable size="large">

                        </el-input>

                        <el-input style="width: 22%" class="select-text-box" v-model="queryDepartment"
                            placeholder="请输入中队名称" clearable size="large">

                        </el-input>


                        <!-- <el-select v-model="queryStreet" placeholder="选择围栏" size="large" style="width: 20%;"
                            class="select-text-box" clearable>
                            <el-option v-for="polygon in polygons" :key="polygon.id" :label="polygon.name"
                                :value="polygon.name" />
                        </el-select> -->

                        <!-- <el-input style="width: 20%" id="select-street-box" class="select-text-box"
                            ref="selectStreetInput" v-model="queryRegion" placeholder="请输入街道" clearable size="large"
                            @click="selectStreet">

                        </el-input> -->


                        <!-- <el-select v-model="queryIdentity" class="select-text-box" placeholder="选择人员类型" size="large"
                            style="width: 15%" clearable>
                            <el-option v-for="item in selectIdentityOption" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select> -->
                        <el-date-picker class="select-text-box" v-model="record_date" type="date" placeholder="默认查询当天"
                            size="large" :disabled-date="disabledDate" style="width: 15%; margin-right: 1vw;" />

                        <el-button type="primary" :icon="Search" size="large" @click="queryRecord">搜索</el-button>
                    </div>

                </div>


            </div>

            <div class="card">

                <div class="card-header" style="display: flex;">
                    <!-- <div class="col-3" style="margin-right:30px;">
                        <el-input v-model="queryName" placeholder="请输入人员姓名" clearable size="large">
                            <template #append>
                                <el-button @click="searchPatrol()">
                                    <el-icon>
                                        <Search />
                                    </el-icon>
                                </el-button>

                            </template>
                        </el-input>
                    </div> -->


                    <button type="button" class="btn btn-outline-primary float-end" @click="addPerson()">添加人员</button>
                </div>
                <div class="card-body">
                    <el-table :data="patrols" style="width: 100%; font-size: 1.1rem;" size="large" max-height="700"
                        :empty-text="emptyText">

                        <el-table-column prop="name" label="姓名" width="180" header-align="center" align="center" />
                        <el-table-column prop="title" label="职务" width="320" header-align="center" align="center"
                            :show-overflow-tooltip="true" />

                        <el-table-column prop="department" label="中队" width="350" header-align="center"
                            align="center" />
                        <el-table-column prop="telephone" label="电话" width="160" header-align="center" align="center" />
                        <!-- <el-table-column prop="identity" label="人员类型" width="120" header-align="center"
                            align="center" />
                        <el-table-column prop="regionName" label="所处围栏" width="200" header-align="center" align="center"
                            :show-overflow-tooltip="true" />
                        <el-table-column prop="task" label="任务" width="100" header-align="center" align="center" /> -->


                        <el-table-column fixed="right" label="操作" width="250" header-align="center" align="center">
                            <template #default="scope">
                                <!-- <el-button class="allocateFench" link size="small" type="primary" plain text
                                    style="font-size:1rem;" @click="editInfo(scope.$index)">
                                    编辑
                                </el-button> -->
                                <el-tooltip class="box-item" effect="dark" content="编辑信息" placement="top"
                                    :show-after="500">
                                    <el-button link size="large" type="primary" plain text style="font-size: 1.2rem;"
                                        @click="editInfo(scope.$index)">
                                        <el-icon>
                                            <EditPen />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>

                                <el-tooltip class="box-item" effect="dark" content="拨打电话" placement="top"
                                    :show-after="500">
                                    <el-button link size="large" type="primary" plain text style="font-size: 1.2rem;">
                                        <el-icon style="vertical-align: middle">
                                            <PhoneFilled />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>

                                <el-tooltip class="box-item" effect="dark" content="位置跳转" placement="top"
                                    :show-after="500">
                                    <el-button link size="small" type="primary" plain text style="font-size: 1.2rem;"
                                        @click="personLocation(scope.row)">
                                        <el-icon style="vertical-align: middle">
                                            <Location />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>

                                <el-tooltip class="box-item" effect="dark" content="个人档案" placement="top"
                                    :show-after="500">
                                    <el-button link size="small" type="primary" plain text style="font-size: 1.2rem;"
                                        @click="personDetailInfo(scope.row)">
                                        <el-icon style="vertical-align: middle">
                                            <Document />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>

                                <el-tooltip class="box-item" effect="dark" content="删除" placement="top"
                                    :show-after="500">
                                    <el-button class="allocationFench" link size="small" type="danger" plain text
                                        style="font-size:1rem" @click="removePerson(scope.$index)">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="float-end" style="margin-top: 10px">
                        <el-pagination v-if="(checkState == false && isSelectRealTime == false)" background
                            layout="total, prev, pager, next, jumper" :total="total_records"
                            :current-page="current_page" @current-change="queryByCondition" />
                        <el-pagination v-else-if="(checkState == true)" background
                            layout="total, prev, pager, next, jumper" :total="total_records"
                            :current-page="current_page" @current-change="queryStateByCondition" />
                        <el-pagination v-else-if="(isSelectRealTime == true)" background
                            layout="total, prev, pager, next, jumper" :total="total_records"
                            :current-page="current_page" @current-change="getRealTimeOnWork" />
                    </div>


                </div>


            </div>

        </div>

    </div>

    <el-dialog v-model="addPersonDialogVisible" title="添加人员" @close="exitAdd(addPersonFormRef)">
        <template #default>
            <el-form :rules="rules" ref="addPersonFormRef" :model="form" label-width="120px" style="max-width: 500px">
                <el-form-item label="人员姓名" width="100px" :rules="rules.name" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="选择分配围栏" prop="fenceName">
                    <el-select v-model="form.fenceName" placeholder="选择围栏">
                        <el-option v-for="polygon in polygons" :key="polygon.id" :label="polygon.name"
                            :value="polygon.id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="人员职务" width="100px" :rules="rules.title" prop="title">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="部门" :rules="rules.department" prop="department">
                    <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="人员类型" prop="office">
                    <el-radio-group v-model="form.office" class="ml-4">
                        <el-radio label="执法人员">执法人员</el-radio>
                        <el-radio label="协管人员">协管人员</el-radio>
                    </el-radio-group>
                </el-form-item>


                <el-form-item label="手机号" :rules="rules.tel" prop="phone">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="任务负责" prop="task">
                    <el-input v-model="form.task" />
                </el-form-item>

            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="confirmAddPerson(addPersonFormRef)">添加
                </el-button>
                <el-button @click="exitAdd(addPersonFormRef)">取消</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="分配围栏">
        <template #default>
            <template v-for="tableItem in tableDataFence" :key="tableItem.id">
                <el-table :data="tableItem.data" class="table" :fit="false" max-height="300px">
                    <el-table-column type="selection" width="55" />
                    <el-table-column v-for="i in tableItem.headerNames.length - 2" :label="tableItem.headerNames[i - 1]"
                        :key="i" :prop="tableItem.dataNames[i - 1]" width="200" />

                </el-table>
            </template>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">将人员分配到选中围栏</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="editInfoDialogVisible" title="编辑信息" @close="exitEdit(ruleFormRef)">
        <template #default>
            <el-form :rules="rules" ref="ruleFormRef" :model="form" label-width="120px" style="max-width: 500px">
                <el-form-item label="人员姓名" width="100px" :rules="rules.name" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="选择分配围栏" prop="fenceName">
                    <el-select v-model="form.fenceName" placeholder="选择围栏">
                        <el-option v-for="polygon in polygons" :key="polygon.id" :label="polygon.name"
                            :value="polygon.id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="人员职务" width="100px" :rules="rules.title" prop="title">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="人员类型" prop="office">
                    <el-radio-group v-model="form.office" class="ml-4">
                        <el-radio label="执法人员">执法人员</el-radio>
                        <el-radio label="协管人员">协管人员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="部门" :rules="rules.department" prop="department">
                    <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="手机号" :rules="rules.tel" prop="phone">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="任务负责" prop="task">
                    <el-input v-model="form.task" />
                </el-form-item>

            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="confirmEdit(ruleFormRef)">确认修改</el-button>
                <el-button @click="exitEdit(ruleFormRef)">取消</el-button>
            </span>
        </template>
    </el-dialog>


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

<script>
import { reactive } from 'vue';
import { ref, nextTick, watch, onMounted } from 'vue';
import { PhoneFilled, Search, Location, Document, EditPen, Delete } from "@element-plus/icons-vue";
import axios from 'axios';
import { useStore } from 'vuex';
import router from '@/router'

export default {
    setup() {
        const store = useStore();
        const dialogFormVisible = ref(false);
        const editInfoDialogVisible = ref(false);
        const addPersonDialogVisible = ref(false);
        const ruleFormRef = ref();
        const addPersonFormRef = ref();
        const queryName = ref("");
        const banshichuNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; ");
        const agencySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, #1E90FF); color: white;");
        const banshichuSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
        const banshichuSelected = ref("全部");
        const queryDepartment = ref('');
        const queryStreet = ref('');
        const queryIdentity = ref('');
        const person_state = ["全部", "在岗在位", "请假", "补休", "未打卡", "抽调"];
        const personStateSelected = ref('全部');
        const selectStreetVisiable = ref(false);

        const selectIdentityOption = [
            {
                value: '执法人员',
                label: '执法人员',
            },
            {
                value: '协管人员',
                label: '协管人员'
            }
        ]

        const rules = reactive({
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 10, message: '姓名长度不合法', trigger: 'blur' },
            ],
            title: [
                {
                    required: true,
                    message: '请输入职务',
                    trigger: 'blur',
                },
            ],
            department: [
                {
                    required: true,
                    message: '请输入部门',
                    trigger: 'blur',
                },
            ],
            identity: [
                {
                    required: true,
                    message: '请输入人员类别',
                    trigger: 'blur',
                },
            ],

            street: [
                {
                    required: true,
                    message: '请输入人员所属的街道',
                    trigger: 'blur',
                },
            ],
            tel: [
                {
                    required: true,
                    message: '请输入人员的电话',
                    trigger: 'blur',
                }, { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
            ],
            vx: [
                {
                    required: true,
                    message: '请输入人员的微信号',
                    trigger: 'blur',
                },
            ],

        })
        const location_default = [[104.08492764442998, 30.68480125658667], [104.08365351, 30.68295086], [104.08072097, 30.67860853], [104.07885946, 30.67566969], [104.08209799, 30.67371765], [104.08337302, 30.67305968], [104.08548955, 30.67295001], [104.08640756, 30.67242363], [104.08737657, 30.67130496], [104.08969711, 30.67003284], [104.0931397, 30.67437556], [104.09503929080208, 30.676760482514343], [104.09404708576766, 30.67709813178603], [104.09319526012625, 30.67755346424976], [104.0889016588199, 30.67973288126206], [104.08985310259258, 30.68114865339007], [104.0938978905621, 30.68731587980966], [104.09245489514863, 30.68739105990879], [104.0919520352031, 30.68761668238092], [104.0918208562049, 30.688086727916605], [104.0918864482493, 30.688387556150783], [104.09254236028306, 30.689384044611078], [104.09228000018922, 30.689929289719906], [104.09147104977237, 30.690530936791273], [104.09136174494047, 30.690662456906992], [104.09212697248623, 30.69177172328108], [104.0929359243766, 30.692016136609283], [104.09350438084842, 30.692316942063513], [104.09385420724126, 30.694121809071444], [104.09182090408228, 30.695193436775803], [104.09136177019272, 30.695381440708015], [104.09109940851961, 30.69573864741584], [104.09179904282321, 30.695851449326277], [104.09271731864521, 30.69718626435893], [104.08160700326367, 30.69738300807923], [104.08141413765587, 30.69424306967441], [104.0814098548041, 30.69276580457567], [104.08130353615583, 30.69150605378136], [104.08120577754372, 30.690324399215953], [104.0808427664515, 30.689480117960123], [104.08065301312334, 30.68907571576189], [104.08072726502077, 30.688522317039517], [104.08089227124948, 30.688359135434162], [104.08147804205797, 30.687741882389425], [104.08221231450686, 30.687117533057464], [104.0832518478065, 30.686195177378128], [104.08371386027875, 30.68581204757918], [104.0851906559503, 30.685166395415408], [104.08492764442998, 30.68480125658667]]
        const form = reactive({
            id: '',
            name: '',
            title: '',
            fenceName: '',
            office: ref(''),
            department: '',
            task: '',
            phone: '',
            wechat: '',
            street: '',
            location: (location_default[Math.floor(Math.random() * 48)]).toString()
        })

        let polygons = reactive({});
        const initPatrolListAndPullPage = () => {
            Object.keys(polygons).map(key => {
                delete polygons[key]
            });
            axios({
                url: "/api/region",
                method: "get",
                headers: {
                    Authorization: store.state.user.tokenHeader + store.state.user.token,
                },
            }).then(function (resp) {

                for (const item of resp.data.data) {
                    if (item.pointList.length >= 3) {
                        polygons[item.id] = {
                            id: item.id,
                            name: item.name,
                        }
                    }
                }


                if (checkState.value == false && isSelectRealTime.value == false) {
                    queryStateByCondition(current_page.value);
                } else if (checkState.value == true) {
                    queryStateByCondition(current_page.value);
                } else if (isSelectRealTime.value == true) {
                    getRealTimeOnWork(current_page.value);
                }

            })
        }
        //initPatrolListAndPullPage();

        let patrolInfo = reactive({});
        let patrolList = reactive([]);

        const addPerson = () => {
            addPersonDialogVisible.value = true;
        }

        const confirmAddPerson = (addPersonFormRef) => {
            addPersonFormRef.validate((valid) => {
                if (valid) {
                    addPersonDialogVisible.value = false;

                    axios({
                        url: "/api/patrol",
                        method: 'post',
                        headers: {
                            Authorization: store.state.user.tokenHeader + store.state.user.token,
                        },
                        data: {
                            name: form.name,
                            title: form.title,
                            relatedRegion: form.fenceName,
                            identity: form.office,
                            department: form.department,
                            telephone: form.phone,
                            wechat: form.wechat,
                            task: form.task,
                        }

                    }).then(function () {
                        initPatrolListAndPullPage();
                    })

                }
            })
        }

        const exitAdd = (addPersonFormRef) => {
            addPersonDialogVisible.value = false;
            addPersonFormRef.resetFields();
        }

        let editIndex;
        const editInfo = (index) => {
            let editId

            editId = patrols.value[index].id;
            editIndex = index;

            form.id = patrolInfo[editId].id;
            form.name = patrolInfo[editId].name;
            form.phone = patrolInfo[editId].telephone;
            form.wechat = patrolInfo[editId].wechat;
            form.office = patrolInfo[editId].identity;
            form.title = patrolInfo[editId].title;
            if (patrolInfo[editId].regionName == "暂未分配") {
                form.fenceName = "";
            } else {
                form.fenceName = patrolInfo[editId].relatedRegion;
            }

            if (patrolInfo[editId].task == "暂无") {
                form.task = "";
            } else {
                form.task = patrolInfo[editId].task;
            }
            form.department = patrolInfo[editId].department;
            editInfoDialogVisible.value = true;
        }

        const exitEdit = (formE1) => {

            editInfoDialogVisible.value = false;

            formE1.resetFields();
            form.id = '';
            form.name = '';
            form.title = '';
            form.phone = '';
            form.wechat = '';
            form.office = '';
            form.fenceName = '';
            form.department = '';
            form.task = '';
        }

        const confirmEdit = (formEl) => {
            formEl.validate((valid) => {
                if (valid) {
                    editInfoDialogVisible.value = false;
                    let index = editIndex;


                    axios({
                        url: "/api/patrol",
                        method: 'post',
                        headers: {
                            Authorization: store.state.user.tokenHeader + store.state.user.token,
                        },
                        data: {
                            id: patrols.value[index].id,
                            title: form.title,
                            name: form.name,
                            relatedRegion: form.fenceName,
                            identity: form.office,
                            department: form.department,
                            telephone: form.phone,
                            wechat: form.wechat,
                            task: form.task,
                        }
                    }).then(function () {
                        initPatrolListAndPullPage();
                        // pull_page(current_page.value);
                    })

                }
            })
        }

        const removePerson = (index) => {

            let removeId = patrols.value[index].id;


            axios({
                url: '/api/patrol/' + removeId,
                method: 'delete',
                headers: {
                    Authorization: store.state.user.tokenHeader + store.state.user.token,
                },
                params: {
                    id: removeId,
                }
            }).then(function () {
                initPatrolListAndPullPage();
                // pull_page(current_page.value);

            })

        }

        const backToFirstPage = () => {
            queryStateByCondition(current_page.value);
        }

        let total_records = ref(0);
        let current_page = ref(1);
        let pages = ref([]);
        let patrols = ref([]);
        let page_count = 0;
        // const pull_page = page => {

        //     Object.keys(patrolInfo).map(key => {
        //         delete patrolInfo[key]
        //     });
        //     current_page.value = page;
        //     axios({
        //         url: '/api/patrol/page',
        //         method: 'get',
        //         headers: {
        //             Authorization: store.state.user.tokenHeader + store.state.user.token,
        //         },
        //         params: {
        //             pageNum: page,
        //             pageSize: pageNum,
        //         }
        //     }).then(function (resp) {

        //         patrols.value.splice(0, patrols.value.length);
        //         total_records.value = parseInt(resp.data.data.total);
        //         page_count = parseInt(resp.data.data.pages);


        //         for (let item of resp.data.data.records) {
        //             let relatedRegion;
        //             let regionName;
        //             if (item.relatedRegion == null) {
        //                 relatedRegion = "暂未分配";
        //                 regionName = "暂未分配";
        //             } else {
        //                 relatedRegion = item.relatedRegion;
        //                 regionName = polygons[relatedRegion]["name"];
        //             }

        //             let task;
        //             if (item.task == null || item.task == '') {
        //                 task = "暂无";
        //             } else {
        //                 task = item.task;
        //             }

        //             let patrol = {
        //                 id: item.id,
        //                 name: item.name,
        //                 title: item.title,
        //                 department: item.department,
        //                 relatedRegion: relatedRegion,
        //                 regionName: regionName,
        //                 telephone: item.telephone,
        //                 wechat: item.wechat,
        //                 identity: item.identity,
        //                 task: task,
        //             }
        //             patrolInfo[item.id] = patrol;
        //             patrols.value.push(patrol);
        //         }

        //     })
        // }

        const size_change = page => {
            console.log(page);
        }

        const personLocation = row => {
            router.push({ name: 'bicycle_map_index', query: { "patrol": row.id } })
        }

        const personDetailInfo = row => {
            router.push({ name: 'person_detail_index', query: { "patrol": row.id } })
        }

        const selectBanshichu = name => {
            banshichuSelected.value = name;
            if (name == '全部') {
                record_agency.value = '';
            } else {
                record_agency.value = name;
            }
            //queryByCondition(1);
        }

        let record_name = ref('');
        let record_department = ref('');
        let record_agency = ref('');
        let record_identity = ref('协管人员');
        let record_street = ref('');
        let record_person_state = ref('');

        const queryByCondition = page => {
            let patrol = {
                name: record_name.value,
                agency: record_agency.value,
                department: record_department.value,
                identity: record_identity.value,
                region: record_street.value,
                pageNum: page,
                pageSize: 10,
            }

            Object.keys(patrolInfo).map(key => {
                delete patrolInfo[key]
            });
            current_page.value = page;
            axios({
                url: '/api/patrol/select/conditions/',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.state.user.tokenHeader + store.state.user.token,
                },
                data: JSON.stringify(patrol)
            }).then(function (resp) {

                patrols.value.splice(0, patrols.value.length);
                total_records.value = parseInt(resp.data.data.total);
                page_count = parseInt(resp.data.data.pages);

                if (resp.data.data.records.length == 0) {
                    emptyText.value = '暂无数据';
                } else {
                    emptyText.value = 'loading...'
                }

                for (let item of resp.data.data.records) {
                    let relatedRegion;
                    let regionName;
                    if (item.relatedRegion == null) {
                        relatedRegion = "暂未分配";
                        regionName = "暂未分配";
                    } else {
                        relatedRegion = item.relatedRegion;
                        regionName = polygons[relatedRegion]["name"];
                    }

                    let task;
                    if (item.task == null || item.task == '') {
                        task = "暂无";
                    } else {
                        task = item.task;
                    }

                    let patrol = {
                        id: item.id,
                        name: item.name,
                        title: item.title,
                        department: item.department,
                        relatedRegion: relatedRegion,
                        regionName: regionName,
                        telephone: item.telephone,
                        wechat: item.wechat,
                        identity: item.identity,
                        task: task,
                    }
                    patrolInfo[item.id] = patrol;
                    patrols.value.push(patrol);
                }
            })
        }

        const get_now_date = () => {
            let date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        let record_date = ref(get_now_date());
        const emptyText = ref('暂无数据');
        const queryStateByCondition = page => {
            let status = '';
            if (personStateSelected.value == '在岗在位') {
                status = '1';
            } else if (personStateSelected.value == '请假') {
                status = '3';
            } else if (personStateSelected.value == '补休') {
                status = '2';
            } else if (personStateSelected.value == '未打卡') {
                status = '0';
            }

            let patrol = {
                name: record_name.value,
                agency: record_agency.value,
                department: record_department.value,
                identity: record_identity.value,
                region: record_street.value,
                date: record_date.value,
                status: status,
                pageNum: page,
                pageSize: 10,
            }

            Object.keys(patrolInfo).map(key => {
                delete patrolInfo[key]
            });
            current_page.value = page;
            axios({
                url: '/api/patrol-whole-info/select/conditions',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.state.user.tokenHeader + store.state.user.token,
                },
                data: JSON.stringify(patrol)
            }).then(function (resp) {
                patrols.value.splice(0, patrols.value.length);
                total_records.value = parseInt(resp.data.data.total);
                page_count = parseInt(resp.data.data.pages);


                if (resp.data.data.records.length == 0) {
                    emptyText.value = '暂无数据';
                } else {
                    emptyText.value = 'loading...'
                }
                for (let item of resp.data.data.records) {
                    let relatedRegion;
                    let regionName;
                    if (item.relatedRegion == null) {
                        relatedRegion = "暂未分配";
                        regionName = "暂未分配";
                    } else {
                        relatedRegion = item.relatedRegion;
                        regionName = polygons[relatedRegion]["name"];
                    }

                    let task;
                    if (item.task == null || item.task == '') {
                        task = "暂无";
                    } else {
                        task = item.task;
                    }

                    let patrol = {
                        id: item.id,
                        name: item.name,
                        title: item.title,
                        department: item.department,
                        relatedRegion: relatedRegion,
                        regionName: regionName,
                        telephone: item.telephone,
                        wechat: item.wechat,
                        identity: item.identity,
                        task: task,
                    }
                    patrolInfo[item.id] = patrol;
                    patrols.value.push(patrol);
                }
            })
        }

        const getRealTimeIdentity = ref('');
        const getRealTimeStatus = ref('');
        const isSelectRealTime = ref(false);
        const getRealTimeOnWork = page => {
            let patrol = {
                name: record_name.value,
                agency: record_agency.value,
                department: record_department.value,
                identity: getRealTimeIdentity.value,
                region: record_street.value,
                date: record_date.value,
                status: getRealTimeStatus.value,
                pageNum: page,
                pageSize: 10,
            }

            Object.keys(patrolInfo).map(key => {
                delete patrolInfo[key]
            });
            current_page.value = page;
            axios({
                url: '/api/patrol-whole-info/select/conditions',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.state.user.tokenHeader + store.state.user.token,
                },
                data: JSON.stringify(patrol)
            }).then(function (resp) {
                patrols.value.splice(0, patrols.value.length);
                total_records.value = parseInt(resp.data.data.total);
                page_count = parseInt(resp.data.data.pages);
                isSelectRealTime.value = true;

                if (resp.data.data.records.length == 0) {
                    emptyText.value = '暂无数据';
                } else {
                    emptyText.value = 'loading...'
                }
                for (let item of resp.data.data.records) {
                    let relatedRegion;
                    let regionName;
                    if (item.relatedRegion == null) {
                        relatedRegion = "暂未分配";
                        regionName = "暂未分配";
                    } else {
                        relatedRegion = item.relatedRegion;
                        regionName = polygons[relatedRegion]["name"];
                    }

                    let task;
                    if (item.task == null || item.task == '') {
                        task = "暂无";
                    } else {
                        task = item.task;
                    }

                    let patrol = {
                        id: item.id,
                        name: item.name,
                        title: item.title,
                        department: item.department,
                        relatedRegion: relatedRegion,
                        regionName: regionName,
                        telephone: item.telephone,
                        wechat: item.wechat,
                        identity: item.identity,
                        task: task,
                    }
                    patrolInfo[item.id] = patrol;
                    patrols.value.push(patrol);
                }
            })
        }

        const checkMode = () => {
            if (router.currentRoute.value.query.status) {
                isSelectRealTime.value = true;
                getRealTimeIdentity.value = router.currentRoute.value.query.range;
                getRealTimeStatus.value = router.currentRoute.value.query.status;
                if (getRealTimeStatus.value == '1') {
                    personStateSelected.value = '在岗在位';
                } else if (getRealTimeStatus.value == '2') {
                    personStateSelected.value = '补休';
                } else if (getRealTimeStatus.value == '3') {
                    personStateSelected.value = '请假';
                }
                queryIdentity.value = getRealTimeIdentity.value;
                record_identity.value = getRealTimeIdentity.value;

            }
            initPatrolListAndPullPage();
        }
        checkMode();

        const checkState = ref(false);
        const queryRecord = () => {
            record_name.value = queryName.value.trim();
            record_department.value = queryDepartment.value.trim();
            record_identity.value = queryIdentity.value.trim();
            record_street.value = queryStreet.value;
            record_agency.value = banshichuSelected.value;

            if (personStateSelected.value == '全部' && record_name.value == '' && record_department.value == '' &&
                record_identity.value == '' && record_street.value == '' && record_agency.value == '') {
                checkState.value = false;
                isSelectRealTime.value = false;
                queryStateByCondition(1);

            } else {
                checkState.value = true;
                isSelectRealTime.value = false;
                queryStateByCondition(1);
            }

        }

        const selectPersonState = name => {
            personStateSelected.value = name;
            if (name == '全部' && record_name.value == '' && record_department.value == '' &&
                record_identity.value == '' && record_street.value == '' && record_agency.value == '') {
                record_person_state.value = '';
                checkState.value = false;
                isSelectRealTime.value = false;
                queryStateByCondition(1);
            } else {
                record_person_state.value = name;
                checkState.value = true;
                isSelectRealTime.value = false;
                queryStateByCondition(1);
            }
        }

        const selectAgency = agency => {
            banshichuSelected.value = agency;
            if (agency == '全部') {
                record_department.value = '';
            } else {
                record_department.value = agency + "街道执法中队";
            }
            queryStateByCondition(1);
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

                    for (let key of resp.data.data) {
                        banshichu_list.push(key.agency);
                        agency_region_relation[key.agency] = key.regions;

                    }
                    banshichu_list.unshift('全部');
                }
            })
        }

        getAgencyRegionRelation();

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

        const regionList = reactive([]);
        const agencySelected = () => {
            regionList.splice(0, regionList.length);
            // banshichuSelected.value = '';
            if (banshichuSelected.value != '') {
                regionList.push(...agency_region_relation[banshichuSelected.value])
            }

        }

        const queryRegion = ref('');
        const selectStreetInput = ref(null)
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

        const disabledDate = time => {
            return time.getTime() > Date.now()
        }

        watch(queryRegion, (newValue) => {
            if (newValue == '') {
                banshichuSelected.value = '';
                queryStreet.value = '';
            }
        })

        onMounted(() => {
            if (window.screen.width > 2000 && window.devicePixelRatio == 1) {
                document.getElementsByClassName('container')[1].style.marginLeft = "750px";
            }
        })

        return {
            editInfo,
            confirmEdit,
            exitEdit,
            confirmAddPerson,
            exitAdd,
            addPerson,
            removePerson,
            backToFirstPage,
            size_change,
            personLocation,
            selectBanshichu,
            queryByCondition,
            queryRecord,
            personDetailInfo,
            selectPersonState,
            selectStreethandleClose,
            selectStreet,
            agencySelected,
            selectStreetConfirm,
            queryStateByCondition,
            disabledDate,
            getRealTimeOnWork,
            selectAgency,
            rules,
            form,
            dialogFormVisible,
            editInfoDialogVisible,
            ruleFormRef,
            addPersonFormRef,
            addPersonDialogVisible,
            polygons,
            patrolList,
            queryName,
            pages,
            patrols,
            total_records,
            current_page,
            page_count,
            banshichuNoneSelectedStyle,
            banshichuSelectedStyle,
            banshichuSelected,
            queryDepartment,
            queryStreet,
            queryIdentity,
            selectIdentityOption,
            person_state,
            personStateSelected,
            selectStreetVisiable,
            banshichu_list,
            regionList,
            queryRegion,
            selectStreetInput,
            record_date,
            emptyText,
            checkState,
            isSelectRealTime,
            agencySelectedStyle,
            record_agency,
            Search,
        }
    },
    components: {
        PhoneFilled,

        Location,
        Document,
        EditPen,
        Delete,
    }
}
</script>

<style scoped>
/* .card {
    margin-top: 8vh;
} */

.select-banshichu-box {
    cursor: pointer;
    margin-bottom: 1vh;
}

.container {
    margin-left: 16vw;
}

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

.allocateFench:hover {
    color: #A0D8FF;
}

.allocateFench,
.allocateFench:focus:not(.allocateFench:hover) {
    color: #409EFF;
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