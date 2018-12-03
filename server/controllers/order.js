const DB = require('../utils/db.js')

module.exports = {
  /**
   * 创建订单
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let productList = ctx.request.body.list || [];

    let order = await DB.query('INSERT INTO order_user(user) values (?)', [user]);
    let orderId = order.insertId;
    let sql = 'INSERT INTO order_product(order_id, product_id, count) VALUES ';
    let query = [];
    let param = [];

    productList.forEach(product => {
      query.push('(?, ?, ?)');
      param.push(orderId);
      param.push(product.id);
      param.push(product.count || 1);
    })

    await DB.query(sql + query.join(','), param);
  },

  /**
   * 获取订单列表
   */
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;

    // TODO 构建联合查询sql
    let list = await DB.query('SELECT order_user.id as orderId, order_product.count as count, product.image as image, product.name as name, product.price as price FROM order_user inner join order_product on order_user.id = order_product.order_id inner join product on order_product.product_id = product.id where order_user.user = ?', [user]);

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
