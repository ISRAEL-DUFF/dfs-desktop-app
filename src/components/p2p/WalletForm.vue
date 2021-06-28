<template>
    <form v-if='inited'>
        <WalletRow 
          :walletAmount="wallet.capital" walletName = "Capital Wallet" walletTag="capital"
          @update = "getAmountUpdate"
        />
        <br>
        <WalletRow 
          :walletAmount="wallet.interest" walletName = "Interest Wallet" walletTag="interest"
          @update = "getAmountUpdate"
        />
        <br>
        <WalletRow 
          :walletAmount="wallet.commissions" walletName = "Commissions" walletTag="commissions"
          @update = "getAmountUpdate" 
        />
        <br>
        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="eventNote" class="col-form-label">Total Amount</label>
            <!-- <textarea class="form-control" id="eventNote" placeholder="Add some note for your event"></textarea> -->
            </div>
            <div class="form-group col-md-9">
            <div class="form-row">
                <div class="form-group col-md-8">
                <div class="input-group-text" id="button-addon-time"><strong class="fe fe-16">&#8358;{{totalSellAmount.naira}}</strong></div>
                </div>
                <div class="form-group col-md-4">
                <div class="input-group-text" id="button-addon-time"><strong class="fe fe-16">{{totalSellAmount.p2p}}</strong></div>p2p
                </div>
            </div>
            </div>
        </div>
    </form>
</template>

<script>
    import WalletRow from './WalletRow.vue'
  export default {
    data () {
      return {
        inited: false,
        wallet: {
          capital: 0,
          interest: 0,
          commissions: 0
        },

        sellAmount: {
          capital: 0,
          interest: 0,
          commissions: 0
        },
        totalAmount: {
          naira: 0,
          p2p: 0
        }
      }
    },

    props: {
      capital: Number,
      interest: Number,
      commissions: Number
    },

    methods: {
      getAmountUpdate(data) {
        if(data.tag === 'capital') {
          this.sellAmount.capital = data.naira
        } else if(data.tag === 'interest') {
          this.sellAmount.interest = data.naira
        } else if(data.tag === 'commissions') {
          this.sellAmount.commissions = data.naira
        }
        this.totalAmount.naira = Number(this.sellAmount.interest) + Number(this.sellAmount.commissions) + Number(this.sellAmount.capital);
        this.totalAmount.p2p = this.totalAmount.naira / 1000

        this.updateParent()
      },

      updateParent () {
        this.$emit('wallet', {
          main: {
            capital: this.wallet.capital - this.sellAmount.capital,
            interest: this.wallet.interest - this.sellAmount.interest,
            commissions: this.wallet.commissions - this.sellAmount.commissions
          },
          sell: {
            capital: this.sellAmount.capital,
            interest: this.sellAmount.interest,
            commissions: this.sellAmount.commissions
          }
        })
      }
    },

    computed: {
      totalSellAmount() {
        return {
          naira: this.totalAmount.naira.toLocaleString(),
          p2p: this.totalAmount.p2p
        }
      }
    },

    watch: {
    },

    components: {
        WalletRow
    },

    mounted() {
      this.wallet.capital = this.capital
      this.wallet.interest = this.interest
      this.wallet.commissions = this.commissions
      this.inited = true
    }
  }
</script>