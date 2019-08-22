<template>
<div class="layout">
  <!-- <div class="layout-container"> -->
    <draggable
      class="layout-list"
      :class="{ 'widget-empty': pageData.length === 0 }"
      v-model="pageData"
      :options="{
        group: {
          name: 'widget'
        },
        sort: true,
        ghostClass: 'ghost',
        dragClass:'dragItem',
        filter:'.lay-record',
        scroll: true,
        scrollSensitivity:100,
        scrollSpeed:1000,
        animation: 100
      }"
      @add="handleWidgetAdd"
      @update="datadragEnd"
      @remove="handleDragRemove"
    >
      <template v-for="(item, index) in pageData">
        <div
          class="layout-main"
          :key="item.key"
          :class="{ active: selectWg.key === item.key,npr:item.type=='record'}"
          @click="handleSelectWidget(index)"
        >
          <!-- 搜索框 -->
          <div v-if="item.type === 'search'" class="drag lay-item lay-search">
            <div class="lay-search-c">
              <input v-model="item.value.keywords" class="lay-search-input" :class="item.value.style" />
              <i class="iconfont icon-sousuo1"></i>
            </div>
          </div>

          <!-- 购买记录 -->
          <div v-if="item.type==='record'" class="drag lay-record" :class="item.value.style.align"
            @click="handleSelectRecord(index)" :style="{top:item.value.style.top+'%'}">
            <div class="lay-record-item">
              <i class="layui-icon layui-icon-user"></i>
              <span class="text">xxx刚刚0.01元买到了xxx</span>
            </div>
            <div @click.stop="handleWidgetDelete(index)" class="btn-delete" v-if="selectWg.key === item.key">删除</div>
          </div>

          <!-- 商品组 -->
          <div v-if="item.type === 'goods'" class="drag clearfix lay-goods" :class="item.value.display">
            <div class="goods-head">
              <div>{{item.value.title}}</div>
              <div v-if="item.value.lookMore">查看更多></div>
            </div>
            <div class="goods-item" v-for="(goods,key) in item.value.list" :key="key"
              :class="'column'+item.value.column">
              <div class="goods-image">
                <img :src="goods.image_url||goods.image" alt="">
              </div>
              <div class="goods-detail">
                <p class="goods-name twolist-hidden">
                  {{goods.name||'此处显示商品名称'}}
                </p>
                <div class="goods-text">
                  <div class="goods-price">{{goods.price||'99.00'}}</div>
                  <div class="goods-extra">销量：20</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 团购秒杀 -->
          <div v-if="item.type === 'groupPurchase'" class="drag clearfix lay-goods slide group">
            <div class="goods-head">
              <div>{{item.value.title}}</div>
            </div>
            <div class="group-item" v-for="(goods,key) in item.value.list" :key="key">
              <div class="group-image">
                <img src="lib/img/empty-banner.png" alt="">
              </div>
              <div class="group-detail">
                <p class="group-name twolist-hidden">
                  {{goods.name||'此处显示商品名称'}}
                </p>
                <p class="group-price">{{goods.price||'￥99.00'}}</p>
                <p class="group-time"><span>剩余：</span><span class="time">21</span>:<span class="time">30</span>:<span
                    class="time">45</span></p>
                <span class="buy-icon">
                  <img src="lib/img/ic-car.png" alt="">
                </span>
              </div>
            </div>
          </div>

          <!-- 拼团 -->
          <div v-if="item.type === 'pintuan'" class="drag clearfix lay-goods slide group">
            <div class="goods-head">
              <div>{{item.value.title}}</div>
            </div>
            <div class="group-item" v-for="(goods,key) in item.value.list" :key="key">
              <div class="group-image">
                <img src="lib/img/empty-banner.png" alt="">
              </div>
              <div class="group-detail">
                <p class="group-name twolist-hidden">
                  {{goods.name||'此处显示商品名称'}}
                </p>
                <p class="group-price">{{goods.price||'￥99.00'}}</p>
                <p class="group-time"><span>剩余：</span><span class="time">21</span>:<span class="time">30</span>:<span
                    class="time">45</span></p>
                <span class="buy-icon">
                  <img src="lib/img/ic-car.png" alt="">
                </span>
              </div>
            </div>
          </div>

          <!-- 图片轮播 -->
          <div v-if="item.type==='imgSlide'" class="drag lay-item lay-imgSlide">
            <el-carousel :interval="item.value.duration" arrow="never" :autoplay="false">
              <el-carousel-item v-for="(list,key) in item.value.list" :key="key">
                <img :src="list.image" alt="banner" style="width:100%;height:100%">
              </el-carousel-item>
            </el-carousel>
          </div>

          <!-- 单图组 -->
          <div v-if="item.type==='imgSingle'" class="drag lay-imgSingle">
            <div class="img-wrap" v-for="(img,key) in item.value.list" :key="key">
              <img :src="img.image" alt="">
              <div class="img-btn" :style="{backgroundColor:img.buttonColor,color:img.textColor}" v-show="img.buttonShow">{{img.buttonText}}</div>
            </div>
          </div>

          <!-- 图片橱窗 -->
          <div v-if="item.type==='imgWindow'" class="drag lay-imgWindow clearfix" :class="'row'+item.value.style"
            :style="{}">
            <template v-if="item.value.style==0">
              <div class="display">
                <div class="display-left">
                  <img :src="item.value.list[0].image" alt="">
                </div>
                <div class="display-right">
                  <div class="display-right1">
                    <img :src="item.value.list[1].image" alt="">
                  </div>
                  <div class="display-right2">
                    <div class="left">
                      <img :src="item.value.list[2].image" alt="">
                    </div>
                    <div class="right">
                      <img :src="item.value.list[3].image" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="img-wrap" v-for="(img,key) in item.value.list" :key="key"
                :style="{padding:item.value.margin+'px'}">
                <img :src="img.image" alt="">
              </div>
            </template>
          </div>

          <!-- 视频组 -->
          <div v-if="item.type==='video'" class="drag lay-item lay-video">
            <div class="video-wrap" v-for="(video,key) in item.value.list">
              <video :src="video.url" :poster="video.image" controls="controls" height="200px;"></video>
            </div>
          </div>

          <!-- 文章组 -->
          <div v-if="item.type==='article'" class="drag lay-article">
            <div class="article-wrap clearfix" v-for="(article,key) in item.value.list">
              <div class="article-left">
                <div class="article-left-title">
                  {{article.title||'此处显示文章标题'}}
                </div>
              </div>
              <div class="article-img">
                <img :src="article.cover||'lib/img/empty-banner.png'" alt="">
              </div>
            </div>
          </div>

          <!-- 文章分类 -->
          <div v-if="item.type==='articleClassify'" class="drag lay-article">
            <div class="article-wrap clearfix">
              <div class="article-left">
                <div class="article-left-title">
                  此处显示文章标题
                </div>
              </div>
              <div class="article-img">
                <img src="lib/img/empty-banner.png" alt="">
              </div>
            </div>
            <div class="article-wrap clearfix">
              <div class="article-left">
                <div class="article-left-title">
                  此处显示文章标题
                </div>
              </div>
              <div class="article-img">
                <img src="lib/img/empty-banner.png" alt="">
              </div>
            </div>
          </div>

          <!-- 公告组 -->
          <div v-if="item.type==='notice'" class="drag lay-item lay-notice">
            <i class="iconfont icon-gonggao1"></i>
            <div class="notice-right">
              <div v-for="(notice,key) in item.value.list" class="notice-text">{{notice.title}}</div>
            </div>
          </div>

          <!-- 优惠券组 -->
          <div v-if="item.type==='coupon'" class="drag lay-item lay-coupon">
            <div class="coupon-item">
              <div class="coupon-left">
                <p>满300减30</p>
              </div>
              <div class="coupon-right">
                <p class="conpon-f">订单减1.44元 减100元 </p>
                <p>购买订单满2元 </p>
                <p>2019-05-01 - 2019-05-31</p>
              </div>
              <div class="coupon-btn">
                立即领取
              </div>
            </div>
          </div>

          <!-- 导航组 -->
          <div v-if="item.type==='navBar'" class="drag lay-navBar clearfix" :class="'row'+item.value.limit">
            <div class="item" v-for="(nav,key) in item.value.list" :key="key">
              <div class="item-image">
                <img :src="nav.image" alt="">
              </div>
              <p class="item-text">{{nav.text}}</p>
            </div>
          </div>

          <!-- 辅助空白 -->
          <div v-if="item.type==='blank'" class="drag lay-item lay-blank"
            :style="{height:item.value.height+'px',backgroundColor:item.value.backgroundColor}">
          </div>

          <!-- 文本域 -->
          <div v-if="item.type==='textarea'" class="drag lay-item lay-textarea">
            <div class="lay-search-c">
              <el-input type="textarea" autosize v-html="item.value" resize="none"></el-input>
            </div>
          </div>
          <div @click.stop="handleWidgetDelete(index)" class="btn-delete" v-if="selectWg.key === item.key">删除</div>
          <div @click.stop="handleWidgetClone(index)" class="btn-clone" v-if="selectWg.key === item.key">复制</div>
        </div>
      </template>
    </draggable>
  <!-- </div> -->
