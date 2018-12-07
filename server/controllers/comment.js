const DB = require('../utils/db.js')

module.exports = {
  add: ctx => {
    let userInfo = ctx.state.$wxInfo.userinfo;
    let content = ctx.request.body.content || '';
    let images = (ctx.request.body.images || []).join(',');
    let productId = +ctx.request.body.productId;

    await DB.query('INSERT INTO comment(user, username, avatar, content, images, product_id) VALUES(?, ?, ?, ?, ?, ?)', userInfo.openId, userInfo.nickName, userInfo.avatarUrl, content, images, productId);
  }
}