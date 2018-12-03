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
    orderList: [
      {
        id: 0,
        list: [{
          count: 1,
          image: 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product1.jpg',
          name: '商品1',
          price: 50.5,
        }]
      },
      {
        id: 1,
        list: [{
          count: 1,
          image: 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product2.jpg',
          name: '商品1',
          price: 50.5,
        },
        {
          count: 1,
          image: 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product3.jpg',
          name: '商品2',
          price: 50.5,
        }
        ]
      },
      {
        id: 2,
        list: [{
          count: 1,
          image: 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product4.jpg',
          name: '商品2',
          price: 50.5,
        }]
      }
    ]
  },

  onTapLogin() {
    app.login({
      success: result => this.setData({
        userInfo: result,
        userInfoAuthType: app.userInfoAuthType
      }),
      fail: err => console.error('login failed: ', err)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.checkSession({
      success: userInfo => this.setData({ userInfo }),
      fail: err => console.log('checkSession failed: ', err)
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})