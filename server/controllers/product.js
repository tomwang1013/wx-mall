const DB = require('../utils/db.js')

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },

  detail: async ctx => {
    const productId = ctx.params.id;
    ctx.state.data = (await DB.query('select product.*, COUNT(comment.id) as comment_count from product LEFT JOIN comment on product.id = comment.product_id where product.id = ?', [productId]))[0];
  }
}