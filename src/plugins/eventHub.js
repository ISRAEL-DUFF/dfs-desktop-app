import eventHub from './utility/eventHub'
export default {
    install(app) {
        app.config.globalProperties.$eventHub = eventHub;
    }
}