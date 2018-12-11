const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
  },

  // 获取商品列表
  getProductList() {
    wx.showLoading({
      title: '商品下载中...',
    });
    
    qcloud.request({
      url: config.service.productList,
      success: (response) => {
        wx.hideLoading();
        if (!response.data.code) {
          this.setData({
            productList: response.data.data
          })
        } else {
          wx.showToast({
            title: '商品下载失败'
          })
        }
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '商品下载失败'
        })
      }
    });
  },

  // 加入购物车
  addToTrolley(event) {
    wx.showLoading({
      title: '正在加入购物车...'
    });

    const productId = event.currentTarget.dataset.productId;
    const product = this.data.productList.find(p => p.id === productId);

    qcloud.request({
      url: config.service.addToTrolleyUrl,
      method: 'PUT',
      data: product,
      success: response => {
        wx.hideLoading();
        if (!response.data.code) {
          wx.showToast({
            title: '已添加到购物车'
          });
        } else {
          wx.showToast({
            title: '添加到购物车失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '添加到购物车失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList();
  }
})