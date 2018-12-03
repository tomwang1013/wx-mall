const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');
const app = getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userInfoAuthType: app.userInfoAuthType,

    // 订单列表
    orderList: null
  },

  getOrderList() {
    wx.showLoading({
      title: '订单数据加载中...',
    });

    qcloud.request({
      url: config.service.orderListUrl,
      success: (response) => {
        wx.hideLoading()
        if (!response.data.code) {
          this.setData({
            orderList: response.data.data
          })
        } else {
          setTimeout(() => wx.navigateBack(), 2000)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        setTimeout(() => wx.navigateBack(), 2000)
      }
    });
  },

  onTapLogin() {
    app.login({
      success: result => {
        this.setData({
          userInfo: result,
          userInfoAuthType: app.userInfoAuthType
        });
        this.getOrderList();
      },
      fail: err => console.error('login failed: ', err)
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.checkSession({
      success: userInfo => {
        this.setData({ userInfo });
        this.getOrderList();
      },
      fail: err => console.log('checkSession failed: ', err)
    });
  }
})