import { createClient } from '@libsql/client';

const schema = `
-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  old_price REAL,
  stock INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de items del carrito
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
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
