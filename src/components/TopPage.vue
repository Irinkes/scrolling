<template>
  <div class="top-slide">
    <Tracker level="1" :items="this.components"/>
  </div>
</template>

<script>
import Tracker from '@/components/Tracker'

export default {
  props: ['components'],
  components: {Tracker},
  name: 'TopPage',
  data () {
    return {

    }
  },
  methods: {
    // showSlidesLength: function () {
    //   console.log(this.components)
    // }
  },
  created () {
    this.itemsNumber = this.components
  }
  // computed: {
  //     itemsNumber: function () {
  //       return components
  //     }
  // }
}
</script>
