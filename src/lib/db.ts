import { createClient } from '@libsql/client';

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('Faltan las variables de entorno TURSO_DATABASE_URL y TURSO_AUTH_TOKEN');
}

export const db = createClient({
  url,
  authToken,
});

// Importar el script de inicialización
import './init-db'; 