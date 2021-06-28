<template>
    <section class=" my-0">
        <!-- <br/> -->
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="shadow p2p-box">
                        <div class="btn-wrapper text-center">
                            <div style='margin-bottom: 10px'>
                                <img src="/static/assets/images/p2p/p2pmaincolourlogo.png" height="60" width="60">
                            </div>
                        </div>
                        <div>
                            <form role="form">
                                <div class="form-group">
                                    <label class='p2p-label'>FULL NAME</label>
                                    <input v-model = "userData.fullname" type = "text" class="form-control p2p-input">
                                </div>
                                <br>

                                <div class="form-group">
                                    <label class='p2p-label'>EMAIL ADDRESS</label>
                                    <input v-model = "userData.email" type = "email" class="form-control p2p-input">
                                </div>
                                <br>
                                <div class="form-group">
                                    <label class='p2p-label'>PASSWORD</label>
                                    <input v-model = "userData.password" type = "password" class="form-control p2p-input" v-on:input='validatePassword'>
                                </div>
                                <br>
                                <div class="form-group">
                                    <label class='p2p-label'>CONFIRM PASSWORD</label>
                                    <input v-model = "userData.passwordRepeat" type = "password" class="form-control p2p-input">
                                </div>
                                <div class="form-group" v-if="$route.query.r">
                                    <label class='p2p-label'>Referral</label>
                                    <input v-model = "userData.referral" type = "text" class="form-control p2p-input" readonly>
                                </div>

                                <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span :class="{'text-danger': passwordLevel === 0, 'text-warning': passwordLevel === 1, 'text-success': passwordLevel === 2, 'font-weight-700': true}">{{passwordComment}}</span>
                                    </small>
                                </div>
                                <br>
                                <div class="form-group">
                                    <input v-model = 'userData.accept_terms' id = 'terms' type="checkbox" class="form-check-input" >
                                    <label for ='terms'>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </label>
                                </div>
                                <!-- <br> -->
                                <div class="login-button">
                                    <button @click = 'register' type="submit" class="btn btn-success p2p-button login-button" >Create account</button>
                                </div>
                                <p>Already have an account? <router-link to="/login"> login here</router-link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import config from '../config'
import axios from 'axios'
export default {
    data() {
        return {
            userData: {
                fullname: '',
                email: '',
                password: '',
                passwordRepeat: '',
                referral: '',
                accept_terms: false
            },
            passwordLevel: 0,
            passwordComment: ''
        }
    },

    methods: {
        register (e) {
            e.preventDefault()
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            if(!re.test(this.userData.email)) {
                this.error = true
                this.errorMessage = 'Invalid Email Address'
                return
            }
            if(this.passwordLevel === 0) {
                this.error = true
                this.errorMessage = `
                PLEASE CHOOSE A STRONGER PASSWORD: 
                    ${this.passwordInstructions}
                `
                return
            }
             this.loading = true
             if(this.userData.accept_terms) {
                axios.post(`${config.apiBaseUrl}/register`, this.userData)
                    .then((resp) => {
                        this.loading = false
                        if (resp.data.success) {
                            this.$router.push('/dashboard')
                        } else {
                            this.error = true
                            this.errorMessage = resp.data.message
                            console.log('FAILED REGISTRATION', resp.data)
                        }
                    }).catch((e) => {
                        this.loading = false
                        this.error = true
                        this.errorMessage = e.message
                        console.log('FAILED REGISTRATION', e.message)
                    })
             } else {
                this.error = true
                this.errorMessage = 'You must accept terms and conditions'
                this.loading = false
             }
         },


         validatePassword () {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(strongRegex.test(this.userData.password)) {
                this.passwordLevel = 2
                this.passwordComment = 'Strong'
                // this.passwordImg = require('@/assets/img/good.png')
            } else if(mediumRegex.test(this.userData.password)) {
                this.passwordLevel = 1
                this.passwordComment = 'Fair'
                // this.passwordImg = require('@/assets/img/medium-good.png')
            } else {
                this.passwordLevel = 0
                this.passwordComment = 'Weak'
                // this.passwordImg = require('@/assets/img/bad.png')
            }
        }
    },

    mounted () {
        if(this.$route.query.r) this.userData.referral = this.$route.query.r
    }
};
</script>

<style scoped>
    input:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
