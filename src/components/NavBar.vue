<template>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

        <div class="container">
            <img src="../assets/img/logo.jpg" alt="" class="navbar-icon">
            <router-link class="navbar-brand" :to="{ name: 'home' }">调度指挥系统
            </router-link>
            <div class="collapse navbar-collapse justify-content-end" id="navbarText">
                <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            指挥调度
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'map_index' }">地图界面</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'patrol_list_index' }">列表模式
                                </router-link>
                             
                            </li>
                        </ul>
           
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'person_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'person_index' }">人员管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'fench_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'fench_index' }">严管街管理</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            共享单车管理
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'bicycle_map_index' }">共享单车管理
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'bicycle_map_index' }">共享单车人员地图界面
                                </router-link>
                             
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'issue_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'issue_index' }">问题处置</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :class="route_name == 'statistical_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'statistical_index' }">统计分析</router-link>
                    </li>
                    <li class="nav-item" v-if="false">
                        <router-link :class="route_name == 'checkin_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'checkin_index' }">签到考勤</router-link>
                    </li>
                </ul>
-->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'map_index' }">大屏</router-link>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button" aria-expanded="false">
                            jinniu
                        </a>
                    </li>

                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            jinniu
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <a class="dropdown-item" href="#" @click="logout">登出</a>
                            </li>

                        </ul>
                    </li> -->
                </ul>

                <!-- <ul class="navbar-nav">
                    <li class="nav-item">
                        退出
                    </li>
                    <li class="nav-item">

                    </li>
                </ul> -->
            </div>
        </div>
    </nav>

    <el-menu class="el-menu-vertical-demo" :router="true" :default-active="$route.path" :unique-opened="true">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>指挥调度</span>
            </template>

            <el-menu-item index="/map-mode/">
                <template #title>地图模式</template>
            </el-menu-item>
            <!-- <el-menu-item index="/patrol-list/">
                <template #title>列表模式</template>
            </el-menu-item> -->
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><user-filled /></el-icon>
                <span>人员管理</span>
            </template>
            <el-menu-item index="/person/">

                <template #title>执法人员</template>
            </el-menu-item>
            <el-menu-item index="/warden-manage/">

                <template #title>协管人员</template>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>严管街管理</span>
            </template>
            <el-menu-item index="/region-list/">
                <template #title>列表模式</template>
            </el-menu-item>
            <el-menu-item index="/fench/">
                <template #title>地图模式</template>
            </el-menu-item>
            <el-menu-item index="/arrive-rate/">
                <template #title>到岗率</template>
            </el-menu-item>

        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <bicycle />
                </el-icon>
                <span>共享单车管理</span>
            </template>
            <el-menu-item index="/bicycle-manage/">
                <template #title>共享单车人员管理</template>
            </el-menu-item>
            <el-menu-item index="/bicycle-map/">
                <template #title>共享单车人员地图界面</template>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/issue-disposal/">
            <template #title>
                <el-icon>
                    <document />
                </el-icon>
                <span>问题处置</span>
            </template>

        </el-menu-item>
        <el-sub-menu index="5">
            <template #title>
                <el-icon>
                    <List />
                </el-icon>
                <span>执法办案</span>
            </template>
            <el-menu-item index="/case-handling/">
                <span>案件办理</span>
            </el-menu-item>
            <el-menu-item index="/case-analysis/">
                <span>案件统计</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
            <template #title>
                <el-icon>
                    <histogram />
                </el-icon>
                <span>统计分析</span>
            </template>
            <el-menu-item index="/person-analysis/">
                <span>人员统计</span>
            </el-menu-item>
            <el-menu-item index="/patrol-analysis/">
                <span>巡查统计</span>
            </el-menu-item>
            <el-menu-item index="/rectify-date-analysis/">
                <span>交办周期统计</span>
            </el-menu-item>
            <el-menu-item index="/region-person-situation/">
                <span>严管街人员达标情况</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
    Document,
    Menu as IconMenu,
    Location,
    UserFilled,
    Histogram,
    Bicycle,
    List
} from '@element-plus/icons-vue'

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        let route_name = computed(() => route.name)

        const logout = () => {
            store.dispatch("logout");
        }

        return {
            route_name,
            logout,
        }
    },
    components: {
        Document,
        Location,
        IconMenu,
        UserFilled,
        Histogram,
        Bicycle,
        List,
    }
}

onMounted(() => {
    for (let item of document.getElementsByTagName('ul')) {
        item.style.zoom = 1 / window.devicePixelRatio;
    }

})
</script>

<style scoped>
img.navbar-icon {
    width: 4vh;
    border-radius: 50%;
}

nav {
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 7vh;
    margin: 0;
    padding: 0;
}

.el-menu-vertical-demo {
    width: 15vw;
    position: fixed;
    z-index: 99;
    padding-top: 8vh;
    height: 100vh;
}


.el-menu-item {
    font-size: 1rem;
}

:deep(.el-sub-menu__title) {
    font-size: 1rem;
}

.glyphicon-bell:before {
    content: "\e123";
}

@media (min-width: 2000px) {
    :deep(.el-sub-menu__title) {
        font-size: 16px;
    }

    :deep(.el-menu-item) {
        font-size: 16px;
    }

    :deep(.navbar-brand) {
        font-size: 20px;
    }

    :deep(.nav-link) {
        font-size: 20px;
    }
}
</style>