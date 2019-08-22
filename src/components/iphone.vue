<template>
<div id="wrapper" class="iphone">
  <div class="header">
    <span class="camera"></span>
    <span class="sensor"></span>
    <span class="speaker"></span>
  </div>
  <div class="buttons power-button"></div>
  <div class="buttons voice-toogle"></div>
  <div class="buttons voice-plus"></div>
  <div class="buttons voice-minus"></div>
  <div class="screen" ref="screen">
    <div class="loading hide">
    <span class="icon-0"></span>
    </div>
    <div class="content visible">
    <div id="content_editor" class="page ps-container ps-theme-light" data-ps-id="fff7bebc-5f2b-a5a1-9750-3d4c5049fb1c">
      <!-- <div id="homepageContainer"> -->
        <!-- <div id="MEC_Design_Container" class="ui-sortable"> -->

          <!-- slot插槽 -->
          <slot></slot>

        <!-- </div> -->
      <!-- </div> -->
      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
      <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
      </div>
      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
      <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
      </div>
    </div>
    <div id="content_editor_bottom"></div>
    </div>
  </div>
  <div class="home-button">
    <span></span>
  </div>
</div>
</template>

<script>
export default {
  name: 'iphone',
  created () {
    //
  },
  mounted () {
    this.getRealTimePos()
  },
  methods: {
    getRealTimePos () {
      if (this.$parent.$options.name === 'rule') {
        this.$parent.screenOffset = this.$refs.screen.getBoundingClientRect()
      }
    }
  }
}
</script>>

<style lang="stylus">
.iphone
  margin: 25px auto;
  position: relative;
  display: block;
  height: 667px;
  width: 375px;
  border: 6px solid #efeff4;
  padding: 0px 10px 165px;
  border-radius: 50px;
  background: #fafafa;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.7);
  box-sizing: content-box;
  .header
    padding: 15px 5px 35px;
  .camera
    display: block;
    margin: 0 auto;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-bottom: 13px;
    background: #333;
  .sensor
    width: 12px;
    height: 12px;
    background: #333;
    margin-top: -4px;
    border-radius: 50%;
    position: absolute;
    left: 132px;
  .speaker
    display: block;
    width: 70px;
    height: 8px;
    margin: 0 auto;
    margin-top: -2px;
    border-radius: 6px;
    background: #292728;
  .buttons
    display: block;
    background: #efeff4;
    position: absolute;
    border-radius: 2px 0px 0px 2px;
  .home-button
    padding: 12px 0 0;
    span
      position: relative;
      display: block;
      margin: 0 auto;
      width: 62px;
      height: 62px;
      background: #ddd;
      border-radius: 50%;
    span:after
      content: "";
      display: block;
      width: 56px;
      height: 56px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 3px;
  .power-button
    left: auto;
    right: -8px;
    top: 165px;
    border-radius: 0px 2px 2px 0px;
    height: 60px;
    width: 5px;
  .voice-toogle
    height: 40px;
    width: 3px;
    top: 80px;
    left: -8px;
  .voice-plus
    height: 60px;
    width: 5px;
    left: -8px;
    top: 165px;
  .voice-minus
    height: 60px;
    width: 5px;
    left: -8px;
    top: 245px;
  .screen
    width: 100%;
    height: 100%;
    background-color: #fff
    box-sizing: content-box
    border: 2px solid rgba(0, 0, 0, 0.65);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    .content
      height: 100%
      width: 100%
      visibility: hidden
      margin: 0
      font-size: 16px
      .page
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #efefef;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
.hide
  display: none;
.loading
  position: absolute;
  top: 0;
  left: 0;
  color: #929292;
  height: 100%;
  width: 100%;
  z-index: 999;
#content_editor
  position: relative;
  width: 100%;
  height: 100%;
.screen .content.visible *
  visibility: visible;
#homepageContainer
  position: relative;
  width: 100%;
#MEC_Design_Container
  position: absolute;
  min-height: 663px;
  width: 100%;
  overflow: hidden;
.ps-scrollbar-x-rail
  left: 0px;
  bottom: 0px;
.ps-scrollbar-x
  left: 0px;
  width: 0px;
.ps-scrollbar-y-rail
  left: 0px;
  bottom: 0px;
.ps-scrollbar-y
  top:0;
  height: 0;
#content_editor_bottom
  width: 100%;
  background-color: #fefefe;
  position: absolute;
  left: 0;
  bottom: 0;
  display: none;
  z-index: 10;
</style>
