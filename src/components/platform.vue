<template>
<div class="platform">
  <rule>
    <iphone>
      <layout></layout>
    </iphone>
  </rule>
</div>
</template>

<script>
import Rule from './rule.vue'
import Iphone from './iphone.vue'
import Layout from './layout.vue'

export default {
  name: 'platform',
  components: {
    Rule,
    Iphone,
    Layout
  }
}
</script>

<style lang="stylus">
.platform
  position relative
  overflow hidden
  background-color #F5F5F5
  width 100%
  height 100%
</style>
