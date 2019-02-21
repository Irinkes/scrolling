<template>
    <div class="horizontal" :style="{ width: window.innerWidth + 'px' }">
        <div class="horizontal-slide" :style="{ width: window.innerWidth + 'px' }"></div>
        <div class="horizontal-slide" :style="{ width: window.innerWidth + 'px' }"></div>
        <div class="horizontal-slide" :style="{ width: window.innerWidth + 'px' }"></div>
    </div>
</template>

<script>
import Tracker from '@/components/Tracker'

export default {
  props: [],
  components: {Tracker},
  name: 'HorizontalSlides',
  data () {
    return {
      level: 2

    }
  }
}
</script>
