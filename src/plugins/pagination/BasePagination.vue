<template>
    <nav aria-label="Table Paging" class="my-3">
        <ul class="pagination justify-content-end mb-0">
            <BaseButton :disabled='isPreviousButtonDisabled'>
                <li @click='previousPage' class="page-item"><button class="page-link">Previous</button></li>
            </BaseButton>
    
            <BasePaginationTrigger 
                 @loadPage='onLoadPage'

                v-for="paginationTrigger in paginationTriggers"
                :pageNumber='paginationTrigger'
                :class="{
                'active':
                    paginationTrigger === currentPage
                }"
                :key="paginationTrigger"
            >
            </BasePaginationTrigger>

            <BaseButton  :disabled='isNextButtonDisabled'>
                <li @click='nextPage' class="page-item"><button class="page-link">Next</button></li>
            </BaseButton>
        </ul>
    </nav>
</template>

<script>
    import BaseButton from "./BaseButton.vue";
    import BasePaginationTrigger from './BasePaginationTrigger.vue';
    export default {
        components: {
            BaseButton,
            BasePaginationTrigger
        },
        props: {
            currentPage: {
            type: Number,
            required: true
            },
            pageCount: {
            type: Number,
            required: true
            },
            visiblePagesCount: {
                type: Number,
                default: 5
            }
        },
        computed: {
            isPreviousButtonDisabled() {
                return this.currentPage === 1
            },
            isNextButtonDisabled() {
                return this.currentPage === this.pageCount
            },

            paginationTriggers() {
                const currentPage = this.currentPage
                const pageCount = this.pageCount
                const visiblePagesCount = this.visiblePagesCount
                const visiblePagesThreshold = (visiblePagesCount - 1) / 2
                const pagintationTriggersArray = Array(this.visiblePagesCount - 1).fill(0)
                console.log("pagiArr:", pagintationTriggersArray)

                if (currentPage <= visiblePagesThreshold + 1) { console.log("scenerio 1")
                    pagintationTriggersArray[0] = 1
                    const pagintationTriggers = pagintationTriggersArray.map(
                        (paginationTrigger, index) => {
                            console.log('index:', index)
                        return pagintationTriggersArray[0] + index
                        }
                    )
                    pagintationTriggers.push(pageCount)
                    console.log('PageArrrr:', pagintationTriggers)
                    return pagintationTriggers
                }

                if (currentPage >= pageCount - visiblePagesThreshold + 1) { console.log("scenerio 2")
                    const pagintationTriggers = pagintationTriggersArray.map(
                        (paginationTrigger, index) => {
                        return pageCount - index
                        }
                    )
                    pagintationTriggers.reverse().unshift(1)
                    return pagintationTriggers
                }

                pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1
                const pagintationTriggers = pagintationTriggersArray.map(
                (paginationTrigger, index) => {
                    return pagintationTriggersArray[0] + index
                }
                )
                pagintationTriggers.unshift(1);
                pagintationTriggers[pagintationTriggers.length - 1] = pageCount
                return pagintationTriggers
            }
        },
        methods: {
            nextPage() {
                console.log('next Page')
                this.$emit('nextPage')
            },
            previousPage() {
                this.$emit('previousPage')
            },

            onLoadPage(value) {
                console.log("load page")
                this.$emit("loadPage", value)
            }
        }
    }
</script>