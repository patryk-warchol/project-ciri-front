import { defineConfig } from 'umi';
import theme from './src/theme-config';

const routes = [
  {
    path: '/sign-in',
    name: 'signIn',
    hideInMenu: true,
    layout: {
      hideMenu: true,
      hideNav: true,
    },
    component: './Auth/SignIn',
  },
  {
    path: '/user',
    routes: [
      {
        name: 'user.callback',
        path: '/user/callback',
        layout: {
          hideMenu: true,
          hideNav: true,
        },
        component: './Auth/Callback',
      },
    ],
  },
  { path: '/', component: '@/pages/index' },
  {
    path: '/shopping/items',
    name: 'shoppingItems',
    component: '@/pages/shopping/items/index',
  },
];

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  theme,
  locale: {
    antd: true,
    baseNavigator: false,
    title: true,
    default: 'fr-FR',
  },
  layout: {
    name: 'L&P',
    navTheme: 'light',
    locale: true,
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    splitMenus: false,
    menu: {
      locale: true,
    },
  },
});
