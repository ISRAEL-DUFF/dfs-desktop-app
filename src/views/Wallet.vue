<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <!-- <h2>Section title</h2> -->
        <!-- <h2 class="h5 page-title">Wallet</h2> -->

        <div class="row align-items-center my-3">
          <div class="col">
            <h2 class="page-title">Wallet</h2>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-success text-white" @click='openBuyModal'><span class="fe fe-plus fe-16 mr-3"></span>Buy</button>
            <button type="button" class="btn btn-danger" @click='openSellModal'><span class="fe fe-filter fe-16 text-muted mr-3"></span>Sell</button>
          </div>
        </div>

        <Modal name = 'sellModal' openCmd = 'openSellModal' closeEvt="closeSellModal">
          <template v-slot:title>
            Sell From Your Wallet
          </template>

          <template v-slot:body>
            <WalletForm v-bind = 'walletCache' @wallet = 'updateWallet'/>
          </template>
            
          <template v-slot:footer>
            <button @click = 'closeSellModal' class="btn mb-2 btn-success">Cancel</button>
            <button @click = 'sellRequest' type="button" class="btn mb-2 btn-success">Place Sell request</button>
          </template>
        </Modal>

        <Modal name = 'buyModal' openCmd = 'openBuyModal' closeEvt="closeBuyModal">
          <template v-slot:title>
            Buy P2P coin
          </template>

          <template v-slot:body>
            <AmountInputForm v-on:data = 'updateBuyAmount'/>
          </template>
            
          <template v-slot:footer>
            <button @click = 'closeBuyModal' class="btn mb-2 btn-success">Cancel</button>
            <button @click = 'buyRequest' type="button" class="btn mb-2 btn-success">Place Buy request</button>
          </template>
        </Modal>

        <div class="row">
          <div class="col-md-6 col-xl-4 mb-4">
            <div class="card shadow text-white">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-sm bg-primary-light">
                      <i class="fe fe-16 fe-shopping-bag text-white mb-0"></i>
                    </span>
                  </div>
                  <div class="col pr-0">
                    <p class="small text-muted mb-0">Capital Wallet</p>
                    <span class="h3 mb-0 text-white">&#8358;{{capital}}</span>
                    <span class="small text-success">{{wallet.capital / 1000}} p2p</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4 mb-4">
            <div class="card shadow">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-sm bg-primary">
                      <i class="fe fe-16 fe-shopping-cart text-white mb-0"></i>
                    </span>
                  </div>
                  <div class="col pr-0">
                    <p class="small text-muted mb-0">Return On Investment</p>
                    <span class="h3 mb-0 text-white">&#8358;{{interest}}</span>
                    <span class="small text-success">{{wallet.interest / 1000}} p2p</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4 mb-4">
            <div class="card shadow">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-sm bg-primary">
                      <i class="fe fe-16 fe-filter text-white mb-0"></i>
                    </span>
                  </div>
                  <div class="col">
                    <p class="small text-muted mb-0">Commissions</p>
                    <div class="row align-items-center no-gutters">
                      <div class="col-auto">
                        <!-- <span class="h3 mr-2 mb-0"> 86.6% </span> -->
                        <span class="h3 mb-0 text-white">&#8358;{{commissions}}</span>
                        <span class="small text-success"> {{wallet.commissions / 1000}} p2p</span>
                      </div>
                      <div class="col-md-12 col-lg">
                        <div class="progress progress-sm mt-2" style="height:3px">
                          <div class="progress-bar bg-success" role="progressbar" style="width: 87%" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- end section -->
      </div>
    </div>

    <h2 class="h5">Timeline & Activity</h2>
    <p class="text-muted">This primitive is meant to make it easy to display both user-centric or activity-centric actions in your app. Sometimes it makes sense to even blend both in a single timeline, which works perfectly.</p>
    <div class="row">
      <!-- Recent Activity -->
      <div class="col-md-6 mb-4">
        <div class="card timeline">
          <div class="card-header">
            <strong class="card-title">Active Plan</strong>
            <!-- <a class="float-right small text-muted" href="#!">View all</a> -->
          </div>
          <div class="card-body text-center y-4">
            <span class="h1 mb-0">14/30</span>
            <p class="text-muted">Days left</p>

            <p>Started on {{new Date().toDateString()}}</p>
            <p>Ends {{new Date().toDateString()}}</p>
          </div> <!-- / .card-body -->
        </div> <!-- / .card -->
      </div> <!-- / .col-md-6 -->
      <!-- Notification List -->
      <div class="col-md-6 mb-4">
        <div class="card shadow">
          <div class="card-header">
            <strong class="card-title">Notification List</strong>
            <a class="float-right small text-muted" href="#!">View all</a>
          </div>
          <div class="card-body">
            <Notification />
          </div> <!-- / .card-body -->
        </div> <!-- / .card -->
      </div> <!-- / .col-md-3 -->
      <!-- Recent Activity -->
      <div class="col-md-6 mb-4">
        <div class="card shadow">
          <div class="card-header">
            <strong class="card-title float-left">Your Referrals</strong>
            <a class="float-right small text-muted" href="#!">View all</a>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush my-n3">
              <div class="list-group-item">
                <div class="row">
                  <div class="col-auto">
                    <div class="avatar avatar-sm mt-2">
                      <img src="/static/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
                    </div>
                  </div>
                  <div class="col">
                    <small><strong>Brown, Asher</strong></small>
                    <div class="my-0 text-muted small">Just create new layout Index, form, table</div>
                    <small class="badge badge-light text-muted">1h ago</small>
                  </div>
                </div>
              </div>
              <div class="list-group-item">
                <div class="row">
                  <div class="col-auto">
                    <div class="avatar avatar-sm mt-2">
                      <img src="/static/assets/avatars/face-2.jpg" alt="..." class="avatar-img rounded-circle">
                    </div>
                  </div>
                  <div class="col">
                    <small><strong>Hester, Nissim</strong></small>
                    <div class="my-0 text-muted small">Fusce dapibus, tellus ac cursus commodo</div>
                    <small class="badge badge-light text-muted">2h ago</small>
                  </div>
                </div> <!-- / .row -->
              </div>
              <div class="list-group-item">
                <div class="row">
                  <div class="col-auto">
                    <div class="avatar avatar-sm mt-2">
                      <img src="/static/assets/avatars/face-3.jpg" alt="..." class="avatar-img rounded-circle">
                    </div>
                  </div>
                  <div class="col">
                    <small><strong>Kelley, Sonya</strong></small>
                    <div class="my-0 text-muted small">Created new layout for widgets</div>
                    <small class="badge badge-light text-muted">4h ago</small>
                  </div>
                </div>
              </div> <!-- / .row -->
            </div> <!-- / .list-group -->
          </div> <!-- / .card-body -->
        </div> <!-- / .card -->
      </div> <!-- / .col-md-3 -->
      <!-- Product List -->
      <div class="col-md-6 mb-4">
        <div class="card shadow">
          <div class="card-header">
            <strong class="card-title">Recent Transactions</strong>
            <a class="float-right small text-muted" href="#!">View all</a>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush my-n3">
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-3 col-md-2">
                    <img src="/static/assets/products/p1.jpg" alt="..." class="thumbnail-sm">
                  </div>
                  <div class="col">
                    <strong>Fusion Backpack</strong>
                    <div class="my-0 text-muted small">Gear, Bags</div>
                  </div>
                  <div class="col-auto">
                    <strong>+85%</strong>
                    <div class="progress mt-2" style="height: 4px;">
                      <div class="progress-bar" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-3 col-md-2">
                    <img src="/static/assets/products/p2.jpg" alt="..." class="thumbnail-sm">
                  </div>
                  <div class="col">
                    <strong>Luma hoodies</strong>
                    <div class="my-0 text-muted small">Jackets, Men</div>
                  </div>
                  <div class="col-auto">
                    <strong>+75%</strong>
                    <div class="progress mt-2" style="height: 4px;">
                      <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-3 col-md-2">
                    <img src="/static/assets/products/p3.jpg" alt="..." class="thumbnail-sm">
                  </div>
                  <div class="col">
                    <strong>Luma shorts</strong>
                    <div class="my-0 text-muted small">Shorts, Men</div>
                  </div>
                  <div class="col-auto">
                    <strong>+62%</strong>
                    <div class="progress mt-2" style="height: 4px;">
                      <div class="progress-bar" role="progressbar" style="width: 62%" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-3 col-md-2">
                    <img src="/static/assets/products/p4.jpg" alt="..." class="thumbnail-sm">
                  </div>
                  <div class="col">
                    <strong>Brown Trousers</strong>
                    <div class="my-0 text-muted small">Trousers, Women</div>
                  </div>
                  <div class="col-auto">
                    <strong>+24%</strong>
                    <div class="progress mt-2" style="height: 4px;">
                      <div class="progress-bar" role="progressbar" style="width: 24%" aria-valuenow="24" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> <!-- / .list-group -->
          </div> <!-- / .card-body -->
        </div> <!-- / .card -->
      </div> <!-- / .col-md-3 -->
    </div> <!-- / .row -->
  </div>
