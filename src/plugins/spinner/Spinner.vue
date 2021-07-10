<template>
    <div v-if='loading' :id = 'name' class="spinner-border mr-3 text-info" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</template>


<script>

export default {
    data() {
        return {
            loading: false
        }
    },

    props: {
        'name': {
            type: String,
            required: true
        }
    },

    methods: {
        onEvent() {
            console.log("Loading event")
            this.loading = true
        },

        offEvent() {
            this.loading = false
        }
    },

    mounted() {
        this.$eventHub.$on(`${this.name}-on`, this.onEvent)

        this.$eventHub.$on(`${this.name}-off`, this.offEvent)
    },

    beforeUnmount() {
        this.$eventHub.$off(`${this.name}-on`, this.onEvent)

        this.$eventHub.$off(`${this.name}-off`, this.offEvent)
    }

}
</script>
