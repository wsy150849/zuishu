import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Category from '../views/Category'
import Selection from '../views/Selection'
import Rank from '../views/Rank'
import Booklist from '../views/Booklist'
import Details from '../views/bookdetails/Details'
import Chapterdetails from '../views/bookdetails/Chapterdetails'
import ClassifyInfo from '../views/booksclassift/ClassifyInfo'
import Rankinglist from '../views/rankinglist/Rankinglist'
import Readbook from '../views/bookdetails/Readbook'
import Searchbook from '../views/search/Searchbook'
import MoreChapters from '../views/bookdetails/MoreChapters'


Vue.use(VueRouter)

// 报NavigationDuplicated的可能解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categroy',
    name: 'Category',
    component: Category
  },
  {
    path: '/selection',
    name: 'Selection',
    component: Selection
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/booklist',
    name: 'Booklist',
    component: Booklist
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
    props: true
  },
  {
    path: '/chapter/:id',
    name: 'Chapterdetails',
    component: Chapterdetails,
    props: true
  },
  {
    path: '/classifyinfo/:major?/:mins?/:gender',
    name: 'ClassifyInfo',
    component: ClassifyInfo,
    props: true
  },
  {
    path: '/ranking/:rankingId',
    name: 'Rankinglist',
    component: Rankinglist,
    props: true
  },
  {
    path: '/read/',
    name: 'Readbook',
    component: Readbook,
  },
  {
    path: '/search',
    name: 'Searchbook',
    component: Searchbook
  },
  {
    path:'/morechapters',
    name:'MoreChapters',
    component:MoreChapters
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: "history"
})

export default router
