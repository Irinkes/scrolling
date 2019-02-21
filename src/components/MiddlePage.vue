<template>
    <div class="middle-slide" :id="`nav_${level}`">
        <Tracker :level="level" :items="this.components"/>
    </div>
</template>

<script>
import Tracker from '@/components/Tracker'
export default {
  props: ['components'],
  components: {Tracker},
  name: 'MiddlePage',
  data () {
    return {
      level: 2
    }
  }
}
</script>
