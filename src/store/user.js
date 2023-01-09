import axios from "axios";

export default {
    state: {
        id: "",
        roleId: "",
        username: "",
        name: "",
        token: "",
        tokenHeader: "",
        telephone: "",
        is_login: false,
        department: "",
        socket: null,
        replyMessage: [],
    },
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket;
        },
        updateUser(state, user) {
            state.id = user.id;
            state.name = user.name;
            state.telephone = user.telephone;
            state.department = user.department;
            state.is_login = user.is_login;
        },
        updateLoginInfo(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.roleId = user.roleId;
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
                    phone: data.name,
                    password: data.password,
                },
            }).then(function (resp) {
                if (resp.status == 200) {
                    // localStorage.setItem("jwt_tokenHeader", resp.data.data.tokenHead);
                    // localStorage.setItem("jwt_token", resp.data.data.token);
                    context.commit('updateToken', resp.data.data.token);
                    context.commit('updateTokenHeader', resp.data.data.tokenHead);
                    context.commit("updateLoginInfo", {
                        id: resp.data.data.id,
                        roleId: resp.data.data.roleId,
                        username: resp.data.data.username,
                        // telephone: resp.data.data.telephone,
                        //department: resp.data.data.department,
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
                url: '/api/patrol/get_by_phone',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: context.state.tokenHeader + context.state.token,
                },
                data: JSON.stringify({
                    phone: '',
                })
            }).then(function (resp) {

                if (resp.data.code == 2000) {
                    context.commit("updateUser", {
                        id: resp.data.data.id,
                        name: resp.data.data.name,
                        telephone: resp.data.data.telephone,
                        department: resp.data.data.department,
                        is_login: true,
                    });
                    data.success(resp.status);
                } else {
                    data.error(resp.status);
                }
            }).catch(function (error) {
                data.error(error);
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