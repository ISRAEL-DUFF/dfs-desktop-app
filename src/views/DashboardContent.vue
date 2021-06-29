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
            this.$eventHub.$on('ping', (tx) => {
                that.liveTransactions.push(tx)
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