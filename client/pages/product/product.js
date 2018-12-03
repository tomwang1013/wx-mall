const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {}
  },

  getProductDetail(id) {
    wx.showLoading({
      title: '商品数据加载中...',
    })

    qcloud.request({
      url: config.service.productDetail + id,
      success: (response) => {
        wx.hideLoading()
        if (!response.data.code) {
          this.setData({
            product: response.data.data
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

  // 立即购买
  buy() {
    let product = Object.assign({
      count: 1
    }, this.data.product)

    qcloud.request({
      url: config.service.buyUrl,
      data: { list: [product] },
      login: true,
      method: 'POST',
      success: () => {
        console.log('购买成功');
      },
      fail: err => console.log('购买失败：', err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(options.id || 6);
  }
})