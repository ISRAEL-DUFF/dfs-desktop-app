<template>
    <div class='container'>
        <div class='row'>
            <div class='col-12'>
                <div id = 'n-container'>
                    <div class='n-circle flat'>Flat</div><br>
                    <div class='n-circle inset'>Inset</div>
                </div>
            </div>
        </div>
                <router-link to='/neumorphic'>Goto Test</router-link>

    </div>
</template>
<script>
 export default {
   mounted() {
    //  console.log('my slots:',this.type, this.$slots)
   }
 }
</script>

<style scoped>
  #n-container {
      --main-color: #e4ebf5;
      --light: #c8d0e7;
      --dark: #9baacf;
      --light-side: 5px 5px 0.2rem var(--light);
      --dark-side: -3px -3px 0.2rem var(--dark);
      height: 500px;
      width: 500px;
      background-color: var(--main-color);
      margin: auto;
      padding-top: 10%; 
      padding-left: 10%
  }

  .n-circle {
      border-radius: 5px;
      width: 80px;
      height: 80px;
      background:var(--main-color);
      /* box-shadow: inset 5px 5px 0.2rem var(--light), inset -3px -3px 0.2rem var(--dark); */
      /* margin: auto; */
  }

  .inset {
    box-shadow: inset var(--light-side), inset var(--dark-side);
  }

  .flat {
    box-shadow: var(--light-side), var(--dark-side);
  }
</style>