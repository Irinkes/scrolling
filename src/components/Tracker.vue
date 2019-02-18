<template>
    <ul class="tracker" @click="showLevel">
        <li v-for="(item,index) in this.items" class="tracker-item" :key="item+index" :class="{ active: parseInt(index+1) === parseInt(slideLevel) }">

        </li>
    </ul>
</template>

<script>
export default {
  name: 'Tracker',
  props: ['level', 'items'],
  data () {
    return {
      slideLevel: this.level
    }
  },
  methods: {
    showLevel: function () {
      console.log(this.level)
    }
  }
}
</script>
<style scoped>
    /*.tracker-item:nth-child(1) {*/
        /*background: red;*/
    /*}*/
</style>
