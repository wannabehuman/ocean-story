import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import RankingAdmin from '@/components/RankingAdmin.vue'
import RankingFin from '@/components/RankingFin.vue'
import NicknameReg from '@/components/NicknameReg.vue'
import FishMission from '@/components/FishMission.vue'
import AboutUs from '@/components/AboutUs.vue'
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/rankingAdmin',
    name: 'RankingAdmin',
    component: RankingAdmin
  },
  {
    path: '/rankingFin',
    name: 'RankingFin',
    component: RankingFin
  },
  {
    path: '/nicknameReg',
    name: 'NicknameReg',
    component: NicknameReg
  },
  {
    path: '/fishMission',
    name: 'FishMission',
    component: FishMission
  },
  {
    path: '/fishMission/:nickname',
    name: 'FishMissionWithNickname',
    component: FishMission
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: AboutUs
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
