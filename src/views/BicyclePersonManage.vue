<template>
    <div class="container">
        <div class="row">
            <div class="col-10">
                <div class="card select-box">

                    <div class="card-body">
                        <el-row :gutter="12">
                            <el-col v-for="(item, idx) in person_state" :key="idx" :span="2.5" class="select-state-box">
                                <el-card shadow="always"
                                    :body-style="personStateSelected == item ? personStateSelectedStyle : personStateNoneSelectedStyle">
                                    <span>{{ item }}</span>
                                    <div class="state-number">20</div>
                                </el-card>
                            </el-col>

                        </el-row>
                        <hr>
                        <el-row :gutter="12">
                            <el-col v-for="(item, idx) in company_list" :key="idx" :span="2.5" class="select-state-box">
                                <el-card shadow="always"
                                    :body-style="companySelected == item ? companySelectedStyle : personStateNoneSelectedStyle">
                                    <span>{{ item }}</span>
                                    <div class="state-number">20</div>
                                    <div class="should-arrive">应到: 25</div>
                                </el-card>
                            </el-col>

                        </el-row>
                        <hr>

                        <el-input style="width: 20%" class="select-text-box" v-model="queryName" placeholder="请输入人员姓名"
                            clearable size="large">
                        </el-input>

                        <!-- <el-select v-model="companySelected" class="select-text-box " placeholder="请选择所属公司" size="large"
                            style=" width: 22%;" clearable>
                            <el-option v-for="item in companyOption" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select> -->

                        <el-button type="primary" :icon="Search" size="large">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="col-10">
                <div class="card person-list">
                    <div class="card-body">

                        <el-table :data="bicyclePersonList" style="width: 100%;font-size: 1.1rem;">
                            <el-table-column fixed prop="name" label="姓名" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="company" label="所属公司" width="120" header-align="center"
                                align="center" />
                            <el-table-column prop="idNumber" label="身份证号" width="220" header-align="center"
                                align="center" />
                            <el-table-column prop="regionResponsibity" label="责任区域" width="180" header-align="center"
                                align="center" />
                            <el-table-column prop="telephone" label="联系电话" width="200" header-align="center"
                                align="center" />
                            <el-table-column fixed="right" label="操作" width="120" header-align="center" align="center">
                                <template #default>
                                    <el-button link type="primary" size="small" style="font-size:1rem;">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>


                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Search } from "@element-plus/icons-vue";

const queryName = ref('');
const personStateSelected = ref('全部');
const companySelected = ref('全部');
const person_state = ["全部", "应到", "在岗在位"];
const company_list = ["全部", "美团", "哈罗", "青桔"];
const companySelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background: linear-gradient(white, #1E90FF); color: white;");
const personStateNoneSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; ");
const personStateSelectedStyle = ref("text-align: center; padding-top: 10px; padding-bottom:10px; background-color: #0D6EFD; color: white;");
const bicyclePersonList = reactive([
    {
        name: '张三',
        company: '美团',
        idNumber: '620102200908227003',
        regionResponsibity: '抚琴',
        telephone: '12345678978'
    }
]);

// const companyOption = [
//     {
//         value: '美团',
//         label: '美团',
//     },
//     {
//         value: '哈罗',
//         label: '哈罗',
//     },
//     {
//         value: '青桔',
//         label: '青桔',
//     },
// ]
</script>

<style scoped>
.container {
    margin-left: 16vw;
}

.select-box {
    margin-top: 8vh;
    margin-bottom: 2vh;
}

.select-text-box {
    margin-right: 1vw;
}

.select-state-box {
    cursor: pointer;
}

.should-arrive {
    font-size: 0.5rem;
}
</style>