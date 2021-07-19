<template>
    <div>
        <slot></slot>
        <BasePagination 
            :currentPage='currentPage' :pageCount='pageCount'
            @nextPage='pageChangeHandle("next")'
            @previousPage='pageChangeHandle("previous")'
            @loadPage='pageChangeHandle'
        ></BasePagination>
    </div>
</template>

<script>
    import axios from 'axios'
    import BasePagination from './BasePagination.vue'
    export default {
        static: {
            visibleItemsPerPageCount: 20,
        },
        data() {
            return {
                pageData: [],
                visibleItemsPerPageCount: 20,
                pageCount: 10,
                currentPage: 1
            }
        },

        props: {
            url: {
                required: true,
                type: String
            }, 
            itemsPerPage: {
                required: true,
                type: Number
            }
        },

        methods: {
            async loadData() {
                let url = ''
                if(!this.url.includes('?')) {
                    url = `${this.url}?page=${this.currentPage}&pageSize=${this.$options.static.visibleItemsPerPageCount}`
                } else {
                    url = `${this.url}&page=${this.currentPage}&pageSize=${this.$options.static.visibleItemsPerPageCount}`
                }
               const { data } = await axios.get(url)
               this.pageData = data.results
                this.$emit('data', this.pageData)
               return data
            },
            async pageChangeHandle(value) {
                switch (value) {
                    case 'next':
                    this.currentPage += 1
                    break
                    case 'previous':
                    this.currentPage -= 1
                    break
                    default:
                    this.currentPage = value
                }
                 await this.loadData()
                // this.pageData = data.results
            }
        },

        watch: {
            url () {
                this.loadData()
            }
        },

        components: {
            BasePagination
        },

        async mounted () {
            if(!this.itemsPerPage || this.itemsPerPage === 0) {
                this.visibleItemsPerPageCount = this.itemsPerPage
            }
            let data = await this.loadData()
            this.pageCount = Math.ceil(
                data.totalResults / this.$options.static.visibleItemsPerPageCount
            )
        }
    }
</script>