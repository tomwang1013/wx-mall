const DB = require('../utils/db.js');

module.exports = {
  add: async ctx => {
    const id = ctx.request.body.id;
    const user = ctx.state.$wxInfo.userinfo.openId;
    const list = await DB.query('SELECT * FROM trolley_user WHERE trolley_user.id = ? AND trolley_user.user = ?', 
      [id, user]);

    if (!list.length) {
      await DB.query('INSERT INTO trolley_user(id, count, user) VALUES (?, ?, ?)', 
        [id, 1, user])
    } else {
      const count = list[0].count + 1;
      await DB.query('UPDATE trolley_user SET count = ? WHERE trolley_user.id = ? AND trolley_user.user = ?', 
        [count, id, user])
    }
  },

  list: async ctx => {
    const user = ctx.state.$wxInfo.userinfo.openId;
    const list = await DB.query('SELECT trolley_user.count as count, product.* FROM trolley_user LEFT JOIN product ON trolley_user.id = product.id WHERE trolley_user.user = ?', [user]);

    ctx.state.data = list;
  },

  // 更新购物车
  update: async ctx => {
    const user = ctx.state.$wxInfo.userinfo.openId;
    const newTrolleyList = ctx.request.body.trolleyList;

    await DB.query('DELETE FROM trolley_user where user = ?', [user]);

    let insertSql = 'INSERT INTO trolley_user(id, count, user) VALUES ';
    let placeholders = [];
    let values = [];
    newTrolleyList.forEach(trolley => {
      placeholders.push('(?, ?, ?)');
      values.push(trolley.id);
      values.push(user);
      values.push(trolley.count);
    });

    await DB.query(insertSql + placeholders.join(','), values);
  }
}