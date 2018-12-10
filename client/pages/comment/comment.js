const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

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
        productId: options.id
      }
    })

    wx.showLoading({
      title: '获取评论中...',
    })

    qcloud.request({
      url: config.service.commentListUrl,
      data: {
        productId: this.data.product.productId,
      },
      success: response => {
        wx.hideLoading()
        if (!response.data.code) {
          wx.showToast({
            title: '获取成功',
          })
          this.setData({
            comments: response.data.data.map(c => {
              c.images = c.images ? c.images.split(';') : [];
              return c;
            })
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
        wx.hideLoading();
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

  // 预览图片
  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src
    let index = target.dataset.index

    wx.previewImage({
      current: src,
      urls: this.data.comments[index].images
    })
  }
})