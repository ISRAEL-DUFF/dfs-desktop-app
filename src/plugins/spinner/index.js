import spinner from './Spinner'
export default {
    install(app) {
        app.component('Spinner', spinner)

        app.config.globalProperties.$spinnerOn = function(spinnerName) {
            if(app.config.globalProperties.$eventHub) {
                app.config.globalProperties.$eventHub.$emit(`${spinnerName}-on`)
            }
        }

        app.config.globalProperties.$spinnerOff = function(spinnerName) {
            if(app.config.globalProperties.$eventHub) {
                app.config.globalProperties.$eventHub.$emit(`${spinnerName}-off`)
            }
        }
    }
}