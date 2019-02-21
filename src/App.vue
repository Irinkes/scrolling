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
    scrollHorizontally: function (e) {
      e = window.event || e
      if (this.scrollDirection === 'down') {
        document.getElementById('nav_' + this.slidesNumber).scrollLeft += window.innerWidth
      } else if (this.scrollDirection === 'up') {
        document.getElementById('nav_' + this.slidesNumber).scrollLeft -= window.innerWidth
      }

      e.preventDefault()
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
    getFirstLoadedSlide: function () {
      this.firstLoadedSlide = this.getSlideIntoView()
      this.currentSlide = this.firstLoadedSlide
    }
    // scrollHorizontally: function () {
    //   let horizontalScrollElem = document.querySelector('.horizontal')
    //   horizontalScrollElem.scrollLeft = window.innerWidth
    // }
  },

  mounted () {
    this.slidesNumber = this.$children.length
  },
  created () {
    window.addEventListener('wheel', this.handleScroll)
    window.addEventListener('load', this.getFirstLoadedSlide)
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
