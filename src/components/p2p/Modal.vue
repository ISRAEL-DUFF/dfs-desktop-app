<template>
    <div>
        <a :id = 'openBtn' data-toggle="modal" :data-target="'#' + name"></a>
        <div :class='modalClass.c1' :id="name" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
            <div :class='modalClass.c2' role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <!-- <h5 class="modal-title" id="varyModalLabel">Buy P2P coin</h5> -->
                    <slot name='title'></slot>
                    <button @click = "closeModal" :id = 'closeBtn' type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div :class="modalClass.c3">
                        <slot v-if = 'showDialog' name = 'body'></slot>
                    </div>
                    <div :class="modalClass.c4">
                        <slot name = 'footer'></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import eventHub from '@/eventHub'
    export default {
        data() {
            return {
                showDialog: false,
                clickHandler: null
            }
        },

        props: ['openCmd', 'closeEvt', 'name', 'type'],
        // emits: ['closeEvt'],

        methods: {
            closeModal () {
                this.showDialog = false;
                document.getElementById(this.name).removeEventListener('click', this.dummHandler)
                document.getElementById(this.name).addEventListener('click', this.clickHandler)
                document.getElementById(this.closeBtn).click()
            },
            openModal () {
                this.showDialog = true
                document.getElementById(this.openBtn).click()
            },

            dummHandler () {
                console.log("Dummy click")
            },

            modifyEventListeners(domEl) {
                let that = this;
                (function(w){
                    var originalAdd = w.addEventListener;
                    w.addEventListener = function(){
                        // add your own stuff here to debug
                        if(arguments[0] === 'click' && that.showDialog) {
                            that.clickHandler = arguments[1]
                            arguments[1] = that.dummHandler
                        }
                        return originalAdd.apply(this, arguments);
                    };

                    var originalRemove = w.removeEventListener;
                    w.removeEventListener = function(){
                        // add your own stuff here to debug
                        return originalRemove.apply(this, arguments);
                    };
                })(domEl);
            }
        },

        computed: {
            closeBtn () {
                return `closeBtn-${this.name}`
            },
            openBtn() {
                return `openBtn-${this.name}`
            },
            modalClass () {
                let defaultModal = {
                    c1: "modal fade",
                    c2: "modal-dialog",
                    c3: "modal-body p-4",
                    c4: "modal-footer d-flex justify-content-between"
                }

                if(this.type) {
                    if(this.type === 'slide') {
                        return {
                            c1: "modal fade modal-notif modal-slide",
                            c2: "modal-dialog modal-sm",
                            c3: "modal-body",
                            c4: "modal-footer"
                        }
                    } else if(this.type === 'slideRight') {
                        return {
                            c1: "modal fade modal-right modal-slide",
                            c2: "modal-dialog modal-sm",
                            c3: "modal-body",
                            c4: "modal-footer"
                        }
                    } else if(this.type === 'fullscreen') {
                        return {
                            c1: "modal fade modal-full",
                            c2: "modal-dialog modal-dialog-centered",
                            c3: "modal-body text-center",
                            c4: "modal-footer"
                        }
                    } else return defaultModal
                    
                } else {
                    return defaultModal
                }
            }
        },

        mounted () {
            this.$eventHub.$on(this.openCmd, ()=> {
                this.openModal()
            })

            this.$eventHub.$on(this.closeEvt,()=> {
                this.closeModal()
            })

            this.modifyEventListeners(document.getElementById(this.name))
        }
    }
</script>