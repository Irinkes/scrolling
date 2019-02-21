<template>
    <ul class="tracker">
        <li
                v-for="(item,index) in this.items"
                class="tracker-item"
                :key="item+index"
                :class="{ active: parseInt(index+1) === parseInt(slideLevel) }"
        >
            <a :href="`#nav_${index+1}`" v-smooth-scroll class="tracker-link"></a>

        </li>
    </ul>
</template>

<script>

export default {
  name: 'Tracker',
  props: ['level', 'items'],
  data () {
    return {
      slideLevel: this.level
    }
  },
  methods: {

  }
}
</script>
<style scoped>
    /*.tracker-item:nth-child(1) {*/
        /*background: red;*/
    /*}*/
</style>
