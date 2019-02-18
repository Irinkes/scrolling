<template>
    <div class="bottom-slide">
        <Tracker :level="3" :items="this.components"/>
    </div>
</template>

<script>

import Tracker from '@/components/Tracker'
export default {
  props: ['components'],
  components: {Tracker},
  name: 'BottomPage',
  data () {
    return {

    }
  }
}
</script>
