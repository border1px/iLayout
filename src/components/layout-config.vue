<template>
<div class="layout-config">
  <div v-if="selectWg&& Object.keys(selectWg).length > 0">
    <div class="custom-item main-body" id="editbody">
      <el-form ref="form" label-width="100px" label-position="left">
        <div class="custom-item-t">
          <div class="custom-item-t-c">{{getSelectWgName(selectWg.type)}} </div>
        </div>
        <template v-if="selectWg.type=='search'">
          <el-form-item label="提示内容">
            <el-input v-model="selectWg.value.keywords" :placeholder="selectWg.placeholder"></el-input>
          </el-form-item>
          <el-form-item label="搜索框样式">
            <el-radio-group v-model="selectWg.value.style">
              <el-radio label="square">方形</el-radio>
              <el-radio label="radius">圆角</el-radio>
              <el-radio label="round">圆弧</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <!-- 购买记录 -->
        <template v-if="selectWg.type=='record'">
          <div class="content-item">
            <el-form-item label="位置：">
              <el-radio-group v-model="selectWg.value.style.align">
                <el-radio label="left">居左</el-radio>
                <el-radio label="right">居右</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="content-item">
            <el-form-item label="上边距：">
              <el-slider v-model="selectWg.value.style.top" :min="0" :max="100"></el-slider>
              <span>{{selectWg.value.style.top}}%</span>
            </el-form-item>
          </div>
        </template>
        <!-- 优惠券 -->
        <template v-if="selectWg.type=='coupon'">
          <div>
            <div class="content-item">
              <span class="item-label">显示数量：</span>
              <div class="number-content ml20">
                <input type="number" v-model.number="selectWg.value.limit" min="0" class="number-input">
              </div>
            </div>
            <div class="pl25">
              <p class="layout-tip">优惠券数据请到 促销管理 - <a href="javascript:;"
                  lay-href="{:url('promotion/coupon')}">优惠券列表</a>中管理
              </p>
            </div>
          </div>

        </template>
        <!-- 辅助空白 -->
        <template v-if="selectWg.type=='blank'">
          <el-form-item label="背景颜色">
            <el-color-picker v-model="selectWg.value.backgroundColor"></el-color-picker>
            <a class="reset-color" href="javascript:;" @click="resetColor">重置</a>
          </el-form-item>
          <el-form-item label="组件高度">
            <el-slider v-model="selectWg.value.height" :min="1" :max="200"></el-slider>
          </el-form-item>
        </template>
        <!-- 商品组 -->
        <template v-if="selectWg.type=='goods'">
          <div>
            <el-form-item label="商品来源">
              <el-radio-group v-model="selectWg.value.type" @change="changeGoodsType">
                <el-radio label="auto">自动获取</el-radio>
                <el-radio label="choose">手动选择</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-show="selectWg.value.type=='auto'">
              <el-form-item label="商品分类">
                <el-select v-model="selectWg.value.classifyId" placeholder="请选择分类">
                  <el-option value=" " label="请选择分类"></el-option>
                  <template v-for="item in catList">
                    <el-option :value="item.id" :label="item.name"></el-option>
                    <template v-if="item.child">
                      <el-option v-for="second in item.child" :key="second.id" :label="second.name" :value="second.id"
                        class="second">
                      </el-option>
                    </template>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item label="品牌分类">
                <el-select v-model="selectWg.value.brandId" placeholder="请选择品牌">
                  <el-option value=" " label="请选择品牌"></el-option>
                  <el-option v-for="item in brandList" :value="item.id" :label="item.name" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="显示数量">
                <input type="number" v-model.number="selectWg.value.limit" :min="1" class="number-input">
              </el-form-item>
            </div>
            <div v-show="selectWg.value.type=='choose'">
              <div class="select_seller_goods_box">
                <input type="hidden" name="params[goods_id]" value="">
                <ul id="selectGoods" class="sellect_seller_goods_list clearfix">
                  <draggable element="ul" :list="selectWg.value.list"
                    :options="{group:{ name:'selectGoodsList'}, ghostClass: 'ghost',animation: 150}">
                    <li v-for="(goods,key) in selectWg.value.list" :key="key">
                      <i class="layui-icon layui-icon-close-fill icon-delete" @click="handleDeleteGoods(key)"></i>
                      <img :src="goods.image" alt="">
                    </li>
                  </draggable>
                </ul>
                <div class="addImg" @click="selectGoods">
                  <i class="iconfont icon-icon-test"></i>
                  <span>选择商品</span>
                </div>
              </div>
            </div>
            <hr class="divider">
            </hr>
            <el-form-item label="显示类型">
              <el-radio-group v-model="selectWg.value.display">
                <el-radio label="list">列表平铺</el-radio>
                <el-radio label="slide" :disabled="selectWg.value.column==1">横向滚动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分列数量">
              <el-radio-group v-model="selectWg.value.column">
                <el-radio :label="1" :disabled="selectWg.value.display=='slide'">单列</el-radio>
                <el-radio :label="2">两列</el-radio>
                <el-radio :label="3">三列</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品组名称">
              <input type="text" v-model="selectWg.value.title" class="selectLinkVal">
            </el-form-item>
            <el-form-item label="是否查看更多">
              <el-radio-group v-model="selectWg.value.lookMore">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="pl25">
              <p class="layout-tip">商品数据请到 商品管理 - <a href="javascript:;" lay-href="{:url('goods/index')}">商品列表</a> 中管理
              </p>
            </div>
          </div>
        </template>
        <!-- 团购秒杀 -->
        <template v-if="selectWg.type=='groupPurchase'">
          <div>
            <div class="select_seller_goods_box">
              <input type="hidden" name="params[goods_id]" value="">
              <ul id="selectGoods" class="sellect_seller_goods_list clearfix">
                <draggable element="ul" :list="selectWg.value.list"
                  :options="{group:{ name:'selectGoodsList'}, ghostClass: 'ghost',animation: 150}">
                  <li v-for="(goods,key) in selectWg.value.list" :key="key">
                    <i class="layui-icon layui-icon-close-fill icon-delete" @click="handleDeleteGoods(key)"></i>
                    <p>{{goods.name}}</p>
                  </li>
                </draggable>
              </ul>
              <div class="addImg" @click="selectGroupGoods">
                <i class="iconfont icon-icon-test"></i>
                <span>选择商品</span>
              </div>
            </div>
            <hr class="divider">
            </hr>
            <el-form-item label="商品组名称">
              <input type="text" v-model="selectWg.value.title" class="selectLinkVal">
            </el-form-item>
            <el-form-item label="显示数量">
              <input type="number" v-model.number="selectWg.value.limit" min="1" class="number-input">
            </el-form-item>
            <div class="pl25">
              <p class="layout-tip">团购秒杀数据请到 促销管理 - <a href="javascript:;"
                  lay-href="{:url('promotion/group')}">团购秒杀列表</a>中管理
              </p>
            </div>
          </div>
        </template>
        <!-- 拼团 -->
        <template v-if="selectWg.type=='pintuan'">
          <div>
            <div class="select_seller_goods_box">
              <input type="hidden" name="params[goods_id]" value="">
              <ul id="selectGoods" class="sellect_seller_goods_list clearfix">
                <draggable element="ul" :list="selectWg.value.list"
                  :options="{group:{ name:'selectGoodsList'}, ghostClass: 'ghost',animation: 150}">
                  <li v-for="(goods,key) in selectWg.value.list" :key="key">
                    <i class="layui-icon layui-icon-close-fill icon-delete" @click="handleDeleteGoods(key)"></i>
                    <img :src="goods.goods_image" alt="">
                  </li>
                </draggable>
              </ul>
              <div class="addImg" @click="selectPintuanGoods">
                <i class="iconfont icon-icon-test"></i>
                <span>选择商品</span>
              </div>
            </div>
            <hr class="divider">
            </hr>
            <el-form-item label="商品组名称">
              <input type="text" v-model="selectWg.value.title" class="selectLinkVal">
            </el-form-item>
            <el-form-item label="显示数量">
              <input type="number" v-model.number="selectWg.value.limit" min="1" class="number-input">
            </el-form-item>
            <div class="pl25">
              <p class="layout-tip">团购秒杀数据请到 促销管理 - <a href="javascript:;"
                  lay-href="{:url('promotion/group')}">团购秒杀列表</a>中管理
              </p>
            </div>
          </div>
        </template>
        <!-- 文章组 -->
        <template v-if="selectWg.type=='article'">
          <div>
            <div class="layui-form-item">
              <label class="layui-form-label">添加文章：</label>
              <div class="layui-input-inline seller-inline-5">
                <input type="text" v-model="selectWg.value.list[0].title" placeholder="请选择广告文章" readonly="readonly"
                  class="layui-input" @focus="article_list">
              </div>
            </div>
            <div class="pl25">
              <p class="layout-tip">文章数据请到 运营管理 - <a href="javascript:;" lay-href="{:url('article/index')}">文章列表</a> 中管理
              </p>
            </div>

          </div>
        </template>
        <!-- 文章分类 -->
        <template v-if="selectWg.type=='articleClassify'">
          <div>
            <div class="layui-form-item">
              <label class="layui-form-label">文章分类：</label>
              <div class="layui-input-inline seller-inline-5">

                <input type="text" v-model="selectWg.value.articleClassifyId" placeholder="请选择文章分类" readonly="readonly"
                  class="layui-input" @focus="article_type_list">
              </div>

            </div>
            <div class="layui-form-item">
              <label class="layui-form-label">显示数量：</label>
              <div class="layui-input-inline seller-inline-5">
                <input type="number" v-model.number="selectWg.value.limit" :min="1" class="layui-input">
              </div>
            </div>
            <div class="pl25">
              <p class="layout-tip">文章数据请到 运营管理 - <a href="javascript:;" lay-href="{:url('article/index')}">文章列表</a> 中管理
              </p>
            </div>
          </div>
        </template>
        <!-- 视频组 -->
        <template v-if="selectWg.type=='video'">
          <el-form-item label="自动播放">
            <el-switch v-model="selectWg.value.autoplay" active-value="true" inactive-value="false"
              active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <li v-for="(item, index) in selectWg.value.list" :key="index">
            <div class="content">
              <div class="content-item">
                <span class="item-label">视频封面:</span>
                <upload-img @upload-img="upImage(index,item)" :index="index" :item="item"></upload-img>
              </div>
              <div class="content-item">
                <span class="item-label">视频地址：</span>
                <el-input size="mini" placeholder="请输入视频地址" v-model="item.url"></el-input>
              </div>
            </div>
          </li>

        </template>
        <!-- 轮播图 -->
        <template v-if="selectWg.type=='imgSlide'">
          <div>
            <div class="content-item">
              <span class="item-label">切换时间：</span>
              <div class="number-content ml20">
                <input type="number" :step="500" v-model.number="selectWg.value.duration" :min="0" class="number-input">
                <p class="layout-tip">轮播图自动切换的间隔时间，单位：毫秒</p>
              </div>
            </div>
            <draggable element="ul" :list="selectWg.value.list"
              :options="{group:{ name:'slideList'}, ghostClass: 'ghost',animation: 150,handle:'.drag-block'}">
              <li v-for="(item, index) in selectWg.value.list" :key="index">
                <div class="drag-block">
                  <div class="handle-icon" title="删除这一项">
                    <i class="iconfont icon-cuohao" @click="handleSlideRemove(index)"></i>
                  </div>
                </div>
                <div class="content">
                  <div class="content-item">
                    <el-form-item label="图片：">
                      <upload-img @upload-img="upImage(index,item)" :index="index" :item="item"></upload-img>

                    </el-form-item>

                  </div>
                  <select-link @choose-link="chooseLink(index,item.linkType)" :index="index" :type.sync="item.linkType"
                    :id.sync="item.linkValue"></select-link>
                </div>
              </li>
            </draggable>
            <div class="addImg" @click="handleAddSlide">
              <i class="iconfont icon-icon-test"></i>
              <span>添加一个图片</span>
            </div>
          </div>
        </template>
        <!-- 单图组 -->
        <template v-if="selectWg.type=='imgSingle'">
          <li v-for="(item, index) in selectWg.value.list" :key="index">
            <div class="content">
              <div class="content-item">
                <span class="item-label">图片:</span>
                <upload-img @upload-img="upImage(index,item)" :index="index" :item="item"></upload-img>
              </div>
              <select-link @choose-link="chooseLink(index,item.linkType)" :index="index" :type.sync="item.linkType"
                :id.sync="item.linkValue"></select-link>
              <div class="content-item">
                <el-form-item label="添加按钮：">
                  <el-switch
                    v-model="item.buttonShow"
                    active-color="#13ce66">
                  </el-switch>
                </el-form-item>
              </div>
              <div class="content-item" v-show="item.buttonShow">
                <el-form-item label="按钮颜色：">
                  <el-color-picker v-model="item.buttonColor"></el-color-picker>
                </el-form-item>
              </div>
              <div class="content-item" v-show="item.buttonShow">
                <el-form-item label="按钮文字：">
                  <input type="text" class="selectLinkVal" v-model="item.buttonText">
                </el-form-item>
              </div>
              <div class="content-item" v-show="item.buttonShow">
                <el-form-item label="文字颜色：">
                  <el-color-picker v-model="item.textColor"></el-color-picker>
                </el-form-item>
              </div>
            </div>
          </li>
        </template>
        <!-- 图片橱窗 -->
        <template v-if="selectWg.type=='imgWindow'">
          <div>
            <div class="content-item">
              <span class="item-label">布局方式:</span>
              <div class="tpl-block">
                <div class="tpl-item" v-for="(item,i) in imgWindowStyle" :key="i" @click="slectTplStyle(item)"
                  :class="{active:selectWg.value.style==item.value}">
                  <div class="tpl-item-image">
                    <img :src="item.image" alt="">
                  </div>
                  <div class="tpl-item-text">
                    {{item.title}}
                  </div>
                </div>
                <p class="layout-tip">建议添加比例/尺寸一致的图片</p>
              </div>
            </div>
            <div class="content-item">
              <el-form-item label="图片间距：">
                <el-slider v-model="selectWg.value.margin" :min="0" :max="30">
                </el-slider>
              </el-form-item>
              <span
                style="display:inline-block;height:30px;line-height:30px;font-size:12px;margin-left:10px;">{{selectWg.value.margin}}px</span>
            </div>
            <draggable element="ul" :list="selectWg.value.list"
              :options="{group:{ name:'slideList'}, ghostClass: 'ghost',animation: 150,handle:'.drag-block'}">
              <li v-for="(item, index) in selectWg.value.list" :key="index">
                <div class="drag-block">
                  <div class="handle-icon" title="删除这一项">
                    <i class="iconfont icon-cuohao" @click="handleSlideRemove(index)"></i>
                  </div>
                </div>
                <div class="content">
                  <div class="content-item">
                    <el-form-item label="图片：">
                      <upload-img @upload-img="upImage(index,item)" :index="index" :item="item"></upload-img>
                    </el-form-item>
                  </div>
                  <select-link @choose-link="chooseLink(index,item.linkType)" :index="index" :type.sync="item.linkType"
                    :id.sync="item.linkValue"></select-link>
                </div>
              </li>

            </draggable>
            <div class="addImg" @click="handleAddSlide">
              <i class="iconfont icon-icon-test"></i>
              <span>添加一个图片</span>
            </div>
          </div>
        </template>
        <!-- 公告 -->
        <template v-if="selectWg.type=='notice'">
          <el-form-item label="公告获取">
            <el-radio-group v-model="selectWg.value.type">
              <el-radio label="auto">自动获取</el-radio>
              <el-radio label="choose">手动选择</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="selectWg.value.type=='choose'">
            <div id="n15578855354_box" class="select_seller_notice_box">
              <input type="hidden" name="notice" id="n15578855354" value="" />
              <ul id="n15578855354_list" class="sellect_seller_brands_list">
                <draggable element="ul" :list="selectWg.value.list"
                  :options="{group:{ name:'noticeList'}, ghostClass: 'ghost',animation: 150}">
                  <li v-for="(notice,key) in selectWg.value.list" :key="key">
                    <span><i class="layui-icon layui-icon-close"
                        @click="handleDeleteNotice(key)"></i></span>{{notice.title}}
                  </li>
                </draggable>
              </ul>
            </div>
            <div>
              <a href="javascript:;" class="layui-btn layui-btn-primary layui-btn-xs" @click="selectNotice"><i
                  class="iconfont icon-choose1"></i>选择公告</a>
            </div>
          </div>
          <div class="pl25">
            <p class="layout-tip">公告数据请到 运营管理 - <a href="javascript:;" lay-href="{:url('notice/index')}">公告列表</a> 中管理
            </p>
          </div>
        </template>
        <!-- 导航组-->
        <template v-if="selectWg.type=='navBar'">
          <div>
            <el-form-item label="每行数量">
              <el-radio-group v-model="selectWg.value.limit">
                <el-radio :label="3">3个</el-radio>
                <el-radio :label="4">4个</el-radio>
                <el-radio :label="5">5个</el-radio>
              </el-radio-group>
            </el-form-item>
            <draggable element="ul" :list="selectWg.value.list"
              :options="{group:{ name:'slideList'}, ghostClass: 'ghost',animation: 150,handle:'.drag-block'}">
              <li v-for="(item, index) in selectWg.value.list" :key="index">
                <div class="drag-block">
                  <div class="handle-icon" title="删除这一项">
                    <i class="iconfont icon-cuohao" @click="handleSlideRemove(index)"></i>
                  </div>
                </div>
                <div class="content">
                  <div class="content-item">
                    <el-form-item label="图片：">
                      <upload-img @upload-img="upImage(index,item)" :index="index" :item="item"></upload-img>
                    </el-form-item>
                  </div>
                  <div class="content-item">
                    <el-form-item label="按钮文字：">
                      <input type="text" class="selectLinkVal" v-model="item.text">

                    </el-form-item>
                  </div>
                  <select-link @choose-link="chooseLink(index,item.linkType)" :index="index" :type.sync="item.linkType"
                    :id.sync="item.linkValue"></select-link>
                </div>
              </li>
            </draggable>
            <div class="addImg" @click="handleAddNav">
              <i class="iconfont icon-icon-test"></i>
              <span>添加一个导航组</span>
            </div>
          </div>
        </template>
        <!-- 文本域 -->
        <template v-if="selectWg.type=='textarea'">
          <div>
            <textarea id="container"></textarea>
          </div>
        </template>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'layout-config',
  data: function () {
    return {
      _editocoverr: null,
      maxSelectGoods: 10, // 选择商品最大数量
      maxNoticeNums: 5, // 选择公告最多数量
      catList: [],
      brandList: [],
      hasChooseGoods: [],
      hasChooseGroupGoods: [],
      linkType: [],
      linkName: '',
      currentItemIndex: '',
      editor: null,
      defaultGoods: [
        {
          'image': '',
          'name': '',
          'price': ''
        },
        {
          'image': '',
          'name': '',
          'price': ''
        },
        {
          'image': '',
          'name': '',
          'price': ''
        },
        {
          'image': '',
          'name': '',
          'price': ''
        }
      ],
      imgWindowStyle: [
        {
          'title': '1行2个',
          'value': 2,
          'image': ''
        },
        {
          'title': '1行3个',
          'value': 3,
          'image': ''
        },
        {
          'title': '1行4个',
          'value': 4,
          'image': ''
        },
        {
          'title': '1左3右',
          'value': 0,
          'image': ''
        }
      ]
    }
  },
  watch: {
    // selectWg (newVal, oldVal) {
    //   if (newVal.type === 'textarea') {
    //     var that = this
    //     this.$nextTick(function () {
    //       if (!this.editor) {
    //         this.editor = UE.getEditor('container')
    //       }
    //       this.editor.ready(function () {
    //         that.editor.setContent(that.selectWg.value)
    //         that.editor.addListener('contentChange', function () {
    //           // var wordCount = that.editor.getContentLength(true)
    //           var content = that.editor.getContent()
    //           that.selectWg.value = content
    //         })
    //       })
    //     })
    //   } else {
    //     if (this.editor) {
    //       this.editor.destroy()
    //       this.editor = null
    //     }
    //   }
    // }
  },
  computed: {
    ...mapState([
      'selectWg'
    ]),
    getSelectWgName: function (type) {
      return function (type) {
        switch (type) {
          case 'imgSlide':
            return '图片轮播'
          case 'imgSingle':
            return '图片'
          case 'imgWindow':
            return '图片分组'
          case 'video':
            return '视频组'
          case 'article':
            return '文章组'
          case 'articleClassify':
            return '文章分类'
          case 'search':
            return '搜索框'
          case 'notice':
            return '公告组'
          case 'navBar':
            return '导航组'
          case 'goods':
            return '商品组'
          case 'groupPurchase':
            return '团购秒杀'
          case 'pintuan':
            return '拼团'
          case 'coupon':
            return '优惠券组'
          case 'record':
            return '购买记录'
          case 'blank':
            return '辅助空白'
          case 'textarea':
            return '文本域'
          default:
            return ''
        }
      }
    }
  },
  mounted () {
    // var that = this
    // this.bus.$on('changeSelectWg', function (data) {
    //   that.selectWg = data
    // })

    // that.$nextTick(function () {
    //   var _editocoverr = UE.getEditor('edit_cover', {
    //     initialFrameWidth: 800,
    //     initialFrameHeight: 300,
    //     zIndex: 19891026,
    //     single: false
    //   })
    //   that._editocoverr = _editocoverr
    //   that._editocoverr.ready(function () {
    //     that._editocoverr.hide()
    //     that._editocoverr.addListener('beforeInsertImage', function (t, arg) {
    //       var obj = that._editocoverr.queryCommandValue('serverparam')
    //       that.$set(that.selectWg.value.list[obj.index], 'image', arg[0].src)
    //     })
    //   })
    // })
    // layui.use(['table'], function () {
    //   var table = layui.table
    //   // 监听文章列表页工具条
    //   table.on('tool(articleTable)', function (obj) { // 注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    //     var data = obj.data // 获得当前行数据
    //     var layEvent = obj.event // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    //     var tr = obj.tr // 获得当前行 tr 的DOM对象
    //     if (layEvent === 'selectArticle') { // 选择
    //       if (that.selectWg.type == 'article') {
    //         that.$set(that.selectWg.value.list, 0, data)
    //       } else {
    //         that.$set(that.selectWg.value.list[that.currentItemIndex], 'linkValue', data.id)
    //       }
    //       layer.close(window.box)
    //     }
    //   })

    //   // 监听商品列表页工具条
    //   table.on('tool(goodsTable)', function (obj) { // 注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    //     var data = obj.data // 获得当前行数据
    //     var layEvent = obj.event // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    //     var tr = obj.tr // 获得当前行 tr 的DOM对象

    //     if (layEvent === 'selectGoods') { // 选择
    //       that.$set(that.selectWg.value.list[that.currentItemIndex], 'linkValue', data.id)
    //       layer.close(window.box)
    //     }
    //   })

    //   // 监听文章分类列表页工具条
    //   table.on('tool(articleTypeTable)', function (obj) {
    //     var data = obj.data
    //     var layEvent = obj.event
    //     var tr = obj.tr

    //     if (layEvent === 'selectType') { // 选择
    //       if (that.selectWg.type == 'articleClassify') {
    //         that.selectWg.value.articleClassifyId = data.id
    //       } else {
    //         that.$set(that.selectWg.value.list[that.currentItemIndex], 'linkValue', data.id)
    //       }

    //       layer.close(window.box)
    //     }
    //   })

    //   // 监听表单列表页工具条
    //   table.on('tool(formTable)', function (obj) {
    //     var data = obj.data
    //     var layEvent = obj.event
    //     var tr = obj.tr
    //     if (layEvent === 'selectform') { // 选择
    //       that.$set(that.selectWg.value.list[that.currentItemIndex], 'linkValue', data.id)
    //       layer.close(window.box)
    //     }
    //   })
    // })
  },
  methods: {
    slectTplStyle: function (item) {
      this.selectWg.value.style = item.value
    },
    chooseLink: function (index, type) {
      this.currentItemIndex = index
      this.$set(this.selectWg.value.list[index], 'linkType', type)
      switch (+type) {
        case 2:
          this.goods_list()
          break
        case 3:
          this.article_list()
          break
        case 4:
          this.article_type_list()
          break
        case 5:
          this.form_list()
          break
        default:
          break
      }
    },
    form_list: function () {
      JsGet('/manage/carousel/getform.html', function (e) {
        window.box = layer.open({
          type: 1,
          content: e,
          area: ['700px', '450px'],
          title: '表单列表'
        })
      })
    },

    goods_list: function () {
      JsGet('/manage/carousel/getgoods.html', function (e) {
        window.box = layer.open({
          type: 1,
          content: e,
          area: ['700px', '450px'],
          title: '商品列表'
        })
      })
    },
    article_type_list: function () {
      JsGet('/manage/carousel/getarticletype.html', function (e) {
        window.box = layer.open({
          type: 1,
          content: e,
          area: ['700px', '450px'],
          title: '文章分类列表'
        })
      })
    },

    resetColor: function () {
      this.selectWg.value.backgroundColor = '#FFFFFF'
    },
    handleSlideRemove: function (index) {
      this.selectWg.value.list.splice(index, 1)
    },
    handleAddSlide: function () {
      this.selectWg.value.list.push({
        url: '',
        image: ''
      })
    },
    handleAddNav: function () {
      this.selectWg.value.list.push({
        url: '',
        image: default_img,
        text: '按钮文字'
      })
    },
    upImage: function (index, item) {
      var _this = this
      var obj = _this._editocoverr.queryCommandValue('serverparam')
      obj.index = index
      obj.item = item
      var myImagcovere = _this._editocoverr.getDialog('insertimage')

      myImagcovere.open()
    },
    article_list: function () {
      JsGet('/manage/carousel/getarticle.html', function (e) {
        window.box = layer.open({
          type: 1,
          content: e,
          area: ['800px', '450px'],
          title: '文章列表'
        })
      })
    },
    changeGoodsType: function (val) {
      if (val == 'auto') {
        this.hasChooseGoods = this.selectWg.value.list
        this.selectWg.value.list = this.defaultGoods
      } else {
        this.selectWg.value.list = this.hasChooseGoods.length > 0 ? this.hasChooseGoods : this.defaultGoods
      }
    },
    handleDeleteNotice: function (index) {
      this.selectWg.value.list.splice(index, 1)
    },
    handleDeleteGoods: function (index) {
      this.selectWg.value.list.splice(index, 1)
    },
    selectNotice: function () {
      var that = this
      layui.use(['form', 'table'], function () {
        $.ajax({
          type: 'get',
          url: '/manage/index/tagselectnotice/type/show.html',
          data: '',
          success: function (e) {
            layui.layer.open({
              type: 1,
              content: e,
              area: ['800px', '600px'],
              title: '选择公告',
              btn: ['完成', '取消'],
              yes: function (index, layero) {
                // 判断个数是否满足
                if (Object.getOwnPropertyNames(ids).length > that.maxNoticeNums) {
                  layer.msg('最多只能选择' + that.maxNoticeNums + '个')
                  return false
                }
                var arr = []
                for (let i in ids) {
                  arr.push(ids[i])
                }
                that.$set(that.selectWg.value, 'list', arr)
                layer.close(index)
              }
            })
          }
        })
      })
    },
    selectGroupGoods: function () {
      var that = this
      layui.use(['form', 'table'], function () {
        $.ajax({
          type: 'get',
          url: '/manage/index/tagselectgroup/type/show.html',
          data: '',
          success: function (e) {
            layui.layer.open({
              type: 1,
              content: e,
              area: ['800px', '635px'],
              title: '选择商品',
              btn: ['完成', '取消'],
              yes: function (index, layero) {
                // 判断个数是否满足
                if (Object.getOwnPropertyNames(ids).length > that.maxSelectGoods) {
                  layer.msg('最多只能选择' + that.maxSelectGoods + '个')
                  return false
                }
                var arr = []
                for (let i in ids) {
                  arr.push(ids[i])
                }
                that.$set(that.selectWg.value, 'list', arr)

                layer.close(index)
              }
            })
          }
        })
      })
    },
    selectPintuanGoods: function () {
      var that = this
      layui.use(['form', 'table'], function () {
        $.ajax({
          type: 'get',
          url: '/manage/index/tagpintuan/type/show.html',
          data: '',
          success: function (e) {
            layui.layer.open({
              type: 1,
              content: e,
              area: ['800px', '635px'],
              title: '选择商品',
              btn: ['完成', '取消'],
              yes: function (index, layero) {
                // 判断个数是否满足
                if (Object.getOwnPropertyNames(ids).length > that.maxSelectGoods) {
                  layer.msg('最多只能选择' + that.maxSelectGoods + '个')
                  return false
                }
                var arr = []
                for (let i in ids) {
                  arr.push(ids[i])
                }
                console.log(arr)
                that.$set(that.selectWg.value, 'list', arr)

                layer.close(index)
              }
            })
          }
        })
      })
    },
    selectGoods: function () {
      var that = this
      layui.use(['form', 'table'], function () {
        $.ajax({
          type: 'get',
          url: '/manage/index/tagselectgoods/type/show.html',
          data: '',
          success: function (e) {
            layui.layer.open({
              type: 1,
              content: e,
              area: ['800px', '600px'],
              title: '选择商品',
              btn: ['完成', '取消'],
              yes: function (index, layero) {
                // 判断个数是否满足
                if (Object.getOwnPropertyNames(ids).length > that.maxSelectGoods) {
                  layer.msg('最多只能选择' + that.maxSelectGoods + '个')
                  return false
                }
                var arr = []
                for (let i in ids) {
                  arr.push(ids[i])
                }
                that.hasChooseGoods = arr
                that.$set(that.selectWg.value, 'list', arr)
              }
            })
          }
        })
      })
    }

  }
}
</script>

<style lang="stylus">
</style>
