const DB = require('../utils/db.js')

module.exports = {
  /**
   * 创建订单
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let productList = ctx.request.body.list || [];
    let isInstantBuy = !!ctx.request.body.isInstantBuy;

    let order = await DB.query('INSERT INTO order_user(user) values (?)', [user]);
    let orderId = order.insertId;
    let sql = 'INSERT INTO order_product(order_id, product_id, count) VALUES ';
    let query = [];
    let param = [];

    // 从购物车购买时清空已购买的商品
    let needToDelQuery = [];
    let needToDelIds = [];

    productList.forEach(product => {
      query.push('(?, ?, ?)');
      param.push(orderId);
      param.push(product.id);
      param.push(product.count || 1);

      needToDelQuery.push('?');
      needToDelIds.push(product.id);
    })

    await DB.query(sql + query.join(','), param);

    if (!isInstantBuy) {
      await DB.query(`DELETE FROM trolley_user where id IN (${needToDelQuery.join(",")}) AND user = ?`, [...needToDelIds, user]);
    }
  },

  /**
   * 获取订单列表
   */
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;

    // TODO 构建联合查询sql
    let list = await DB.query('SELECT order_user.id as orderId, order_product.count as count, product.id as productId, product.image as image, product.name as name, product.price as price FROM order_user inner join order_product on order_user.id = order_product.order_id inner join product on order_product.product_id = product.id where order_user.user = ?', [user]);

    const orderMap = {};
    list.forEach(o => {
      if (!orderMap[o.orderId]) {
        orderMap[o.orderId] = [];
      }

      orderMap[o.orderId].push(o);
    });

    const ret = [];
    for (let orderId in orderMap) {
      ret.push({
        id: orderId,
        list: orderMap[orderId]
      });
    }

    ctx.state.data = ret;
  }
}
