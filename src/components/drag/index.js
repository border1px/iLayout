import { defaultBanner, defaultImg } from '../../config/common.js'

var allWidget = {
  'mediaComponents': [{
    'type': 'imgSlide',
    'name': '图片轮播',
    'value': {
      'duration': 2500,
      'list': [{
        'image': defaultBanner,
        'linkType': '',
        'linkValue': ''
      },
      {
        'image': defaultBanner,
        'linkType': '',
        'linkValue': ''
      }
      ]
    },
    'icon': 'icon-putonglunbotu'
  },
  {
    'type': 'imgSingle',
    'name': '图片',
    'value': {
      'list': [{
        'image': defaultBanner,
        'linkType': '',
        'linkValue': '',
        'buttonShow': false,
        'buttonText': '',
        'buttonColor': '#FFFFFF',
        'textColor': '#000000'
      }]
    },
    'icon': 'icon-picture'
  },
  {
    'type': 'imgWindow',
    'name': '图片分组',
    'value': {
      'style': 2, // 0 橱窗  2 两列 3三列 4四列
      'margin': 0,
      'list': [
        {
          'image': defaultBanner,
          'linkType': '',
          'linkValue': ''
        },
        {
          'image': defaultBanner,
          'linkType': '',
          'linkValue': ''
        }, {
          'image': defaultBanner,
          'linkType': '',
          'linkValue': ''
        },
        {
          'image': defaultBanner,
          'linkType': '',
          'linkValue': ''
        }
      ]
    },
    'icon': 'icon-images'
  },
  {
    'type': 'video',
    'name': '视频组',
    'value': {
      'autoplay': 'false',
      'list': [{
        'image': defaultBanner,
        'url': 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400',
        'linkType': '',
        'linkValue': ''
      }]
    },
    'icon': 'icon-shipin1'
  },
  {
    'type': 'article',
    'name': '文章组',
    'value': {
      'list': [
        {
          'title': ''
        }
      ]
    },
    'icon': 'icon-wenzhang'
  },
  {
    'type': 'articleClassify',
    'name': '文章分类',
    'value': {
      'limit': 3,
      'articleClassifyId': ''
    },
    'icon': 'icon-wenzhangliebiaoxinbiaoqian'
  }
  ],
  'storeComponents': [{
    'type': 'search',
    'name': '搜索框',
    'value': {
      'keywords': '请输入关键字搜索',
      'style': 'round' // round:圆弧 radius:圆角 square:方形
    },
    'icon': 'icon-sousuo1'
  },
  {
    'type': 'notice',
    'name': '公告组',
    'value': {
      'type': 'auto', // choose手动选择， auto 自动获取
      'list': [
        {
          'title': '这里是第一条公告的标题',
          'content': '',
          'id': ''
        }
      ]
    },
    'icon': 'icon-gonggao1'
  },
  {
    'type': 'navBar',
    'name': '导航组',
    'value': {
      'limit': 4,
      'list': [
        {
          'image': defaultImg,
          'text': '按钮1',
          'linkType': '',
          'linkValue': ''
        },
        {
          'image': defaultImg,
          'text': '按钮2',
          'linkType': '',
          'linkValue': ''
        },
        {
          'image': defaultImg,
          'text': '按钮3',
          'linkType': '',
          'linkValue': ''
        },
        {
          'image': defaultImg,
          'text': '按钮4',
          'linkType': '',
          'linkValue': ''
        }
      ]
    },
    'icon': 'icon-daohanghaiwaigou'
  },
  {
    'type': 'goods',
    'name': '商品组',
    'icon': 'icon-huazhuangpin',
    'value': {
      'title': '商品组名称',
      'lookMore': 'true',
      'type': 'auto', // auto自动获取  choose 手动选择
      'classifyId': '', // 所选分类id
      'brandId': '', // 所选品牌id
      'limit': 10,
      'display': 'list', // list , slide
      'column': 2, // 分裂数量
      'list': [
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        },
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        },
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        },
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        }
      ]
    }
  },
  {
    'type': 'pintuan',
    'name': '拼团',
    'value': {
      'title': '活动名称',
      'limit': '10',
      'list': [
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        },
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        }
      ]
    },
    'icon': 'icon-pin1'
  },
  {
    'type': 'groupPurchase',
    'name': '团购秒杀',
    'value': {
      'title': '活动名称',
      'limit': '10',
      'list': [
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        },
        {
          'image': defaultBanner,
          'name': '',
          'price': ''
        }
      ]
    },
    'icon': 'icon-tuan'
  },
  {
    'type': 'coupon',
    'name': '优惠券组',
    'value': {
      'limit': '2'
    },
    'icon': 'icon-youhuiquan3'
  },
  {
    'type': 'record',
    'name': '购买记录',
    'value': {
      'style': {
        'top': 20,
        'left': 0
      }
    },
    'icon': 'icon-jilu'
  }
  ],
  'utilsComponents': [
    {
      'type': 'blank',
      'name': '辅助空白',
      'icon': 'icon-kongbai',
      'value': {
        'height': 10,
        'backgroundColor': '#F2F2F2'
      }
    },
    {
      'type': 'textarea',
      'name': '文本域',
      'value': '',
      'icon': 'icon-xian-kuanju-wenbenyu'
    }]
}

export default allWidget
