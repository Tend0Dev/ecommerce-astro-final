import { db } from './db';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  user_id: number;
  old_price?: number;
}

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface CartItemWithProduct {
  CartItem: {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
  };
  Product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    user_id: number;
  };
}

export interface Category {
  id: number;
  name: string;
  label: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

export type CreateOrderItem = Omit<OrderItem, 'id' | 'order_id' | 'product'>;

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export type CreateOrder = {
  user_id: number;
  total: number;
  items: CreateOrderItem[];
};

// Función para obtener todos los productos
export async function getProducts(userId?: number): Promise<Product[]> {
  try {
    const result = await db.execute({
      sql: userId 
        ? 'SELECT * FROM Product WHERE user_id != ? AND stock > 0 ORDER BY id DESC'
        : 'SELECT * FROM Product WHERE stock > 0 ORDER BY id DESC',
      args: userId ? [userId] : []
    });
    
    return result.rows.map(row => ({
      id: Number(row.id),
      title: String(row.title),
      description: String(row.description),
      price: Number(row.price),
      stock: Number(row.stock),
      image: String(row.image),
      user_id: Number(row.user_id),
      old_price: row.old_price ? Number(row.old_price) : undefined
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

// Función para obtener un producto por ID
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM Product WHERE id = ?',
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
      old_price: row.old_price ? Number(row.old_price) : undefined
    };
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
}

// Función para crear un nuevo producto
export async function createProduct(product: Omit<Product, 'id'>): Promise<number> {
  const result = await db.execute({
    sql: `
      INSERT INTO Product (title, description, price, old_price, stock, image, user_id)
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

// Función para actualizar el stock de un producto
export async function updateProductStock(id: number, newStock: number): Promise<void> {
  try {
    await db.execute({
      sql: 'UPDATE Product SET stock = ? WHERE id = ?',
      args: [newStock, id]
    });
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    throw error;
  }
}

// Función para obtener los items del carrito de un usuario
export async function getCartItems(userId: number): Promise<CartItem[]> {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM cart_items WHERE user_id = ?',
      args: [userId]
    });
    return result.rows as unknown as CartItem[];
  } catch (error) {
    console.error('Error al obtener items del carrito:', error);
    throw error;
  }
}

// Función para obtener el conteo total de items en el carrito
export async function getCartCount(userId: number): Promise<number> {
  try {
    const result = await db.execute({
      sql: 'SELECT SUM(quantity) as total FROM CartItem WHERE user_id = ?',
      args: [userId]
    });
    return Number(result.rows[0]?.total || 0);
  } catch (error) {
    console.error('Error al obtener conteo del carrito:', error);
    throw error;
  }
}

export async function getCartWithProducts(userId: number): Promise<CartItemWithProduct[]> {
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

    return result.rows.map(row => ({
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
    console.error('Error al obtener items del carrito:', error);
    throw error;
  }
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<void> {
  try {
    await db.execute(`
      UPDATE CartItem
      SET quantity = ?
      WHERE id = ?
    `, [quantity, cartItemId]);
  } catch (error) {
    console.error('Error al actualizar cantidad del item:', error);
    throw error;
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  try {
    await db.execute(`
      DELETE FROM CartItem
      WHERE id = ?
    `, [cartItemId]);
  } catch (error) {
    console.error('Error al eliminar item del carrito:', error);
    throw error;
  }
}

export async function clearCart(userId: number): Promise<void> {
  try {
    await db.execute(`
      DELETE FROM CartItem
      WHERE user_id = ?
    `, [userId]);
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    throw error;
  }
}

export async function getUserProducts(userId: number): Promise<Product[]> {
  const result = await db.execute({
    sql: `SELECT * FROM Product WHERE user_id = ? ORDER BY id DESC`,
    args: [userId]
  });

  return result.rows.map(row => ({
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
    price: Number(row.price),
    stock: Number(row.stock),
    image: String(row.image),
    user_id: Number(row.user_id),
    old_price: row.old_price ? Number(row.old_price) : undefined
  }));
}

export async function getCategories(): Promise<Category[]> {
  const result = await db.execute('SELECT * FROM Category ORDER BY label');
  return result.rows.map(row => ({
    id: Number(row.id),
    name: String(row.name),
    label: String(row.label)
  }));
}

export async function getUserOrders(userId: number): Promise<Order[]> {
  // Primero obtenemos las órdenes
  const ordersResult = await db.execute({
    sql: `SELECT * FROM "Order" WHERE user_id = ? ORDER BY created_at DESC`,
    args: [userId]
  });

  const orders: Order[] = ordersResult.rows.map(row => ({
    id: Number(row.id),
    user_id: Number(row.user_id),
    total: Number(row.total),
    status: String(row.status),
    created_at: String(row.created_at),
    items: []
  }));

  // Para cada orden, obtenemos sus items y productos
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

    order.items = itemsResult.rows.map(row => ({
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
        old_price: row.old_price ? Number(row.old_price) : undefined
      }
    }));
  }

  return orders;
}

export async function checkCartItemTable(): Promise<boolean> {
  try {
    // Intentar obtener la estructura de la tabla
    const result = await db.execute({
      sql: "SELECT name FROM sqlite_master WHERE type='table' AND name='CartItem'"
    });
    
    if (result.rows.length === 0) {
      console.error('La tabla CartItem no existe en la base de datos');
      return false;
    }
    
    // Verificar la estructura de la tabla
    const tableInfo = await db.execute({
      sql: "PRAGMA table_info(CartItem)"
    });
    
    console.log('Estructura de la tabla CartItem:', tableInfo.rows);
    return true;
  } catch (error) {
    console.error('Error al verificar la tabla CartItem:', error);
    return false;
  }
}

export async function createOrder(order: CreateOrder): Promise<void> {
  try {
    // Crear la orden
    const orderResult = await db.execute({
      sql: `
        INSERT INTO "Order" (user_id, total, status, created_at)
        VALUES (?, ?, 'pending', datetime('now'))
      `,
      args: [order.user_id, order.total]
    });

    const orderId = Number(orderResult.lastInsertRowid);

    // Crear los items de la orden
    for (const item of order.items) {
      await db.execute({
        sql: `
          INSERT INTO OrderItem (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `,
        args: [orderId, item.product_id, item.quantity, item.price]
      });

      // Actualizar el stock del producto
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
    console.error('Error al crear la orden:', error);
    throw error;
  }
} 