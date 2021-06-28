

export default {
  data () {
    return {
      dollarPrice: '',
      dollarValue: '',
    }
  },
  methods: {
    nairaToDollar (naira) {
      if (!isNaN(naira)) {
        if (naira < this.minDeposit) {
          this.dollarValue =  myRound(naira / this.dollarPrice, 2)
        } else {
          this.dollarValue = myRound(naira / this.dollarPrice, 2)
          this.decodeInvestmentPackage(naira)
        }
      }
    },

    dollarToNaira (dollar) {
      if (!isNaN(dollar)) {
        this.amount = myRound(dollar * this.dollarPrice, 2)
        this.decodeInvestmentPackage(this.investmentData.amount)
      }
    }
  },

  mounted () {
    this.dollarPrice = this.$store.getters.getServerConfig['dollar_value']
  }
}
