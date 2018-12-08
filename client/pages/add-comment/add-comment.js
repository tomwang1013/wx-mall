const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    commentValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product: {
        image: options.image,
        name: options.name,
        price: options.price,
        productId: options.productId
      }
    })
  },

  onInput(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  addComment() {
    if (!this.data.commentValue) {
      return;
    }

    wx.showLoading({
      title: '正在提交评论...',
    })

    qcloud.request({
      url: config.service.addCommentUrl,
      method: 'PUT',
      login: true,
      data: {
        productId: this.data.product.productId,
        content: this.data.commentValue
      },
      success: response => {
        wx.hideLoading()
        if (!response.data.code) {
          wx.showToast({
            title: '添加成功',
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('添加评论失败：', err)
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
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