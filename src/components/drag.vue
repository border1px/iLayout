<template>
<div class="idrag">
  <div class="components-wrap">
      <!-- 媒体组件 -->
      <div class="component-group">
        <div class="component-group-title">媒体组件</div>
        <draggable
          class="component-item-wrapper"
          element="ul"
          :list="mediaComponents"
          :options="{
            group: {
              name: 'widget',
              pull: 'clone',
              put: false
            },
            sort: false,
            ghostClass: 'ghost',
            animation: 150
          }"
        >
          <li class="component-item" v-for="(item, index) in mediaComponents" :key="index"
            @click="selectWidget(item.type)">
            <p>
              <i class="iconfont " :class="item.icon"></i>
            </p>
            <p class="text">{{ item.name }}</p>
          </li>
        </draggable>
      </div>

      <!-- 商城组件 -->
      <div class="component-group">
        <div class="component-group-title">商城组件</div>
        <draggable
          class="component-item-wrapper"
          element="ul"
          @end="onEnd"
          :list="storeComponents"
          :options="{
            group: {
              name: 'widget',
              pull: 'clone',
              put: false
            },
            sort: false,
            ghostClass: 'ghost',
            animation: 150
          }"
        >
          <li class="component-item" v-for="(item, index) in storeComponents" :key="index"
            @click="selectWidget(item.type)">
            <p>
              <i class="iconfont " :class="item.icon"></i>
            </p>
            <p class="text">{{ item.name }}</p>
          </li>
        </draggable>
      </div>

      <!-- 工具组件 -->
      <div class="component-group">
        <div class="component-group-title">工具组件</div>
        <draggable
          class="component-item-wrapper"
          element="ul"
          :list="utilsComponents"
          :options="{
            group: {
              name: 'widget',
              pull: 'clone',
              put: false
            },
            sort: false,
            ghostClass: 'ghost',
            animation: 150
          }"
        >
          <li class="component-item" v-for="(item, index) in utilsComponents" :key="index"
            @click="selectWidget(item.type)">
            <p>
              <i class="iconfont " :class="item.icon"></i>
            </p>
            <p class="text">{{ item.name }}</p>
          </li>
        </draggable>
      </div>
  </div>
</div>
</template>

<script>
import allWidgets from './drag/index'
export default {
  name: 'drag',
  data () {
    return {
      mediaComponents: allWidgets.mediaComponents,
      storeComponents: allWidgets.storeComponents,
      utilsComponents: allWidgets.utilsComponents
    }
  },
  methods: {
    onEnd (e) {
      //
    }
  }
}
</script>

<style lang="stylus">
.idrag
  background-color #FFF
  border-radius 4px
  width 90%
  margin 0 auto
  height 100%
  position relative
  box-shadow rgba(0, 0, 0, 0.1) 2px 0px 10px
  .components-wrap
    padding: 10px
    text-align: left
    color: #666
    .component-group
      margin-bottom 30px
      &-title
        font-size: 14px
        font-weight bold
        color: #999
        margin: 10px 0
      .component-item-wrapper
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        margin-bottom -10px
        // 每行三列解决方案
        &:after       // 1、设置容器伪类
          content: ''
          width 78px  // 2、与子元素宽度相同
          height 0    // 3、高度为0
      .component-item
        margin-bottom 10px
        padding: 12px 0
        width 78px
        text-align: center
        display: inline-block
        background-color: #f5f5f5
        border: 1px solid #ddd
        font-size: 12px
        color: #333
        cursor: pointer
        // -webkit-transition: all 0.5s
        // transition: all 0.5s
        .iconfont
          font-size: 30px !important
          margin-bottom: 5px
          margin-right: 0!important
        .text
          padding: 0
          margin-top: 5px
        &:hover
          background-color #E7F3FD
          cursor move
</style>
