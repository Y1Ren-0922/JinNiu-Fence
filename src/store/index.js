import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleMap from './map'
import ModuleDerective from './derective'

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
    derective: ModuleDerective,
  }
})
