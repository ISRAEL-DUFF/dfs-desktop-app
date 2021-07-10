// let tata = require('tata-js')\
let tata = require('./tata')
export default {
    install(app) {
        app.config.globalProperties.$toastLog = function(msg, options) {
            if(options)
                tata.log(msg, options)
            else tata.log(msg)
        }

        app.config.globalProperties.$toastSuccess = function(msg, options) {
            if(options)
                tata.success(msg, options)
            else tata.success(msg)
        }

        app.config.globalProperties.$toastInfo = function(msg, options) {
            if(options)
                tata.info(msg, options)
            else tata.info(msg)
        }


        app.config.globalProperties.$toastWarning = function(msg, options) {
            if(options)
                tata.warn(msg, options)
            else tata.warn(msg)
        }

        app.config.globalProperties.$toastError = function(msg, options) {
            if(options)
                tata.error(msg, options)
            else tata.error(msg)
        }
    }
}