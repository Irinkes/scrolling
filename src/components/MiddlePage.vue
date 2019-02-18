<template>
    <div class="middle-slide">
        <Tracker :level="2" :items="this.components"/>
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

    }
  }
}
</script>
