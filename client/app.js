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
  checkSession({
    success,
    fail
  }) {
    wx.checkSession({
      success: () => this.getUserInfo({
        success,
        error: fail
      })
    })
  },

  /**
   * 重新获取用户信息
   */
  getUserInfo({
    success,
    error
  }) {
    // if (this.userInfo) {
    //   return success(this.userInfo);
    // }
    console.log('getUserInfo++')

    qcloud.request({
      // login: true,
      url: config.service.requestUrl,
      success: result => {
        // this.userInfo = result.data.data;
        success(result.data.data);
      },
      error: err => error && error(err)
    });
  },

  doQcloudLogin({
    success,
    error
  }) {
    // 只有第一次调用时返回用户的信息，后面再调用login方法返回空值，所以
    // 我们需要调接口获取
    qcloud.login({
      success: result => {
        console.log('login success: ', result);
        if (result) {
          success(result)
        } else {
          this.getUserInfo({
            success,
            error
          })
        }
      },
      error: err => error('login failed: ', err)
    })
  },

  /**
   * 点击登陆或授权的回调
   */
  login: function ({ success, error }) {
    // TODO 如果用户同意授权可以直接使用返回的用户信息吗？
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
          success(null);
        } else {
          this.userInfoAuthType = AUTHORIZED;
          this.doQcloudLogin({ success, error });
        }
      }
    })
  },

  userInfoAuthType: UNPROMPTED
})