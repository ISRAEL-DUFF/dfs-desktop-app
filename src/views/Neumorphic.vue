<template>
    <Page uname='neumorphic' jsSrcName = 'homePageJs' cssSrcName='homePageCss' @ready = 'createButton'>
        <h1>Hello, world!</h1>

        <!-- <div class='neum-container'>
            <div class='element neum-inset-flat box '></div>
            <div class='element neum-inset-concave circular'></div>
            <div class='element neum-extrude-convex box'></div>
            <div class='element neum-extrude-concave circular'></div>
        </div> -->

        <!-- <div class='container'>
            <div class='row neum-container'>
                <div class='col-md-2'>
                    <div class='element neum-inset-flat box '>Inset flat box</div>
                </div>
                <div class='col-md-2'>
                    <div class='element neum-inset-concave circular'>Inset concave circular</div>

                </div>
                <div class='col-md-2'>
                    <div class='element neum-extrude-concave box'>Extrude convex box</div>

                </div>
                <div class='col-md-2'>
                    <div class='element neum-extrude-convex circular'>Extrude concave circular</div>
                </div>
                <div class='col-md-2'>
                    <div class='element neum-inset-convex box'> Inset Convex box</div>
                </div>
                <div class='col-md-2'>
                    <div class='element neum-extrude-concave circular'>Extrude concave circular</div>
                </div>
                
            </div>
        </div>

        <div class='container'>
            <div class='row neum-container'>
                <div class='col-md-2'>
                </div>
                <div class='col-md-2'>

                </div>
                <div class='col-md-2'>
                    <div class='form-group '>
                        <button class='neum-button neum-extrude-concave box'>Concave Button</button>
                        <br><br>
                        <button class='neum-button neum-extrude-convex box'>Convex Button</button>

                        <br><br>
                        <button class='neum-button neum-inset-flat box'>Convex Button</button>
                        <button class='neum-button neum-inset-convex box'>Convex Button</button>
                    </div>
                </div>
                <div class='col-md-2'>
                </div>
                <div class='col-md-2'>
                </div>
                <div class='col-md-2'>
                    <div ref = 'pp'>sss</div>
                    <div ref= 'ppp'>AAA</div>
                </div>
                
            </div>
        </div> -->

        <!-- <div class='container'>
            <div class='row'>
                <div class='col-md-12' ref = 'neumorpph'></div>
            </div>
        </div> -->

        <router-link to='/test'>Goto Test</router-link>

        <Card />

        <!-- Optional JavaScript; choose one of the two! -->

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <!-- <script src="bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
    </Page>
</template>

<script>
   import Button from '@/components/neumorphism/Button';
   import Card from '@/components/neumorphism/Card';
//    import Login from './Login.vue'
   
export default {
    data() {
        return {

        }
    },
    components: {Card},
    methods: {
        createButton() {
            let BtnClass = this.$VueExtend(Button)
            let btn = new BtnClass({
                propsData: {
                    type: 'primary'
                },
                slots: {
                    default: () => ["Hello here from me"]
                }
            })
            btn.$mount()
            // this.$refs.pp.appendChild(btn.$el())


          let btn2 =  new BtnClass({
                propsData: {
                    type: 'primary'
                },
                slots: {
                    default: () => ["Another button"]
                }
            })
            // btn2.$mount()
            //  this.$refs.ppp.appendChild(btn2.$el())

            btn2.$mountEnd(this.$refs.ppp)

            // login.$mountEnd(this.$refs.login)
        }
    },

    mounted() {
        // this.createButton(document.getElementById('pp'))
    }
}
</script>
