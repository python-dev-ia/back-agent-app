import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno explícitamente
dotenv.config();

// Si MONGODB_URI ya incluye el nombre de la BD, extraerlo
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agent-app';
let DB_NAME = process.env.DB_NAME || 'agent-app';

console.log('🔍 Debug - MONGODB_URI:', MONGODB_URI);
console.log('🔍 Debug - DB_NAME:', DB_NAME);

// Extraer el nombre de BD de la URI si está presente
const uriMatch = MONGODB_URI.match(/\/([^/?]+)(\?|$)/);
if (uriMatch && uriMatch[1]) {
  DB_NAME = uriMatch[1];
}

console.log('🔗 Conectando a MongoDB Atlas...');
console.log('📊 Base de datos:', DB_NAME);
console.log('🌐 URI final:', MONGODB_URI);

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, {
      tls: true,
      retryWrites: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, {
    tls: true,
    retryWrites: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export { DB_NAME };
export default clientPromise;

