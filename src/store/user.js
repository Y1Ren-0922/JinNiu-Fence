import axios from "axios";

export default {
    state: {
        id: "",
        username: "",
        token: "",
        tokenHeader: "",
        telephone: "",
        is_login: false,
        socket: null,
        replyMessage: [],
    },
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket;
        },
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.telephone = user.telephone,
                state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        updateTokenHeader(state, tokenHeader) {
            state.tokenHeader = tokenHeader;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.token = "";
            state.is_login = false
        },
    },
    actions: {
        login(context, data) {
            axios({
                url: '/api/auth/loginV2',
                method: 'post',
                data: {
                    name: data.name,
                    password: data.password,
                },
            }).then(function (resp) {
                if (resp.status == 200) {

                    localStorage.setItem("jwt_tokenHeader", resp.data.data.tokenHead);
                    localStorage.setItem("jwt_token", resp.data.data.token);
                    context.commit('updateToken', resp.data.data.token);
                    context.commit('updateTokenHeader', resp.data.data.tokenHead);
                    context.commit("updateUser", {
                        id: resp.data.data.id,
                        roleId: resp.data.data.roleId,
                        username: resp.data.data.username,
                        telephone: resp.data.data.telephone,
                        is_login: true,
                    });
                    data.success(resp);
                } else {
                    data.error(resp);
                }
            })
        },
        getInfo(context, data) {
            axios({
                url: '/api/info',
                method: 'get',
                headers: {
                    Authorization: context.state.tokenHeader + context.state.token,
                },
            }).then(function (resp) {
                if (resp.data.data.error_message == "success") {
                    context.commit("updateUser", {
                        id: resp.data.data.id,
                        roleId: resp.data.data.roleId,
                        username: resp.data.data.username,
                        telephone: resp.data.data.telephone,
                        is_login: true,
                    });
                    data.success(resp.status);
                } else {
                    data.error(resp.status);
                }
            })
        },

        logout(context) {
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("jwt_tokenHeader");

            context.commit("logout");
            context.commit("updateSocket", null);
        },

    }

}