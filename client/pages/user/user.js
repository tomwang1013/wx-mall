const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');
const app = getApp();

const UNPROMPTED = 0    // 未弹框
const UNAUTHORIZED = 1  // 用户拒绝授权
const AUTHORIZED = 2    // 用户已授权

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userInfoAuthType: UNPROMPTED
  },

  /**
   * 检查是否已经登录
   */
  checkSession({ success, fail }) {
    wx.checkSession({
      success: () => this.getUserInfo({ success, error: fail }),
      fail: err => console.log('checkSession failed: ', err)
    })
  },

  /**
   * 重新获取用户信息
   */
  getUserInfo({ success, error }) {
    if (app.userInfo) {
      return success(app.userInfo);
    }

    qcloud.request({
      login: true,
      url: config.service.requestUrl,
      success: result => {
        app.userInfo = result.data.data;
        success(app.userInfo);
      },
      error: err => error && error(err)
    });
  },

  doQcloudLogin({ success, error }) {
    // 只有第一次调用时返回用户的信息，后面再调用login方法返回空值，所以
    // 我们需要调接口获取
    qcloud.login({
      success: result => {
        if (result) {
          app.userInfo = result;
          success(result)
        } else {
          this.getUserInfo({ success, error })
        }
      },
      error: err => error(err)
    })
  },

  /**
   * 点击登陆或授权的回调
   */
  onTapLogin: function (res) {
    // TODO 如果用户同意授权可以直接使用返回的用户信息吗？
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          // 已拒绝授权
          this.setData({ userInfoAuthType: UNAUTHORIZED });
          wx.showModal({
            title: '提示',
            content: '请点击"授权登录"授权我们获取您的用户信息',
            showCancel: false
          });
        } else {
          this.setData({ userInfoAuthType: AUTHORIZED });
          this.doQcloudLogin({
            success: userInfo => this.setData({ userInfo }),
            error: err => console.error(err)
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkSession({
      success: userInfo => this.setData({ userInfo }),
      fail: () => {}
    })
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