import { defineComponent, createApp, h } from 'vue'

// function htmlStrToElement(html) {
//     var template = document.createElement('template');
//     html = html.trim(); // Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     return template.content.firstChild;
// }

// function htmlStrToElements(html) {
//     var template = document.createElement('template');
//     template.innerHTML = html;
//     return template.content.childNodes;
// }

let VueExtend = function(component) {
    function generateProxyComponent(options) {
        options = options ?? {}
        let propsData = options.propsData ?? {}
        let slots = options.slots ?? {}

        /*
            slots = {
                default: () => ['This is good news', 'Huel packa'],
                name1: () => ['Name1 solots', 'Bless']
            } 
        */
       return defineComponent(
        {
            render() {
                return h(component, propsData, slots)
            }
        })
    }

    return function(options) {
        let that = this        
        this.proxyComponent = generateProxyComponent(options)
        this.$mount = function(el) {
           let e = el ?? document.createElement('div')
           that.$createdApp = createApp(that.proxyComponent)
           that.$instance = that.$createdApp.mount(e)
        }

        this.$isMounted = function() {
            if(that.$instance) return true;
            else return false
        }

        this.$el = function() {
            return that.$instance.$el
        }

        this.$mountEnd = function(el) {
            if(el) {
                if(that.$isMounted()) {
                    el.appendChild(that.$el())
                }
                else {
                    that.$mount()
                    el.appendChild(that.$el())
                }
            }
        }

    }
}

export default {
    install(app) {
        app.config.globalProperties.$VueExtend = VueExtend;
    }
}