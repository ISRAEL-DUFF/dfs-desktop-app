import eventHub from '../utility/eventHub'
import Logger from '../utility/logger'
import loader from './loader'
import domwatch from './domwatch'
import PageComponent from './Page'

let logger = {}
let JsLoaderPlugin = {}
let pluginInstalled = false


// watch for dom changes
domwatch.watchForChanges()


// ****************  INSTALL FUNCTION GOES BELOW ****************
JsLoaderPlugin.install = function(app, options) {
    let jsList = options.jsList || {}
    let cssList = options.cssList || {}
    let preloaderBgColor = options.preloaderBgColor || 'grey'
    let preloader = options.preloader  || {}
    let baseUrl = options.baseUrl || ''
    loader.init(cssList, jsList, baseUrl)
    logger = Logger(options.debug)
    let jsLoaderInited = false
    let cssLoaderInited = false

    // js loader
    app.config.globalProperties.$loadScripts = function(srcName) {
      if(!srcName) return;
        if(!jsLoaderInited) {
            logger.info('Initing Load Script')
            eventHub.$on('load-js', (jsSrc) => {
                logger.info(`******* Loading JS Group ${jsSrc} ********`)
                loader.load('script', jsSrc, () => {
                  eventHub.$emit(`${jsSrc}-load-complete`)
                  logger.info(`******* Done: ${jsList[jsSrc].length} Scripts Loaded ********`)
                })

            })
          
            eventHub.$on('unload-js', (jsSrc)=> {
            logger.info(`******* Removing JS Group ${jsSrc} *******`)
            loader.unload('script', jsSrc)
            eventHub.$emit(`${jsSrc}-unload-complete`)
            logger.info(`******* Done Unloading ********`)
            })

            eventHub.$on('reload-js', (jsSrc) => {
              eventHub.$once(`${jsSrc}-unload-complete`, () => {
                eventHub.$emit('load-js', jsSrc)
              })
              eventHub.$emit('unload-js', jsSrc)
            })

            jsLoaderInited = true
        }

        eventHub.$emit('load-js', srcName)
    }

    app.config.globalProperties.$removeScripts = function(srcName) {
      if(!srcName) return;
      eventHub.$emit('unload-js', srcName)
    }

    app.config.globalProperties.$reloadScripts = function(srcName) {
      if(!srcName) return;
      eventHub.$emit('reload-js', srcName)
    }


      // style sheets
    app.config.globalProperties.$loadStyles = function(srcName, callback) {
      if(!srcName) {
        callback()
        return;
      }

      if(!cssLoaderInited) {
        eventHub.$on('load-css', (cssSrc)=> {
          logger.info(`******* Adding CSS Group ${cssSrc} *******`)
            loader.load('style', cssSrc, () => {
              eventHub.$emit(`${cssSrc}-load-complete`)
              logger.info(`******* Done: ${cssList[cssSrc].length} css files Loaded ********`)
            })

          })
  
          eventHub.$on('unload-css', (cssSrc)=> {
            logger.info(`******* Removing CSS Group ${cssSrc} *******`)
            loader.unload('style', cssSrc)
            eventHub.$emit(`${cssSrc}-unload-complete`)
            logger.info(`******* Done Unloading ********`)
          })

          cssLoaderInited = true
      }

      if(callback) {
        eventHub.$once(`${srcName}-load-complete`, callback)
      }

      eventHub.$emit('load-css', srcName)
    }

    app.config.globalProperties.$removeStyles = function(srcName) {
      if(!srcName) return;
      eventHub.$emit('unload-css', srcName)
    }


    app.config.globalProperties.$loadStylesAndJs = function(cssSrcName, jsSrcName, callback) {
      if(!cssSrcName && !jsSrcName) return;
      if(callback) {
        eventHub.$once(`${jsSrcName}-load-complete`, callback)
      }
      app.config.globalProperties.$loadStyles(cssSrcName, () => {
        app.config.globalProperties.$loadScripts(jsSrcName)
      })
    }


    app.config.globalProperties.$resetWatch = function() {
      domwatch.reset()
    }

    app.config.globalProperties.$pageLoaded = function() {
      return pluginInstalled
    }

    app.config.globalProperties.$enablePageInited = function() {
      pluginInstalled = true
    }

    app.config.globalProperties.$pagePreloader = function() {
      return {
        bgColor: preloaderBgColor,
        component: preloader
      }
    }

    // GLOBAL LEVEL COMPONENT
    app.component('Page', PageComponent)
}
//************** INSTALL END ***************

export default JsLoaderPlugin