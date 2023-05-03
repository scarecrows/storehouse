import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: "home"
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('../views/home/index')
  },
  {
    path: '/setting',
    name: 'setting',
    component: ()=>import('../views/setting/index'),
    children:[
      {
        path:'/setting/tube',
        name:'settingTube',
        component: ()=>import('../views/setting/tube'),
      },
      {
        path:'/setting/fastening',
        name:'settingFastening',
        component: ()=>import('../views/setting/fastening'),
      },
      {
        path:'/setting/splice',
        name:'settingSplice',
        component: ()=>import('../views/setting/splice'),
      },
      {
        path:'/setting/jacking',
        name:'settingJacking',
        component: ()=>import('../views/setting/jacking'),
      },
      {
        path:'/setting/unit',
        name:'settingUnit',
        component: ()=>import('../views/setting/unit'),
      },
    ]
  },
  {
    path: '/template',
    name: 'template',
    component: ()=>import('../components/template'),
    children:[
      {
        path:'/shipment',
        name:'shipment',
        component: ()=>import('../views/shipment/index'),
      },
      {
        path:'/refund',
        name:'refund',
        component: ()=>import('../views/refund/index'),
      },
      {
        path:'/close',
        name:'close',
        component: ()=>import('../views/close/index'),
      },
      {
        path:'/inventory',
        name:'inventory',
        component: ()=>import('../views/inventory/index'),
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
