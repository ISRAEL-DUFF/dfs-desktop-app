<template>
    <div>
        <div class="base-timer" @click='openTxModal'>
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    :id="'base-timer-path-remaining-' + tx.id"
                    stroke-dasharray="283"
                    :class='timerClass'
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
                ></path>
                </g>
            </svg>
            <span :id="'base-timer-label-' + tx.id" class="base-timer__label">
                {{formatTime(timeLeft)}}
            </span>
        </div>

        <Modal :name="'txModal' + tx.id" :openCmd = '"openTxModal" + tx.id' :closeEvt = '"closeTxModal" + tx.id'>
            <template v-slot:title>
                <h5 class="modal-title" id="varyModalLabel">Transaction Details</h5>
            </template>
            <template v-slot:body>
                <p>Transaction details for {{tx.id}}</p>
                <p>Email: {{user.email}}</p>
                <p>{{user.phone}}</p>
                <p>{{user.accountNumber}}</p>
                <p>{{user.bankName}}</p>
            </template>
            <template v-slot:footer>
                <button @click = 'closeTxModal' type="button" class="btn mb-2 btn-default">Cancel</button>

                <span v-if = 'tx.status != "appeal"'>
                    <button @click = 'confirm' v-if = 'tx.seller.id === profile.userId' type="button" class="btn mb-2 btn-info">I have Received the Money</button>
                    <button @click = 'confirm' v-if = 'tx.buyer.id === profile.userId' type="button" class="btn mb-2 btn-success">I have transfered the Money</button>
                    <!-- <button @click = 'confirm' v-if = 'tx.type==="sell" && tx.user.id === profile.userId' type="button" class="btn mb-2 btn-info">I have Received the Money 1</button>
                    <button @click = 'confirm' v-if = 'tx.type==="buy" && tx.user.id === profile.userId' type="button" class="btn mb-2 btn-success">I have transfered the Money 2</button> -->

                    <!-- <button @click = 'confirm' v-if = 'tx.type==="sell" && tx.user.id != profile.userId' type="button" class="btn mb-2 btn-info">I have transfered the Money 3</button>
                    <button @click = 'confirm' v-if = 'tx.type==="buy" && tx.user.id != profile.userId' type="button" class="btn mb-2 btn-success">I have Received the Money 4</button> -->
                </span>

                <button @click ='openChat' class="btn mb-2 btn-warning">Chat</button>

                <button v-if = 'tx.status==="appeal"' type="button" class="btn mb-2 btn-danger">Appeal</button>
            </template>
        </Modal>
    </div>
</template>

<script>
    import Modal from '@/components/p2p/Modal'
    import eventHub from '@/eventHub'
    import socketMixin from '@/mixins/socket'
    import { mapState } from 'vuex';
    import axios from 'axios';
    import config from '@/config'

    // Credit: Mateusz Rybczonec

    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 300;
    const ALERT_THRESHOLD = 60;

    const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
    };

    const TIME_LIMIT = 900;
    // let timePassed = 0;
    // let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    export default {
        data() {
            return {
                timerInterval: null,
                timeLeft: TIME_LIMIT,
                timePassed: 0,
                timerClass: JSON.parse(`{"base-timer__path-remaining ${remainingPathColor}": true}`)
            }
        },

        props: [
            'tx'
        ],
        components: {
            Modal
        },

        computed: {
            ...mapState({
                'profile': (state) => state.user.profile,
                'recentChats': (state) => state.chat.recentChats
            }),

            user: function() {
               return this.profile.userId === this.tx.buyer.id ? this.tx.seller : this.tx.buyer
            }
        },

        methods: {
            startTimer() {
                let that = this;
                this.timerInterval = setInterval(() => {
                    that.timePassed = that.timePassed += 1;
                    that.timeLeft = TIME_LIMIT - that.timePassed;
                    document.getElementById(`base-timer-label-${that.tx.id}`).innerHTML = that.formatTime(
                    that.timeLeft
                    );
                    that.setCircleDasharray();
                    that.setRemainingPathColor(that.timeLeft);

                    if (that.timeLeft === 0) {
                        that.timeUp();
                    }
                }, 1000);
            },

            formatTime(time) {
                const minutes = Math.floor(time / 60);
                let seconds = time % 60;

                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }

                return `${minutes}:${seconds}`;
            },

            timeUp() {
                this.endTimer()
                this.$emit('tx-expired',this.tx.id)
            },

            setRemainingPathColor(timeLeft) {
                const { alert, warning, info } = COLOR_CODES;
                let timerPath = document.getElementById(`base-timer-path-remaining-${this.tx.id}`)
                if (timeLeft <= alert.threshold) {
                    timerPath.classList.remove(warning.color);
                    timerPath.classList.add(alert.color);
                } else if (timeLeft <= warning.threshold) {
                    timerPath.classList.remove(info.color);
                    timerPath.classList.add(warning.color);
                }
            },

            calculateTimeFraction() {
                const rawTimeFraction = this.timeLeft / TIME_LIMIT;
                return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
            },

            setCircleDasharray() {
                const circleDasharray = `${(
                    this.calculateTimeFraction() * FULL_DASH_ARRAY
                ).toFixed(0)} 283`;
                document
                    .getElementById(`base-timer-path-remaining-${this.tx.id}`)
                    .setAttribute("stroke-dasharray", circleDasharray);
            },

            endTimer() {
                clearInterval(this.timerInterval);
                this.closeTxModal()
            },

            openTxModal () {
                eventHub.$emit(`openTxModal${this.tx.id}`)
            },
            closeTxModal () {
                eventHub.$emit(`closeTxModal${this.tx.id}`)
            },

            confirm () {
                let tx = JSON.parse(JSON.stringify(this.tx))
                tx.userId = this.profile.userId
                this.socketSend({
                    type: 'tx-confirm',
                    data: tx
                })
                this.closeTxModal()
            },

            openChat () {
                // set current chat
                if(this.recentChats[this.user.email]) {
                    this.$store.commit('currentChat', this.user.email)
                    this.closeTxModal()
                    this.$router.push("/dashboard/chat")
                } else {
                    // get recent from server
                    axios.get(`${config.apiBaseUrl}/chats/${this.profile.userId}/${this.user.id}`)
                    .then((resp) => {
                        if(resp.data.success){
                            this.$store.commit('addChat', {
                                email: this.user.email,
                                chats: resp.data.chats
                            })
                            this.$store.commit('currentChat', this.user.email)
                            this.closeTxModal()  // close modal
                            this.$router.push("/dashboard/chat")  // navigate to chat screen
                        } else {
                            console.error("Error fetching chat data")
                        }
                    })
                }
            }
        },

        mounted() {
            this.startTimer()

            eventHub.$on(`end-timer-${this.tx.id}`, () => {
                //this.endTimer()
                this.timeUp()
            })
        },

        mixins: [socketMixin]
    }
</script>

<style scoped>
    body {
    font-family: sans-serif;
    display: grid;
    height: 100vh;
    place-items: center;
    }

    .base-timer {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    }

    .base-timer__svg {
    transform: scaleX(-1);
    }

    .base-timer__circle {
    fill: none;
    stroke: none;
    }

    .base-timer__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
    }

    .base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    }

    .base-timer__path-remaining.green {
    color: rgb(65, 184, 131);
    }

    .base-timer__path-remaining.orange {
    color: orange;
    }

    .base-timer__path-remaining.red {
    color: red;
    }

    .base-timer__label {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    }
</style>