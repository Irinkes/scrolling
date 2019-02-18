<template>
  <div id="app" :style="{ transform: pageHeight }">

      <TopPage ref="slide" :components = 'slidesNumber'/>
      <MiddlePage ref="slide" :components = 'slidesNumber'/>
      <BottomPage ref="slide" :components = 'slidesNumber'/>

  </div>
</template>

<script>
import TopPage from '@/components/TopPage'
import MiddlePage from '@/components/MiddlePage'
import BottomPage from '@/components/BottomPage'
import Tracker from '@/components/Tracker'

export default {
  components: {TopPage, MiddlePage, BottomPage, Tracker},
  name: 'App',
  data () {
    return {
      pageHeight: 'translateY(0)',
      heightStyle: 0,
      scrollDirection: '',
      slidesNumber: 0
    }
  },
  methods: {
    handleScroll: function (event) {
      let pageHeight = window.innerHeight
      this.pageHeight = 'translateY(' + (-this.heightStyle) + 'px)'
      this.getScrollDirection(event)
      if (this.scrollDirection === 'up') {
        this.heightStyle -= pageHeight
      } else if (this.scrollDirection === 'down') {
        this.heightStyle += pageHeight
      }
      this.pageHeight = 'translateY(' + (-this.heightStyle) + 'px)'
    },
    getScrollDirection: function (e) {
      if (e.deltaY < 0) {
        this.scrollDirection = 'up'
      }
      if (e.deltaY > 0) {
        this.scrollDirection = 'down'
      }
    }
  },

  mounted () {
    this.slidesNumber = this.$children.length
  },
  created () {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('wheel', this.handleScroll)
  }

}
</script>

<style>
  @import "../static/css/main.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
