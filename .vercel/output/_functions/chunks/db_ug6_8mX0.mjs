import { createClient } from '@libsql/client';

const schema = `
-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS Product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  old_price REAL,
  image TEXT NOT NULL,
  stock INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Tabla de items del carrito
CREATE TABLE IF NOT EXISTS CartItem (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- Tabla Order
CREATE TABLE IF NOT EXISTS "Order" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Tabla OrderItem
CREATE TABLE IF NOT EXISTS "OrderItem" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES "Order"(id),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);`;
async function initDatabase() {
  try {
    console.log("Inicializando base de datos...");
    await db.execute(schema);
    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}
initDatabase();

const url = "libsql://ecommerce-test-tend0dev.aws-us-east-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDU1MjQzNjUsImlkIjoiYzJmYzhkZWEtNDA0Yi00OGViLWFjMzAtNDZiNDg0MjY3ODkxIiwicmlkIjoiYzdjYjM2MjctMmEyYy00Yzg4LTk4MGYtM2I3ZmZhMTgxNzdlIn0.uwUXvbneaP3-91liviaDGpbgCFqFETQQ7Tth8bZ0ZstW39cTITdRtBQP7mcmfEaHXXLEbgd7ARs4AviKFQkNAw";
const db = createClient({
  url,
  authToken
});

export { db as d };
