
let jsList =  {}
let cssList =  {}

let jsLoadStatus = {}
let cssLoadStatus = {}

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
            // logger.info('loaded:', path)
            callback(path, "ok");
        }
    }
  
    function handleReadyStateChange(scr) {
        var state;
  
        if (!done) {
            state = scr.readyState;
            if (state === "complete") {
            //   logger.info('Completed', scr.src);
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
        if(status === 'error') console.error('Failed to load:', src)
  
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
  
  function load(listType, srcName, callback){
      if(listType === 'script') {
        if(!srcName || !jsList[srcName]) return;
        jsLoadStatus[srcName] = true;
      } else if (listType === 'style') {
        if(!srcName || !cssList[srcName]) return;
        cssLoadStatus[srcName] = true;
      }
    
    loadList(srcName, listType, 0, callback);  // 0 is the beginning index
  }

  function unload(listType, srcName) {
    if(listType === 'script') {
    if(!srcName || !jsList[srcName]) return;
    for(let src of jsList[srcName]) {
        let js = document.getElementById(`${src}`);
        if(js) {
            js.remove()
        }
    }
    jsLoadStatus[srcName] = false;
    } else if(listType === 'style') {
    if(!srcName || !cssList[srcName]) return;
    // logger.info(`******* Removing CSS Group ${srcName} *******`)
    for(let src of cssList[srcName]) {
        let css = document.getElementById(`${src}`);
        if(css) {
        css.remove()
        // logger.info(`Unloaded css: ${src}`)
        }
    }
    cssLoadStatus[srcName] = false;
    } else return
  }

  function init(styleList, scriptList) {
    cssList = styleList;
    jsList = scriptList
  }

  export default {
    load,
    unload,
    init
  }