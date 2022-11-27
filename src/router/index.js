import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView'
import PersonManage from '../views/PersonManage'
import FenchManage from '../views/FenchManage'
import CheckAttendance from '../views/CheckAttendance'
import UserLoginView from '../views/UserLoginView'
import NotFound from '../views/NotFound'
import BicycleSharing from '../views/BicycleSharing'
import StatisticalAnalysis from '../views/StatisticalAnalysis'
import IssueDisposal from '../views/IssueDisposal'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/map/",
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/login/',
    name: 'user_login_index',
    component: UserLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/map/',
    name: 'map_index',
    component: MapView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/bicycle-map/',
    name: 'bicycle_map_index',
    component: BicycleSharing,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/person/',
    name: 'person_index',
    component: PersonManage,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/fench/',
    name: 'fench_index',
    component: FenchManage,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/statistical-analysis/',
    name: 'statistical_index',
    component: StatisticalAnalysis,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/issue-disposal/',
    name: 'issue_index',
    component: IssueDisposal,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/checkin/',
    name: 'checkin_index',
    component: CheckAttendance,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.user.is_login && to.meta.requestAuth) {
    next({ name: "user_login_index" });
  } else {
    next();
  }
})

export default router
