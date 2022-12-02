import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



createApp(App).use(store).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
