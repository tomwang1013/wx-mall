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

    trolleyList: [], // 购物车商品列表
    trolleyCheckMap: [], // 购物车中选中的id哈希表
    trolleyAccount: 0, // 购物车结算总价
    isTrolleyEdit: false, // 购物车是否处于编辑状态
    isTrolleyTotalCheck: false, // 购物车中商品是否全选
  },

  // 全选或单选
  onClickCheck(event) {
    const index = event.currentTarget.dataset.index;
    if (index === -1) {
      const newIsTotalCheck = !this.data.isTrolleyTotalCheck;
      const newCheckMap = new Array(this.data.trolleyCheckMap.length);
      for (let i = 0; i < newCheckMap.length; i++) {
        newCheckMap[i] = newIsTotalCheck;
      }
      this.setData({
        isTrolleyTotalCheck: newIsTotalCheck,
        trolleyCheckMap: newCheckMap
      })
    } else {
      this.setData({
        [`trolleyCheckMap[${index}]`]: !this.data.trolleyCheckMap[index]
      })
      
      this.setData({
        isTrolleyTotalCheck: this.data.trolleyCheckMap.every(c => !!c)
      })
    }

    const newAccount = this.data.trolleyList.reduce((a, b, i) => {
      if (this.data.trolleyCheckMap[i]) {
        return a + b.price * b.count;
      } else {
        return a;
      }
    }, 0);

    this.setData({
      trolleyAccount: newAccount
    })
  },

  // 切换编辑状态
  switchMode() {
    this.setData({
      isTrolleyEdit: !this.data.isTrolleyEdit
    })
  },

  // 增加或减少商品
  changeCount(event) {
    const productIndex = event.currentTarget.dataset.productIndex;
    const changeCount = event.currentTarget.dataset.changeCount;
    const product = this.data.trolleyList[productIndex];

    const newAccount = this.data.trolleyAccount + changeCount * product.price;
    this.setData({
      trolleyAccount: newAccount
    })

    const newCount = product.count + changeCount;
    if (newCount > 0) {
      this.setData({
        [`trolleyList[${productIndex}].count`]: newCount
      })
    } else {
      const trolleyList = this.data.trolleyList.slice();
      const checkMap = this.data.trolleyCheckMap.slice();
      trolleyList.splice(productIndex, 1);
      checkMap.splice(productIndex, 1);

      this.setData({
        trolleyList: trolleyList,
        trolleyCheckMap: checkMap
      })
    }
  },

  // 点击登录
  onTapLogin() {
    app.login({
      success: result => {
        this.setData({
          userInfo: result,
          userInfoAuthType: app.userInfoAuthType
        });

        // 登录之后马上获取购物车列表
        this.getTrolleyList();
      },
      fail: err => console.error('login failed: ', err)
    });
  },

  // 获取购物车列表
  getTrolleyList() {
    wx.showLoading({
      title: '正在刷新购物车数据...'
    });

    qcloud.request({
      url: config.service.trolleyListUrl,
      login: true,
      success: response => {
        wx.hideLoading();

        const trolleyList = response.data.data;
        const totalAccount = trolleyList.reduce((a, b) => a + b.price * b.count, 0);

        // 初始化都选中
        const checkMap = new Array(trolleyList.length);
        for (let i = 0; i < trolleyList.length; i++) {
          checkMap[i] = true;
        }

        this.setData({
          trolleyList,
          trolleyAccount: totalAccount,
          trolleyCheckMap: checkMap,
          isTrolleyTotalCheck: true
        });

        wx.showToast({
          title: '获取购物车信息成功'
        });
      },
      fail: err => {
        console.error('获取购物车列表失败：', err);
        wx.showToast({
          title: '获取购物车信息失败'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.checkSession({
      success: userInfo => {
        // 用户已经登录了
        this.setData({ userInfo });
        this.getTrolleyList();
      },
      fail: err => console.log('checkSession failed: ', err)
    })
  }
})