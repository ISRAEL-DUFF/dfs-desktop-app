export default function (debugMode) {
    return {
        log: function(...args) {
            if(debugMode)
                console.log(...args)
        },
        warn: function(...args) {
            if(debugMode)
                console.warn(...args)
        },
        info: function(...args) {
            if(debugMode)
                console.info(...args)
        },

        error: function(...args) {
            if(debugMode) console.error(...args)
        }
    }
}