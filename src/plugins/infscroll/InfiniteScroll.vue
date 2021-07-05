<template>
    <div :class='this.class' :id = 'uname' >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                uname: ''
            }
        },

        emits: ['top', 'bottom'],

        props: {
            class: {
                required: false,
                type: String
            },
            name: {
                required: false,
                type: String
            }
        },

        computed: {
            id () {
                return this.uname
            }
        },

        mounted () {
            let name = this.name
            if(!name) {
                this.uname = 'scroll-'+(new Date()).getUTCMilliseconds()
            } else {
                this.uname = name
            }
            // if (this.class) {

            // }
            let that = this
            this.$nextTick(() => {
                that.$addScrollListener(document.getElementById(this.uname), this.uname)
                that.$onScrollTo(this.uname+'-bottom', () => {
                    that.$emit('bottom')
                })

                that.$onScrollTo(this.uname+'-top', () => {
                    that.$emit('top')
                })
            })
        }
    }
</script>