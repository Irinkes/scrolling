<template>
    <div class="horizontal bottom-slide" :id="`nav_${level}`" >
        <div class="horizontal-slide" :style="{ width: slideWidth + 'px' }">
            <Tracker :level="level" :items="this.components"/>
        </div>
        <div class="horizontal-slide" :style="{ width: slideWidth + 'px' }"></div>
        <div class="horizontal-slide" :style="{ width: slideWidth + 'px' }"></div>
    </div>
</template>

<script>

import Tracker from '@/components/Tracker'
import HorizontalSlides from '@/components/HorizontalSlides'

export default {
  props: ['components'],
  components: {Tracker, HorizontalSlides},
  name: 'BottomPage',
  data () {
    return {
      level: 3,
      slideWidth: 0
    }
  },
  mounted () {
    this.slideWidth = document.body.offsetWidth
  }
}
</script>
