import { createApp } from 'vue'
import App from './App.vue'
import myPlugin from '@/plugins'

import "@/assets/vendor/css/simplebar.css"
import "@/assets/vendor/css/feather.css"
import "@/assets/vendor/css/daterangepicker.css"
import "@/assets/vendor/css/app-light.css"
import "@/assets/vendor/css/app-dark.css"
import "@/assets/vendor/css/google-fonts.css"
import router from './router'
import store from './store'

// import LoadScript from 'vue-plugin-load-script';

import Preloader from '@/components/PreLoader'


// import jQuery from 'jquery'
// global.$ = jQuery
// window.$ = jQuery
// window.jQuery = jQuery;


let jsList = {
  'commonJs': [
    "/static/js/jquery.min.js", 
    "/static/js/popper.min.js", 
    "/static/js/moment.min.js", 
    "/static/js/bootstrap.min.js", 
    "/static/js/simplebar.min.js", 
    '/static/js/daterangepicker.js',
    '/static/js/jquery.stickOnScroll.js', 
    "/static/js/tinycolor-min.js", 
    "/static/js/config.js",
    "/static/js/apps.js"
  ],

  'chartJs': [
    "js/d3.min.js", "js/topojson.min.js", "js/datamaps.all.min.js", "js/datamaps-zoomto.js",
    "js/datamaps.custom.js", "js/Chart.min.js", "js/gauge.min.js", "js/jquery.sparkline.min.js",
    "js/apexcharts.min.js", "js/apexcharts.custom.js", /*"js/apps.js"*/
  ],

  'filePanelJs': ['js/customjs/filePanel.js'],

  'homePageJs': [
    '/neumorphic/bootstrap-5.0.2-dist/js/bootstrap.bundle.js',
  ]
}

let cssList = {
  'loginCss': ["/static/css/dashboard/app-dark.css"],
  'dashboardCss': [
    '/static/css/dashboard/simplebar.css',
    "/static/css/dashboard/feather.css",
    "/static/css/dashboard/daterangepicker.css",
    "/static/css/dashboard/app-dark.css",
    "/static/css/dashboard/google-fonts.css"
  ],
  'homePageCss': [
    "/neumorphic/bootstrap-5.0.2-dist/css/bootstrap.min.css",
    '/neumorphic/neumorph.css'
  ]
}

createApp(App).
use(store).use(router).
use(myPlugin.EventHub).
use(myPlugin.VueExtend).
use(myPlugin.Page, { jsList, cssList, 
  preloaderBgColor: 'black', preloader: Preloader, 
  debug: true }).
use(myPlugin.InfiniteScroll).
mount('#app')
