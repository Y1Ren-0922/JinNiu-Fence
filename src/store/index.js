import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleMap from './map'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    map: ModuleMap,
  }
})
