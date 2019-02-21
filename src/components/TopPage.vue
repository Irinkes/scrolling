<template>
  <div class="top-slide" :id="`nav_${level}`">
    <Tracker :level="level" :items="this.components"/>
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
      level: 1
    }
  },
  methods: {

  }

}
</script>
