import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button,
  Field,
  Cell,
  CellGroup,
  Toast,
  List,
  NavBar,
  Tab,
  Tabs,
  ImagePreview,
  Tabbar,
  TabbarItem,
  Card,
  Dialog,
  Icon,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  DatetimePicker,
  Popup
} from 'vant'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts)

/** highchart注册 */
Vue.use(VueHighcharts, { Highcharts })

/** vant组件注册 */
Vue.use(Button)
.use(Cell)
.use(CellGroup)
.use(Field)
.use(Toast)
.use(List)
.use(NavBar)
.use(Tab)
.use(Tabs)
.use(ImagePreview)
.use(Tabbar)
.use(TabbarItem)
.use(Card)
.use(Dialog)
.use(Icon)
.use(Step)
.use(Steps)
.use(Checkbox)
.use(CheckboxGroup)
.use(RadioGroup)
.use(Radio)
.use(DatetimePicker)
.use(Popup)

/** 自定义字体 */
require('./assets/css/font.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
