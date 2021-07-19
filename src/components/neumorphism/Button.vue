<template>
 <button :class="type">
    <slot></slot>
    <slot name='name1'></slot>
  </button>
</template>
<script>
 export default {
   name: 'Button',
   props: ['type'],
   mounted() {
    //  console.log('my slots:',this.type, this.$slots)
   }
 }
</script>

<style scoped>
  
</style>