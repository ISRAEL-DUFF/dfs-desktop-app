let bodyElementEventListeners = []
let bodyElementChildren = []
let windowEventListeners = []

function watchForChanges() {
  console.log("Whatching Dom for changes");
  (function(w){
      var originalAdd = w.addEventListener;
      w.addEventListener = function(){
          // add your own stuff here to debug
          bodyElementEventListeners.push({
              'eventName': arguments[0],
              'fn': arguments[1]
          })
          return originalAdd.apply(this, arguments);
      };

      var originalAppendChild = w.appendChild;
      w.appendChild = function () {
          bodyElementChildren.push(arguments[0])
          return originalAppendChild.apply(this, arguments)
      };

      // TODO: implement properly
      var origPrepend = w.prepend;
      w.prepend = function() {
        // insert code here
        return origPrepend.apply(this, arguments)
      }

      // TODO: implement properly
      var origAppend = w.append;
      w.append = function() {
        // insert code here
        return origAppend.apply(this, arguments)
      }

      var insertBefore = w.insertBefore;
      w.insertBefore = function() {
        bodyElementChildren.push(arguments[0]);
        return insertBefore.apply(this, arguments)
      }
      
      let doc = document.addEventListener;
      document.addEventListener = function() {
        windowEventListeners.push({
          'eventName': arguments[0],
          'fn': arguments[1]
        })
        return doc.apply(this, arguments)
      }
  })(document.body);
}

function reset() {
  for(let e of bodyElementEventListeners) {
      document.body.removeEventListener(e.eventName, e.fn)
  }
  for(let e of windowEventListeners) {
    document.removeEventListener(e.eventName, e.fn)
  }
  for(let e of bodyElementChildren) {
    if(document.body.contains(e)) e.remove()
  }

  bodyElementChildren = []
  bodyElementEventListeners = []
  windowEventListeners = []
}

export default {
    watchForChanges,
    reset
}