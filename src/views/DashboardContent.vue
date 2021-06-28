<template>
    <main role="main" class="main-content">
        <br><br><br>
        
        <ul class='live-tx'>
            <li v-for='(tx, i) of liveTransactions' :key = 'i' >
                <Timer :tx = 'tx' v-on:tx-expired = 'onTimerExpired'/>
            </li>
        </ul>
        <br>
      <router-view></router-view>
    </main>
</template>

<script>
  import Timer from "@/components/p2p/Timer";
  import eventHub from "@/eventHub"

    export default {
        data() {
            return {
                liveTransactions: []
            }
        },

        methods: {
            onTimerExpired (txId) {
                for(let i in this.liveTransactions) {
                    let tx = this.liveTransactions[i]
                    if(tx.id === txId) {
                        this.liveTransactions.splice(i)
                        break;
                    }
                }
            }
        },

        components: {
            Timer
        },

        mounted () {
            let that = this
            eventHub.$on('ping', (tx) => {
                that.liveTransactions.push(tx)
            })

            eventHub.$on('tx-appeal', (data) => {
                for(let tx of this.liveTransactions) {
                    if(tx.id === data.id) {
                        tx.status = 'appeal'
                        break;
                    }
                }
            })

            eventHub.$on('tx-completed', (data) => {
                for(let i in this.liveTransactions) {
                    let tx = this.liveTransactions[i]
                    if(tx.id === data.id) {
                        eventHub.$emit(`end-timer-${tx.id}`)
                        this.liveTransactions.splice(i)
                        break;
                    }
                }
            })
        }
    }
</script>

<style scoped>
    .live-tx li {
        list-style: none;
        display: inline-block;
        margin: 5px;
    }
</style>