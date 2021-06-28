<template>
    <div class="form-row">
        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
        <label for="date-input1">{{walletName}}</label>
        <div class="input-group" @click = 'useMax'>
            <div class="input-group-prepend">
                <div class="input-group-text" id="button-addon-date"><span class="fe fe-16">&#8358;{{initialAmount.toLocaleString()}}</span></div>
            </div>
        </div>
        </div>
        <div class="form-group col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
            <div class="form-row">
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                <label for="startDate">Amount</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text" id="button-addon-time"><span class="fe fe-16">&#8358;</span></div>
                    </div>
                    <input v-model="amount.naira" type="number" class="form-control" id="start-time" placeholder="200">
                </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                <div class="form-group">
                    <label for="startDate">P2P</label>
                    <div class="input-group">
                    <input v-model="amount.p2p" type="number" class="form-control" id="start-time" placeholder="200">
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                initialAmount: 0,
                amount: {
                    naira: 0,
                    p2p: 0
                }
            }
        },
        props: ['walletAmount', 'walletName', 'walletTag'],
        emits: ['update'],

        watch: {
            "amount.naira": function (newAmount, oldAmount) {
                if(!newAmount) newAmount = 0;
                else newAmount = Number(newAmount)

                if (!oldAmount) oldAmount = 0;
                else oldAmount = Number(oldAmount)

                if(newAmount < 0) this.amount.naira = oldAmount
                if(oldAmount < 0) this.amount.naira = newAmount
                if(oldAmount < 0 || newAmount < 0) return

                if(newAmount <= this.walletAmount) {
                    this.initialAmount = this.walletAmount - newAmount;
                    this.amount.p2p = newAmount / 1000
                } else {
                    this.amount.p2p = this.walletAmount / 1000
                    this.amount.naira = this.walletAmount
                }
                // this.updateParent()      
            },

            "amount.p2p": function (newAmount, oldAmount) {
                if(!newAmount) newAmount = 0;
                else newAmount = Number(newAmount)

                if (!oldAmount) oldAmount = 0;
                else oldAmount = Number(oldAmount)

                if(newAmount < 0) this.amount.p2p = oldAmount
                if(oldAmount < 0) this.amount.p2p = newAmount
                if(oldAmount < 0 || newAmount < 0) return

                let initialP2p = this.walletAmount / 1000
                if(newAmount <= initialP2p) {
                    this.amount.naira = newAmount * 1000
                } else {
                    this.amount.naira = this.walletAmount
                    this.amount.p2p = initialP2p
                } 
                this.updateParent()
            },
        },

        methods: {
            useMax () {
                this.amount.naira = this.walletAmount
            },
            updateParent () {
                this.$emit(`update`, {
                    naira: this.amount.naira,
                    p2p: this.amount.p2p,
                    remainder: this.initialAmount,
                    tag: this.walletTag
                })
            }
        },

        mounted () {
            if(this.walletAmount)
                this.initialAmount = this.walletAmount
        }
    }
</script>