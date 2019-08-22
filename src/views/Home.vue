<template>
  <div class="i-home">
    <i-header></i-header>
    <div class="home">
      <div class="left-menu"><drag></drag></div>
      <div class="main-content"><platform></platform></div>
      <div class="right-menu"><layout-config></layout-config></div>
    </div>
  </div>
</template>

<script>
import IHeader from '@/components/header.vue'
import Drag from '@/components/drag.vue'
import Platform from '@/components/platform.vue'
import LayoutConfig from '@/components/layout-config.vue'

export default {
  name: 'home',
  components: {
    IHeader,
    Drag,
    Platform,
    LayoutConfig
  }
}
</script>

<style lang="stylus">
.i-home
  width 100%
  height 100%
  .home
    display flex
    height 100%
    .left-menu
      width 300px
      padding: 15px 0
      border-right 1px solid #C5C5C5
      background-color #F2F2F2
    .right-menu
      width:400px
    .main-content
      flex 1
</style>
