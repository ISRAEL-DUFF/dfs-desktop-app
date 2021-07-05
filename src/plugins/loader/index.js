import eventHub from '../utility/eventHub'
import Logger from '../utility/logger'
import LoaderComponent from './Loader'

let logger = {}
let JsLoaderPlugin = {}


let jsLoadStatus = {}
let cssLoadStatus = {}

let jsList =  {}
let cssList =  {}

function create(createType) {
  function createScript(path, loadCb, readyCb, errorCb) {
    if(!document.getElementById(path)) {
      var scr = document.createElement('script');
      scr.type = 'text/javascript';
      scr.onload = loadCb;
      scr.onreadystatechange = function() { readyCb(scr) };
      scr.onerror = errorCb;
      scr.src = path;
      scr.id = path;
      document.body.appendChild(scr);
    }
  }
  
  function createStyle(src, loadCb, readyCb, errorCb) {
    if(!document.getElementById(src)) {
      let file = document.createElement('link');
      file.rel = 'stylesheet';
      file.href = `${src}`
      file.id = `${src}`
      file.onload = loadCb
      file.onreadystatechange = function() { readyCb(file) };
      file.onerror = errorCb
      document.head.appendChild(file)
    }
  }

  if(createType === 'script') return createScript
  else if(createType === 'style') return createStyle
  else return null
}

function loadScript(path, createFn, callback) {
  var done = false;

  function handleLoad() {
      if (!done) {
          done = true;
          logger.info('loaded:', path)
          callback(path, "ok");
      }
  }

  function handleReadyStateChange(scr) {
      var state;

      if (!done) {
          state = scr.readyState;
          if (state === "complete") {
            logger.info('Completed', scr.src);
              handleLoad();
          }
      }
  }
  function handleError() {
      if (!done) {
          done = true;
          callback(path, "error");
      }
  }

  // call the create function with the appropriate callbacks
  createFn(path, handleLoad, handleReadyStateChange, handleError)
}

function loadList(srcName, listType, i, callback) {
  {
    let list = []
    if(listType === 'script') {
      if(!jsLoadStatus[srcName]) return callback()
      list = jsList[srcName]
    } 
    else if(listType === 'style') {
      if(!cssLoadStatus[srcName]) return callback()
      list = cssList[srcName]
    }

    loadScript(list[i], create(listType), function(src, status)
    {
      if(status === 'error') logger.error('Failed to load:', src)

      if(i < list.length-1)
      {
        loadList(srcName, listType, i+1, callback);  
      }
      else {
        if(listType === 'script') jsLoadStatus[srcName] = false
        else if(listType === 'style') cssLoadStatus[srcName] = false
        callback();
      }
    })
  }
}

function prettyLoadList(srcName, listType, callback){
  loadList(srcName, listType, 0, callback);  // 0 is the beginning index
}


// ****************  INSTALL FUNCTION GOES BELOW ****************
JsLoaderPlugin.install = function(app, options) {
    jsList = options.jsList || {}
    cssList = options.cssList || {}
    logger = Logger(options.debug)
    let jsLoaderInited = false
    let cssLoaderInited = false

    // js loader
    app.config.globalProperties.$loadScripts = function(srcName) {
      if(!srcName) return;
        if(!jsLoaderInited) {
            logger.info('Initing Load Script')
            eventHub.$on('load-js', (jsSrc) => {
                if(!jsSrc || !jsList[jsSrc]) return;
                logger.info(`******* Loading JS Group ${jsSrc} ********`)
                jsLoadStatus[jsSrc] = true;
                prettyLoadList(jsSrc, 'script', () => {
                  eventHub.$emit(`${jsSrc}-load-complete`)
                  logger.info(`******* Done: ${jsList[jsSrc].length} Scripts Loaded ********`)
                })

            })
          
            eventHub.$on('unload-js', (jsSrc)=> {
            if(!jsSrc || !jsList[jsSrc]) return;
            logger.info(`******* Removing JS Group ${jsSrc} *******`)
            for(let src of jsList[jsSrc]) {
                let js = document.getElementById(`${src}`);
                if(js) {
                  js.remove()
                  logger.info(`Unloaded js: ${src}`)
                }
            }
            jsLoadStatus[jsSrc] = false;
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
          if(!cssSrc || !cssList[cssSrc]) return;
          logger.info(`******* Adding CSS Group ${cssSrc} *******`)
          cssLoadStatus[cssSrc] = true;
            prettyLoadList(cssSrc, 'style', () => {
              eventHub.$emit(`${cssSrc}-load-complete`)
              logger.info(`******* Done: ${cssList[cssSrc].length} css files Loaded ********`)
            })

          })
  
          eventHub.$on('unload-css', (cssSrc)=> {
            if(!cssSrc || !cssList[cssSrc]) return;
            logger.info(`******* Removing CSS Group ${cssSrc} *******`)
            for(let src of cssList[cssSrc]) {
              let css = document.getElementById(`${src}`);
              if(css) {
                css.remove()
                logger.info(`Unloaded css: ${src}`)
              }
            }
            cssLoadStatus[cssSrc] = false;
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



    // GLOBAL LEVEL COMPONENT
    app.component('Page', LoaderComponent)
}
//************** INSTALL END ***************

export default JsLoaderPlugin