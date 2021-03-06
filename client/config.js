/**
 * 小程序配置文件
 */

let useLocal = false;

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://veaawhmc.qcloud.la';

if (useLocal) {
  host = 'http://localhost:5757'
}

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    // 获取全部商品列表
    productList: `${host}/weapp/product`,

    // 获取商品详情
    productDetail: `${host}/weapp/product/`,

    // 立即购买
    buyUrl: `${host}/weapp/order`,

    // 订单列表
    orderListUrl: `${host}/weapp/order`,

    // 加入购物车
    addToTrolleyUrl: `${host}/weapp/trolley`,

    // 购物车列表
    trolleyListUrl: `${host}/weapp/trolley`,

    // 更新购物车列表
    updateTrolleyUrl: `${host}/weapp/trolley`,

    // 提交评论
    addCommentUrl: `${host}/weapp/comment`,

    // 评论列表
    commentListUrl: `${host}/weapp/comment`,
  }
};

module.exports = config;