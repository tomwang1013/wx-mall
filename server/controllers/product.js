const DB = require('../utils/db.js')

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },

  detail: async ctx => {
    const productId = ctx.params.id;
    ctx.state.data = (await DB.query('select * from product where product.id = ?', [productId]))[0];
  }
}