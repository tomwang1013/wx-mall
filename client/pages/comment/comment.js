// client/pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    comments: []
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

    wx.showLoading({
      title: '获取评论中...',
    })

    qcloud.request({
      url: config.service.commentListUrl,
      login: true,
      data: {
        productId: product.id,
      },
      success: response => {
        wx.hideLoading()
        if (!response.data.code) {
          wx.showToast({
            title: '获取成功',
          })
          this.setData({
            comments: response.data.data
          })          
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      },
      fail: err => {
        console.error('获取评论失败：', err)
        wx.showToast({
          title: '获取评论失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
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