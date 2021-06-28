<template>
    <div>
        <form>
            <br>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="eventNote" class="col-form-label">Enter Amount</label>
                </div>
                <div class="form-group col-md-9">
                    <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text" id="button-addon-time"><span class="fe fe-16">&#8358;</span></div>
                    </div>
                    <input v-model="amount.naira" type="number" class="form-control" id="start-time" placeholder="200">
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="eventNote" class="col-form-label"></label>
                </div>
                <div class="form-group col-md-9">
                    <div class="input-group">
                    <input v-model="amount.p2p" type="number" class="form-control" id="start-time" placeholder="200">
                    <div class="input-group-prepend">
                        <div class="input-group-text" id="button-addon-time"><span class="fe fe-16">P2P</span></div>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amount: {
                    p2p: 0,
                    naira: 0
                },
            }
        },

        watch: {
            'amount.naira': function(newNaira) {
                if(newNaira && newNaira >= 0) {
                    this.amount.p2p = newNaira / 1000;
                } else {
                    this.amount.naira = 0
                }
                // console.log("amount.naira:", newNaira)
                this.$emit('data', this.amount)
            },

            'amount.p2p': function(newP) {
                if(newP && newP >= 0) {
                    this.amount.naira = newP * 1000;
                } else {
                    this.amount.p2p = 0
                }
                // console.log("amount.p2p:", newP)
            }
        }
    }
</script>