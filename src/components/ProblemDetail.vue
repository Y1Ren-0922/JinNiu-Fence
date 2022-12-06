<template>
    <div class="container">
        <div class="row">
            <div class="card select-box">
                <div class="card-body">
                    <div class="show-item">
                        <span class="input-title-left">发布时间</span>
                        <el-input style="width: 20vw;" v-model="postDate" disabled size="large" />

                        <span class="input-title-left">当前问题状态</span>
                        <el-input style="width: 20vw;" v-model="problemState" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">发布人</span>
                        <el-input style="width: 20vw;" v-model="postPatrol" disabled size="large" />

                        <span class="input-title-left">所属部门</span>
                        <el-input style="width: 20vw;" v-model="agency" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">所属区域</span>
                        <el-input style="width: 50vw;" v-model="region" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">问题描述</span>
                        <el-input style="width: 50vw;" v-model="problemDescription" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">处理人</span>
                        <el-input style="width: 20vw;" v-model="handler" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">处理期限</span>
                        <el-input style="width: 20vw;" v-model="rectifyDate" disabled size="large" />
                    </div>

                    <div class="show-item">
                        <span class="input-title-left">现场照片</span>
                        <div class="image-box">
                            <div class="image-item">
                                <el-image style="width: 10vw; height: 10vw" :src="imageUrl" :fit="imageFit" />

                            </div>
                            <div class="image-item">
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
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const postDate = ref('2022-08-11 00:00:00');
const rectifyDate = ref('2022-09-01 00:00:00');
const postPatrol = ref('张三');
const agency = ref('抚琴');
const region = ref('抚琴西路（一环路口-二环路口）');
const problemDescription = ref('这里是问题描述');
const problemState = ref('处理中');
const imageUrl = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg');
const imageUrl1 = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg');
const imageFit = 'scale-down';
const handler = ref('李四');

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
</style>