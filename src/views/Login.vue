<template>
    <section class="section section-shaped section-lg my-0">
        <br/><br/><br/><br/>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="shadow p2p-box">
                        <div>
                            <div class="btn-wrapper text-center">
                                <div style='margin-bottom: 20px'>
                                    <img src="/static/assets/images/p2p/p2pmaincolourlogo.png" height="60" width="60">
                                </div>
                            </div>
                        </div>
                        <div>
                            <form role="form">
                                <div class="form-group">
                                    <label class='p2p-label'>EMAIL ADDRESS</label>
                                    <input v-model = 'loginData.email' type = "email" class="form-control p2p-input" required>
                                </div>
                                <br><br>
                                <div class="form-group">
                                    <label class='p2p-label'>PASSWORD</label>
                                    <input v-model = 'loginData.password' type = "password" class="form-control p2p-input">
                                </div>
                                <div class="login-button">
                                    <button @click="login" type="success" class="btn btn-success p2p-button login-button" >Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <router-link to="/register" class="text-light">
                                <small>Create new account</small>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import config from '../config'
export default {
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login (e) {
            e.preventDefault()
            this.loading = true
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            if(!re.test(this.loginData.email)) {
                this.loading = false
                this.error = true
                this.errorMessage = 'Invalid Email Address'
                return
            }

            axios.post(`${config.apiBaseUrl}/login`, this.loginData)
            .then((resp)=>{
                this.loading = false
                if(resp.data.success) {
                    sessionStorage.setItem('p2p_user_profile', JSON.stringify({ id: resp.data.data.id, email: resp.data.data.email, type: resp.data.data.type}))
                    this.$router.push('/dashboard')
                } else {
                    this.error = true
                    this.errorMessage = resp.data.message
                    console.log(this.errorMessage)
                }
            }).catch((e)=> {
                this.loading = false
                this.error = true
                this.errorMessage = 'Login Failed, Try again!!!'
                console.error(e.message)
            })
         }
    }
};
</script>


<style scoped>
/* box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) */

input:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
