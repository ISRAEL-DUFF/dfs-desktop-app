import eventHub from './eventHub'

let JsLoaderPlugin = {}

JsLoaderPlugin.install = function(app, options) {

    app.config.globalProperties.$eventHub = eventHub;

    let jsList = options.jsList || {}
    let inited = false
    app.config.globalProperties.$loadScripts = function(srcName) {
        if(!inited) {
            console.log('Initing Load Script')
            eventHub.$on('load-js', (jsSrc) => {
                if(!jsSrc || !jsList[jsSrc]) return;
                console.log(`******* Loading JS Group ${jsSrc} ********`)
                
                let i = 0;
                function loadScript() {
                  console.log(`Loading script ${i}`)
                  if(i < jsList[jsSrc].length) {
                    const src = jsList[jsSrc][i++]
                    if(!document.getElementById(src)) {
                      const s = document.createElement('script');
                      s.type = 'text/javascript';
                      s.src = `/static/${src}`;
                      s.id = `${src}`;
                      document.body.appendChild(s);
                      s.onload = loadScript
                    }
                  } else {
                    eventHub.$emit(`${jsSrc}-load-complete`)
                    console.log(`******* Done Loading ${i} ********`)
                  }
                }
                loadScript()
            })
          
            eventHub.$on('unload-js', (jsSrc)=> {
            if(!jsSrc || !jsList[jsSrc]) return;
            console.log(`******* Removing JS Group ${jsSrc} *******`)
            for(let src of jsList[jsSrc]) {
                let js = document.getElementById(`${src}`);
                if(js) {
                  js.remove()
                  console.log(`Unloaded js: ${src}`)
                }
            }
            eventHub.$emit(`${jsSrc}-unload-complete`)
            console.log(`******* Done Unloading ********`)
            })

            eventHub.$on('reload-js', (jsSrc) => {
              eventHub.$once(`${jsSrc}-unload-complete`, () => {
                eventHub.$emit('load-js', jsSrc)
              })
              eventHub.$emit('unload-js', jsSrc)
            })

            inited = true
        }
        eventHub.$emit('load-js', srcName)
    }

    app.config.globalProperties.$removeScripts = function(srcName) {
        eventHub.$emit('unload-js', srcName)
    }

    app.config.globalProperties.$reloadScripts = function(srcName) {
      eventHub.$emit('reload-js', srcName)
    }
}

export default JsLoaderPlugin