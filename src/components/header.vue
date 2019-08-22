<template>
<div class="i-header">
  <div class="brand">移动端应用设计器</div>
  <ul class="tools-btn">
    <li title="保存"><i class="iconfont icon-save1"></i></li>
    <li title="刷新"><i class="iconfont icon-shuaxin1"></i></li>
    <li title="二维码"><i class="iconfont icon-erweima"></i></li>
    <li title="快捷键"><i class="iconfont icon-jianpan"></i></li>
    <li title="源代码"><i class="iconfont icon-baobiaoyuanmax"></i></li>
    <li title="全屏"><i class="iconfont icon-quanping"></i></li>
    <li title="页面地址"><i class="iconfont icon-lianjie"></i></li>
    <li title="云"><i class="iconfont icon-yun"></i></li>
    <li title="关于"><i class="iconfont icon-guanyu"></i></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'iheader'
}
</script>>

<style lang="stylus">
.i-header
  height 50px
  background-color #2196F3
  display flex
  align-items center
  justify-content flex-start
  .brand
    width 300px
    font-size 16px
    font-weight bold
    color #FFF
    text-align left
    padding-left 20px
  .tools-btn
    display flex
    > li
      width 50px
      cursor pointer
    .iconfont
      font-size 22px
      color #FFF
</style>