</div>
</template>

<script>
import { mapMutations } from 'vuex'

var deepClone = function (obj) {
  let result = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepClone(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

export default {
  name: 'layout',
  data () {
    return {
      pageData: [],
      selectWg: {}
    }
  },
  computed: {
    getNumber (val) {
      return function (val) {
        return Number(val)
      }
    }
  },
  mounted () {
    // if (pageConfig.length > 0) {
    //   for (var i = 0; i < pageConfig.length; i++) {
    //     var item = pageConfig[i]
    //     var elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000)
    //     item.key = item.type + '_' + elKey
    //   }
    //   this.pageData = pageConfig
    // }
  },
  methods: {
    ...mapMutations([
      'SELECT_WIDGET'
    ]),
    setSelectWg (data) {
      this.selectWg = data
      console.log(data)
      this.SELECT_WIDGET(data)
      console.log(this.$store.state.selectWg)
      this.$emit('changeSelectWg', data)
    },
    handleWidgetAdd: function (evt) {
      var newIndex = evt.newIndex
      var elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      var newObj = deepClone(this.pageData[newIndex])
      newObj.key = this.pageData[newIndex].type + '_' + elKey
      this.$set(this.pageData, newIndex, newObj)
      this.setSelectWg(this.pageData[newIndex])
    },
    handleClickAdd: function (obj) {
      var elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      var newObj = deepClone(obj)
      newObj.key = obj.type + '_' + elKey
      var newIndex = this.pageData.length || 0
      this.$set(this.pageData, newIndex, newObj)
      this.setSelectWg(this.pageData[newIndex])
    },
    handleSelectWidget (index) {
      this.setSelectWg(this.pageData[index])
    },
    handleSelectRecord (index) {
      this.setSelectWg(this.pageData[index])
    },
    deleteWidget (index) {
      if (this.pageData.length - 1 === index) {
        if (index === 0) {
          this.setSelectWg([])
        } else {
          this.setSelectWg(this.pageData[index - 1])
        }
      } else {
        this.setSelectWg(this.pageData[index + 1])
      }
      this.$nextTick(() => {
        this.pageData.splice(index, 1)
      })
    },
    handleWidgetDelete (deleteIndex) {
      var that = this

      that.$alert(
        'Confirmation',
        'Are you sure?',
        'warning',
        (button, text) => {
          console.log(button)
          if (button === 'warning') {
            that.deleteWidget(deleteIndex)
          }
        })
    },
    handleWidgetClone (index) {
      let cloneData = deepClone(this.pageData[index])
      cloneData.key =
        this.pageData[index].type +
        '_' +
        Date.now() +
        '_' +
        Math.ceil(Math.random() * 1000000)
      this.pageData.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.setSelectWg(this.pageData[index + 1])
      })
    },
    handleDragRemove: function (evt) {
      this.setSelectWg({})
    },
    datadragEnd: function (evt) {
      //
    }
  }
}
</script>

