//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

const UNPROMPTED = 0    // 未弹框
const UNAUTHORIZED = 1  // 用户拒绝授权
const AUTHORIZED = 2    // 用户已授权

App({
  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  /**
   * 检查是否已经登录
   */
  checkSession({ success, fail }) {
    wx.checkSession({
      success: () => {
        // session not expired: get user info directly
        this.getUserInfo({ success, fail })
      },
      fail:  err => {
        // session expired: need relogin
        fail(err)
      }
    })
  },

  /**
   * 重新获取用户信息
   */
  getUserInfo({ success, fail }) {
    if (this.userInfo) {
      return success(this.userInfo);
    }
    
    qcloud.request({
      url: config.service.requestUrl,
      success: result => {
        this.userInfo = result.data.data;
        success(result.data.data);
      },
      fail: err => fail && fail(err)
    });
  },

  /**
   * 登录并保存用户信息
   */
  doQcloudLogin({ success, fai }) {
    const scb = result => {
      this.userInfo = result;
      success(result)
    };

    if (qcloud.Session.get()) {
      // 曾经登陆了过，但是登录状态过期了
      qcloud.loginWithCode({ success: scb, fai })
    } else {
      // 从未登录过
      qcloud.login({ success, scb, fai })
    }
  },

  /**
   * 点击登陆或授权的回调
   */
  login: function ({ success, fail }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          // 已拒绝授权
          this.userInfoAuthType = UNAUTHORIZED;
          wx.showModal({
            title: '提示',
            content: '请点击"授权登录"授权我们获取您的用户信息',
            showCancel: false
          });

          // 用来改变按钮状态：微信登录 -> 授权登录
          success(null);
        } else {
          // 已经授权
          this.userInfoAuthType = AUTHORIZED;
          this.doQcloudLogin({ success, fail });
        }
      }
    })
  },

  userInfoAuthType: UNPROMPTED,
  userInfo: null
})