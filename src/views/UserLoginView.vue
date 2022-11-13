<template>
    <div class="login-wrap">
        <div class="ms-title">
            <el-avatar class="ms-logo" style="width: 100px; height: 100px" :src="require('@/assets/img/login-img.jpg')">
            </el-avatar>
            <div class="login-title">综合执法调度指挥平台</div>
        </div>
        <!--      定时触发表单显示-->
        <div class="ms-login">
            <transition name="fade">
                <el-form :model="params" class="ms-content" v-if="seen">
                    <el-form-item>
                        <el-input v-model="params.username" placeholder="用户名">
                            <template #prepend>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" v-model="params.password" placeholder="密码">
                            <template #prepend>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>

                    <!-- 找回密码 -->

                    <div class="login-btn">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form>
            </transition>
        </div>
        <div class="ms-bottom">成都市金牛区综合行政执法局</div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { useStore } from "vuex";
import router from '@/router'


export default {
    setup() {
        const store = useStore();

        const seen = ref(true)
        //   const Base64 = require("js-base64").Base64
        const params = reactive({
            username: "",
            password: ""
        })

        let checked = ref(false);

        const jwt_token = localStorage.getItem("jwt_token");
        const tokenHead = localStorage.getItem('jwt_tokenHeader');
        if (jwt_token && tokenHead) {
            store.commit("updateToken", jwt_token);
            store.commit("updateTokenHeader", tokenHead);
            store.dispatch("getInfo", {
                success() {
                    // const socketUrl = `ws://101.37.246.72:9090/websocket/admin${store.state.user.telephone}`;
                    // console.log(socketUrl);
                    // socket = new WebSocket(socketUrl);
                    // socket.onopen = () => {
                    //     console.log("websocket connected!");
                    //     store.commit("updateSocket", socket);
                    // }

                    // socket.onmessage = msg => {
                    //     console.log(msg);
                    // }

                    // socket.onclose = () => {
                    //     console.log("websocket disconnected!");
                    // }

                    router.push({ name: "home" });
                },
                error() {
                    console.log("获取用户出错");
                }
            })
            router.push({ name: 'home' });
        }

        const login = () => {
            store.dispatch("login", {
                username: params.username,
                password: params.password,
                success() {
                    store.dispatch("getInfo", {
                        success() {
                            // const socketUrl = `ws://101.37.246.72:9090/websocket/admin${store.state.user.telephone}`
                            // socket = new WebSocket(socketUrl);
                            // socket.onopen = () => {
                            //     console.log("websocket connected!");
                            //     store.commit("updateSocket", socket);
                            // }

                            // socket.onmessage = msg => {
                            //     console.log(msg);
                            // }

                            // socket.onclose = () => {
                            //     console.log("websocket disconnected!");
                            // }
                            router.push({ name: "home" });
                        },
                        error() {
                            console.log("获取用户出错");
                        }
                    });

                }
            })
        }

        return {
            seen,
            params,
            checked,
            login,
        }
    },

    components: {
        User,
        Lock,
    }
}
</script>

<style scoped>
.el-checkbox {
    margin-top: -10px;
    margin-bottom: 10px;
    color: #fff;
    size: "medium";
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/img/login-bg.jpg);
    background-size: 100%;
}


.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    /* background: rgba(255, 255, 255, 0.3); 
     border-style: solid; 
     border-color: #fff; */
    overflow: hidden;
}

.ms-title {
    position: absolute;
    left: 40%;
    top: 40%;
    margin: -220px 0 0 -195px;
    line-height: 50px;
    text-align: center;
    font-size: 70px;
    color: #fff;
    display: flex;
    padding: 5px;

}

.login-title {

    padding: 15px;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.ms-bottom {
    position: absolute;
    left: 43%;
    bottom: 200px;
    margin: -190px 0 0 -175px;
    line-height: 50px;
    /* text-align: center; */
    font-size: 48px;
    color: #fff;
    font-family: LOGO;
}

/*表单fade显示*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>