</template>

<script>
  import WalletForm from '../components/p2p/WalletForm.vue'
  import AmountInputForm from '../components/p2p/InputWidget.vue'
  import Modal from '../components/p2p/Modal.vue'
  // import eventHub from '@/eventHub'
  import {mapState} from 'vuex'
  import Notification from '@/components/p2p/Notification'
  import axios from 'axios'
  import config from '@/config'

  export default {
    data () {
      return {
        walletCache: {

        },
        buyAmount: {
          p2p: 0,
          naira: 0
        },
        sellWallet: ''
      }
    },

    methods: {
      updateWallet(wallet) {
        this.walletCache = wallet.main
        this.sellWallet = wallet.sell
      },

      updateBuyAmount (amount) {
        this.buyAmount = amount
      },

      sellRequest() {
        console.log(this.profile)
        axios.post(`${config.apiBaseUrl}/user/market/add`, {
          type: 'sell',
          userId: this.profile.userId,
          amount: this.sellWallet.interest + this.sellWallet.capital + this.sellWallet.commissions,
          wallet: this.sellWallet
        }).then((resp) => {
          if(resp.data.success) {
            this.$store.commit('updateWallet', this.walletCache)
            this.$store.commit('addToMarket', resp.data.market)
            this.closeSellModal()
          } else {
            console.error(new Error(resp.data.message))
          } 
        }).catch((e) => {
          console.error(e.message)
        })
      },

      buyRequest() {
        axios.post(`${config.apiBaseUrl}/user/market/add`, {
          type: 'buy',
          userId: this.profile.userId,
          amount: this.buyAmount.naira
        }).then((resp) => {
          if(resp.data.success) {
            this.$store.commit('addToMarket', resp.data.market)
            this.closeBuyModal()
          } else {
            console.error(new Error(resp.data.message))
          } 
        })
        // eventHub.$emit('openBuyModal')
      },

      cacheWallet () {
        this.walletCache.capital = this.wallet.capital
        this.walletCache.interest = this.wallet.interest
        this.walletCache.commissions = this.wallet.commissions
        // return this.walletCache
      },

      openBuyModal() {
        this.$eventHub.$emit('openBuyModal');
      },

      openSellModal() {
        // cache current state of wallet
        this.cacheWallet()
        this.$eventHub.$emit('openSellModal');
      },

      closeSellModal () {
        // ....after doing everything....
        this.$eventHub.$emit('closeSellModal')
      },
      closeBuyModal () {
        // ....after doing everything....
        this.$eventHub.$emit('closeBuyModal')
      },
    },

    computed: {
      ...mapState({
        'wallet': (state) => state.user.wallet,
        'profile': (state) => state.user.profile
      }),
      
      capital () {
        return this.wallet.capital.toLocaleString()
      },

      interest () {
        return this.wallet.interest.toLocaleString()
      },

      commissions () {
        return this.wallet.commissions.toLocaleString()
      }
    },

    components: {
      WalletForm,
      AmountInputForm,
      Modal,
      Notification
    }
  }
</script>