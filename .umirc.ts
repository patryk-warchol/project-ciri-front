import { defineConfig } from 'umi';

const routes = [
  { path: '/', component: '@/pages/index' },
  {
    path: '/shopping/items',
    name: 'shoppingItems',
    component: '@/pages/shopping/items/index',
  },
]

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
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
