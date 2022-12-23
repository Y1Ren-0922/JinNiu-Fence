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
import PersonDetailInfo from '../views/PersonDetailInfo'
import PersonAnalysis from '../views/PersonAnalysis'
import PatrolAnalysis from '../views/PatrolAnalysis'
import RectifyDateAnalysis from '../views/RectifyDateAnalysis'
import BicyclePersonManage from '../views/BicyclePersonManage'
import ProblemDetail from '../components/ProblemDetail'
import RegionListManage from '../views/RegionListManage'
import MapMode from '../views/MapMode'
import WardenManage from '../views/WardenManage'
import RegionArriveRate from '../views/RegionArriveRate'
import CaseHandling from '../views/CaseHandling'
import CaseAnalysis from '../views/CaseAnalysis'
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
    path: '/warden-manage/',
    name: 'warden_index',
    component: WardenManage,
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
    path: '/person-detail/',
    name: 'person_detail_index',
    component: PersonDetailInfo,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/problem-detail/',
    name: 'problem_detail_index',
    component: ProblemDetail,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/case-handling/',
    name: 'case_handling_index',
    component: CaseHandling,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/case-analysis/',
    name: 'case_analysis_index',
    component: CaseAnalysis,
    meta: {
      requestAuth: true,
    }
  },

  {
    path: '/bicycle-manage/',
    name: 'bicycle_person_manage',
    component: BicyclePersonManage,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/arrive-rate/',
    name: 'region_arrive_rate',
    component: RegionArriveRate,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/map-mode/',
    name: 'map_mode_index',
    component: MapMode,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/person-analysis/',
    name: 'person_analysis_index',
    component: PersonAnalysis,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/patrol-analysis/',
    name: 'patrol_analysis_index',
    component: PatrolAnalysis,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/rectify-date-analysis/',
    name: 'rectify_date_analysis_index',
    component: RectifyDateAnalysis,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/region-list/',
    name: 'region_list_index',
    component: RegionListManage,
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
