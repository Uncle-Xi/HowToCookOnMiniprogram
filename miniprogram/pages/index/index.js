import infos from '../../data'
import utils from '../../utils/index.js'
import config from '../../config/index.js'

Page({
  data: {
    list: [],
    value: 'home',
    tabbars: [{
      text: '首页',
      value: 'home',
      icon: 'home'
    }, {
      text: '个人中心',
      value: 'my',
      icon: 'user'
    }]
  },
  
  onLoad() {
    const menu = utils.groupBy(infos, 'category');
    const list = Object.entries(menu).filter(([item]) => item !== 'template').map(([catetory, list]) => {
      return {
        name: config.titleMap[catetory],
        icon: `/assets/images/${catetory}.png`,
        list
      }
    })
    this.setData({
      list
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  handleTap(e) {
    const { item } = e.detail;
    
    wx.navigateTo({
      url: '../detail/index?id=' + item.id
    })
  },

  handleTabbarChange({ detail }) {
    const { value } = detail;
    
    if (value == 'my') {
      wx.redirectTo({
        url: '../my/index'
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '程序员做饭',
      path: '/pages/index/index'
    }
  },
})
