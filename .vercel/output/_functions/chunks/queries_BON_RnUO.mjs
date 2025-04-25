import { d as db } from './db_DsEsNE26.mjs';

async function getProducts(userId) {
  try {
    const result = await db.execute({
      sql: userId ? "SELECT * FROM Product WHERE user_id != ? AND stock > 0 ORDER BY id DESC" : "SELECT * FROM Product WHERE stock > 0 ORDER BY id DESC",
      args: userId ? [userId] : []
    });
    return result.rows.map((row) => ({
      id: Number(row.id),
      title: String(row.title),
      description: String(row.description),
      price: Number(row.price),
      stock: Number(row.stock),
      image: String(row.image),
      user_id: Number(row.user_id),
      old_price: row.old_price ? Number(row.old_price) : void 0
    }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}
async function getProductById(id) {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM Product WHERE id = ?",
      args: [id]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: Number(row.id),
      title: String(row.title),
      description: String(row.description),
      price: Number(row.price),
      stock: Number(row.stock),
      image: String(row.image),
      user_id: Number(row.user_id),
      old_price: row.old_price ? Number(row.old_price) : void 0
    };
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
}
async function createProduct(product) {
  const result = await db.execute({
    sql: `
      INSERT INTO products (title, description, price, old_price, stock, image, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      product.title,
      product.description,
      product.price,
      product.old_price || null,
      product.stock,
      product.image,
      product.user_id
    ]
  });
  return Number(result.lastInsertRowid);
}
async function getCartCount(userId) {
  try {
    const result = await db.execute({
      sql: "SELECT SUM(quantity) as total FROM CartItem WHERE user_id = ?",
      args: [userId]
    });
    return Number(result.rows[0]?.total || 0);
  } catch (error) {
    console.error("Error al obtener conteo del carrito:", error);
    throw error;
  }
}
async function getCartWithProducts(userId) {
  try {
    const result = await db.execute(`
      SELECT 
        ci.id as cart_item_id,
        ci.user_id,
        ci.product_id,
        ci.quantity,
        p.id as product_id,
        p.title,
        p.description,
        p.price,
        p.image,
        p.stock,
        p.user_id as product_user_id
      FROM CartItem ci
      INNER JOIN Product p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [userId]);
    return result.rows.map((row) => ({
      CartItem: {
        id: Number(row.cart_item_id),
        user_id: Number(row.user_id),
        product_id: Number(row.product_id),
        quantity: Number(row.quantity)
      },
      Product: {
        id: Number(row.product_id),
        title: String(row.title),
        description: String(row.description),
        price: Number(row.price),
        image: String(row.image),
        stock: Number(row.stock),
        user_id: Number(row.product_user_id)
      }
    }));
  } catch (error) {
    console.error("Error al obtener items del carrito:", error);
    throw error;
  }
}
async function clearCart(userId) {
  try {
    await db.execute(`
      DELETE FROM CartItem
      WHERE user_id = ?
    `, [userId]);
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
}
async function getUserProducts(userId) {
  const result = await db.execute({
    sql: `SELECT * FROM Product WHERE user_id = ? ORDER BY id DESC`,
    args: [userId]
  });
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
    price: Number(row.price),
    stock: Number(row.stock),
    image: String(row.image),
    user_id: Number(row.user_id),
    old_price: row.old_price ? Number(row.old_price) : void 0
  }));
}
async function getUserOrders(userId) {
  const ordersResult = await db.execute({
    sql: `SELECT * FROM "Order" WHERE user_id = ? ORDER BY created_at DESC`,
    args: [userId]
  });
  const orders = ordersResult.rows.map((row) => ({
    id: Number(row.id),
    user_id: Number(row.user_id),
    total: Number(row.total),
    status: String(row.status),
    created_at: String(row.created_at),
    items: []
  }));
  for (const order of orders) {
    const itemsResult = await db.execute({
      sql: `
        SELECT 
          oi.*,
          p.id as product_id,
          p.title,
          p.description,
          p.price as product_price,
          p.image,
          p.stock,
          p.user_id as seller_id
        FROM "OrderItem" oi
        INNER JOIN Product p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `,
      args: [order.id]
    });
    order.items = itemsResult.rows.map((row) => ({
      id: Number(row.id),
      order_id: Number(row.order_id),
      product_id: Number(row.product_id),
      quantity: Number(row.quantity),
      price: Number(row.price),
      product: {
        id: Number(row.product_id),
        title: String(row.title),
        description: String(row.description),
        price: Number(row.product_price),
        image: String(row.image),
        stock: Number(row.stock),
        user_id: Number(row.seller_id),
        old_price: row.old_price ? Number(row.old_price) : void 0
      }
    }));
  }
  return orders;
}
async function checkCartItemTable() {
  try {
    const result = await db.execute({
      sql: "SELECT name FROM sqlite_master WHERE type='table' AND name='CartItem'"
    });
    if (result.rows.length === 0) {
      console.error("La tabla CartItem no existe en la base de datos");
      return false;
    }
    const tableInfo = await db.execute({
      sql: "PRAGMA table_info(CartItem)"
    });
    console.log("Estructura de la tabla CartItem:", tableInfo.rows);
    return true;
  } catch (error) {
    console.error("Error al verificar la tabla CartItem:", error);
    return false;
  }
}
async function createOrder(order) {
  try {
    const orderResult = await db.execute({
      sql: `
        INSERT INTO "Order" (user_id, total, status, created_at)
        VALUES (?, ?, 'pending', datetime('now'))
      `,
      args: [order.user_id, order.total]
    });
    const orderId = Number(orderResult.lastInsertRowid);
    for (const item of order.items) {
      await db.execute({
        sql: `
          INSERT INTO OrderItem (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `,
        args: [orderId, item.product_id, item.quantity, item.price]
      });
      await db.execute({
        sql: `
          UPDATE Product 
          SET stock = stock - ? 
          WHERE id = ? AND stock >= ?
        `,
        args: [item.quantity, item.product_id, item.quantity]
      });
    }
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
}

export { getProductById as a, getCartWithProducts as b, checkCartItemTable as c, createOrder as d, clearCart as e, getUserOrders as f, getCartCount as g, getUserProducts as h, createProduct as i, getProducts as j };
