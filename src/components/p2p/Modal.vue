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
                showDialog: false
            }
        },

        props: ['openCmd', 'closeEvt', 'name', 'type'],
        // emits: ['closeEvt'],

        methods: {
            closeModal () {
                this.showDialog = false;
                document.getElementById(this.closeBtn).click()
            },
        },

        computed: {
            closeBtn () {
                return `closeBtn-${this.name}`
            },
            openBtn() {
                return `openBtn-${this.name}`
            },
            modalClass () {
                if(this.type && this.type === 'slide') {
                    return {
                        c1: "modal fade modal-notif modal-slide",
                        c2: "modal-dialog modal-sm",
                        c3: "modal-body",
                        c4: "modal-footer"
                    }
                } else {
                    return {
                        c1: "modal fade",
                        c2: "modal-dialog",
                        c3: "modal-body p-4",
                        c4: "modal-footer d-flex justify-content-between"
                    }
                }
            }
        },

        mounted () {
            this.$eventHub.$on(this.openCmd, ()=> {
                this.showDialog = true
                document.getElementById(this.openBtn).click()
            })

            this.$eventHub.$on(this.closeEvt,()=> {
                console.log("CHECK ON MODAL:", this.closeEvt)
                this.closeModal()
            })
        }
    }
</script>