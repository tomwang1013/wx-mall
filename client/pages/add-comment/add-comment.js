const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    commentValue: '',
    commentImages: []
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

  // 提交图片
  uploadImages(cb) {
    const images = [];
    let length = this.data.commentImages.length;
    for (let i = 0; i < length; i++) {
      console.log('要上传的图片：', this.data.commentImages[i]);
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: this.data.commentImages[i],
        name: 'file',
        success: res => {
          console.log('上传成功：', res.data)
          let data = JSON.parse(res.data)
          length--

          if (!data.code) {
            images.push(data.data.imgUrl)
          }

          if (length <= 0) {
            cb && cb(images)
          }
        },
        fail: err => {
          console.error('上传失败：', err)
          length--
        }
      })
    }
  },

  // 最终提交评论
  submitComment(images) {
    qcloud.request({
      url: config.service.addCommentUrl,
      method: 'PUT',
      login: true,
      data: {
        productId: this.data.product.productId,
        content: this.data.commentValue,
        images: images
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

  // 添加评论
  addComment() {
    if (!this.data.commentValue) {
      return;
    }

    wx.showLoading({
      title: '正在提交评论...',
    })

    if (this.data.commentImages.length) {
      this.uploadImages(images => this.submitComment(images));
    } else {
      this.submitComment();
    }
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let currentImages = res.tempFilePaths
        this.setData({
          commentImages: currentImages
        })
      },
    })

  },

  // 预览图片
  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: this.data.images
    })
  }
})