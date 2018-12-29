import Main from '@/components/HelloWorld.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        name: 'home_index',
        redirect: '/home/allguessing',
        component: () => import('@/components/home/index'),
        children:[ {
                path: 'allguessing',
                name: 'home_index_allguessing',
                component: () => import('@/components/home/record/Allguessing.vue'),
            },{
                path: 'myguessing',
                name: 'home_index_myguessing',
                component: () => import('@/components/home/record/Myguessing.vue'),
            },{
                path: 'history',
                name: 'home_index_history',
                component: () => import('@/components/home/record/History.vue'),
            },] },
      { path: 'home/help', title: {i18n: 'help'}, name: 'help_index', component: () => import('@/components/help/help') },
      { path: 'home/faq', title: {i18n: 'faq'}, name: 'faq_index', component: () => import('@/components/faq/faq') },
      { path: 'home/agent', title: {i18n: 'agent'}, name: 'agent_index', component: () => import('@/components/agent/agent') },
        { path: 'home/agentapply', title: {i18n: 'agentapply'}, name: 'agentapply_index', component: () => import('@/components/agentapply/agentapply') },
      { path: 'home/download', title: {i18n: 'download'}, name: 'download_index', component: () => import('@/components/download/download') },
        { path: 'home/ranklist', title: {i18n: 'ranklist'}, name: 'ranklist_index', component: () => import('@/components/ranklist/ranklist') },
    ],
};
//download
export const agentsystem = {
  path: '/agentsystem',
  name: 'agentsystem',
  component: () => import('@/components/agentsystem/agentsystem.vue')
};
//历史查询校验
export const checkaward = {
    path: '/checkaward',
    name: 'checkaward',
    component: () => import('@/components/checkaward/checkaward.vue')
};
// export const agent = {
//     path: '/agent',
//     name: 'agent',
//     component: () => import('@/components/agent/agent')
// };
// export const faq = {
//     path: '/faq',
//     name: 'faq',
//     component: () => import('@/components/faq/faq')
// };
// export const help = {
//     path: '/help',
//     name: 'help',
//     component: () => import('@/components/help/help')
// };
// export const loginpage = {  //登录
//     path: '/login',
//     name: 'login',
//     meta: {
//         title: '登录'
//     },
//     component: () => import('@/components/changetixian.vue')
// };



const routers = [
    otherRouter,
    agentsystem,
    checkaward
    // download,
    // agent,
    // faq,
    // help
    // loginpage,
    // registerpage,
    // forgetpwdpage,
    // errorpage,
    // adminset  //前台设置
];

// 所有上面定义的路由都要写在下面的routers里
export default  routers;



// WEBPACK FOOTER //
// ./src/router/router.js