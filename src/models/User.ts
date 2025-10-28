import clientPromise, { DB_NAME } from '../config/db';
import bcrypt from 'bcryptjs';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // Verificar si el usuario ya existe
    const existingUser = await db.collection('users').findOne({ email: userData.email });
    if (existingUser) {
      return null; // Usuario ya existe
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Crear el usuario
    const result = await db.collection('users').insertOne({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return {
      _id: result.insertedId.toString(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: '', // No devolver la contraseña
    };
  } catch (error) {
    console.error('Error validating user:', error);
    return null;
  }
}

