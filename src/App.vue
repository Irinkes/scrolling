<template>
  <div id="app" :style="{ transform: pageHeight }" @click="getSlideIntoView">

      <TopPage ref="slide" :components = 'slidesNumber' />
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
      slidesNumber: 0,
      firstLoadedSlide: 0,
      currentSlide: 1,
      horizontalSlides: 3,
      horizontalScrolling: false
    }
  },
  methods: {
    handleScroll: function (event) {
      let firstSlide = this.getSlideIntoView()
      let currentHorizontalSlide = this.getHorizontalSlideIntoView()
      let pageHeight = window.innerHeight
      this.pageHeight = 'translateY(' + (-this.heightStyle) + 'px)'
      this.getScrollDirection(event)
      if (this.scrollDirection === 'up') {
        // если находимся на последнем слайде
        if (!this.horizontalScrolling) {
          if (firstSlide !== 1) {
            this.currentSlide = firstSlide - 1
            this.heightStyle -= pageHeight
          } else {
            return
          }
        } else if (this.horizontalScrolling && currentHorizontalSlide === 1) {
          console.log('scroll up here')
          this.horizontalScrolling = false
        } else {
          document.getElementById('nav_' + this.slidesNumber).scrollLeft -= window.innerWidth
        }
      } else if (this.scrollDirection === 'down') {
        if (!this.horizontalScrolling && this.currentSlide !== this.slidesNumber) {
          this.currentSlide = firstSlide + 1
          this.heightStyle += pageHeight
          console.log(firstSlide)
        } else if (!this.horizontalScrolling && this.currentSlide === this.slidesNumber) {
          // если находимся на последнем слайде, скроллим горизонтально
          console.log('is it horizontal scrolling?')
          this.horizontalScrolling = true
        } else if (this.horizontalScrolling) {
          document.getElementById('nav_' + this.slidesNumber).scrollLeft += window.innerWidth
        }
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
    },

    intoView: function (elem) {
      let bounding = elem.getBoundingClientRect()
      return (
        bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    getSlideIntoView: function () {
      let slideId
      for (let i = 1; i <= this.slidesNumber; i++) {
        let elem = document.getElementById('nav_' + i)
        if (this.intoView(elem)) {
          slideId = i
        }
      }
      return slideId
    },
    getHorizontalSlideIntoView: function () {
      let slideId
      for (let i = 1; i <= this.horizontalSlides; i++) {
        let elem = document.getElementById('horiz_' + i)
        if (this.intoView(elem)) {
          slideId = i
        }
      }
      return slideId
    },
    getFirstLoadedSlide: function () {
      this.firstLoadedSlide = this.getSlideIntoView()
      this.currentSlide = this.firstLoadedSlide
    }
  },

  mounted () {
    this.slidesNumber = this.$children.length
  },
  created () {
    window.addEventListener('wheel', this.handleScroll, false)
    window.addEventListener('load', this.getFirstLoadedSlide)
  },
  destroyed () {
    window.removeEventListener('wheel', this.handleScroll, false)
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
