import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NoWinget from "../views/NoWinget.vue";
import PackageDetails from "../views/PackageDetails.vue";
import Sources from "../views/Sources.vue";
import AddSource from "../views/AddSource.vue";

Vue.use(VueRouter);

export const RouteNames = {
  Home: 'Home',
  Package: 'Package',
  NoWinget: 'NoWinget',
  About: 'About',
  Sources: 'Sources',
  AddSource: 'AddSource'
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: Home
  },
  {
    path: "/no-winget",
    name: RouteNames.NoWinget,
    component: NoWinget
  },
  {
    path: "/package/:id/:version?",
    name: RouteNames.Package,
    props: true,
    component: PackageDetails
  },
  {
    path: "/sources",
    name: RouteNames.Sources,
    component: Sources
  },
  {
    path: "/sources/add",
    name: RouteNames.AddSource,
    component: AddSource
  },
  {
    path: '/about',
    name: RouteNames.About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
