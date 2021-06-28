import { createApp } from 'vue'
import App from './App.vue'

import "@/assets/vendor/css/simplebar.css"
import "@/assets/vendor/css/feather.css"
import "@/assets/vendor/css/daterangepicker.css"
import "@/assets/vendor/css/app-light.css"
import "@/assets/vendor/css/app-dark.css"
import "@/assets/vendor/css/google-fonts.css"
import router from './router'
import store from './store'

// import LoadScript from 'vue-plugin-load-script';


// import jQuery from 'jquery'
// global.$ = jQuery
// window.$ = jQuery
// window.jQuery = jQuery;


let js = [
    /*"js/jquery.min.js",*/ "js/popper.min.js", "js/moment.min.js", 
    "js/bootstrap.min.js", "js/simplebar.min.js", 'js/daterangepicker.js',
    'js/jquery.stickOnScroll.js', "js/tinycolor-min.js", "js/config.js",
    "js/d3.min.js", "js/topojson.min.js", "js/datamaps.all.min.js", "js/datamaps-zoomto.js",
    "js/datamaps.custom.js", "js/Chart.min.js", "js/gauge.min.js", "js/jquery.sparkline.min.js",
    "js/apexcharts.min.js", "js/apexcharts.custom.js", "js/apps.js"]

for(let src of js) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `/static/${src}`;
    s.id = `${src}`;
    document.body.appendChild(s);
    console.log("Take it:", src);
}

createApp(App).use(store).use(router).mount('#app')
