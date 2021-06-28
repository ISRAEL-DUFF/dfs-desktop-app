<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <h4>Market Place</h4>

                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li @click = 'marketType = "all"' class="nav-item">
                        <a class="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                    </li>
                    <li @click = 'marketType = "buy"' class="nav-item">
                        <a class="nav-link" id="buy-tab" data-toggle="tab" href="#buy" role="tab" aria-controls="buy" aria-selected="false">Buy</a>
                    </li>
                    <li @click = 'marketType = "sell"' class="nav-item">
                        <a class="nav-link" id="sell-tab" data-toggle="tab" href="#sell" role="tab" aria-controls="sell" aria-selected="false">Sell</a>
                    </li>
                </ul>
                <button class='btn btn-info'>Instant Transaction</button>
            </div>
        </div>
        <div class="row my-4 pb-4" >
            <div v-for = '(col, i) of tMarket' :key = 'i' class="col-md-3">
                <div class="card shadow text-center mb-4">
                    <div class="card-body file">
                        <a href="#">
                            <h3 v-if = 'col.type==="sell"' class="h5 mt-4 mb-0">Sell</h3>
                            <h3 v-if = 'col.type==="buy"' class="h5 mt-4 mb-0">Buy</h3>
                        </a>
                        <!-- <p class="text-muted">package</p> -->
                        <span class="h2 mb-0">&#8358;{{col.amount.naira.toLocaleString()}}</span>
                        <p class="text-muted">{{col.amount.p2p}} p2p</p>
                        <p>{{col.user.email}}</p>
                        <p>Rating: * * *</p>
                        <span v-if="col.user.userActive">
                            <span class="dot dot-lg bg-success"></span>
                            <span class="text-muted ml-3">Online</span>
                        </span>
                        <span v-if="!col.user.userActive">
                            <span class="dot dot-lg bg-warning"></span>
                            <span class="text-muted ml-3">Offline</span>
                        </span>
                    </div> <!-- .card-body -->
                    <div class="card-footer bg-transparent border-0 fname">
                        <button v-if ="col.type === 'sell'" @click = 'setCurrentItem(col)' class="btn btn-danger text-white">Contact Seller</button>
                        <button v-if ="col.type === 'buy'" @click = 'setCurrentItem(col)' class="btn btn-success text-white">Contact Buyer</button>
                    </div> <!-- .card-footer -->
                </div> <!-- .card -->
            </div> <!-- .col -->
            
        </div>

        <Modal name = 'contactModal' openCmd = 'openModal' closeEvt = 'closeModal'>
            <template v-slot:title>P2P Transaction</template>
            <template v-slot:body>
                <div class="card mb-4 shadow">
                    <div class="card-body my-n3">
                        <div class="row align-items-center">
                            <div class="col-3 text-center">
                                <span class="circle circle-lg bg-light">
                                    <i class="fe fe-user fe-24 text-primary"></i>
                                </span>
                            </div> <!-- .col -->
                            <div class="col">
                                <a href="#">
                                    <h3 class="h5 mt-4 mb-1">Contact info</h3>
                                </a>
                                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                            </div> <!-- .col -->
                        </div> <!-- .row -->
                        <div class='row'>
                            <div class='col'>
                                <!-- <AmountInputForm /> -->
                                <AmountInputForm 
                                    :walletAmount="currentItem.amount.naira" walletName = "Max" walletTag="txAmt"
                                    @update = "getAmountUpdate"
                                />
                            </div>
                        </div>
                    </div> <!-- .card-body -->
                    <div class="card-footer">
                        <!-- <a href="" class="d-flex justify-content-between text-muted"><span>Account Settings</span><i class="fe fe-chevron-right"></i></a> -->
                    </div> <!-- .card-footer -->
                </div>
            </template>

            <template v-slot:footer>
                <span v-if='currentItem.type === "sell"'>
                    <button @click = 'closeDialog' type="button" class="btn mb-2 btn-danger text-white space-btn">Cancel</button>
                    <button type="button" class="btn mb-2 btn-danger text-white space-btn" @click = 'pingUser'>Buy Now</button>
                </span>
                <span v-if='currentItem.type === "buy"'>
                    <button @click = 'closeDialog' type="button" class="btn mb-2 btn-success text-white space-btn">Cancel</button>
                    <button type="button" class="btn mb-2 btn-success text-white space-btn" @click = 'pingUser'>Sell Now</button>
                </span>
            </template>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import eventHub from '@/eventHub'
    // import AmountInputForm from '@/components/p2p/InputWidget'
    import AmountInputForm from '@/components/p2p/WalletRow'
    import Modal from '@/components/p2p/Modal'
    import socketMixin from "@/mixins/socket";

    export default {
        data() {
            return {
                currentItem: '',
                marketType: '',
                tMarket: [],
                txAmount: ''
            }
        },

        components: {
            AmountInputForm,
            Modal
        },

        methods: {
            setCurrentItem(item) {
                this.currentItem = item
                console.log('currentItem: ', this.currentItem)
                eventHub.$emit('openModal')
            },
            getAmountUpdate(data) {
                this.txAmount = {
                    naira: data.naira,
                    p2p: data.p2p,
                    remainder: data.remainder
                }
            },
            pingUser() {
                // ... do everything else here....
                this.socketSend(
                    {
                        type: 'tx',
                        tx: {
                            email: this.currentItem.user.email,
                            id: this.currentItem.id,
                            type: this.currentItem.type,
                            amount: this.txAmount.naira,
                            otherEmail: this.profile.email
                        }
                    }
                );
                // eventHub.$emit('ping', this.currentItem)

                // close modal when done
                this.closeDialog()
            },

            closeDialog () {
                eventHub.$emit('closeModal')
            }
        },

        computed: {
            ...mapState({
                'market': (state) => state.user.market,
                'buyMarket': (state) => state.user.market.filter((m) => m.type === 'buy'),
                'sellMarket': (state) => state.user.market.filter((m) => m.type === 'sell'),
                'profile': (state) => state.user.profile
            })
        },

        watch: {
            marketType(newV) {
                if(newV === 'buy') this.tMarket = this.buyMarket
                else if (newV === 'sell') this.tMarket = this.sellMarket
                else this.tMarket = this.market
            }
        },

        mounted () {
            this.marketType = 'all'
            this.tMarket = this.market
        },

        mixins: [socketMixin]
    }
</script>

<style scoped>
    .space-btn {
        margin: 5px;
    }
</style>