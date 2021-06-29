<template>
  <div class="">
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

  mounted() {
    // let jsList = {
    //   'commonJs': [
    //     "js/jquery.min.js", "js/popper.min.js", "js/moment.min.js", 
    //     "js/bootstrap.min.js", "js/simplebar.min.js", 'js/daterangepicker.js',
    //     'js/jquery.stickOnScroll.js', "js/tinycolor-min.js", "js/config.js",
    //     "js/apps.js"
    //   ],

    //   'chartJs': [
    //     "js/d3.min.js", "js/topojson.min.js", "js/datamaps.all.min.js", "js/datamaps-zoomto.js",
    //     "js/datamaps.custom.js", "js/Chart.min.js", "js/gauge.min.js", "js/jquery.sparkline.min.js",
    //     "js/apexcharts.min.js", "js/apexcharts.custom.js", /*"js/apps.js"*/
    //   ]
    // }


    // eventHub.$on('load-js', (jsSrc) => {
    //   if(!jsSrc || !jsList[jsSrc]) return;
    //   console.log(`******* Loading JS Group ${jsSrc} ********`)
      
    //   let i = 0;
    //   function loadScript() {
    //     if(i < jsList[jsSrc].length) {
    //       const src = jsList[jsSrc][i++]
    //       if(!document.getElementById(src)) {
    //         const s = document.createElement('script');
    //         s.type = 'text/javascript';
    //         s.src = `/static/${src}`;
    //         s.id = `${src}`;
    //         document.body.appendChild(s);
    //         s.onload = loadScript
    //       }
    //       loadScript()
    //     }
    //   }
    //   loadScript()

    //   console.log(`******* Done ********`)
    // })

    // eventHub.$on('unload-js', (jsSrc)=> {
    //   if(!jsSrc || !jsList[jsSrc]) return;
    //   console.log(`******* Removing JS Group ${jsSrc} *******`)
    //   for(let src of jsList[jsSrc]) {
    //     let js = document.getElementById(`/static/${src}`);
    //     if(js) {
    //       js.remove()
    //       console.log(`Unloaded js: ${src}`)
    //     }
    //   }
    //   console.log(`******* Done ********`)
    // })
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */


 .p2p-bg-grad {
      background: linear-gradient(#1F2630, #01193a)
  }

  .p2p-bg {
      background-color: #1F2630;
  }

  .p2p-input {
      background-color: #1F2630 !important;
      color: white !important;
      padding: 0px !important;
      height: 25px !important;
      border-radius: 0px !important;
      border-bottom-style: solid !important;
      border-top-style: hidden !important;
      border-left-style: hidden !important;
      border-right-style: hidden !important;
      border-color: rgba(211, 204, 204, 0.226) !important;
  }

  .p2p-label {
      color: white;
      /* font-size: bold; */
      margin-bottom: 0px !important;
      margin-top: 0px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
      font-size: 14px;
  }

  .p2p-button {
      border-radius: 70px !important;
      border-style: solid;
  }

  .login-button {
      width: 200px;
      margin: auto !important;
  }

  .p2p-box {
      padding: 25px;
  }
</style>
