import eventHub from './utility/eventHub'
let InfiniteScrollPlugin = {}

InfiniteScrollPlugin.install = function(app, options) {


    function scrollDistance (container, callback, refresh) {
        // Make sure a valid callback was provided
        if (!callback || typeof callback !== 'function') return
        if (!container) return
  
        // Variables
        let isScrolling, start, end, distance
  
        // Listen for scroll events
        container.addEventListener('scroll', function () {
          // Set starting position
          if (!start) {
            start = container.scrollTop
          }
  
          // Clear our timeout throughout the scroll
          window.clearTimeout(isScrolling)
  
          // Set a timeout to run after scrolling ends
          isScrolling = setTimeout(function () {
            // Calculate distance
            end = container.scrollTop
            distance = end - start
  
            // Run the callback
            callback(distance, start, end)
  
            // Reset calculations
            start = null
            end = null
            distance = null
          }, refresh || 66)
        }, false)
    }


    // let jsList = options.jsList || {}
    console.log(options)
    let inited = false
    
    if(!inited) {
        console.log('Initing pagination')

        inited = true
    }

    app.config.globalProperties.$addScrollListener = function(el, name) {
        // do stuffs here
        setTimeout(() => {
            scrollDistance(el, () => {
                // this callback function header is: callback(distance, start, end)
                let maxScrollTop = el.scrollHeight - el.offsetHeight

                if(el.scrollTop === 0) {
                    eventHub.$emit(`${name}-top`)
                }

                if(maxScrollTop === el.scrollTop) {
                    eventHub.$emit(`${name}-bottom`)
                }
            })
          }, 10)
    }

    app.config.globalProperties.$onScrollTo = function(...args) {
        eventHub.$on(...args)
    }

}

export default InfiniteScrollPlugin