<style lang="stylus">
.layout-list
  // background-color #F2F2F2
  height 667px
  overflow-y scroll
  .layout-main
    position relative
    .lay-item
      display flex
.layout-list .layout-main.active .drag:before, .layout-main:hover .drag:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px dashed #ff7159;
  cursor: move;
  z-index: 1001;
}
///////////////////////////////

.layout-list .layout-main .lay-guide .line {
  width: 100%;
  height: 0px;
  border-top: 1px solid #000;
}

.layout-list .layout-main .lay-textarea textarea {
  display: block;
  width: 100%;
  border: none;
}
.lay-navBar{
  min-height:88px;
}
.layout-list .layout-main .lay-navBar.row3 .item {
  width: 33.3333%;
}

.layout-list .layout-main .lay-navBar.row4 .item {
  width: 25%;
}

.layout-list .layout-main .lay-navBar.row5 .item {
  width: 20%;
}

.layout-list .layout-main .lay-navBar .item {
  float: left;
  text-align: center;
  padding: 10px 0;
}

.layout-list .layout-main .lay-navBar .item-image {
  margin-bottom: 4px;
  text-align: center;
}

.layout-list .layout-main .lay-navBar .item-image img {
  height: 44px;
  width: 44px;
  object-fit: cover;
}

.layout-list .layout-main .lay-navBar .item-text {
  height: 20px;
  line-height: 20px;
  width: 70px;
  margin: 0 auto;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
