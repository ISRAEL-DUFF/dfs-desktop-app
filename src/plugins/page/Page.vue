<template>
    <slot v-if='loaded'></slot>
    <div v-if = '!loaded' ref='preloadContainer' :style = 'preloaderStyle'>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                loaded: false,
                refresh: true,
                leavePage: false,

                exitData: '',

                // ...for document.body
                eventListeners: [],
                childElements: []

            }
        },

        props: {
            'jsSrcName': {
                type: String,
                required: false
            },
            'cssSrcName': {
                type: String,
                required: false
            },
            'refreshOnExit': {
                type: Boolean,
                default: false
            },
            'uname': {  // unique name for this page
                type: String,
                required: true
            } 
        },

        emits: ['ready'],

        computed: {
            preloaderStyle () {
                return `
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    min-height: 100vh;
                    background-color: ${this.$pagePreloader().bgColor};
                `
            }
        },

        methods: {
            pageInit() {
                if (this.$pageLoaded()) {
                    // re-emit all windows event
                    var evt = document.createEvent('Event');
                    evt.initEvent('load', false, false);
                    window.dispatchEvent(evt);
                } else {
                    this.$enablePageInited()
                }
            }
        },

       async mounted() {
            let that = this;

            // mount preloader
            let preloadCtr = this.$VueExtend(this.$pagePreloader().component)
            let preload = new preloadCtr()
            preload.$mount()
            this.$refs.preloadContainer.appendChild(preload.$el())

            this.$loadStyles(this.cssSrcName, () => {
                this.loaded = true
                that.$nextTick(() => {
                    this.$loadScripts(this.jsSrcName);
                    this.pageInit()
                    this.$emit('ready');            
                })
            })
        },

        watch: {
            $route: function(to, from) {
                console.log(from.path, to.path, 'refresh:', this.refreshOnExit, 'leavePage:', this.leavePage)
                if(this.leavePage) {
                    this.leavePage = false;
                    return;
                } else if(this.refreshOnExit) {
                    this.exitData = {
                        to,
                        from
                    }
                }
            }
        },

        beforeMount() {
            let donRef = sessionStorage.getItem(this.uname+'-refresh')
            if(donRef) {
                donRef = JSON.parse(donRef)
                sessionStorage.removeItem(this.uname+'-refresh')
                this.leavePage = true;
                this.$router.push(donRef.to)
            }
        },

        beforeCreate() {
        },

        beforeUnmount() {
            this.loaded = false;
            // this.$removeScripts(this.jsSrcName)
            this.$removeStyles(this.cssSrcName)
            this.$resetWatch()
            if(this.refreshOnExit && this.exitData) {
                sessionStorage.setItem(this.uname+'-refresh', JSON.stringify(this.exitData))

                document.body.innerHTML = `<div style='height: 100; width: 100; margin-left: auto; margin-right: auto'> <img style='height: 25%; width: 25%; margin: 10% 30%' src='/static/loading.gif'/></div>`
                window.location.href = this.exitData.from.path
            }
        }
    }
</script>

<style scoped>
</style>